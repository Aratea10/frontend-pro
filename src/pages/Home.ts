interface CountdownElements {
    days: HTMLElement;
    hours: HTMLElement;
    minutes: HTMLElement;
    seconds: HTMLElement;
}

class Home {

    private coundownElements: CountdownElements | null = null;

    constructor() {
        console.log('Home Instanciado');
        this.bootstrap();
    }

    private bootstrap(): void {
        this.initializeElemets();
        setInterval(() => {
            this.printDateToElements();
        }, 1000);
    }

    private initializeElemets(): void {
        const days = document.getElementById('days');
        const hours = document.getElementById('hours');
        const minutes = document.getElementById('minutes');
        const seconds = document.getElementById('seconds');

        // non-null assertion OJO Con esto
        // days!.innerText = now.getDate().toString();
        if (!days || !hours || !minutes || !seconds) return;
        this.coundownElements = { days, hours, minutes, seconds };
    }

    private printDateToElements(): void {
        if (!this.coundownElements) return;
        const { days, hours, minutes, seconds } = this.coundownElements;
        const now = new Date();
        days.innerText = now.getDate().toString();
        hours.innerText = now.getHours().toString();
        minutes.innerText = now.getMinutes().toString();
        seconds.innerText = now.getSeconds().toString();
    }

    // TODO:
    // El valor del contador se debe actualizar cada segundo

}
new Home();