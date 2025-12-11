class Home {

    constructor() {
        console.log('Home Instanciado');
        this.bootstrap();
    }

    private bootstrap(): void {
        this.initializeElemets();
    }

    private initializeElemets(): void {
        const days = document.getElementById('days');
        const hours = document.getElementById('hours');
        const minutes = document.getElementById('minutes');
        const seconds = document.getElementById('seconds');

        const now = new Date();
        // non-null assertion OJO Con esto
        // days!.innerText = now.getDate().toString();
        if (!days || !hours || !minutes || !seconds) return;
        days.innerText = now.getDate().toString();
        hours.innerText = now.getHours().toString();
        minutes.innerText = now.getMinutes().toString();
        seconds.innerText = now.getSeconds().toString();
    }

    // TODO:
    // El valor del contador se debe actualizar cada segundo

}
new Home();