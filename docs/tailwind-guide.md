# Guía de Tailwind CSS para Frontend Pro

<div align="center">
    <img src="https://keepcoding.io/wp-content/uploads/2024/11/Logo-kc237.svg" alt="KeepCoding Web Bootcamp XV - Frontend PRO">
</div>

Guía rápida de Tailwind CSS para el módulo de Frontend Pro del Bootcamp de Web de KeepCoding.

---

# 📚 Índice

- [Guía de Tailwind CSS para Frontend Pro](#guía-de-tailwind-css-para-frontend-pro)
- [📚 Índice](#-índice)
- [1. ¿Qué es Tailwind CSS y por qué usarlo?](#1-qué-es-tailwind-css-y-por-qué-usarlo)
    - [Ventajas:](#ventajas)
    - [Ejemplo comparativo](#ejemplo-comparativo)
- [2. Instalación y primeros pasos](#2-instalación-y-primeros-pasos)
- [3. Concepto principal: Utility-First](#3-concepto-principal-utility-first)
- [4. Estilos básicos: espaciado, tipografía, colores](#4-estilos-básicos-espaciado-tipografía-colores)
    - [Espaciado](#espaciado)
    - [Colores](#colores)
    - [Tipografía](#tipografía)
- [5. Responsive design con Tailwind](#5-responsive-design-con-tailwind)
- [6. Estados (hover, focus, active…)](#6-estados-hover-focus-active)
- [7. Dark Mode](#7-dark-mode)
- [8. Tailwind Configuration (tailwind.config.js)](#8-tailwind-configuration-tailwindconfigjs)
- [9. Reutilización profesional con @apply](#9-reutilización-profesional-con-apply)
- [10. Componentes y patrones recomendados](#10-componentes-y-patrones-recomendados)
- [11. Buenas prácticas con Tailwind](#11-buenas-prácticas-con-tailwind)

---

# 1. ¿Qué es Tailwind CSS y por qué usarlo?

Tailwind es un **framework CSS utility-first**, basado en clases pequeñas y reutilizables que permiten construir interfaces sin escribir CSS manualmente.

### Ventajas:

- Estilo rápido sin abandonar el HTML
- Diseño consistente sin CSS repetitivo
- Sistema de diseño integrado: spacing, color, tipografía…
- Extremadamente flexible gracias a `tailwind.config.js`
- No obliga a una arquitectura concreta

### Ejemplo comparativo

**CSS tradicional:**

```css
.btn {
  padding: 12px 24px;
  background: #2563eb;
  color: white;
  border-radius: 6px;
}
```

**Tailwind:**

```html
<button class="px-6 py-3 bg-blue-600 text-white rounded-md">Botón</button>
```

---

# 2. Instalación y primeros pasos

Instalar Tailwind mediante npm:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Contenido mínimo de `tailwind.config.js`:

```js
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: { extend: {} },
  plugins: [],
};
```

Archivo `styles.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Compilación:

```bash
npx tailwindcss -i ./src/styles.css -o ./dist/styles.css --watch
```

---

# 3. Concepto principal: Utility-First

Tailwind se basa en pequeñas clases reutilizables:

```html
<div class="p-4 bg-gray-200 rounded-lg shadow">Contenido</div>
```

Ventajas de este enfoque:

- Rapidez
- Menos CSS repetido
- Diseño más consistente
- Cambios inmediatos en el HTML

---

# 4. Estilos básicos: espaciado, tipografía, colores

### Espaciado

```html
<div class="p-4 m-2">Caja con padding y margin</div>
```

### Colores

```html
<p class="text-red-500">Texto rojo</p>
<div class="bg-blue-600 text-white p-4">Caja azul</div>
```

### Tipografía

```html
<h1 class="text-3xl font-bold">Título</h1>
<p class="text-sm text-gray-600">Descripción</p>
```

---

# 5. Responsive design con Tailwind

Usa prefijos:

- `sm:`
- `md:`
- `lg:`
- `xl:`
- `2xl:`

Ejemplo:

```html
<div class="text-sm md:text-lg lg:text-xl">Texto adaptable</div>
```

---

# 6. Estados (hover, focus, active…)

```html
<button class="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400">
  Enviar
</button>
```

Tailwind permite encadenar modificadores fácilmente:

```html
<input class="border p-2 focus:border-blue-500 focus:ring" />
```

---

# 7. Dark Mode

Modo manual (recomendado):

```js
module.exports = {
  darkMode: "class",
};
```

Uso:

```html
<body class="dark">
  <div class="bg-white dark:bg-gray-800 text-black dark:text-white">
    Contenido
  </div>
</body>
```

---

# 8. Tailwind Configuration (tailwind.config.js)

Ampliar el tema:

```js
theme: {
  extend: {
    colors: {
      brand: "#4a90e2",
    },
    spacing: {
      18: "4.5rem",
    },
  },
}
```

Ejemplo en HTML:

```html
<div class="bg-brand p-18">Caja personalizada</div>
```

---

# 9. Reutilización profesional con @apply

Aunque Tailwind es utility-first, a veces conviene crear clases:

```css
.btn {
  @apply px-4 py-2 bg-blue-600 text-white rounded-md shadow;
}

.btn-danger {
  @apply bg-red-600;
}
```

Uso:

```html
<button class="btn btn-danger">Eliminar</button>
```

---

# 10. Componentes y patrones recomendados

Ejemplo: tarjeta (card)

```html
<div class="p-4 bg-white shadow rounded-md border hover:shadow-lg transition">
  <h3 class="text-xl font-bold mb-2">Título</h3>
  <p class="text-gray-600">Descripción</p>
</div>
```

Ejemplo: navbar

```html
<nav class="flex items-center justify-between p-4 bg-gray-900 text-white">
  <span class="text-lg font-bold">Logo</span>
  <ul class="flex gap-4">
    <li><a class="hover:text-gray-300" href="#">Inicio</a></li>
    <li><a class="hover:text-gray-300" href="#">Servicios</a></li>
  </ul>
</nav>
```

---

# 11. Buenas prácticas con Tailwind

- Mantén el HTML limpio: agrupa classes por tipo (layout → spacing → color → effects).
- Usa `@apply` solo cuando aporte claridad.
- No abuses de clases largas sin necesidad.
- Centraliza colores, sombras y espaciados en `tailwind.config.js`.
- Usa los breakpoints con intención, no para replicar CSS tradicional.
- Prefiere clases utilitarias en lugar de CSS manual siempre que sea posible.

---

| **Información** |                                            |
| --------------- | ------------------------------------------ |
| **Autor:**      | Nauel Gómez @ KeepCoding                   |
| **Curso:**      | Full Stack Web Bootcamp XIX - Frontend Pro |
| **Fecha:**      | Diciembre 2025                             |
