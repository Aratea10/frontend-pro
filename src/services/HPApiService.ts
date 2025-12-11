import { ApiService } from './ApiService';
import { HPCharacter } from './hp.types';

export class HPApiService {

    static readonly API_URL = 'https://hp-api.onrender.com/api';

    public static getAllCharacters(): Promise<HPCharacter[]> {
        return ApiService.get<HPCharacter[]>(`${this.API_URL}/characters`);
    };

    public static getCharacter(id: string): Promise<HPCharacter> {
        return ApiService.get<HPCharacter[]>(`${this.API_URL}/character/${id}`)
            .then(res => res[0]);
    }

    public static getCharactersByHouse(house: string): Promise<HPCharacter[]> {
        return ApiService.get<HPCharacter[]>(`${this.API_URL}/characters/house/${house}`);
    }

}