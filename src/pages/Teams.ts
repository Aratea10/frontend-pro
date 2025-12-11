import { ApiService } from '../services/ApiService';
import { HPHouse } from '../services/hp.types';


class Teams {

    constructor() {
        console.log('Teams instanciado');
        this.printChracters();
    }

    private async printChracters() {
        const charactersContainer = document.querySelector('#characters-container');
        if (!charactersContainer) return;

        try {

            // TODO: por cada div de una casa, añadir las fotos de los personajes de esa casa.
            // Si un personaje no tiene foto, lo omito.

            for (const house in HPHouse) {
                console.log(house);
                const elementClass = '#' + house.toLowerCase();
                console.log(elementClass);
                const element = document.querySelector(elementClass);
                console.log(element);
                if (!element) return;
                const characters = await ApiService.getCharactersByHouse(house);
                element.innerHTML = characters.filter(i => i.image).slice(0, 15).map(i => `
                    <div>
                        <img src="${i.image}"></img>
                    </div>
                `).join('');
            }

        } catch (e) {
            charactersContainer.textContent = 'Error al obtener los personajes';
        }

    }

}
const teams = new Teams();

// No puedo acceder a una propiedad PRIVADA fuera de la clase.
// teams.printChracters();