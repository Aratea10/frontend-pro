type ValidationType =
    | 'patternMismatch'
    | 'stepMismatch'
    | 'tooLong'
    | 'tooShort'
    | 'typeMismatch'
    | 'valueMissing';

// Añadimos el estado de validación del formulario
interface ValidationState extends ValidityState {
    valid: boolean;
}

type ErrorMessages = Record<ValidationType, string>;
// 0 -> 'hola', 1 -> 'mundo' .... Esto es un array normal.
// Map, Record: 'patternMismatch' -> 'No cumple el formato requerido'.
// let i const 
// const users = ['nauel', 'alex']; ..... users.push()

export class FormValidator {

    private readonly validatonTypes: ReadonlyArray<ValidationType> = [
        'patternMismatch',
        'stepMismatch',
        'tooLong',
        'tooShort',
        'typeMismatch',
        'valueMissing'
    ];

    private readonly errorMessages: ErrorMessages = {
        patternMismatch: 'Error en el patrón definido',
        stepMismatch: 'Valor numérico en un intervalo incorrecto',
        tooLong: 'Valor demasiado largo',
        tooShort: 'Valor demasiado corto',
        typeMismatch: 'El tipo no es el correcto',
        valueMissing: 'Campo requerido',
    };

    public getErrorMessages(validationState: ValidationState): string {
        if (validationState.valid) {
            return '';
        }

        return this.validatonTypes
            .filter(validationType => validationState[validationType])
            .map(validationType => this.errorMessages[validationType])
            .join(' ')
            .trim();
    }

    /**
     * Valida un elemento de un formulario HTML
     * @param element Elemento html a validar
     * @returns Mensaje de error o string vacio si es valido
     */
    public validateElement(element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): string {
        return this.getErrorMessages(element.validity as ValidationState);
    }

    public validateForm(form: HTMLFormElement): Map<string, string> {
        const elements = form.elements;
        const errors = new Map<string, string>();
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            if (element instanceof HTMLInputElement ||
                element instanceof HTMLTextAreaElement ||
                element instanceof HTMLSelectElement
            ) {
                const errorMessage = this.validateElement(element);
                if (errorMessage && element.name) {
                    errors.set(element.name, errorMessage);
                }
            }
        }
        return errors;
    }
}