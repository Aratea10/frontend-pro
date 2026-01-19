export type ToastType = 'success' | 'info' | 'error' | 'warning';

export interface ToastOptions {
    duration?: number;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export class Toast {

    private container: HTMLDivElement;
    private readonly defaultDuration: number = 3000;
    private readonly defaultPosition: string = 'top-right';

    constructor() {
        this.container = document.createElement('div');
        this.container.className = `toast-container toast-${this.defaultPosition}`;
        document.body.appendChild(this.container);
    }

    // TODO:
    // crea los métodos: error, warning, success y info para crear toast predefinidos recibiendo solo el message

    public show(
        message: string,
        type: ToastType = 'info',
        duration: number = this.defaultDuration
    ): void {
        const toast = this.createToast(message, type);

        this.container.appendChild(toast);

        // Lanzamos la animación
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // Toast Element
    // El toast container debe tener la clase "show"
    // <div class="toast toast-{type 'success'}">
    // <span class="toast-icon">✅</span>
    // <span class="toast-message">Message</span>
    // </div>
    // TODO: crea una función que dinámicamente cree un demoToast
    private createToast(message: string, type: ToastType): HTMLDivElement {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const iconSpan = document.createElement('span');
        iconSpan.className = 'toast-icon';
        iconSpan.textContent = this.getIcon(type);

        const messageSpan = document.createElement('span');
        messageSpan.className = 'toast-message';
        messageSpan.textContent = message;

        toast.appendChild(iconSpan);
        toast.appendChild(messageSpan);

        return toast;
    }

    private getIcon(type: ToastType): string {
        const icons: Record<ToastType, string> = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️',
        };
        return icons[type];
  }
}