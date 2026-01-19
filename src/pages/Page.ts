export abstract class Page {

    constructor() {
        this.bootstrap();
    }

    abstract bootstrap(): void | Promise<void>;
}


// No podemos hacer un new
// de una clase abstracta
// const page = new Page();