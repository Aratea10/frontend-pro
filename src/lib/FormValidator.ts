export class FormValidator {

    public printErrors(form: HTMLFormElement): void {
        const elements = form.elements;
        const errors: { name: string, valid: boolean, message: string }[] = [];
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

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