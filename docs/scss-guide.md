# Guía de SCSS (Sass) para Frontend Pro

<div align="center">
    <img src="https://keepcoding.io/wp-content/uploads/2024/11/Logo-kc237.svg" alt="KeepCoding Web Bootcamp XV - Frontend PRO">
</div>

Guía rápida de SCSS (Sass) para el módulo de Frontend Pro del Bootcamp de Web de KeepCoding.

---

# 📚 Índice

- [Guía de SCSS (Sass) para Frontend Pro](#guía-de-scss-sass-para-frontend-pro)
- [📚 Índice](#-índice)
  - [1. ¿Qué es SCSS y por qué usarlo?](#1-qué-es-scss-y-por-qué-usarlo)
    - [Ejemplo comparativo](#ejemplo-comparativo)
  - [2. Instalación y primeros pasos](#2-instalación-y-primeros-pasos)
  - [3. Variables](#3-variables)
  - [4. Nesting (anidación)](#4-nesting-anidación)
  - [5. Mixins](#5-mixins)
  - [6. Extends y placeholders](#6-extends-y-placeholders)
  - [7. Funciones](#7-funciones)
  - [8. Partials y uso de @use](#8-partials-y-uso-de-use)
  - [9. Control de flujo (if, each, for)](#9-control-de-flujo-if-each-for)
    - [if](#if)
    - [each](#each)
    - [for](#for)
  - [10. Arquitectura recomendada de carpetas](#10-arquitectura-recomendada-de-carpetas)
    - [Estructura simple para Frontend Pro](#estructura-simple-para-frontend-pro)
  - [11. Buenas prácticas](#11-buenas-prácticas)

---

## 1. ¿Qué es SCSS y por qué usarlo?

**SCSS** es la sintaxis moderna de **Sass**, un preprocesador CSS que añade:

- Variables
- Funciones
- Mixins
- Anidación
- Reutilización de estilos
- Arquitecturas escalables

El código SCSS se compila a CSS estándar.

### Ejemplo comparativo

**CSS:**

```css
.button {
  padding: 10px;
  background: #000;
}
.button:hover {
  background: #333;
}
```

**SCSS:**

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

## 2. Instalación y primeros pasos

Instalar Sass con npm:

```bash
npm install -D sass
```

Compilar:

```bash
npx sass src/styles.scss dist/styles.css
```

Modo watch:

```bash
npx sass --watch src/styles.scss dist/styles.css
```

---

## 3. Variables

Permiten reutilizar valores.

```scss
$primary: #4a90e2;
$spacing: 16px;

button {
  background: $primary;
  padding: $spacing;
}
```

Variables globales deben ir en un archivo parcial, ej. `_variables.scss`.

---

## 4. Nesting (anidación)

Evita repetir selectores y mejora la legibilidad.

```scss
.card {
  padding: 20px;

  .title {
    font-size: 20px;
  }

  &:hover {
    background: #f5f5f5;
  }
}
```

**⚠️ Nota:** evitar anidar más de **3 niveles**.

---

## 5. Mixins

Bloques reutilizables con parámetros.

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

Mixins con parámetros:

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

## 6. Extends y placeholders

Extienden estilos comunes sin duplicar código.

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

**Ventaja:** genera CSS más ligero.
**Desventaja:** genera selectores agrupados que pueden afectar especificidad.

---

## 7. Funciones

Permiten devolver valores calculados.

```scss
@function px-to-rem($px, $base: 16px) {
  @return ($px / $base) * 1rem;
}

.title {
  font-size: px-to-rem(24px);
}
```

---

## 8. Partials y uso de @use

Un **partial** es un archivo que empieza por `_`:

```text
_variables.scss
_mixins.scss
```

Importación moderna (recomendada):

```scss
@use "variables";
@use "mixins" as m;

button {
  color: variables.$primary;
  @include m.flex-center;
}
```

---

## 9. Control de flujo (if, each, for)

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

## 10. Arquitectura recomendada de carpetas

### Estructura simple para Frontend Pro

```text
scss/
  _variables.scss
  _mixins.scss
  _base.scss
  _components.scss
  main.scss
```

Ejemplo de `main.scss`:

```scss
@use "variables";
@use "mixins";
@use "base";
@use "components";
```

---

## 11. Buenas prácticas

- Usa **@use** en lugar de `@import` (deprecated).
- No abuses del nesting (máx. 3 niveles).
- Agrupa variables: colores, tipografía, espaciado.
- Prefiere mixins frente a extends cuando haya riesgo de colisión.
- Usa funciones para cálculos de medida y escalas.
- Mantén una arquitectura clara y escalable.

---

| **Información**        |                                             |
| ---------------------- | :------------------------------------------ |
| **Autor:**             | Nauel Gómez @KeepCoding                     |
| **Curso:**             | Full Stack Web Bootcamp XIX - Frontend Pro  |
| **Fecha:**             | Diciembre 2025                              |
