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
        charactersContainer.textContent = 'Cargando...';

        try {

            // const apiService = new ApiService();
            // const characters = apiService.getCharacters();
            // Como es estático, no necesito una instáncia de clase, puedo llamar al método directamente de la clase.
            const characters = await ApiService.getCharacters();

            characters[1].house = 'Gryffindor';

            charactersContainer.innerHTML = characters.slice(0, 15).map(i => `
                <div>
                    <strong>${i.name}</strong>
                    <p>Casa: ${i.house}</p>
                    <img src="${i.image}"></img>
                </div>
            `).join('');
            // TODO: pintar los elementos en divs individuales que contengan el nombre, la casa y la imagen. No hacen falta estilos.

            // console.table(
            //     characters.filter( i => i.hogwartsStudent ).map( (i) => ({ id: i.id, name: i.name, house: i.house, actor: i.actor, patronus: i.patronus, length: i.wand.length?.toFixed(0) }))
            // );
        } catch (e) {
            charactersContainer.textContent = 'Error al obtener los personajes';
        }

    }

}
const teams = new Teams();

// No puedo acceder a una propiedad PRIVADA fuera de la clase.
// teams.printChracters();