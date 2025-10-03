import { GameService } from './services/GameService';
import { BalanceManager } from '../game-session/BalanceManager';

interface WSMessage {
  type: string;
  data: any;
  sessionId: string;
}

interface WSClient {
  id: string;
  userId?: string;
  gameSession?: any;
  isAlive: boolean;
}

export class WebSocketServer {
  private wss: any;
  private clients = new Map<WebSocket, WSClient>();
  private gameService: GameService;
  private balanceManager: BalanceManager;

  constructor(gameService: GameService, balanceManager: BalanceManager) {
    this.gameService = gameService;
    this.balanceManager = balanceManager;
  }

  start(port: number = 8080) {
    // Bun's built-in WebSocket server
    this.wss = Bun.serve({
      port,
      fetch: (request, server) => {
        // Handle HTTP requests (for initial loading)
        if (request.method === 'GET' && new URL(request.url).pathname === '/health') {
          return new Response('OK');
        }

        // Upgrade to WebSocket
        const upgraded = server.upgrade(request);
        if (!upgraded) {
          return new Response('Upgrade failed', { status: 400 });
        }
      },
      websocket: {
        open: (ws) => this.handleConnection(ws),
        message: (ws, message) => this.handleMessage(ws, message),
        close: (ws) => this.handleDisconnection(ws),
        ping: (ws) => ws.pong(),
      },
    });

    console.log(`WebSocket server started on port ${port}`);
  }

  private handleConnection(ws: WebSocket) {
    const client: WSClient = {
      id: crypto.randomUUID(),
      isAlive: true,
    };

    this.clients.set(ws, client);
    console.log(`Client connected: ${client.id}`);

    // Send welcome message
    ws.send(JSON.stringify({
      type: 'connected',
      sessionId: client.id,
      timestamp: Date.now(),
    }));
  }

  private async handleMessage(ws: WebSocket, message: string | Buffer) {
    try {
      const client = this.clients.get(ws);
      if (!client) return;

      const msg: WSMessage = JSON.parse(message.toString());

      switch (msg.type) {
        case 'authenticate':
          await this.handleAuthentication(ws, client, msg.data);
          break;

        case 'spin':
          await this.handleSpin(ws, client, msg.data);
          break;

        case 'balance':
          await this.handleBalanceRequest(ws, client);
          break;

        case 'ping':
          ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
          break;

        default:
          ws.send(JSON.stringify({
            type: 'error',
            error: 'Unknown message type',
            requestType: msg.type
          }));
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
      ws.send(JSON.stringify({
        type: 'error',
        error: 'Invalid message format'
      }));
    }
  }

  private async handleAuthentication(ws: WebSocket, client: WSClient, data: any) {
    try {
      // Validate user session/token
      const user = await this.validateUserSession(data.token);
      if (!user) {
        ws.send(JSON.stringify({ type: 'auth_failed' }));
        return;
      }

      client.userId = user.id;

      // Initialize game session
      client.gameSession = await this.gameService.createSession(user.id, data.gameId);

      ws.send(JSON.stringify({
        type: 'authenticated',
        user: { id: user.id, balance: user.balance },
        games: await this.gameService.getAvailableGames(),
      }));

    } catch (error) {
      ws.send(JSON.stringify({ type: 'auth_error', error: error.message }));
    }
  }

  private async handleSpin(ws: WebSocket, client: WSClient, data: any) {
    if (!client.userId || !client.gameSession) {
      ws.send(JSON.stringify({ type: 'error', error: 'Not authenticated' }));
      return;
    }

    try {
      // Validate bet and balance
      const validation = await this.balanceManager.validateBet(
        client.userId,
        data.betAmount
      );

      if (!validation.valid) {
        ws.send(JSON.stringify({
          type: 'spin_error',
          error: validation.error
        }));
        return;
      }

      // Execute spin via GameService (which handles PHP execution)
      const spinResult = await this.gameService.executeSpin(
        client.gameSession,
        data
      );

      // Update balance
      await this.balanceManager.updateBalance(
        client.userId,
        -data.betAmount + spinResult.totalWin,
        'spin'
      );

      // Send real-time spin result
      ws.send(JSON.stringify({
        type: 'spin_result',
        result: spinResult,
        balance: await this.balanceManager.getBalance(client.userId),
        timestamp: Date.now(),
      }));

    } catch (error) {
      ws.send(JSON.stringify({
        type: 'spin_error',
        error: error.message
      }));
    }
  }

  private async handleBalanceRequest(ws: WebSocket, client: WSClient) {
    if (!client.userId) {
      ws.send(JSON.stringify({ type: 'error', error: 'Not authenticated' }));
      return;
    }

    const balance = await this.balanceManager.getBalance(client.userId);
    ws.send(JSON.stringify({
      type: 'balance_update',
      balance,
      timestamp: Date.now(),
    }));
  }

  private handleDisconnection(ws: WebSocket) {
    const client = this.clients.get(ws);
    if (client) {
      console.log(`Client disconnected: ${client.id}`);
      // Cleanup game session
      if (client.gameSession) {
        this.gameService.cleanupSession(client.gameSession);
      }
      this.clients.delete(ws);
    }
  }

  // Broadcast to all clients (for jackpots, announcements, etc.)
  broadcast(message: any) {
    for (const [ws, client] of this.clients) {
      if (client.isAlive) {
        try {
          ws.send(JSON.stringify(message));
        } catch (error) {
          console.error('Broadcast error:', error);
        }
      }
    }
  }

  // Send to specific user
  sendToUser(userId: string, message: any) {
    for (const [ws, client] of this.clients) {
      if (client.userId === userId && client.isAlive) {
        try {
          ws.send(JSON.stringify(message));
        } catch (error) {
          console.error('Send to user error:', error);
        }
      }
    }
  }

  private async validateUserSession(token: string) {
    // TODO: Implement your session validation logic
    // This could check against your database or JWT
    // For now, return mock data
    return { id: 'user123', balance: 1000.50 };
  }
}