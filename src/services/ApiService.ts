import { HPCharacter, HPHouse } from './hp.types';

export class ApiService {

    static readonly API_URL = 'https://hp-api.onrender.com/api/characters';

    // Una función estática NO requiere una instáncia de clase
    public static getCharacters(): Promise<HPCharacter[]> {
        return fetch(this.API_URL)
            .then(res => res.json())
            .then(res => res as HPCharacter[])
    }

    public static getCharactersByHouse(house: string): Promise<HPCharacter[]> {
        return fetch(`${this.API_URL}/house/${house}`)
            .then(res => res.json())
            .then(res => res as HPCharacter[])
    }

}