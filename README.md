# NetGame Casino Slot Platform

A modern casino slot game platform built with TypeScript/Bun.sh server and PHP calculators for mathematical precision.

## Project Structure

```
netgame/
├── src/                          # TypeScript source code
│   ├── server/                   # Main HTTP/WebSocket server
│   ├── game-session/             # Game session management
│   ├── games/                    # Game implementations
│   │   ├── netgame/             # NetGame slot games
│   │   └── netent/              # NetEnt slot games
│   └── database/                # Database layer
├── new/                          # PHP calculators (active)
├── public/                       # Static web assets
├── archive/                      # Archived legacy code
│   ├── old/                     # Original PHP implementations
│   ├── src-old/                 # Old TypeScript structure
│   ├── scripts/                 # Conversion utilities
│   └── test-files/              # Test artifacts
├── package.json                 # Node.js dependencies
└── README.md                    # This file
```

## Architecture

### Current Architecture
```
TypeScript Client → TypeScript Server → Direct PHP Execution → TypeScript Server
                      ↓                    ↓                    ↓
               Business Logic      Spin Math Only      Data Persistence
               User Management       RTP Engine         Statistics
               Database Operations    Reel Generation    Balance Updates
```

### Key Components

1. **TypeScript Server (Bun.sh)**
   - HTTP API endpoints
   - WebSocket support
   - Session management
   - Database operations

2. **PHP Calculators**
   - Pure mathematical calculations
   - RTP enforcement
   - Reel generation algorithms
   - No Laravel dependencies

3. **Game Organization**
   - `src/games/netgame/` - NetGame branded slots
   - `src/games/netent/` - NetEnt branded slots
   - `new/` - Active PHP calculators

## Getting Started

### Prerequisites
- Bun.sh runtime
- PHP 7.4+
- MySQL/PostgreSQL database

### Installation
```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```

### API Endpoints
- `GET /health` - Health check
- `POST /game/:gameName/spin` - Execute game spin
- `GET /game/:gameName/session` - Get session info
- `POST /game/:gameName/session` - Create session
- `GET /game/:gameName/balance` - Get balance

## Development

### Adding New Games
1. Create PHP calculator in `new/{GameName}/`
2. Implement `GameCalculator.php` and `DirectPHPHandler.php`
3. Add TypeScript integration in `src/games/`
4. Test mathematical accuracy

### Code Quality
- Run linter: `bun run lint`
- Type checking: `bun run type-check`
- Tests: `bun run test`

## Migration Notes

This project has been cleaned up from a PHP/Laravel monolith to a TypeScript/PHP hybrid architecture:

- **Removed**: Extensive commented code, duplicate directories, unused scripts
- **Archived**: Legacy code preserved in `archive/` directory
- **Consolidated**: Game files organized by provider (netgame/netent)
- **Maintained**: Mathematical precision and RTP calculations

## Critical Requirements

1. **Mathematical Accuracy**: PHP calculators must produce identical results to original implementations
2. **No Laravel Dependencies**: PHP code must be pure calculation engines
3. **Direct Execution**: Uses Bun.sh spawn() for PHP process execution
4. **TypeScript Strong Typing**: Full type safety throughout the application

## Performance

- Direct PHP execution eliminates HTTP overhead
- TypeScript handles business logic and persistence
- PHP processes are spawned on-demand for calculations
- WebSocket support for real-time updates

## License

UNLICENSED - Internal Game Platform Use Only