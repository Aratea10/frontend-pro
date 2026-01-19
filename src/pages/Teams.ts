import { ApiService } from '../services/ApiService';
import { HPCharacter, HPHouse } from '../services/hp.types';
import { HPApiService } from '../services/HPApiService';


class Teams {

    constructor() {
        console.log('Teams instanciado');
        this.bootstrap();
    }

    private async bootstrap(): Promise<void> {
        await this.printChracters();
        this.charactersClickEvent();
    }

    private async printChracters(): Promise<void> {
        const charactersContainer = document.querySelector('#characters-container');

        try {

            for (const house in HPHouse) {
                const elementClass = `#${house.toLowerCase()} div.house-images`;
                const characters = await HPApiService.getCharactersByHouse(house);
                this.printElement(characters.slice(0, 6), elementClass);
            }

        } catch (e) {
            console.log(e);
        }

    }

    private async charactersClickEvent(): Promise<void> {
        document.addEventListener('click', async (event) => {
            const target = event.target as HTMLElement;
            if (target && target.classList.contains('hp-character')) {
                const id = target.getAttribute('data-id');
                if (!id) return;
                const character = await HPApiService.getCharacter(id);
                console.log(character);
            }
        });
    }

    private printElement(characters: HPCharacter[], elementRef: string): void {
        // TODO: debemos pintar estos elementos dentro del div de su "house";
        // TIP: hay que añadir un elemento addicional desde TS por cada imagen.
        const element = document.querySelector(elementRef);
        if (!element) return;
        element.innerHTML = characters.filter(i => i.image).slice(0, 15).map(i => `
            <img src="${i.image}" data-id="${i.id}" class="hp-character"></img>
        `).join('');
    }

}
new Teams();

// No puedo acceder a una propiedad PRIVADA fuera de la clase.
// teams.printChracters();