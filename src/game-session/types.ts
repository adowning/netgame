// Core game data types that replace Laravel models
export interface User {
  id: string;
  balance: number;
  count_balance: number;
  address: number;
  shop_id: string;
  username: string;
  email: string;
  status: string;
  session?: string;
  last_bid?: Date;
}

export interface Game {
  id: string;
  name: string;
  denomination: number;
  bet: string[];
  stat_in: number;
  stat_out: number;
  bank: number;
  shop_id: string;
  view: boolean;
  slotViewState?: string;
  advanced?: string;
  stat_in_jpg?: number;
  stat_out_jpg?: number;
  slotBonus?: boolean;
  increaseRTP?: number;
  slotWildMpl?: number;
  slotFreeMpl?: number;
  slotFreeCount?: number;
  slotScatterType?: number;
  slotBonusType?: number;
  slotGamble?: boolean;
  slotFastStop?: number;
  slotExitUrl?: string;
}

export interface Shop {
  id: string;
  name: string;
  percent: number;
  max_win: number;
  currency: string;
  is_blocked: boolean;
}

export interface Jackpot {
  id: string;
  balance: number;
  percent: number;
  user_id?: string;
  shop_id: string;
  min_balance?: number;
  start_balance?: number;
  pay_sum?: number;
}

// Game data object passed to PHP calculator
export interface GameData {
  user: User;
  game: Game;
  shop: Shop;
  bank: number;
  jackpots: Jackpot[];
  sessionData?: Record<string, any>;
  staticData?: Record<string, any>;
}

// Spin request/response types
export interface SpinRequest {
  action: 'calculateSpin';
  slotEvent: 'bet' | 'freespin';
  lines: number;
  betLine: number;
  linesId: number[][];
  gameData: GameData;
}

export interface SpinResult {
  totalWin: number;
  reels: {
    reel1: string[];
    reel2: string[];
    reel3: string[];
    reel4: string[];
    reel5: string[];
    rp: number[];
  };
  winString: string;
  symb: string;
  scattersCount: number;
}

export interface SpinResponse {
  status: 'success' | 'error';
  data?: SpinResult;
  message?: string;
}

// Game session state types
export interface GameState {
  bonusWin: number;
  freeGames: number;
  currentFreeGame: number;
  bonusSymbol: number;
  totalWin: number;
  freeBalance: number;
  freeStartWin: number;
  picks?: number;
  bonusState?: number;
  selectedItems?: number[];
  items?: string[];
  initialSymbols?: string;
}

export interface SessionEvent {
  id: string;
  timestamp: Date;
  type: 'spin' | 'bonus_pick' | 'balance_update' | 'jackpot_win';
  data: Record<string, any>;
}

export interface SpinHistory {
  id: string;
  timestamp: Date;
  bet: number;
  lines: number;
  win: number;
  reels: string[][];
  winLines: any[];
  scattersCount: number;
  bonusTriggered: boolean;
}

// Balance operation types
export interface BalanceOperation {
  type: 'bet' | 'win' | 'jackpot' | 'refund';
  amount: number;
  event: string;
  timestamp: Date;
  previousBalance: number;
  newBalance: number;
  countBalanceChange?: number;
  addressChange?: number;
}

// PHP Calculator interface
export interface PHPProcessResult {
  success: boolean;
  result?: SpinResult;
  error?: string;
  executionTime: number;
}

// Session persistence types
export interface SessionData {
  userId: string;
  gameId: string;
  state: GameState;
  events: SessionEvent[];
  spinHistory: SpinHistory[];
  balanceOperations: BalanceOperation[];
  lastActivity: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Error types
export interface GameError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
}

// RTP calculation types
export interface RTPConfig {
  basePercent: number;
  countBalanceThreshold: number;
  addressThreshold: number;
  adjustmentFactors: {
    lowBalance: number;
    highBalance: number;
    bonusGames: number;
  };
}

// Game configuration types
export interface GameConfig {
  id: string;
  name: string;
  paytable: Record<string, number[]>;
  reelStrips: Record<string, string[]>;
  bonusReelStrips?: Record<string, string[]>;
  lines: number[][];
  maxLines: number;
  wildSymbols: string[];
  scatterSymbol: string;
  bonusSymbol?: string;
  freeSpinCount: number;
  freeSpinMultiplier: number;
  wildMultiplier: number;
}