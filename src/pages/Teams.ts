import { ApiService } from '../services/ApiService';
import { HPCharacter, HPHouse } from '../services/hp.types';
import { HPApiService } from '../services/HPApiService';


class Teams {

    constructor() {
        console.log('Teams instanciado');
        this.printChracters();
        this.charactersClickEvent();
    }

    private async printChracters() {
        const charactersContainer = document.querySelector('#characters-container');
        if (!charactersContainer) return;

        try {

            // TODO: por cada div de una casa, añadir las fotos de los personajes de esa casa.
            // Si un personaje no tiene foto, lo omito.

            for (const house in HPHouse) {
                const elementClass = '#' + house.toLowerCase();
                const characters = await HPApiService.getCharactersByHouse(house);
                this.printElement(characters, elementClass);
            }

        } catch (e) {
            charactersContainer.textContent = 'Error al obtener los personajes';
        }

    }

    private printElement(characters: HPCharacter[], elementRef: string): void {
        const element = document.querySelector(elementRef);
        if (!element) return;
        element.innerHTML = characters.filter(i => i.image).slice(0, 15).map(i => `
            <div>
                <img src="${i.image}" data-id="${i.id}" class="hp-character"></img>
            </div>
        `).join('');
    }

    private async charactersClickEvent() {
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

}
const teams = new Teams();

// No puedo acceder a una propiedad PRIVADA fuera de la clase.
// teams.printChracters();