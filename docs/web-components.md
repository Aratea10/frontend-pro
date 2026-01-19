# 🧩 Guía: Creación de Web Components con TypeScript - Modal de Personajes

> **Aprende a crear componentes web profesionales, encapsulados y reutilizables desde cero.**

---

## 📚 Índice

- [🧩 Guía: Creación de Web Components con TypeScript - Modal de Personajes](#-guía-creación-de-web-components-con-typescript---modal-de-personajes)
  - [📚 Índice](#-índice)
  - [📋 Descripción General](#-descripción-general)
  - [🎯 Objetivos de Aprendizaje](#-objetivos-de-aprendizaje)
  - [🤔 Parte 0: Teoría - ¿Por Qué Web Components? (30 min)](#-parte-0-teoría---por-qué-web-components-30-min)
    - [Las 3 Tecnologías Principales:](#las-3-tecnologías-principales)
    - [✅ Buenos casos de uso:](#-buenos-casos-de-uso)
    - [❌ Cuándo NO usarlos:](#-cuándo-no-usarlos)
      - [VS React/Vue](#vs-reactvue)
  - [🏗️ Arquitectura del Proyecto](#️-arquitectura-del-proyecto)
  - [📖 Parte 1: Fundamentos de Custom Elements (45 min)](#-parte-1-fundamentos-de-custom-elements-45-min)
    - [Pasos para crear un elemento:](#pasos-para-crear-un-elemento)
  - [📖 Parte 2: Shadow DOM - Encapsulación Real (60 min)](#-parte-2-shadow-dom---encapsulación-real-60-min)
  - [📖 Parte 3: Ciclo de Vida de Web Components (45 min)](#-parte-3-ciclo-de-vida-de-web-components-45-min)
  - [📖 Parte 4: Creando el CharacterModal - Estructura Base (60 min)](#-parte-4-creando-el-charactermodal---estructura-base-60-min)
    - [`src/ui/CharacterModal.ts`](#srcuicharactermodalts)
  - [📖 Parte 5: Implementando Métodos Públicos (45 min)](#-parte-5-implementando-métodos-públicos-45-min)
  - [📖 Parte 6: Patrón Factory (30 min)](#-parte-6-patrón-factory-30-min)
  - [📖 Parte 7: Renderizado del Modal (90 min)](#-parte-7-renderizado-del-modal-90-min)
  - [📖 Parte 8: Event Listeners (45 min)](#-parte-8-event-listeners-45-min)
  - [📖 Parte 9: Estilos Completos (90 min)](#-parte-9-estilos-completos-90-min)
  - [📖 Parte 10: Integración con la Página (60 min)](#-parte-10-integración-con-la-página-60-min)
  - [📖 Parte 11: Mejoras y Optimizaciones (45 min)](#-parte-11-mejoras-y-optimizaciones-45-min)
  - [📖 Parte 12: Testing y Debugging (30 min)](#-parte-12-testing-y-debugging-30-min)
  - [💡 Consejos para el Profesor](#-consejos-para-el-profesor)

---

## 📋 Descripción General

En esta lección, construirás un **Web Component profesional** desde cero:

- 🧱 **Conceptos fundamentales** de Web Components.
- 🔒 **Shadow DOM** para encapsulación total.
- 🛠️ **Custom Elements API**.
- 📘 **TypeScript** integration.
- 🎨 **Estilos encapsulados** y animaciones.
- 🏭 **Patrón Factory** para instanciación limpia.

**⏱️ Duración estimada:** 4-5 horas

---

## 🎯 Objetivos de Aprendizaje

1. Entender qué son los Web Components y cuándo usarlos.
2. Crear Custom Elements nativos.
3. Dominar el Shadow DOM.
4. Gestionar el ciclo de vida del componente.
5. Aplicar patrones de diseño (Factory).

---

## 🤔 Parte 0: Teoría - ¿Por Qué Web Components? (30 min)

Son un estándar web para crear elementos HTML personalizados.

### Las 3 Tecnologías Principales:
1. **Custom Elements:** Define tu propia etiqueta HTML (`<mi-componente>`).
2. **Shadow DOM:** Tu CSS y HTML viven en una "burbuja" aislada.
3. **HTML Templates:** Plantillas reutilizables.

### ✅ Buenos casos de uso:
- Design Systems.
- Componentes UI (Modales, Tooltips, Botones).
- Widgets embebidos (Mapas, Reproductores).

### ❌ Cuándo NO usarlos:
- Si necesitas soporte IE11 (sin polyfills pesados).
- Componentes triviales que no requieren aislamiento.

#### VS React/Vue
| Aspecto | Web Components | Framework Components |
| :--- | :--- | :--- |
| **Encapsulación** | Total (Shadow DOM) | CSS Modules/Scoped |
| **Reutilización** | Universal | Limitada al framework |
| **Performance** | Nativa | Virtual DOM overhead |

---

## 🏗️ Arquitectura del Proyecto

```text
src/
├── pages/
│   └── Teams.ts          # Página consumidora
├── ui/
│   └── CharacterModal.ts # Nuestro Web Component
├── services/
│   ├── HPApiService.ts   # Datos
│   └── hp.types.ts       # Interfaces
└── styles/
    └── teams.scss        # Estilos globales
```

---

## 📖 Parte 1: Fundamentos de Custom Elements (45 min)

### Pasos para crear un elemento:
1. Clase que extiende `HTMLElement`.
2. Registrar con `customElements.define()`.

```typescript
class MiElemento extends HTMLElement {
  constructor() {
    super(); // ⚠️ OBLIGATORIO
    this.textContent = 'Hola mundo';
  }
}
customElements.define('mi-elemento', MiElemento);
```

> [!TIP]
> Los nombres de Custom Elements **deben** contener un guión (`-`) para evitar colisiones con futuras etiquetas HTML nativas.

---

## 📖 Parte 2: Shadow DOM - Encapsulación Real (60 min)

El **Shadow DOM** es un sub-árbol del DOM que está acoplado a un elemento pero separado del DOM principal.

```typescript
this.shadow = this.attachShadow({ mode: 'open' });
this.shadow.innerHTML = `
  <style> p { color: red; } </style>
  <p>Este estilo NO afecta fuera</p>
`;
```

---

## 📖 Parte 3: Ciclo de Vida de Web Components (45 min)

Métodos reservados que el navegador llama automáticamente:

1. **`constructor()`**: Instanciación.
2. **`connectedCallback()`**: El elemento entra al DOM.
3. **`disconnectedCallback()`**: El elemento sale del DOM.
4. **`attributeChangedCallback()`**: Un atributo observado cambia.
5. **`adoptedCallback()`**: El elemento se mueve a otro documento.

---

## 📖 Parte 4: Creando el CharacterModal - Estructura Base (60 min)

### `src/ui/CharacterModal.ts`

```typescript
import { HPCharacter } from '../services/hp.types';

export class CharacterModal extends HTMLElement {
    private shadow: ShadowRoot;
    private character: HPCharacter | null = null;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.render();
    }

    private render(): void {
        // Lógica de renderizado
    }
}

customElements.define('character-modal', CharacterModal);
```

---

## 📖 Parte 5: Implementando Métodos Públicos (45 min)

Exponemos una API para controlar el componente desde fuera:

```typescript
public show(character: HPCharacter): void {
    this.character = character;
    this.render();
    this.classList.add('visible');
    document.body.style.overflow = 'hidden'; // Bloquear scroll
}

public close(): void {
    this.classList.remove('visible');
    document.body.style.overflow = '';
}
```

---

## 📖 Parte 6: Patrón Factory (30 min)

Para evitar el uso verboso de `document.createElement` y el casting manual:

```typescript
// En lugar de:
const modal = document.createElement('character-modal') as CharacterModal;

// Implementamos:
public static create(): CharacterModal {
    return document.createElement('character-modal') as CharacterModal;
}

// Uso:
const modal = CharacterModal.create();
```

---

## 📖 Parte 7: Renderizado del Modal (90 min)

Usamos **Template Literals** para generar el HTML dinámico:

```typescript
const { name, image } = this.character;

this.shadow.innerHTML = `
    ${this.getStyles()}
    <div class="modal-overlay">
        <div class="modal-container">
            <button class="close-btn">&times;</button>
            <img src="${image}" alt="${name}">
            <h2>${name}</h2>
            <!-- Más contenido -->
        </div>
    </div>
`;
```

---

## 📖 Parte 8: Event Listeners (45 min)

Es crucial gestionar los eventos correctamente para evitar **Memory Leaks**.

> [!WARNING]
> Si añades eventos en `render()`, asegúrate de no duplicarlos. Una mejor estrategia es crearlos una vez en el constructor o usar `connectedCallback`.

```typescript
private addEventListeners(): void {
    // Cerrar al clickar fuera
    this.shadow.querySelector('.modal-overlay')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) this.close();
    });
}
```

---

## 📖 Parte 9: Estilos Completos (90 min)

Selectores específicos de Shadow DOM:

- **`:host`**: El propio elemento `<character-modal>`.
- **`:host(.visible)`**: Estilos cuando tiene la clase `visible`.

```css
:host {
    display: none;
    position: fixed;
    z-index: 9999;
    /* ... */
}

:host(.visible) {
    display: block;
}
```

---

## 📖 Parte 10: Integración con la Página (60 min)

En `src/pages/Teams.ts`:

```typescript
// 1. Instanciar
const modal = CharacterModal.create();
document.body.appendChild(modal);

// 2. Usar evento delegado para abrir
document.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement;
    if (target.matches('.character-card')) {
        const char = await api.getCharacter(target.dataset.id);
        modal.show(char);
    }
});
```

---

## 📖 Parte 11: Mejoras y Optimizaciones (45 min)

1. **Loading State:** Mostrar un spinner mientras carga la imagen.
2. **Eventos Personalizados:** Notificar al exterior.

```typescript
this.dispatchEvent(new CustomEvent('modal-opened', {
    detail: { character },
    bubbles: true,
    composed: true // ¡Crucial para atravesar el Shadow DOM!
}));
```

3. **Atributos Observados:** Reaccionar a cambios en `theme="dark"`.

---

## 📖 Parte 12: Testing y Debugging (30 min)

- ✅ Verifica que `super()` esté en el constructor.
- ✅ Comprueba que los selectores del DOM busquen en `this.shadow`, NO en `document`.
- ✅ Asegúrate de limpiar listeners globales en `disconnectedCallback`.

---

## 💡 Consejos para el Profesor

- Demostrar visualmente la barrera del Shadow DOM en DevTools.
- Enfatizar el ciclo de vida con `console.log`.
- Explicar por qué los Frameworks modernos encapsulan esto pero Web Components es la base estándar.

---

<div align="center">

| **Información** | |
| :--- | :--- |
| **Autor** | Frontend Pro Course - Web Components Module |
| **Versión** | 1.0 (Diciembre 2025) |

</div>