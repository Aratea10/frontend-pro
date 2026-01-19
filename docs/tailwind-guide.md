# 🌬️ Guía de Tailwind CSS

> **Guía rápida de Tailwind CSS para el módulo de Frontend Pro del Bootcamp de Web de KeepCoding.**

---

## 📚 Índice

- [1. ¿Qué es Tailwind CSS?](#1-qué-es-tailwind-css-y-por-qué-usarlo)
- [2. Instalación](#2-instalación-y-primeros-pasos)
- [3. Utility-First](#3-concepto-principal-utility-first)
- [4. Estilos básicos](#4-estilos-básicos-espaciado-tipografía-colores)
- [5. Responsive design](#5-responsive-design-con-tailwind)
- [6. Estados (Hover, Focus)](#6-estados-hover-focus-active)
- [7. Dark Mode](#7-dark-mode)
- [8. Configuración](#8-tailwind-configuration-tailwindconfigjs)
- [9. Reutilización (@apply)](#9-reutilización-profesional-con-apply)
- [10. Patrones recomendados](#10-componentes-y-patrones-recomendados)
- [11. Buenas prácticas](#11-buenas-prácticas-con-tailwind)

---

## 1. 🧐 ¿Qué es Tailwind CSS y por qué usarlo?

**Tailwind CSS** es un framework **utility-first**, lo que significa que te da "piezas de lego" (clases pequeñas) para construir tu diseño directamente en el HTML.

- 🚀 **Rápido:** No tienes que cambiar de contexto entre HTML y CSS.
- 🎨 **Consistente:** Sistema de diseño integrado.
- 🔧 **Flexible:** Altamente configurable vía `tailwind.config.js`.
- 📦 **Ligero:** El CSS final es minúsculo (tree-shaking).

### 🆚 Ejemplo comparativo

#### CSS Tradicional
```css
.btn {
  padding: 12px 24px;
  background: #2563eb;
  color: white;
  border-radius: 6px;
}
```

#### Tailwind CSS
```html
<button class="px-6 py-3 bg-blue-600 text-white rounded-md">
  Botón
</button>
```

---

## 2. 🛠️ Instalación y primeros pasos

Instalar mediante npm:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Configuración mínima (`tailwind.config.js`):**

```js
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: { extend: {} },
  plugins: [],
};
```

**En tu CSS (`src/styles.css`):**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 3. 🧠 Concepto principal: Utility-First

En lugar de crear una clase para cada componente, combinas utilidades:

```html
<div class="p-4 bg-gray-200 rounded-lg shadow">
  Contenido
</div>
```

**Ventajas:**
- ⚡ Desarrollo veloz.
- 🚫 Menos CSS muerto.
- 📱 Diseño responsive más fácil.

---

## 4. 🎨 Estilos básicos: Espaciado, Tipografía, Colores

### 📏 Espaciado (Padding & Margin)
- `p-4`: Padding de 1rem.
- `m-2`: Margin de 0.5rem.
- `px-6`: Padding horizontal.
- `my-4`: Margin vertical.

### 🖌️ Colores
- `text-red-500`: Texto rojo intensidad 500.
- `bg-blue-600`: Fondo azul intensidad 600.

### ✍️ Tipografía
- `text-3xl`: Tamaño de fuente grande.
- `font-bold`: Negrita.
- `text-center`: Alineación centrada.

---

## 5. 📱 Responsive Design

Tailwind usa un enfoque **Mobile First**. Usa prefijos para aplicar estilos en pantallas grandes:

- `sm:` (640px)
- `md:` (768px)
- `lg:` (1024px)
- `xl:` (1280px)

```html
<!-- Texto pequeño en móvil, grande en desktop -->
<div class="text-sm md:text-lg lg:text-xl">
  Texto adaptable
</div>
```

---

## 6. 👆 Estados (Hover, Focus, Active...)

Simplemente añade el prefijo del estado:

```html
<button class="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400">
  Enviar
</button>
```

---

## 7. 🌙 Dark Mode

Configura `darkMode: "class"` en `tailwind.config.js` para control manual.

```html
<body class="dark">
  <div class="bg-white dark:bg-gray-800 text-black dark:text-white">
    Contenido automático según tema
  </div>
</body>
```

---

## 8. ⚙️ Tailwind Configuration

Extiende el tema por defecto en `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      brand: "#4a90e2", // bg-brand
    },
    spacing: {
      18: "4.5rem", // p-18
    },
  },
}
```

---

## 9. ♻️ Reutilización profesional con @apply

Aunque Tailwind es utility-first, puedes extraer componentes comunes para limpiar tu HTML o usar CSS externo cuando sea necesario.

```css
.btn {
  @apply px-4 py-2 bg-blue-600 text-white rounded-md shadow transition;
}

.btn-danger {
  @apply bg-red-600 hover:bg-red-700;
}
```

> [!WARNING]
> Usa `@apply` con moderación. El poder de Tailwind reside en tener las clases en el HTML.

---

## 10. 🧩 Componentes y patrones recomendados

### Card
```html
<div class="p-4 bg-white shadow rounded-md border hover:shadow-lg transition">
  <h3 class="text-xl font-bold mb-2">Título</h3>
  <p class="text-gray-600">Descripción...</p>
</div>
```

### Navbar
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

## 11. ✅ Buenas prácticas

1. **Ordena tus clases:** Layout (`flex`, `grid`) → Espaciado (`p-4`, `m-2`) → Diseño (`bg-`, `text-`) → Efectos (`shadow`, `hover:`).
2. **Componentiza:** Si repites el mismo botón 10 veces, extraelo a un componente de JS/Web Component, no solo a una clase CSS.
3. **No abuses de valores arbitrarios:** Evita `w-[325px]`, usa el sistema de diseño.
4. **Configura tu tema:** Centraliza colores y fuentes en la config.

---

<div align="center">

| **Información** | |
| :--- | :--- |
| **Autor** | Nauel Gómez @KeepCoding |
| **Curso** | Full Stack Web Bootcamp XIX - Frontend Pro |
| **Fecha** | Diciembre 2025 |

</div>
