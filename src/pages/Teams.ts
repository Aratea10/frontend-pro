import { ApiService } from '../services/ApiService';
import { HPCharacter, HPHouse } from '../services/hp.types';
import { HPApiService } from '../services/HPApiService';
import { Page } from './Page';


class Teams extends Page {

    // constructor() {
    //      en POO si implementamos un constructor en la clase hija
    //      debe llamar siempre a super() que es el constructor del padre.
    //     super();
    //     console.log('Teams instanciado');
    //     this.bootstrap();
    // }

    async bootstrap(): Promise<void> {
        await this.printChracters();
        this.charactersClickEvent();
    }

    destroy(): void | Promise<void> {
        return;
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
                // Tenemos que generar un elemento de tipo CharacterModal
                // añadirlo al dom (con la etiqueta definida)
                // llamar a show con la info del personaje
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