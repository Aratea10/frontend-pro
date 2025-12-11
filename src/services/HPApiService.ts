import { ApiService } from './ApiService';
import { HPCharacter } from './hp.types';

export class HPApiService {

    static readonly API_URL = 'https://hp-api.onrender.com/api/characters';

    public static getAllCharacters(): Promise<HPCharacter[]> {
        return ApiService.get<HPCharacter[]>(this.API_URL);
    };

    public static getCharacter(id: string): Promise<HPCharacter> {
        return ApiService.get<HPCharacter>(`${this.API_URL}/${id}`);
    }

    public static getCharactersByHouse(house: string): Promise<HPCharacter[]> {
        return ApiService.get<HPCharacter[]>(`${this.API_URL}/house/${house}`);
    }

}