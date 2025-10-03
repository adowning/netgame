export interface GameData {
    user: {
        id: string;
        balance: number;
        count_balance: number;
        address: number;
    };
    game: {
        id: string;
        name: string;
        denomination: number;
        rtp: number;
        bet: string[];
        slotBonus: boolean;
        slotWildMpl: number;
        slotFreeMpl: number;
        increaseRTP: number;
    };
    shop: {
        percent: number;
        max_win: number;
    };
    bank: number;
    stat_in: number;
    stat_out: number;
}

export interface SpinData {
    coin: number;
    bet: number;
    slotEvent: 'bet' | 'freespin' | 'respin';
}

export interface ServerResponse {
    BonusSymbol: number;
    slotLines: number;
    slotBet: number;
    totalFreeGames: number;
    currentFreeGames: number;
    Balance: number;
    afterBalance: number;
    bonusWin: number;
    freeStartWin: number;
    totalWin: number;
    winLines: any[];
    bonusInfo: any;
    Jackpots: any[];
    reelsSymbols: {
        reel1: string[];
        reel2: string[];
        reel3: string[];
        reel4: string[];
        reel5: string[];
        rp: number[];
    };
}
