# Guía: Creación de Web Components con TypeScript - Modal de Personajes

## 📋 Descripción General

En esta lección, los alumnos aprenderán a crear un Web Component profesional desde cero:

- Conceptos fundamentales de Web Components
- Shadow DOM para encapsulación completa
- Custom Elements API
- Integración con TypeScript
- Estilos encapsulados y animaciones
- Patrón Factory para instanciación

**Duración estimada:** 4-5 horas

---

## 🎯 Objetivos de Aprendizaje

Al finalizar esta lección, los alumnos serán capaces de:

1. Entender qué son los Web Components y cuándo usarlos
2. Crear Custom Elements con la API nativa del navegador
3. Utilizar Shadow DOM para encapsulación
4. Integrar Web Components con TypeScript
5. Gestionar el ciclo de vida de un Web Component
6. Crear componentes UI reutilizables y mantenibles
7. Aplicar el patrón Factory para mejor API

---

## 📚 Conocimientos Previos Necesarios

- HTML, CSS y JavaScript intermedio
- TypeScript básico (clases, interfaces, tipos)
- Conceptos de POO (herencia, encapsulación)
- DOM manipulation
- Eventos del navegador
- Async/await y Promises

---

## 🤔 Parte 0: Teoría - ¿Por Qué Web Components? (30 min)

### ¿Qué son los Web Components?

Los Web Components son un conjunto de tecnologías estándar del navegador que permiten crear elementos HTML personalizados y reutilizables.

**Tres tecnologías principales:**

1. **Custom Elements**: Define nuevos elementos HTML
2. **Shadow DOM**: Encapsula estilos y estructura
3. **HTML Templates**: Plantillas reutilizables (opcional)

### ¿Cuándo Usar Web Components?

✅ **Buenos casos de uso:**

- Componentes UI reutilizables (modales, tooltips, dropdowns)
- Widgets independientes del framework
- Design systems
- Micro-frontends
- Componentes que necesitan encapsulación total

❌ **Cuándo NO usarlos:**

- Ya estás usando React/Vue/Angular (usa sus componentes nativos)
- Necesitas soporte IE11 (sin polyfills)
- Componentes muy simples que no requieren encapsulación

### Ventajas vs. Componentes de Framework

| Aspecto                  | Web Components                 | React/Vue Components      |
|------------------------- |----------------                |----------------------     |
| **Encapsulación**        | Total (Shadow DOM)             | CSS Modules / Scoped CSS  |
| **Reutilización**        | Entre proyectos/frameworks     | Dentro del framework      |
| **Curva de aprendizaje** | API nativa, más verboso        | Abstracciones más simples |
| **Performance**          | Nativo del navegador           | Virtual DOM overhead      |
| **Ecosistema**           | Limitado                       | Muy amplio                |
| **Compatibilidad**       | Todos los navegadores modernos | Requiere transpilación    |

### 💡 Ejemplo en la Industria

```typescript
// Google usa Web Components en sus productos:
<google-map api-key="..."></google-map>
<youtube-player video-id="..."></youtube-player>

// Adobe Spectrum Design System
<sp-button variant="primary">Click me</sp-button>

// GitHub usa Web Components
<relative-time datetime="2025-12-04">4 Dec 2025</relative-time>
```

---

## 🏗️ Arquitectura del Proyecto

```text
src/
├── pages/
│   └── Teams.ts          # Página que usa el modal
├── ui/
│   └── CharacterModal.ts # Web Component del modal
├── services/
│   ├── HPApiService.ts   # Servicio API
│   └── hp.types.ts       # Tipos TypeScript
└── styles/
    └── teams.scss        # Estilos de la página
```

---

## 📖 Parte 1: Fundamentos de Custom Elements (45 min)

### Teoría: Custom Elements API

Para crear un Custom Element necesitas:

1. Una clase que extienda `HTMLElement`
2. Registrar el elemento con `customElements.define()`
3. Usar el elemento en HTML

### 💻 Ejemplo Básico

```typescript
// Paso 1: Crear la clase
class MiElemento extends HTMLElement {
    constructor() {
        super(); // IMPORTANTE: siempre llamar a super()
        this.textContent = '¡Hola desde mi elemento!';
    }
}

// Paso 2: Registrar el elemento
customElements.define('mi-elemento', MiElemento);

// Paso 3: Usar en HTML
// <mi-elemento></mi-elemento>
```

### 🎓 Ejercicio 1: Tu Primer Web Component

**Objetivo:** Crear un componente simple que muestre un contador

**Instrucciones:**

1. Crea un archivo `src/ui/SimpleCounter.ts`
2. Crea una clase `SimpleCounter` que extienda `HTMLElement`
3. En el constructor, añade un botón y un contador
4. Registra el componente como `simple-counter`
5. Úsalo en `teams.html`

**Código inicial:**

```typescript
export class SimpleCounter extends HTMLElement {
    private count: number = 0;

    constructor() {
        super();
        
        // Crear elementos
        this.innerHTML = `
            <div>
                <p>Contador: <span id="count">0</span></p>
                <button id="increment">Incrementar</button>
            </div>
        `;
        
        // Añadir evento
        const button = this.querySelector('#increment');
        button?.addEventListener('click', () => {
            this.count++;
            const countSpan = this.querySelector('#count');
            if (countSpan) {
                countSpan.textContent = String(this.count);
            }
        });
    }
}

customElements.define('simple-counter', SimpleCounter);
```

**Uso en HTML:**

```html
<simple-counter></simple-counter>
```

### 🤔 Preguntas de Reflexión

1. ¿Qué sucede si olvidas llamar a `super()`?
2. ¿Por qué el nombre del componente debe tener un guión?
3. ¿Qué pasa si intentas registrar el mismo nombre dos veces?

**Respuestas:**

1. Error: "Must call super constructor in derived class"
2. Para evitar conflictos con elementos HTML nativos
3. Error: "DOMException: Failed to execute 'define'"

---

## 📖 Parte 2: Shadow DOM - Encapsulación Real (60 min)

### Teoría: ¿Qué es Shadow DOM?

Shadow DOM crea un árbol DOM "oculto" dentro de tu elemento:

- Los estilos externos NO afectan al Shadow DOM
- Los estilos del Shadow DOM NO afectan al exterior
- Los IDs y clases están aislados

**Visualización:**

```text
┌─ Light DOM (página normal) ─────────────┐
│                                          │
│  <my-component>                          │
│    ├─ #shadow-root (modo: open/closed)  │
│    │   └─ Shadow DOM (encapsulado)      │
│    │       ├─ <style>                    │
│    │       └─ <div class="content">     │
│    └─ (No visible desde fuera)          │
│  </my-component>                         │
│                                          │
└──────────────────────────────────────────┘
```

### 💻 Implementación: Shadow DOM

```typescript
export class MyComponent extends HTMLElement {
    private shadow: ShadowRoot;

    constructor() {
        super();
        
        // Crear Shadow DOM
        this.shadow = this.attachShadow({ mode: 'open' });
        
        // Añadir contenido al Shadow DOM
        this.shadow.innerHTML = `
            <style>
                /* Estilos encapsulados */
                p {
                    color: red;
                    font-weight: bold;
                }
            </style>
            <p>Este texto es ROJO</p>
        `;
    }
}

customElements.define('my-component', MyComponent);
```

### 🎓 Ejercicio 2: Convertir el Contador a Shadow DOM

**Instrucciones:**

1. Modifica `SimpleCounter` para usar Shadow DOM
2. Añade estilos encapsulados
3. Comprueba que los estilos no afectan al exterior

**Código solución:**

```typescript
export class SimpleCounter extends HTMLElement {
    private shadow: ShadowRoot;
    private count: number = 0;

    constructor() {
        super();
        
        this.shadow = this.attachShadow({ mode: 'open' });
        
        this.shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 1rem;
                    border: 2px solid #4CAF50;
                    border-radius: 8px;
                    font-family: Arial, sans-serif;
                }
                
                button {
                    background: #4CAF50;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                }
                
                button:hover {
                    background: #45a049;
                }
            </style>
            <div>
                <p>Contador: <span id="count">0</span></p>
                <button id="increment">Incrementar</button>
            </div>
        `;
        
        // Nota: Ahora buscamos en this.shadow
        const button = this.shadow.querySelector('#increment');
        button?.addEventListener('click', () => {
            this.count++;
            const countSpan = this.shadow.querySelector('#count');
            if (countSpan) {
                countSpan.textContent = String(this.count);
            }
        });
    }
}
```

### 🔍 Inspeccionar Shadow DOM

**En DevTools:**

1. Abre el inspector
2. Busca tu componente
3. Verás `#shadow-root` expandible
4. Puedes inspeccionar y modificar el contenido

---

## 📖 Parte 3: Ciclo de Vida de Web Components (45 min)

### Teoría: Lifecycle Callbacks

Los Web Components tienen métodos especiales que se ejecutan en momentos específicos:

```typescript
class MyComponent extends HTMLElement {
    // 1. Se ejecuta al crear la instancia
    constructor() {
        super();
        console.log('Constructor: Componente creado');
    }
    
    // 2. Se ejecuta cuando se añade al DOM
    connectedCallback() {
        console.log('Connected: Añadido al DOM');
    }
    
    // 3. Se ejecuta cuando se elimina del DOM
    disconnectedCallback() {
        console.log('Disconnected: Eliminado del DOM');
    }
    
    // 4. Se ejecuta cuando se mueve en el DOM
    adoptedCallback() {
        console.log('Adopted: Movido a nuevo documento');
    }
    
    // 5. Se ejecuta cuando cambia un atributo observado
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log(`Attribute ${name} cambió de ${oldValue} a ${newValue}`);
    }
    
    // 6. Define qué atributos observar
    static get observedAttributes() {
        return ['color', 'size'];
    }
}
```

### 📊 Orden de Ejecución

```text
Crear instancia → constructor()
       ↓
Añadir al DOM → connectedCallback()
       ↓
Cambiar atributo → attributeChangedCallback()
       ↓
Eliminar del DOM → disconnectedCallback()
```

### 🎓 Ejercicio 3: Implementar Lifecycle Hooks

**Objetivo:** Crear un componente que reaccione a cambios en sus atributos

```typescript
export class ColorBox extends HTMLElement {
    private shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.render();
    }

    static get observedAttributes() {
        return ['color', 'size'];
    }

    connectedCallback() {
        console.log('ColorBox añadido al DOM');
    }

    disconnectedCallback() {
        console.log('ColorBox eliminado del DOM');
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log(`Atributo ${name}: ${oldValue} → ${newValue}`);
        this.render();
    }

    private render() {
        const color = this.getAttribute('color') || 'blue';
        const size = this.getAttribute('size') || '100px';
        
        this.shadow.innerHTML = `
            <style>
                .box {
                    width: ${size};
                    height: ${size};
                    background-color: ${color};
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }
            </style>
            <div class="box"></div>
        `;
    }
}

customElements.define('color-box', ColorBox);
```

**Uso:**

```html
<color-box color="red" size="150px"></color-box>

<script>
    // Cambiar atributo dinámicamente
    const box = document.querySelector('color-box');
    setTimeout(() => {
        box.setAttribute('color', 'green');
    }, 2000);
</script>
```

---

## 📖 Parte 4: Creando el CharacterModal - Estructura Base (60 min)

### Contexto del Proyecto

Vamos a crear un modal que muestre información de personajes de Harry Potter cuando el usuario haga click en sus imágenes.

**Requisitos:**

- Modal con fondo oscuro (overlay)
- Información del personaje: nombre, imagen, casa, actor, etc.
- Cerrar con botón X, click fuera, o tecla ESC
- Animaciones suaves de entrada/salida
- Estilos completamente encapsulados

### 💻 Paso 4.1: Estructura Base y Tipos

**Archivo:** `src/ui/CharacterModal.ts`

```typescript
import { HPCharacter } from '../services/hp.types';

/**
 * Web Component para mostrar un modal con información del personaje de Harry Potter
 * Utiliza Shadow DOM para encapsulación completa de estilos y estructura
 */
export class CharacterModal extends HTMLElement {
    private shadow: ShadowRoot;
    private character: HPCharacter | null = null;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.render();
    }

    /**
     * Renderiza el contenido del modal
     */
    private render(): void {
        if (!this.character) {
            this.shadow.innerHTML = this.getStyles();
            return;
        }

        // TODO: Implementar renderizado con personaje
    }

    /**
     * Estilos encapsulados del Web Component
     */
    private getStyles(): string {
        return `
            <style>
                /* TODO: Implementar estilos */
            </style>
        `;
    }
}

// Registrar el Web Component
customElements.define('character-modal', CharacterModal);
```

### 🎓 Ejercicio 4: Estructura Inicial

**Instrucciones:**

1. Crea el archivo `CharacterModal.ts`
2. Implementa la estructura base
3. Importa el tipo `HPCharacter`
4. Registra el componente

**Preguntas:**

- ¿Por qué `character` es `null` al principio?
- ¿Qué hace el método `render()`?
- ¿Por qué separamos `getStyles()` en un método aparte?

---

## 📖 Parte 5: Implementando Métodos Públicos (45 min)

### Teoría: API Pública del Componente

Un buen Web Component debe tener una API clara:

- Métodos públicos para interactuar desde fuera
- Propiedades privadas para estado interno
- Eventos personalizados para comunicación

### 💻 Paso 5.1: Métodos show() y close()

```typescript
/**
 * Método público para mostrar el modal con un personaje
 */
public show(character: HPCharacter): void {
    this.character = character;
    this.render();
    this.classList.add('visible');
    document.body.style.overflow = 'hidden'; // Evitar scroll del body
}

/**
 * Método público para cerrar el modal
 */
public close(): void {
    this.classList.remove('visible');
    document.body.style.overflow = ''; // Restaurar scroll
}
```

### 🎓 Ejercicio 5: Implementar Métodos Públicos

**Instrucciones:**

1. Añade los métodos `show()` y `close()`
2. ¿Por qué modificamos `document.body.style.overflow`?
3. ¿Qué hace `classList.add('visible')`?

**Respuestas:**

- Evitar que el usuario pueda hacer scroll en el fondo cuando el modal está abierto
- Añade una clase CSS que controlaremos con `:host(.visible)`

---

## 📖 Parte 6: Patrón Factory (30 min)

### Teoría: Factory Method Pattern

En lugar de que el usuario tenga que hacer:

```typescript
const modal = document.createElement('character-modal') as CharacterModal;
```

Podemos ofrecer una API más limpia:

```typescript
const modal = CharacterModal.create();
```

### 💻 Implementación

```typescript
/**
 * Método estático para crear una instancia del modal
 * Alternativa más limpia al createElement + casting
 */
public static create(): CharacterModal {
    return document.createElement('character-modal') as CharacterModal;
}
```

### 🎓 Ejercicio 6: Implementar Factory Method

**Instrucciones:**

1. Añade el método estático `create()`
2. Modifica `Teams.ts` para usarlo
3. Compara ambas formas de creación

**Ventajas:**
✅ API más limpia y expresiva
✅ Encapsulación del nombre del elemento
✅ Type-safety garantizado
✅ Fácil de cambiar implementación interna

---

## 📖 Parte 7: Renderizado del Modal (90 min)

### 💻 Paso 7.1: Estructura HTML del Modal

```typescript
private render(): void {
    if (!this.character) {
        this.shadow.innerHTML = this.getStyles();
        return;
    }

    const { name, image, house, actor, dateOfBirth, patronus, species, ancestry, wand, alive } = this.character;

    this.shadow.innerHTML = `
        ${this.getStyles()}
        <div class="modal-overlay">
            <div class="modal-container">
                <button class="close-btn" aria-label="Cerrar modal">&times;</button>
                
                <div class="modal-content">
                    <div class="character-image">
                        ${image ? `<img src="${image}" alt="${name}">` : '<div class="no-image">Sin imagen</div>'}
                    </div>
                    
                    <div class="character-info">
                        <h2>${name}</h2>
                        
                        ${house ? `<div class="house-badge ${house.toLowerCase()}">${house}</div>` : ''}
                        
                        <div class="info-grid">
                            ${actor ? `
                                <div class="info-item">
                                    <span class="label">Actor:</span>
                                    <span class="value">${actor}</span>
                                </div>
                            ` : ''}
                            
                            ${species ? `
                                <div class="info-item">
                                    <span class="label">Especie:</span>
                                    <span class="value">${species}</span>
                                </div>
                            ` : ''}
                            
                            ${patronus ? `
                                <div class="info-item">
                                    <span class="label">Patronus:</span>
                                    <span class="value">${patronus}</span>
                                </div>
                            ` : ''}
                            
                            <div class="info-item">
                                <span class="label">Estado:</span>
                                <span class="value ${alive ? 'alive' : 'dead'}">
                                    ${alive ? '✓ Vivo' : '✕ Fallecido'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    this.addEventListeners();
}
```

### 🎓 Ejercicio 7: Template Strings Condicionales

**Objetivo:** Entender el renderizado condicional con template strings

**Instrucciones:**

1. Implementa el método `render()` paso a paso
2. Comienza solo con nombre e imagen
3. Añade información condicional (actor, patronus, etc.)
4. ¿Por qué usamos el operador ternario `? :`?
5. ¿Qué hace `${variable}` en un template string?

**Ejercicio adicional:**

Añade más campos del personaje:
- Fecha de nacimiento
- Ancestría (ancestry)
- Información de la varita (wand)

```typescript
${dateOfBirth ? `
    <div class="info-item">
        <span class="label">Fecha de nacimiento:</span>
        <span class="value">${dateOfBirth}</span>
    </div>
` : ''}

${wand.wood || wand.core ? `
    <div class="info-item">
        <span class="label">Varita:</span>
        <span class="value">
            ${wand.wood ? `${wand.wood}` : ''}
            ${wand.core ? `, ${wand.core}` : ''}
            ${wand.length ? `, ${wand.length}"` : ''}
        </span>
    </div>
` : ''}
```

---

## 📖 Parte 8: Event Listeners (45 min)

### 💻 Implementación de Eventos

```typescript
/**
 * Agrega event listeners al modal
 */
private addEventListeners(): void {
    const closeBtn = this.shadow.querySelector('.close-btn');
    const overlay = this.shadow.querySelector('.modal-overlay');

    // Cerrar con botón X
    closeBtn?.addEventListener('click', () => this.close());
    
    // Cerrar al hacer click fuera del modal
    overlay?.addEventListener('click', (e) => {
        if (e.target === overlay) {
            this.close();
        }
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.classList.contains('visible')) {
            this.close();
        }
    });
}
```

### 🎓 Ejercicio 8: Implementar Event Listeners

**Instrucciones:**

1. Implementa el método `addEventListeners()`
2. Prueba las tres formas de cerrar el modal
3. ¿Por qué verificamos `e.target === overlay`?
4. ¿Por qué verificamos `this.classList.contains('visible')`?

**Respuestas:**

- Para evitar cerrar si hacen click en el contenido del modal
- Para evitar cerrar otros modales que puedan estar abiertos

**⚠️ Problema Potencial:**

Los event listeners se añaden cada vez que se llama `render()`. Esto puede causar memory leaks.

**Solución:**

```typescript
private keydownHandler: (e: KeyboardEvent) => void;

constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    
    // Crear handler una sola vez
    this.keydownHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && this.classList.contains('visible')) {
            this.close();
        }
    };
    
    this.render();
}

connectedCallback() {
    document.addEventListener('keydown', this.keydownHandler);
}

disconnectedCallback() {
    document.removeEventListener('keydown', this.keydownHandler);
}
```

---

## 📖 Parte 9: Estilos Completos (90 min)

### Teoría: CSS en Shadow DOM

En Shadow DOM tenemos selectores especiales:

- `:host` - El elemento contenedor (el custom element)
- `:host(.clase)` - El host con una clase específica
- `:host-context()` - Basado en ancestros
- `::slotted()` - Para contenido proyectado

### 💻 Paso 9.1: Estilos Base

```typescript
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
        </style>
    `;
}
```

### 🎓 Ejercicio 9: Estilos del Overlay

**Instrucciones:**

1. Implementa los estilos del `:host` y `.modal-overlay`
2. Crea la animación `fadeIn`
3. Explica por qué usamos `position: fixed`
4. ¿Qué hace `z-index: 9999`?

---

### 💻 Paso 9.2: Estilos del Container

```typescript
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
    
    /* Ocultar scrollbar */
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
```

### 🎓 Ejercicio 10: Animaciones y Transiciones

**Instrucciones:**

1. Implementa la animación `slideUp`
2. Añade el efecto hover al botón de cerrar
3. Experimenta con diferentes valores de animación
4. ¿Cómo ocultar la scrollbar en diferentes navegadores?

**Desafío:**
Crea una animación de salida cuando se cierra el modal:

```typescript
public close(): void {
    // Añadir clase de animación
    this.classList.add('closing');
    
    // Esperar a que termine la animación
    setTimeout(() => {
        this.classList.remove('visible', 'closing');
        document.body.style.overflow = '';
    }, 300);
}
```

---

### 💻 Paso 9.3: Estilos del Contenido

```typescript
.character-image img {
    width: 200px;
    height: 250px;
    object-fit: cover;
    border-radius: 0.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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
```

### 🎓 Ejercicio 11: Badges Temáticos

**Instrucciones:**

1. Implementa los estilos de las casas de Hogwarts
2. Usa gradientes para darles profundidad
3. Asegúrate de que los colores sean fieles al universo HP

**Colores oficiales de las casas:**

- Gryffindor: Rojo y dorado
- Slytherin: Verde y plateado
- Ravenclaw: Azul y bronce
- Hufflepuff: Amarillo y negro

---

### 💻 Paso 9.4: Grid de Información

```typescript
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
```

### 🎓 Ejercicio 12: Layout Responsivo

**Instrucciones:**

1. Implementa el grid de información
2. Añade estilos para indicadores de estado (vivo/muerto)
3. Experimenta con diferentes layouts del grid

**Desafío - Grid Responsivo:**

```typescript
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

    .character-image img {
        width: 150px;
        height: 200px;
    }
}
```

---

## 📖 Parte 10: Integración con la Página (60 min)

### 💻 Paso 10.1: Modificar Teams.ts

```typescript
import { CharacterModal } from '../ui/CharacterModal';

class Teams extends Page {
    private modal: CharacterModal | null = null;

    async bootstrap(): Promise<void> {
        // Crear e inyectar el modal en el DOM
        this.modal = CharacterModal.create();
        document.body.appendChild(this.modal);
        
        await this.printChracters();
        this.charactersClickEvent();
    }

    private async charactersClickEvent(): Promise<void> {
        document.addEventListener('click', async (event) => {
            const target = event.target as HTMLElement;
            if (target && target.classList.contains('hp-character')) {
                const id = target.getAttribute('data-id');
                if (!id) return;
                
                try {
                    const character = await HPApiService.getCharacter(id);
                    
                    // Mostrar el modal con la información del personaje
                    if (this.modal) {
                        this.modal.show(character);
                    }
                } catch (error) {
                    console.error('Error al cargar el personaje:', error);
                }
            }
        });
    }
}
```

### 🎓 Ejercicio 13: Integración Completa

**Instrucciones:**

1. Importa `CharacterModal` en `Teams.ts`
2. Crea la instancia en `bootstrap()`
3. Añádela al DOM
4. Llama a `show()` cuando se haga click en un personaje
5. Prueba que funcione todo correctamente

**Verificación:**

- [ ] El modal se abre al hacer click en una imagen
- [ ] Muestra la información del personaje correctamente
- [ ] Se puede cerrar con X, click fuera, o ESC
- [ ] Las animaciones funcionan suavemente
- [ ] No hay errores en la consola

---

## 📖 Parte 11: Mejoras y Optimizaciones (45 min)

### 💡 Mejora 1: Loading State

```typescript
public async show(character: HPCharacter): Promise<void> {
    // Mostrar loading
    this.showLoading();
    this.classList.add('visible');
    document.body.style.overflow = 'hidden';
    
    // Simular carga si la imagen tarda
    if (character.image) {
        await this.preloadImage(character.image);
    }
    
    // Mostrar contenido
    this.character = character;
    this.render();
}

private showLoading(): void {
    this.shadow.innerHTML = `
        ${this.getStyles()}
        <div class="modal-overlay">
            <div class="modal-container">
                <div class="loading">
                    <div class="spinner"></div>
                    <p>Cargando...</p>
                </div>
            </div>
        </div>
    `;
}

private preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
    });
}
```

### 🎓 Ejercicio 14: Loading State

**Instrucciones:**

1. Implementa el estado de carga
2. Crea un spinner CSS
3. Precarga la imagen antes de mostrarla

**Spinner CSS:**

```css
.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #c4941f;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
```

---

### 💡 Mejora 2: Eventos Personalizados

```typescript
public show(character: HPCharacter): void {
    this.character = character;
    this.render();
    this.classList.add('visible');
    document.body.style.overflow = 'hidden';
    
    // Emitir evento personalizado
    this.dispatchEvent(new CustomEvent('modal-opened', {
        detail: { character },
        bubbles: true,
        composed: true // Atraviesa Shadow DOM
    }));
}

public close(): void {
    this.classList.remove('visible');
    document.body.style.overflow = '';
    
    // Emitir evento personalizado
    this.dispatchEvent(new CustomEvent('modal-closed', {
        bubbles: true,
        composed: true
    }));
}
```

**Uso desde fuera:**

```typescript
modal.addEventListener('modal-opened', (e: CustomEvent) => {
    console.log('Modal abierto con personaje:', e.detail.character);
});

modal.addEventListener('modal-closed', () => {
    console.log('Modal cerrado');
});
```

### 🎓 Ejercicio 15: Eventos Personalizados

**Instrucciones:**

1. Implementa los eventos personalizados
2. Escucha los eventos desde `Teams.ts`
3. ¿Qué hace `composed: true`?
4. ¿Por qué usamos `CustomEvent` en lugar de `Event`?

---

### 💡 Mejora 3: Atributos HTML

```typescript
static get observedAttributes() {
    return ['theme'];
}

attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'theme') {
        this.updateTheme(newValue);
    }
}

private updateTheme(theme: string): void {
    // Cambiar variables CSS según el tema
    if (theme === 'dark') {
        this.style.setProperty('--modal-bg', '#1a1a1a');
        this.style.setProperty('--text-color', '#ffffff');
    } else {
        this.style.setProperty('--modal-bg', '#f5f5f5');
        this.style.setProperty('--text-color', '#333333');
    }
}
```

**Uso:**

```html
<character-modal theme="dark"></character-modal>
```

---

## 📖 Parte 12: Testing y Debugging (30 min)

### Pruebas Manuales

**Checklist:**

- [ ] El modal se crea correctamente
- [ ] Se muestra al llamar `show()`
- [ ] Se cierra con el botón X
- [ ] Se cierra al hacer click fuera
- [ ] Se cierra con la tecla ESC
- [ ] La información se muestra correctamente
- [ ] Los estilos están encapsulados
- [ ] Las animaciones funcionan
- [ ] Es responsive en móvil
- [ ] No hay memory leaks

### Debugging en DevTools

```typescript
// Añadir logs para debugging
private render(): void {
    console.group('🎨 CharacterModal.render()');
    console.log('Character:', this.character);
    console.log('Shadow Root:', this.shadow);
    
    // ... código de renderizado ...
    
    console.groupEnd();
}

// Inspeccionar el Shadow DOM
// 1. Abre DevTools
// 2. Busca <character-modal>
// 3. Expande #shadow-root
// 4. Inspecciona estilos y elementos
```

### 🎓 Ejercicio 16: Testing

**Instrucciones:**

1. Prueba todas las funcionalidades
2. Abre el modal múltiples veces
3. Verifica que no haya memory leaks
4. Comprueba en diferentes navegadores
5. Prueba en dispositivos móviles

---

## 🎯 Ejercicios Adicionales y Desafíos

### Ejercicio 17: Múltiples Modales (Avanzado)

**Objetivo:** Permitir múltiples modales abiertos simultáneamente

**Pistas:**

- Usar un contador estático para z-index
- Gestionar un stack de modales abiertos
- Solo el último debe responder a ESC

```typescript
private static modalStack: CharacterModal[] = [];
private static baseZIndex = 9999;

public show(character: HPCharacter): void {
    this.character = character;
    this.render();
    
    // Añadir al stack
    CharacterModal.modalStack.push(this);
    
    // Calcular z-index
    const zIndex = CharacterModal.baseZIndex + CharacterModal.modalStack.length;
    this.style.zIndex = String(zIndex);
    
    this.classList.add('visible');
    document.body.style.overflow = 'hidden';
}
```

---

### Ejercicio 18: Transiciones Entre Personajes

**Objetivo:** Navegar entre personajes sin cerrar el modal

**Pistas:**

- Añadir botones "Anterior" y "Siguiente"
- Mantener un array de personajes
- Animar la transición

```typescript
private currentIndex: number = 0;
private characters: HPCharacter[] = [];

public showMultiple(characters: HPCharacter[], startIndex: number = 0): void {
    this.characters = characters;
    this.currentIndex = startIndex;
    this.show(characters[startIndex]);
    this.addNavigationButtons();
}

private addNavigationButtons(): void {
    // Añadir botones prev/next al modal
}

private showNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.characters.length;
    this.show(this.characters[this.currentIndex]);
}
```

---

### Ejercicio 19: Animaciones Avanzadas

**Objetivo:** Añadir más animaciones y efectos

Ideas:

- Parallax en la imagen
- Efecto blur en el overlay
- Shake animation si faltan datos
- Confetti al abrir personajes favoritos

```typescript
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
}

.modal-container.error {
    animation: shake 0.5s;
}
```

---

### Ejercicio 20: Accesibilidad (A11y)

**Objetivo:** Hacer el modal completamente accesible

**Requisitos:**

- [ ] Soporte completo de teclado
- [ ] Screen reader friendly
- [ ] ARIA attributes correctos
- [ ] Focus trap dentro del modal
- [ ] Anunciar cambios de contenido

```typescript
private render(): void {
    // ... código existente ...
    
    this.shadow.innerHTML = `
        ${this.getStyles()}
        <div 
            class="modal-overlay" 
            role="dialog" 
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div class="modal-container">
                <button 
                    class="close-btn" 
                    aria-label="Cerrar modal de ${name}"
                    type="button"
                >
                    &times;
                </button>
                
                <h2 id="modal-title">${name}</h2>
                <div id="modal-description">
                    Información del personaje ${name}
                </div>
                
                <!-- resto del contenido -->
            </div>
        </div>
    `;
    
    // Focus trap
    this.setupFocusTrap();
}

private setupFocusTrap(): void {
    const focusableElements = this.shadow.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    // Mover focus al primer elemento
    firstElement?.focus();
    
    // Trap focus dentro del modal
    this.shadow.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement?.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement?.focus();
            }
        }
    });
}
```

---

## 📚 Conceptos Clave Aprendidos

### Web Components

- ✅ Custom Elements API
- ✅ Shadow DOM para encapsulación
- ✅ Lifecycle callbacks
- ✅ Atributos observados
- ✅ Eventos personalizados

### TypeScript

- ✅ Clases que extienden HTMLElement
- ✅ Métodos públicos vs privados
- ✅ Métodos estáticos (Factory pattern)
- ✅ Type assertions y casting
- ✅ Interfaces y tipos

### CSS

- ✅ Selectores de Shadow DOM (`:host`)
- ✅ Animaciones y transiciones
- ✅ Ocultar scrollbars
- ✅ Responsive design
- ✅ Variables CSS

### Arquitectura

- ✅ Componentes reutilizables
- ✅ Encapsulación total
- ✅ API pública limpia
- ✅ Patrón Factory
- ✅ Separación de responsabilidades

---

## 🎓 Evaluación

### Rúbrica de Evaluación

| Criterio                      | Puntos  | Descripción                                      |
|----------                     |-------- |-------------                                     |
| Estructura del Web Component  | 15      | Clase correcta, extends HTMLElement, Shadow DOM  |
| Métodos públicos (show/close) | 10      | API clara y funcional                            |
| Renderizado dinámico          | 15      | Template strings, condicionales, datos correctos |
| Event listeners               | 15      | Tres formas de cerrar, sin memory leaks          |
| Estilos encapsulados          | 20      | Shadow DOM, animaciones, responsive              |
| Integración con Teams         | 10      | Instanciación, uso correcto                      |
| Patrón Factory                | 5       | Método estático create()                         |
| Código limpio                 | 10      | Documentación, tipos, organización               |
| **Total**                     | **100** |                                                  |

### Criterios de Excelencia (+20 puntos bonus)

- Loading state implementado (+5)
- Eventos personalizados (+5)
- Navegación entre personajes (+5)
- Accesibilidad completa (+5)

---

## 🔗 Recursos Adicionales

### Documentación Oficial

- [MDN - Web Components](https://developer.mozilla.org/es/docs/Web/Web_Components)
- [MDN - Using shadow DOM](https://developer.mozilla.org/es/docs/Web/Web_Components/Using_shadow_DOM)
- [MDN - Custom Elements](https://developer.mozilla.org/es/docs/Web/Web_Components/Using_custom_elements)
- [web.dev - Web Components](https://web.dev/custom-elements-v1/)

### Librerías y Frameworks

- [Lit](https://lit.dev/) - Librería para Web Components
- [Stencil](https://stenciljs.com/) - Compiler para Web Components
- [Shoelace](https://shoelace.style/) - Librería de componentes

### Artículos Recomendados

- "Web Components Will Replace Your Frontend Framework" - Dev.to
- "Shadow DOM: Not as Scary as It Sounds" - CSS Tricks
- "Building Components with Web Components" - Google Developers

### Herramientas

- [webcomponents.org](https://www.webcomponents.org/) - Catálogo de componentes
- [Custom Elements Everywhere](https://custom-elements-everywhere.com/) - Testing de compatibilidad
- [Open WC](https://open-wc.org/) - Herramientas de desarrollo

---

## 💡 Consejos para el Profesor

### Timing Sugerido

- **Día 1 (2h):** Partes 0-3 (Teoría, fundamentos, Shadow DOM)
- **Día 2 (2.5h):** Partes 4-6 (Estructura base, métodos, Factory)
- **Día 3 (2.5h):** Partes 7-9 (Renderizado, eventos, estilos)
- **Día 4 (2h):** Partes 10-12 (Integración, mejoras, testing)

### Puntos Críticos de Enseñanza

1. **Diferencia entre Light DOM y Shadow DOM**
   - Usa DevTools para mostrar visualmente la diferencia
   - Demuestra que los estilos externos no afectan al Shadow DOM

2. **Ciclo de Vida**
   - Usa console.logs en todos los callbacks
   - Muestra cuándo se ejecuta cada uno en tiempo real

3. **Event Listeners y Memory Leaks**
   - Explica por qué es importante limpiar eventos
   - Usa Chrome DevTools Memory Profiler

4. **Renderizado Reactivo**
   - Explica por qué re-renderizar desde cero es simple pero no óptimo
   - Introduce la idea de Virtual DOM (sin implementarlo)

### Demostraciones en Vivo

1. **Demo 1: Inspector de Shadow DOM**

```typescript
// En la consola del navegador:
const modal = document.querySelector('character-modal');
console.log(modal.shadowRoot); // Ver el Shadow DOM
console.log(modal.shadowRoot.querySelector('.modal-container')); // Acceder a elementos
```

2. **Demo 2: Comparación con/sin Shadow DOM**

```html
<!-- Sin Shadow DOM -->
<div class="modal">
    <style>
        .title { color: red; } /* Afecta a toda la página */
    </style>
</div>

<!-- Con Shadow DOM -->
<my-modal>
    #shadow-root
        <style>
            .title { color: red; } /* Solo afecta al componente */
        </style>
</my-modal>
```

3. **Demo 3: Custom Elements Everywhere**

```typescript
// Los Web Components funcionan con cualquier framework
// React:
<character-modal ref={modalRef}></character-modal>

// Vue:
<character-modal ref="modal"></character-modal>

// Angular:
<character-modal #modal></character-modal>

// Vanilla JS:
const modal = CharacterModal.create();
```

### Adaptaciones por Nivel

**Nivel Básico:**

- Proporciona todo el HTML del render
- Simplifica los estilos
- Omite optimizaciones avanzadas
- Focus en conceptos fundamentales

**Nivel Intermedio:**

- Implementación guiada del render
- Todos los estilos completos
- Introducir mejoras (loading, eventos)
- Ejercicios de refactorización

**Nivel Avanzado:**

- Implementación autónoma
- Múltiples modales simultáneos
- Animaciones complejas
- Accesibilidad completa
- Tests unitarios

### Errores Comunes

1. **Olvidar `super()` en el constructor**

```typescript
constructor() {
    // ❌ Error: Must call super constructor
    this.shadow = this.attachShadow({ mode: 'open' });
}

constructor() {
    super(); // ✅ Correcto
    this.shadow = this.attachShadow({ mode: 'open' });
}
```

2. **Buscar elementos en lugar equivocado**

```typescript
// ❌ Error: Busca en Light DOM
const btn = document.querySelector('.close-btn');

// ✅ Correcto: Busca en Shadow DOM
const btn = this.shadow.querySelector('.close-btn');
```

3. **No limpiar event listeners**

```typescript
// ❌ Memory leak
render() {
    this.shadow.innerHTML = '...';
    document.addEventListener('keydown', ...); // Se añade cada vez
}

// ✅ Usar lifecycle
connectedCallback() {
    document.addEventListener('keydown', this.keydownHandler);
}
disconnectedCallback() {
    document.removeEventListener('keydown', this.keydownHandler);
}
```

4. **Nombre de elemento inválido**

```typescript
// ❌ Error: Name must contain a hyphen
customElements.define('modal', CharacterModal);

// ✅ Correcto
customElements.define('character-modal', CharacterModal);
```

### FAQ de Alumnos

**P: ¿Por qué usar Web Components en lugar de React/Vue?**
R: Los Web Components son agnósticos al framework. Útiles para design systems, librerías compartidas, o cuando no quieres dependencias. React/Vue son mejores para aplicaciones completas.

**P: ¿Puedo usar Web Components en React?**
R: Sí, pero hay algunas peculiaridades con eventos. Generalmente mejor usar componentes React nativos.

**P: ¿Los Web Components son más rápidos que React?**
R: Depende. No tienen Virtual DOM overhead, pero React está muy optimizado. Para componentes simples, WC pueden ser más rápidos.

**P: ¿Necesito un polyfill?**
R: Solo para IE11. Todos los navegadores modernos los soportan nativamente.

**P: ¿Cómo comparto datos entre Web Components?**
R: Atributos, propiedades, eventos personalizados, o un store global (como Redux).

**P: ¿Puedo usar librerías CSS como Tailwind?**
R: Sí, pero necesitas importar los estilos dentro del Shadow DOM.

---

## 🎉 Conclusión

Al completar esta lección, los alumnos habrán:

✅ Creado un Web Component profesional desde cero  
✅ Entendido Shadow DOM y encapsulación  
✅ Dominado la Custom Elements API  
✅ Implementado un modal completo y funcional  
✅ Aprendido patrones de diseño (Factory)  
✅ Integrado el componente en una aplicación real  

**Próximos pasos:**

- Crear más componentes UI (Tooltip, Dropdown, Tabs)
- Construir un Design System completo
- Publicar componentes en NPM
- Implementar tests unitarios con Jest
- Explorar librerías como Lit o Stencil

---

## 📝 Proyecto Final Sugerido

**Objetivo:** Crear un sistema de componentes reutilizables

**Componentes a implementar:**

1. `<app-modal>` - Modal genérico
2. `<app-tooltip>` - Tooltip posicionable
3. `<app-dropdown>` - Dropdown menu
4. `<app-tabs>` - Sistema de tabs
5. `<app-card>` - Card con slots

**Requisitos:**

- Todos con Shadow DOM
- Completamente accesibles
- Documentación completa
- Tests unitarios
- Demo page funcionando

---

*Última actualización: Diciembre 2025*  
*Versión: 1.0*  
*Autor: Frontend Pro Course - Web Components Module*