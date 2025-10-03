# Netgame WebSocket Server

This document describes the WebSocket server implementation for real-time game communication in the Netgame platform.

## Overview

The WebSocket server provides real-time communication between game clients and the TypeScript server, enabling instant spin results, balance updates, and live game features. It uses Bun's built-in WebSocket server for high performance and low latency.

## Architecture

```
Client Browser (WebSocket)
    ↓
WebSocket Server (Bun) - Port 8080
    ↓
Game Service → Direct PHP Execution
    ↓
Database Updates & Persistence
```

## Features

- **Real-time Communication**: Instant spin results and balance updates
- **Session Management**: User authentication and game session handling
- **Error Handling**: Comprehensive error reporting and recovery
- **Scalability**: Built on Bun's high-performance WebSocket implementation
- **Security**: Session-based authentication with token validation

## Quick Start

### Starting the Server

```bash
# Install dependencies
bun install

# Start the server (includes both HTTP and WebSocket servers)
bun run src/server/index.ts
```

The server will start:
- HTTP server on port 3000 (existing REST API)
- WebSocket server on port 8080 (new real-time features)

### Testing with Client

Open `public/game-client.html` in your browser to test the WebSocket connection:

```bash
# Serve static files (if not already handled by server)
bunx serve public
```

Navigate to `http://localhost:3000/game-client.html` to test the WebSocket client.

## WebSocket Message Protocol

### Connection

Clients connect to `ws://localhost:8080` and receive a welcome message:

```json
{
  "type": "connected",
  "sessionId": "uuid-string",
  "timestamp": 1640995200000
}
```

### Authentication

```json
// Client sends
{
  "type": "authenticate",
  "data": {
    "token": "user-auth-token",
    "gameId": "Royal40FruitsNG"
  },
  "sessionId": "uuid-string"
}

// Server responds
{
  "type": "authenticated",
  "user": {
    "id": "user123",
    "balance": 1000.50
  },
  "games": ["Royal40FruitsNG", "MMALegendsNG", ...]
}
```

### Spin Request

```json
// Client sends
{
  "type": "spin",
  "data": {
    "betAmount": 0.40,
    "betLine": 0.01,
    "lines": 40,
    "linesId": [[1,1,1,1,1], [2,2,2,2,2], ...]
  },
  "sessionId": "uuid-string"
}

// Server responds
{
  "type": "spin_result",
  "result": {
    "totalWin": 5.00,
    "reels": {
      "reel1": ["0", "1", "2", "3"],
      "reel2": ["4", "5", "6", "7"],
      "reel3": ["8", "9", "0", "1"],
      "reel4": ["2", "3", "4", "5"],
      "reel5": ["6", "7", "8", "9"],
      "rp": [10, 15, 20, 25, 30]
    },
    "winLines": [...]
  },
  "balance": 995.00,
  "timestamp": 1640995200000
}
```

### Balance Updates

```json
// Client requests
{
  "type": "balance",
  "sessionId": "uuid-string"
}

// Server responds
{
  "type": "balance_update",
  "balance": 1000.50,
  "timestamp": 1640995200000
}
```

### Heartbeat

```json
// Client sends
{
  "type": "ping",
  "sessionId": "uuid-string"
}

// Server responds
{
  "type": "pong",
  "timestamp": 1640995200000
}
```

## Error Handling

All errors follow this format:

```json
{
  "type": "error",
  "error": "ERROR_CODE",
  "message": "Human readable message",
  "details": { /* optional debug info */ }
}
```

Common error codes:
- `UNKNOWN_MESSAGE_TYPE`: Invalid message type
- `NOT_AUTHENTICATED`: User not authenticated
- `INVALID_BET`: Bet validation failed
- `SPIN_ERROR`: Spin execution failed

## Client Implementation

### JavaScript WebSocket Client

```javascript
class GameClient {
  constructor() {
    this.ws = null;
    this.sessionId = null;
    this.connect();
  }

  connect() {
    this.ws = new WebSocket('ws://localhost:8080');

    this.ws.onopen = () => {
      console.log('Connected');
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.handleMessage(message);
    };

    this.ws.onclose = () => {
      console.log('Disconnected');
      // Implement reconnection logic
    };
  }

  authenticate(token) {
    this.send({
      type: 'authenticate',
      data: { token, gameId: 'Royal40FruitsNG' }
    });
  }

  spin(betData) {
    this.send({
      type: 'spin',
      data: betData
    });
  }

  send(message) {
    message.sessionId = this.sessionId;
    this.ws.send(JSON.stringify(message));
  }

  handleMessage(message) {
    switch (message.type) {
      case 'connected':
        this.sessionId = message.sessionId;
        break;
      case 'authenticated':
        // Initialize game
        break;
      case 'spin_result':
        // Update UI
        break;
      // ... other message types
    }
  }
}
```

## Server Implementation Details

### WebSocket Server Class

Located in `src/server/websocket.ts`, the `WebSocketServer` class handles:

- Connection management
- Message routing
- Session validation
- Game execution coordination
- Error handling

### Integration with Game Service

The WebSocket server integrates with the existing `GameService` and `BalanceManager`:

```typescript
const wsServer = new WebSocketServer(gameService, balanceManager);
wsServer.start(8080);
```

### PHP Calculator Integration

Spin requests trigger direct PHP execution:

```typescript
const spinResult = await this.gameService.executeSpin(
  client.gameSession,
  data
);
```

This maintains the existing PHP calculation architecture while adding real-time delivery.

## Performance Considerations

### Connection Limits
- Bun can handle thousands of concurrent WebSocket connections
- Monitor memory usage with high connection counts
- Implement connection pooling if needed

### Message Throughput
- JSON serialization is lightweight
- Direct PHP execution adds minimal overhead
- WebSocket protocol reduces HTTP request/response latency

### Scalability
- Single server can handle 10k+ concurrent connections
- Consider load balancing for higher loads
- Implement Redis for session sharing in multi-server setups

## Security

### Authentication
- Token-based authentication required for all game actions
- Session validation on each message
- Automatic disconnection for invalid sessions

### Data Validation
- All incoming messages validated for required fields
- Bet amounts checked against user balance
- Game state validation before spin execution

### Rate Limiting
- Implement rate limiting to prevent abuse
- Monitor for suspicious activity patterns
- Automatic disconnection for excessive failed requests

## Monitoring and Debugging

### Connection Logging
```typescript
// Server logs all connections and disconnections
console.log(`Client connected: ${client.id}`);
console.log(`Client disconnected: ${client.id}`);
```

### Message Logging
```typescript
// Log all messages for debugging
this.log('Sent: ' + JSON.stringify(message));
this.log('Received: ' + JSON.stringify(message));
```

### Performance Metrics
- Connection count monitoring
- Message throughput tracking
- PHP execution time measurement
- Error rate monitoring

## Migration Path

### From HTTP to WebSocket

1. **Phase 1**: Run both HTTP and WebSocket servers simultaneously
2. **Phase 2**: Update client applications to use WebSocket
3. **Phase 3**: Gradually deprecate HTTP endpoints
4. **Phase 4**: Remove HTTP server once all clients migrated

### Backward Compatibility

- Existing HTTP endpoints remain functional during transition
- Clients can choose WebSocket or HTTP based on capabilities
- Graceful fallback to HTTP if WebSocket fails

## Troubleshooting

### Connection Issues
- Check firewall settings for port 8080
- Verify WebSocket server is running
- Check browser console for connection errors

### Authentication Problems
- Verify token format and validity
- Check session timeout handling
- Ensure user exists in database

### Spin Execution Errors
- Check PHP calculator file exists
- Verify game data structure
- Monitor PHP process execution logs

## Future Enhancements

- **Connection Pooling**: Reuse PHP processes for better performance
- **Binary Messages**: Switch to binary protocol for reduced bandwidth
- **Compression**: Enable WebSocket compression for large payloads
- **Clustering**: Multi-server WebSocket support with Redis
- **Metrics**: Detailed performance and usage analytics