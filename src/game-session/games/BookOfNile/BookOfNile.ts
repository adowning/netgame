import { PHPCalculator } from '../../PHPCalculator';
import { GameData, SpinData, ServerResponse } from './types';

export class BookOfNile {
    private phpCalculator: PHPCalculator;
    private gameData: GameData;

    constructor(gameData: GameData) {
        this.gameData = gameData;
        this.phpCalculator = new PHPCalculator();
    }

    async spin(spinData: SpinData): Promise<ServerResponse> {
        const result = await this.phpCalculator.executeSpin('BookOfNile', this.gameData, spinData);
        return result;
    }

    async buyBonus(buyBonusData: any): Promise<any> {
        if (this.gameData.game.name !== 'BookOfNileLostChapterNG') {
            throw new Error('Buy bonus not supported for this game');
        }
        const result = await this.phpCalculator.executeBuyBonus('BookOfNile', this.gameData, buyBonusData);
        return result;
    }
}
