
export class CharacterModal extends HTMLElement {

    private shadow: ShadowRoot;

    constructor() {
        super();
        // Aislamos el shadow del componente
        this.shadow = this.attachShadow({ mode: 'open' });

        this.shadow.innerHTML = `
            <style>
                /* Estos estilos estan encapsulados */
                p {
                    color: red;
                    font-weight: bolder;
                }
            </style>
            <p>Soy un parrafo</p>
        `;

        // this.textContent =   'Soy un CharacterModal custom';
    }

    connectedCallback() {
        console.log('Connected: añadido al DOM');
    }

    disconnectedCallback() {
        console.log('Disconnected: eliminado del dom');
    }

    /**
 * Estilos encapsulados del Web Component
 */
    private getStyles(): string {
        return `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                :host {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 9999;
                }

                :host(.visible) {
                    display: block;
                }

                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.75);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 1rem;
                    animation: fadeIn 0.3s ease-in-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .modal-container {
                    background: #f5f5f5;
                    border-radius: 1rem;
                    max-width: 600px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    animation: slideUp 0.3s ease-out;
                    
                    /* Ocultar scrollbar en Webkit (Chrome, Safari, Edge) */
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none; /* IE y Edge antiguos */
                }

                .modal-container::-webkit-scrollbar {
                    display: none; /* Chrome, Safari, Opera */
                }

                @keyframes slideUp {
                    from {
                        transform: translateY(50px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .close-btn {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: rgba(0, 0, 0, 0.1);
                    border: none;
                    color: #333;
                    font-size: 2rem;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    z-index: 10;
                }

                .close-btn:hover {
                    background: rgba(0, 0, 0, 0.2);
                    transform: rotate(90deg);
                }

                .modal-content {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    padding: 2rem;
                }

                .character-image {
                    text-align: center;
                }

                .character-image img {
                    width: 200px;
                    height: 250px;
                    object-fit: cover;
                    border-radius: 0.5rem;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }

                .no-image {
                    width: 200px;
                    height: 250px;
                    background: rgba(0, 0, 0, 0.05);
                    border-radius: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(0, 0, 0, 0.4);
                    margin: 0 auto;
                }

                .character-info {
                    color: #333;
                }

                .character-info h2 {
                    font-size: 2rem;
                    margin-bottom: 1rem;
                    font-weight: bold;
                    text-align: center;
                    color: #c4941f;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
                }

                .house-badge {
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    border-radius: 2rem;
                    font-weight: bold;
                    font-size: 0.9rem;
                    margin-bottom: 1.5rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1rem;
                }

                .house-badge.gryffindor {
                    background: linear-gradient(135deg, #740001, #ae0001);
                    color: #d4af37;
                }

                .house-badge.slytherin {
                    background: linear-gradient(135deg, #1a472a, #2a623d);
                    color: #aaaaaa;
                }

                .house-badge.ravenclaw {
                    background: linear-gradient(135deg, #0e1a40, #222f5b);
                    color: #946b2d;
                }

                .house-badge.hufflepuff {
                    background: linear-gradient(135deg, #ecb939, #f0c75e);
                    color: #000000;
                }

                .info-grid {
                    display: grid;
                    gap: 1rem;
                }

                .info-item {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                    padding: 0.75rem;
                    background: rgba(0, 0, 0, 0.03);
                    border-radius: 0.5rem;
                    border-left: 3px solid #c4941f;
                }

                .info-item .label {
                    font-size: 0.85rem;
                    color: rgba(0, 0, 0, 0.5);
                    text-transform: uppercase;
                    letter-spacing: 0.05rem;
                    font-weight: 600;
                }

                .info-item .value {
                    font-size: 1rem;
                    color: #333;
                    text-transform: capitalize;
                }

                .info-item .value.alive {
                    color: #16a34a;
                    font-weight: bold;
                }

                .info-item .value.dead {
                    color: #dc2626;
                    font-weight: bold;
                }

                @media (max-width: 768px) {
                    .modal-container {
                        max-width: 95%;
                    }

                    .modal-content {
                        padding: 1.5rem;
                        gap: 1.5rem;
                    }

                    .character-info h2 {
                        font-size: 1.5rem;
                    }

                    .character-image img,
                    .no-image {
                        width: 150px;
                        height: 200px;
                    }
                }
            </style>
        `;
    }

}

// Con la api de custom elements hacemos disponible
// el selector dentro del html
customElements.define('character-modal', CharacterModal);