import { Page } from './Page';
import { FormValidator } from '../lib/FormValidator';

class Contact extends Page {

    private readonly validator: FormValidator;
    private readonly formId: string = 'contactForm';
    private formElement: HTMLFormElement | null = null;

    constructor() {
        super();
        // Nos lo tenemos que declarar en el constructor porque es una variable
        // readonly y que no puede ser nula.
        this.validator = new FormValidator();
    }

    bootstrap(): void | Promise<void> {
        console.log('Página Contact Cargada');
        this.initializeElements();
        this.listenSubmit();
        this.listenRealTimeValidation();
    }

    destroy(): void | Promise<void> {
        console.log('Saliendo de la página');
    }

    private initializeElements(): void {
        this.formElement = document.getElementById(this.formId) as HTMLFormElement;
    }

    private listenSubmit(): void {
        this.formElement?.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.handleSubmit();
        });
    }

    private listenRealTimeValidation(): void {
        const fields = this.formElement?.querySelectorAll('input, textarea, select');

        fields?.forEach(field => {
            if (
                field instanceof HTMLInputElement ||
                field instanceof HTMLTextAreaElement ||
                field instanceof HTMLSelectElement
            ) {
                // 
                field.addEventListener('blur', () => {
                    // este evento se disparara al perder el focus.
                    // Podemos validar un elemento en concreto y pintar su error?
                })
                field.addEventListener('input', () => {
                    if (field.validity.valid) {
                        this.clearFieldError(field);
                    }
                })
            }
        })
    }

    private clearFieldError(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): void {
        const errorSpan = document.querySelector(`.${field.name}-error-message`) as HTMLSpanElement;
        if (errorSpan) {
            errorSpan.textContent = '';
            errorSpan.classList.remove('show');
        }
        field.classList.remove('invalid');
    }

    private handleSubmit(): void {
        if (!this.formElement) return;

        const errors = this.validator.validateForm(this.formElement);
        const isValid = errors.size === 0;

        if (!isValid) {
            errors.forEach((message, fieldName) => {
                const field = this.formElement?.querySelector(`[name=${fieldName}]`) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
                if (field) {
                    this.showFieldError(field, message);
                }

            });
        }
    }

    private showFieldError(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, message: string): void {
        const errorSpan = document.querySelector(`.${field.name}-error-message`) as HTMLSpanElement;
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.classList.add('show');
        }
        field.classList.add('invalid');
    }

    // TODO: en caso de error, mostrar el error en su label correspondiente
    // OJO: hay que añadir la clase show

}
new Contact();