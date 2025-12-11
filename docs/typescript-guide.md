# Guía de TypeScript para Frontend Pro

<div align="center">
    <img src="https://keepcoding.io/wp-content/uploads/2024/11/Logo-kc237.svg" alt="KeepCoding Web Bootcamp XV - Frontend PRO">
</div>

Guía rápida de TypeScript para el módulo de Frontend Pro del Bootcamp de Web de KeepCoding.

---

# 📚 Índice

- [Guía de TypeScript para Frontend Pro](#guía-de-typescript-para-frontend-pro)
- [📚 Índice](#-índice)
- [1. ¿Qué es TypeScript y por qué usarlo?](#1-qué-es-typescript-y-por-qué-usarlo)
    - [🟩 Ejemplo comparativo](#-ejemplo-comparativo)
- [2. Instalación y primeros pasos](#2-instalación-y-primeros-pasos)
- [3. El compilador y tsconfig.json](#3-el-compilador-y-tsconfigjson)
- [4. Tipos básicos](#4-tipos-básicos)
- [5. Inferencia de tipos](#5-inferencia-de-tipos)
- [6. Tipos especiales y útiles](#6-tipos-especiales-y-útiles)
    - [any (evitarlo)](#any-evitarlo)
    - [unknown](#unknown)
    - [void y never](#void-y-never)
- [7. Funciones en TypeScript](#7-funciones-en-typescript)
- [8. Objetos, interfaces y type aliases](#8-objetos-interfaces-y-type-aliases)
- [9. Uniones, intersecciones y narrowing](#9-uniones-intersecciones-y-narrowing)
- [10. Literales y enums](#10-literales-y-enums)
- [11. Clases y POO](#11-clases-y-poo)
- [12. Genéricos](#12-genéricos)
- [13. Módulos y organización](#13-módulos-y-organización)
- [14. Utility Types](#14-utility-types)
    - [Partial](#partial)
    - [Pick](#pick)
    - [Omit](#omit)
- [15. Librerías JavaScript con TypeScript](#15-librerías-javascript-con-typescript)
- [16. Integración con Parcel](#16-integración-con-parcel)
- [17. Buenas prácticas](#17-buenas-prácticas)

---

# 1. ¿Qué es TypeScript y por qué usarlo?

TypeScript es un _superset_ de JavaScript que añade:

- Tipado estático opcional
- Mejor autocompletado
- Detección temprana de errores
- Mejor experiencia para equipos y proyectos grandes

### 🟩 Ejemplo comparativo

```js
// JavaScript
function sum(a, b) {
  return a + b;
}

sum("1", 2); // "12" → posible bug
```

```ts
// TypeScript
function sum(a: number, b: number): number {
  return a + b;
}

sum("1", 2); // ❌ error de tipos
```

---

# 2. Instalación y primeros pasos

```bash
npm install -D typescript
```

Crear archivo:

```ts
// src/index.ts
const message: string = "Hola TypeScript";
console.log(message);
```

Compilar:

```bash
npx tsc src/index.ts
```

---

# 3. El compilador y tsconfig.json

Generar archivo:

```bash
npx -p typescript tsc --init
```

Ejemplo básico:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "module": "ESNext",
    "strict": true,
    "rootDir": "./src",
    "outDir": "./dist",
    "moduleResolution": "node",
    "esModuleInterop": true
  },
  "include": ["src"]
}
```

---

# 4. Tipos básicos

```ts
let age: number = 30;
let name: string = "Marta";
let active: boolean = true;
```

Arrays:

```ts
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Ana", "Luis"];
```

Tuplas:

```ts
let user: [string, number] = ["Nauel", 35];
```

---

# 5. Inferencia de tipos

```ts
let city = "Girona"; // string
let counter = 0; // number
```

---

# 6. Tipos especiales y útiles

### any (evitarlo)

```ts
let x: any = 42;
x = "hola";
```

### unknown

```ts
let input: unknown = "texto";
if (typeof input === "string") input.toUpperCase();
```

### void y never

```ts
function log(): void {}
function fail(): never {
  throw new Error("Error");
}
```

---

# 7. Funciones en TypeScript

```ts
function greet(name: string): string {
  return `Hola, ${name}`;
}
```

Parámetros opcionales:

```ts
function buildName(name: string, surname?: string) {}
```

Rest:

```ts
function sumAll(...nums: number[]) {}
```

---

# 8. Objetos, interfaces y type aliases

Objetos:

```ts
const user: { name: string; age: number } = { name: "Marta", age: 30 };
```

Type:

```ts
type User = { id: number; name: string };
```

Interface:

```ts
interface User {
  id: number;
  name: string;
}
```

Extensión:

```ts
interface Admin extends User {
  admin: true;
}
```

---

# 9. Uniones, intersecciones y narrowing

Union:

```ts
let id: string | number;
```

Narrowing:

```ts
function printId(id: string | number) {
  if (typeof id === "string") console.log(id.toUpperCase());
  else console.log(id.toFixed(2));
}
```

Intersección:

```ts
type A = { id: string };
type B = { createdAt: Date };
type Entity = A & B;
```

---

# 10. Literales y enums

```ts
type Role = "admin" | "user" | "guest";
```

Enum:

```ts
enum Status {
  Pending = "PENDING",
  Done = "DONE",
}
```

---

# 11. Clases y POO

```ts
class Person {
  constructor(public name: string, private age: number) {}

  greet() {
    console.log(`Hola, soy ${this.name}`);
  }
}
```

Herencia:

```ts
class Employee extends Person {
  constructor(n: string, a: number, public role: string) {
    super(n, a);
  }
}
```

---

# 12. Genéricos

```ts
function wrap<T>(value: T): T[] {
  return [value];
}
```

Interfaces genéricas:

```ts
interface ApiResponse<T> {
  data: T;
  status: number;
}
```

---

# 13. Módulos y organización

```ts
// User.ts
export interface User {
  id: number;
  name: string;
}
```

```ts
import type { User } from "./User";
```

---

# 14. Utility Types

### Partial

```ts
type UserUpdate = Partial<User>;
```

### Pick

```ts
type UserPreview = Pick<User, "id" | "name">;
```

### Omit

```ts
type UserWithoutEmail = Omit<User, "email">;
```

---

# 15. Librerías JavaScript con TypeScript

```bash
npm install axios
npm install -D @types/axios
```

---

# 16. Integración con Parcel

```bash
npm install -D parcel typescript
```

`package.json`:

```json
{
  "scripts": { "dev": "parcel src/index.html" }
}
```

---

# 17. Buenas prácticas

- Usa `strict: true`
- Evita `any`
- Tipa APIs públicas
- Usa literales en lugar de strings sueltos
- Organiza tipos en carpetas separadas

---

| **Información** |                                            |
| --------------- | ------------------------------------------ |
| **Autor:**      | Nauel Gómez @ KeepCoding                   |
| **Curso:**      | Full Stack Web Bootcamp XIX - Frontend Pro |
| **Fecha:**      | Diciembre 2025                             |
