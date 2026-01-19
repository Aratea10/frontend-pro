# 🎨 Guía de SCSS (Sass)

> **Guía rápida de SCSS (Sass) para el módulo de Frontend Pro del Bootcamp de Web de KeepCoding.**

---

## 📚 Índice

- [1. ¿Qué es SCSS y por qué usarlo?](#1-qué-es-scss-y-por-qué-usarlo)
- [2. Instalación y primeros pasos](#2-instalación-y-primeros-pasos)
- [3. Variables](#3-variables)
- [4. Nesting (anidación)](#4-nesting-anidación)
- [5. Mixins](#5-mixins)
- [6. Extends y placeholders](#6-extends-y-placeholders)
- [7. Funciones](#7-funciones)
- [8. Partials y uso de @use](#8-partials-y-uso-de-use)
- [9. Control de flujo](#9-control-de-flujo-if-each-for)
- [10. Arquitectura recomendada](#10-arquitectura-recomendada-de-carpetas)
- [11. Buenas prácticas](#11-buenas-prácticas)

---

## 1. 🧐 ¿Qué es SCSS y por qué usarlo?

**SCSS** es la sintaxis moderna de **Sass**, un preprocesador CSS que añade superpoderes a tu hoja de estilos:

- ✨ **Variables**
- 🛠️ **Funciones**
- 🧩 **Mixins**
- 📦 **Anidación**
- ♻️ **Reutilización de estilos**
- 🏗️ **Arquitecturas escalables**

> [!NOTE]
> El código SCSS no es interpretado directamente por el navegador; se **compila** a CSS estándar.

### 🆚 Ejemplo comparativo

#### CSS Tradicional
```css
.button {
  padding: 10px;
  background: #000;
}
.button:hover {
  background: #333;
}
```

#### SCSS (Nesting)
```scss
.button {
  padding: 10px;
  background: #000;

  &:hover {
    background: #333;
  }
}
```

---

## 2. 🛠️ Instalación y primeros pasos

Instalar Sass con npm:

```bash
npm install -D sass
```

**Compilar manualmente:**
```bash
npx sass src/styles.scss dist/styles.css
```

**Modo Watch (recomendado para desarrollo):**
```bash
npx sass --watch src/styles.scss dist/styles.css
```

---

## 3. 💲 Variables

Permiten almacenar y reutilizar valores como colores, fuentes o espacios.

```scss
$primary: #4a90e2;
$spacing: 16px;

button {
  background: $primary;
  padding: $spacing;
}
```

> [!TIP]
> Las variables globales deben ir en un archivo parcial, por ejemplo `_variables.scss`.

---

## 4. 🪆 Nesting (anidación)

Evita repetir selectores padres y mejora la legibilidad lógica.

```scss
.card {
  padding: 20px;

  .title {
    font-size: 20px;
  }

  // El '&' hace referencia al padre (.card)
  &:hover {
    background: #f5f5f5;
  }
}
```

> [!WARNING]
> Evita anidar más de **3 niveles** de profundidad para no generar selectores CSS demasiado específicos y difíciles de mantener.

---

## 5. 🧩 Mixins

Bloques de código reutilizables, perfectos para grupos de propiedades CSS comunes.

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  @include flex-center;
}
```

**Con parámetros:**

```scss
@mixin size($w, $h: $w) {
  width: $w;
  height: $h;
}

.box {
  @include size(200px, 100px);
}
```

---

## 6. 🎭 Extends y placeholders

Extienden estilos de una clase a otra sin duplicar código CSS (DRY).

```scss
%btn-base {
  padding: 10px 16px;
  border-radius: 6px;
}

.btn-primary {
  @extend %btn-base;
  background: blue;
}
```

- **Ventaja:** Genera CSS más ligero (agrupa selectores).
- **Desventaja:** Puede afectar la especificidad de forma inesperada.

---

## 7. 🧮 Funciones

A diferencia de los mixins, las funciones **devuelven un valor**.

```scss
@function px-to-rem($px, $base: 16px) {
  @return ($px / $base) * 1rem;
}

.title {
  font-size: px-to-rem(24px);
}
```

---

## 8. 📂 Partials y uso de @use

Un **partial** es un archivo que empieza por `_` y no se compila por separado, sino que se importa.

Estructura:
```text
_variables.scss
_mixins.scss
```

**Importación moderna (Recomendada):**

```scss
@use "variables";
@use "mixins" as m;

button {
  color: variables.$primary;
  @include m.flex-center;
}
```

---

## 9. 🔀 Control de flujo (if, each, for)

### if
```scss
$theme: dark;

body {
  @if $theme == dark {
    background: #111;
  } @else {
    background: #fff;
  }
}
```

### each
Ideal para generar clases repetitivas (ej. botones de colores).
```scss
$colors: (primary: #4a90e2, danger: #e24a4a);

@each $name, $value in $colors {
  .btn-#{$name} {
    background: $value;
  }
}
```

### for
```scss
@for $i from 1 through 4 {
  .m-#{$i} {
    margin: $i * 4px;
  }
}
```

---

## 10. 🏗️ Arquitectura recomendada de carpetas

Estructura simple pero robusta para el proyecto:

```text
scss/
  ├── _variables.scss
  ├── _mixins.scss
  ├── _base.scss
  ├── _components.scss
  └── main.scss
```

**`main.scss`:**
```scss
@use "variables";
@use "mixins";
@use "base";
@use "components";
```

---

## 11. ✅ Buenas prácticas

1. Usa **`@use`** en lugar de `@import` (este último está deprecated).
2. No abuses del **nesting** (máx. 3 niveles).
3. **Agrupa variables** por contexto: colores, tipografía, espaciado.
4. Prefiere **mixins** antes que extends si hay riesgo de colisión de estilos.
5. Usa **funciones** para cálculos matemáticos (escalas, conversión de unidades).
6. Mantén una **arquitectura** de archivos limpia.

---

<div align="center">

| **Información** | |
| :--- | :--- |
| **Autor** | Nauel Gómez @KeepCoding |
| **Curso** | Full Stack Web Bootcamp XIX - Frontend Pro |
| **Fecha** | Diciembre 2025 |

</div>
