import { DateTime } from 'luxon';
import { Page } from './Page';

interface CountdownElements {
    days: HTMLElement;
    hours: HTMLElement;
    minutes: HTMLElement;
    seconds: HTMLElement;
}

class Home extends Page {

    private coundownElements: CountdownElements | null = null;
    private countdownInterval: number | null = null;

    private readonly TARGET_MONTH = 11; // En Date() los meses son en index 0, en Luxon los meses son en index 1
    private readonly TARGET_DAY = 11;


    bootstrap(): void {
        this.initializeElemets();
        if (this.coundownElements) {
            this.startCountdown();
        }
    }

    destroy(): void | Promise<void> {
        if (!this.countdownInterval) return;
        clearInterval(this.countdownInterval);
    }

    private getNextEventDate(): DateTime {
        const now = DateTime.now().setZone('Europe/Madrid');
        let targetYear = now.year;

        const eventThisYear = DateTime.local(
            targetYear,
            this.TARGET_MONTH,
            this.TARGET_DAY,
            { zone: 'Europe/Madrid' }
        ).startOf('day');

        if (now > eventThisYear) {
            targetYear++;
        }

        return DateTime.local(
            targetYear,
            this.TARGET_MONTH,
            this.TARGET_DAY,
            { zone: 'Europe/Madrid' }
        ).startOf('day');
    }

    private calculateTimeRemaning(target: DateTime): { days: number, hours: number, minutes: number, seconds: number } {
        const now = DateTime.now().setZone('Europe/Madrid');
        const diff = target.diff(now, ['days', 'hours', 'minutes', 'seconds']);

        return {
            days: Math.floor(diff.days),
            hours: Math.floor(diff.hours),
            minutes: Math.floor(diff.minutes),
            seconds: Math.floor(diff.seconds),
        }
    }

    private startCountdown(): void {
        const targetDate = this.getNextEventDate();// es la fecha objetivo;

        setInterval(() => {

            // Calcular distancia
            const timeRemaning = this.calculateTimeRemaning(targetDate);

            // Pintar distancia
            this.updateCountdownDisplay(timeRemaning);

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

    private updateCountdownDisplay(timeRemaning: { days: number, hours: number, minutes: number, seconds: number }): void {
        if (!this.coundownElements) return;
        const { days, hours, minutes, seconds } = this.coundownElements;
        days.innerText = timeRemaning.days.toString();
        hours.innerText = timeRemaning.hours.toString();
        minutes.innerText = timeRemaning.minutes.toString();
        seconds.innerText = timeRemaning.seconds.toString();
    }

}
new Home();