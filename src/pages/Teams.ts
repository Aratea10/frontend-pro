import { ApiService } from '../services/ApiService';
import { HPCharacter, HPHouse } from '../services/hp.types';
import { HPApiService } from '../services/HPApiService';
import { CharacterModal } from '../ui/CharacterModal';
import { Page } from './Page';


class Teams extends Page {

    private modal: CharacterModal | null = null;

    // constructor() {
    //      en POO si implementamos un constructor en la clase hija
    //      debe llamar siempre a super() que es el constructor del padre.
    //     super();
    //     console.log('Teams instanciado');
    //     this.bootstrap();
    // }

    async bootstrap(): Promise<void> {
        this.modal = CharacterModal.create();
        document.body.appendChild(this.modal);

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
                try {
                    const character = await HPApiService.getCharacter(id);
                    // Mostrar el modal con la información del personaje
                    if (this.modal) {
                        this.modal.show(character);
                    }
                } catch (error) {
                    console.error('Error al cargar el personaje:', error);
                }
            }
        });
    }

    private printElement(characters: HPCharacter[], elementRef: string): void {
        // TODO: debemos pintar estos elementos dentro del div de su "house";
        // TIP: hay que añadir un elemento addicional desde TS por cada imagen.
        const element = document.querySelector(elementRef);
        if (!element) return;
        element.innerHTML = characters.filter(i => i.image).slice(0, 15).map(i => `
            <img 
                src="${i.image}" 
                data-id="${i.id}" 
                class="hp-character" 
                alt="${i.name}"
                title="Click para ver más información"
            ></img>
        `).join('');
    }

}
new Teams();

// No puedo acceder a una propiedad PRIVADA fuera de la clase.
// teams.printChracters();