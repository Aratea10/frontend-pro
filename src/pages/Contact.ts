import { Page } from './Page';

class Contact extends Page {

    bootstrap(): void | Promise<void> {
        console.log('Página Contact Cargada');
    }

    destroy(): void | Promise<void> {
        console.log('Saliendo de la página');
    }
}
new Contact();