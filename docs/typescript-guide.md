# 📘 Guía de TypeScript

> **Guía rápida de TypeScript para el módulo de Frontend Pro del Bootcamp de Web de KeepCoding.**

---

## 📚 Índice

- [1. ¿Qué es TypeScript?](#1-qué-es-typescript-y-por-qué-usarlo)
- [2. Instalación](#2-instalación-y-primeros-pasos)
- [3. Compilador y Configuración](#3-el-compilador-y-tsconfigjson)
- [4. Tipos básicos](#4-tipos-básicos)
- [5. Inferencia](#5-inferencia-de-tipos)
- [6. Tipos especiales](#6-tipos-especiales-y-útiles)
- [7. Funciones](#7-funciones-en-typescript)
- [8. Objetos y Tipos](#8-objetos-interfaces-y-type-aliases)
- [9. Uniones e Intersecciones](#9-uniones-intersecciones-y-narrowing)
- [10. Clases y POO](#11-clases-y-poo)
- [11. Genéricos](#12-genéricos)
- [12. Utility Types](#14-utility-types)
- [13. Buenas prácticas](#17-buenas-prácticas)

---

## 1. 🧐 ¿Qué es TypeScript y por qué usarlo?

**TypeScript** es JavaScript con superpoderes de tipado. Es un *superset* que compila a JavaScript.

- ✅ **Seguridad:** Detecta errores *antes* de ejecutar el código.
- 🤖 **Autocompletado:** Tu editor entiende tu código mejor.
- 🏗️ **Escalable:** Ideal para proyectos grandes y equipos.

### 🆚 Ejemplo comparativo

#### JavaScript (Riesgoso)
```js
function sum(a, b) {
  return a + b;
}
sum("1", 2); // "12" 😱 (Concatenación inesperada)
```

#### TypeScript (Seguro)
```ts
function sum(a: number, b: number): number {
  return a + b;
}
sum("1", 2); // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'.
```

---

## 2. 🛠️ Instalación y primeros pasos

```bash
npm install -D typescript
```

**Ejemplo básico (`src/index.ts`):**

```ts
const message: string = "Hola TypeScript";
console.log(message);
```

**Compilar:**
```bash
npx tsc src/index.ts
```

---

## 3. ⚙️ El compilador y tsconfig.json

Generar configuración recomendada:
```bash
npx tsc --init
```

`tsconfig.json` típico:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "rootDir": "./src",
    "outDir": "./dist",
    "moduleResolution": "node"
  },
  "include": ["src"]
}
```

---

## 4. 🧱 Tipos básicos

```ts
// Primitivos
let age: number = 30;
let name: string = "Marta";
let active: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Ana", "Luis"];

// Tuplas (Array de longitud y tipos fijos)
let user: [string, number] = ["Nauel", 35];
```

---

## 5. 🔍 Inferencia de tipos

TypeScript es inteligente. A menudo no necesitas escribir el tipo si es obvio:

```ts
let city = "Girona"; // TypeScript sabe que es string
// city = 42; ❌ Error
```

---

## 6. 🦄 Tipos especiales y útiles

### ❌ `any` (¡Evítalo!)
Desactiva el chequeo de tipos. Úsalo solo si estás migrando código legado o desesperado.
```ts
let x: any = "hola"; // No hay reglas
```

### ❓ `unknown`
La versión segura de `any`. Te obliga a comprobar el tipo antes de usarlo.
```ts
let input: unknown = "texto";
if (typeof input === "string") {
  console.log(input.toUpperCase()); // ✅ Seguro
}
```

### 🚫 `void` y `never`
- `void`: Funciones que no retornan nada.
- `never`: Funciones que **nunca** terminan (loops infinitos o lanzan errores).

---

## 7. ⚡ Funciones

```ts
function greet(name: string): string {
  return `Hola, ${name}`;
}

// Opcionales
function buildName(first: string, last?: string) { ... }

// Rest parameters
function sumAll(...nums: number[]) { ... }
```

---

## 8. 📦 Objetos, Interfaces y Type Aliases

### `type` vs `interface`

**Type (Alias):**
```ts
type User = {
  id: number;
  name: string;
};
```

**Interface (Contrato extensible):**
```ts
interface User {
  id: number;
  name: string;
}

// Extensión
interface Admin extends User {
  role: "admin";
}
```

> [!TIP]
> Usa `interface` para objetos y clases si quieres permitir extensión. Usa `type` para uniones, intersecciones o primitivos.

---

## 9. 🔀 Uniones, Intersecciones y Narrowing

**Union (`|`):** "Puede ser esto O aquello".
```ts
let id: string | number;
id = 101; // ✅
id = "ABC"; // ✅
```

**Intersección (`&`):** "Debe tener esto Y aquello".
```ts
type Entity = { id: string } & { created: Date };
```

**Narrowing (Estrechamiento):**
```ts
function process(val: number | string) {
  if (typeof val === "string") {
    // Aquí TypeScript sabe que 'val' es string
    return val.toUpperCase();
  }
}
```

---

## 10. 🏛️ Clases y POO

TypeScript simplifica los constructores y añade modificadores de acceso (`public`, `private`, `protected`).

```ts
class Person {
  // Propiedades declaradas en el constructor (shorthand)
  constructor(public name: string, private age: number) {}

  greet() {
    console.log(`Hola, soy ${this.name}`);
  }
}

const p = new Person("Sofía", 28);
// p.age ❌ Error: privado
```

---

## 11. 🧬 Genéricos

Haz componentes reutilizables que funcionen con varios tipos (como una "variable para tipos").

```ts
function wrap<T>(value: T): T[] {
  return [value];
}

const numbers = wrap<number>(5); // [5]
const strings = wrap("hola");    // ["hola"] (inferido)
```

**En Interfaces:**
```ts
interface ApiResponse<T> {
  data: T;
  status: number;
}
```

---

## 12. 🧰 Utility Types

Herramientas integradas para transformar tipos:

- **`Partial<T>`:** Todo opcional.
- **`Required<T>`:** Todo obligatorio.
- **`Pick<T, K>`:** Selecciona solo algunas propiedades.
- **`Omit<T, K>`:** Quita algunas propiedades.

```ts
interface Todo {
  title: string;
  desc: string;
}

type TodoPreview = Pick<Todo, "title">; // { title: string }
```

---

## 13. ✅ Buenas prácticas

1. **Strict Mode:** Siempre `strict: true` en `tsconfig.json`.
2. **No mientas:** Evita `as any` o aserciones de tipo (`as Something`) si no es estrictamente necesario.
3. **Tipa lo justo:** Deja que la **inferencia** trabaje por ti.
4. **Organización:** Separa tus tipos/interfaces en archivos `.d.ts` o `types.ts` si crecen mucho.

---

<div align="center">

| **Información** | |
| :--- | :--- |
| **Autor** | Nauel Gómez @KeepCoding |
| **Curso** | Full Stack Web Bootcamp XIX - Frontend Pro |
| **Fecha** | Diciembre 2025 |

</div>
