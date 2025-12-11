import { Page } from './Page';
import { FormValidator } from '../lib/FormValidator';

class Contact extends Page {

    private readonly validator: FormValidator;

    constructor() {
        super();
        // Nos lo tenemos que declarar en el constructor porque es una variable
        // readonly y que no puede ser nula.
        this.validator = new FormValidator();
    }

    bootstrap(): void | Promise<void> {
        console.log('Página Contact Cargada');
        this.handleSubmit();
    }

    destroy(): void | Promise<void> {
        console.log('Saliendo de la página');
    }

    private handleSubmit() {
        const form = document.getElementById('contactForm') as HTMLFormElement;
        form?.addEventListener('submit', (event) => {
            event.preventDefault();
            this.validator.printErrors(form);
        });
    }

}
new Contact();