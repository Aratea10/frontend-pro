import { Page } from './Page';

class Contact extends Page {

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
            const target = event.target;
            console.log(form.elements);
            this.printErrors(form);
        });
    }

    // TODO:
    // Crea un método, que para cada uno de los campos, nos muestre si es válido y que validityState no cumple
    // | campo | valid (true / false ) | errors (valueMissing)
    private printErrors(form: HTMLFormElement): void {
        const elements = form.elements;
        const errors: { name: string, valid: boolean, message: string }[] = [];
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            console.log(element);

            if (element instanceof HTMLInputElement ||
                element instanceof HTMLTextAreaElement ||
                element instanceof HTMLSelectElement
            ) {
                errors.push({
                    name: element.name,
                    valid: element.validationMessage.length === 0,
                    message: element.validationMessage
                })
            }
        }
        console.table(errors);
    }
}
new Contact();