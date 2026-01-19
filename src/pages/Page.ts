// Clase que se encarga de controlar el ciclo de vida de una pagina
export abstract class Page {

    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.bootstrap();
        });

        window.addEventListener('beforeunload', () => {
            this.destroy();
        });
    }

    abstract bootstrap(): void | Promise<void>;

    abstract destroy(): void | Promise<void>;
}


// No podemos hacer un new
// de una clase abstracta
// const page = new Page();