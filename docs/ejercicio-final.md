# Ejercicio Final - Frontend Pro

<div align="center">
    <img src="https://keepcoding.io/wp-content/uploads/2024/11/Logo-kc237.svg" alt="KeepCoding Web Bootcamp - Frontend PRO">
</div>
</br>
Practica final del módulo de Frontend Pro del Bootcamp Web de KeepCoding. En este ejercicio, desarrollarás la versión 2.0 de tu Portfolio Profesional utilizando tecnologías avanzadas como TypeScript, SCSS y Parcel.

---

## 📋 Descripción del Proyecto

El objetivo de este ejercicio final es crear la **versión 2.0 de tu Portfolio Profesional**, evolucionando el proyecto que realizaste en el módulo de Fundamentos Web. Esta nueva versión debe ser una **aplicación web profesional** que demuestre tu dominio de las tecnologías y técnicas avanzadas aprendidas en Frontend Pro:

- **Parcel** como empaquetador de módulos moderno
- **TypeScript** para tipado estático y programación orientada a objetos
- **SCSS** para estilos modulares, mantenibles y escalables
- **Consumo de APIs** REST (GitHub API para tus repositorios)
- **Validación de formularios** con Constraint Validation API
- **Programación Orientada a Objetos** con clases, herencia y encapsulación
- **Git** para control de versiones con buenas prácticas

Este portfolio será tu carta de presentación profesional, una pieza clave para conseguir tu primer trabajo como desarrollador web.

---

## 🎯 Requisitos Técnicos Obligatorios

### 1. Estructura del Proyecto

El proyecto debe utilizar **Parcel** como empaquetador y seguir una arquitectura modular profesional.

### 2. TypeScript

El proyecto debe estar completamente desarrollado en **TypeScript**.

#### 2.1 Tipado Estricto

- **NO usar `any`** en ninguna parte del código
- Definir **interfaces** para todos los objetos de la API (GitHub)
- Usar **tipos genéricos** en servicios y funciones reutilizables
- Implementar **type guards** cuando sea necesario
- Crear **tipos personalizados** para tu portfolio (Project, Skill, etc.)

Ejemplo de tipos para tu portfolio:

```typescript
// github.types.ts
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}
```

#### 2.2 Programación Orientada a Objetos

- Usar **clases** para organizar la lógica de cada página
- Implementar **herencia** (todas las páginas extienden `Page`)
- Aplicar **encapsulación** (propiedades privadas con `private`)
- Usar **modificadores de acceso** (`public`, `private`, `protected`)
- Implementar **métodos estáticos** cuando sea apropiado (servicios, factory)

---

### 3. SCSS

El proyecto debe utilizar **SCSS** para los estilos, aplicando buenas prácticas y características avanzadas.

#### 3.1 Arquitectura de Estilos

Organizar los estilos usando **partials** y el sistema de módulos de SCSS:

```scss
// _config.scss - Variables globales
$primary-color: #740001;
$secondary-color: #d3a625;
$font-family: "Inter", sans-serif;
$header-font: "Cinzel", serif;

@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

#### 3.2 Uso de Características SCSS

Demostrar el uso de:

- **Variables** para colores, fuentes, espaciados
- **Nesting** para organizar selectores
- **Mixins** para código reutilizable (responsive, flex, etc.)
- **Funciones** (darken, lighten, etc.)
- **Operadores** para cálculos
- **@use** en lugar de @import (sintaxis moderna)
- **Placeholders** y @extend para extender estilos

### 4. Consumo de API

Utilizar la **GitHub API** para mostrar dinámicamente tus repositorios reales: https://api.github.com

> **Nota**: La GitHub API tiene un límite de 60 peticiones por hora sin autenticación, más que suficiente para desarrollo.

#### 4.1 Endpoints a Consumir

```typescript
export class GitHubService {
  static readonly API_URL = "https://api.github.com";
  private static readonly username: string = "tu-usuario"; // Tu usuario de GitHub

  /**
   * Obtiene información del perfil de usuario
   */
  public static getUserProfile(): Promise<GitHubUser> {
    return ApiService.get<GitHubUser>(`${this.API_URL}/users/${this.username}`);
  }

  /**
   * Obtiene todos los repositorios públicos del usuario
   * @param sort - Ordenar por: created, updated, pushed, full_name
   */
  public static getRepositories(
    sort: "created" | "updated" | "pushed" | "full_name" = "updated"
  ): Promise<GitHubRepository[]> {
    return ApiService.get<GitHubRepository[]>(
      `${this.API_URL}/users/${this.username}/repos?sort=${sort}&per_page=100`
    );
  }

  /**
   * Obtiene repositorios destacados (con más estrellas o específicos)
   */
  public static getFeaturedRepositories(): Promise<GitHubRepository[]> {
    return this.getRepositories("updated").then(
      (repos) =>
        repos
          .filter((repo) => !repo.fork) // Excluir forks
          .slice(0, 6) // Top 6
    );
  }

  /**
   * Obtiene un repositorio específico
   */
  public static getRepository(repoName: string): Promise<GitHubRepository> {
    return ApiService.get<GitHubRepository>(
      `${this.API_URL}/repos/${this.username}/${repoName}`
    );
  }
}
```

#### 4.2 Manejo de Errores

Implementar manejo robusto de errores:

```typescript
async bootstrap(): Promise<void> {
    try {
        const characters = await HPApiService.getAllCharacters();
        this.renderCharacters(characters);
    } catch (error) {
        console.error('Error loading characters:', error);
        this.showErrorMessage('No se pudieron cargar los personajes');
    }
}
```

### 5. Validación de Formularios - Requisitos Obligatorios

Los formularios deben implementar validación avanzada utilizando la **Constraint Validation API** nativa del navegador.

#### 5.1 Formulario de Contacto

Crear un formulario con:

- Campo **nombre** (requerido, min 3 caracteres)
- Campo **email** (requerido, tipo email)
- Campo **mensaje** (requerido, min 10 caracteres, max 500)
- **Validación en tiempo real** (blur y input events)
- Mensajes de error **personalizados**
- **Feedback visual** (clases CSS para estados válido/inválido)
- Sistema de **Toast** para confirmación de envío

## Páginas

Tu portfolio debe tener **al menos 3 páginas** principales.

---

## Requisitos de Diseño

El diseño de tu portfolio debe ser **profesional, coherente y atractivo**. Debe ser completamente responsive y adaptarse a todos los dispositivos utilizando un enfoque **mobile-first**.

## README.md Requerido

Tu proyecto debe incluir un **README.md completo**.

## Recursos de Ayuda

### Documentación Oficial

#### Tecnologías Core

- [Parcel - Documentación](https://parceljs.org/docs/) - Empaquetador de módulos
- [TypeScript - Handbook](https://www.typescriptlang.org/docs/) - Guía completa de TypeScript
- [Sass/SCSS - Documentación](https://sass-lang.com/documentation/) - Preprocesador CSS

#### APIs Web

- [Web Components - MDN](https://developer.mozilla.org/es/docs/Web/Web_Components) - Guía completa
- [Custom Elements - MDN](https://developer.mozilla.org/es/docs/Web/API/Window/customElements)
- [Shadow DOM - MDN](https://developer.mozilla.org/es/docs/Web/API/Web_components/Using_shadow_DOM)
- [Constraint Validation API - MDN](https://developer.mozilla.org/es/docs/Web/API/Constraint_validation)

### APIs Externas

#### GitHub API

- [GitHub REST API - Documentación](https://docs.github.com/es/rest)
- [Endpoints de Usuarios](https://docs.github.com/es/rest/users)
- [Endpoints de Repositorios](https://docs.github.com/es/rest/repos)
- **No requiere autenticación** para endpoints públicos (60 req/hora)

---

| **Información** |                                            |
| --------------- | ------------------------------------------ |
| **Autor:**      | Nauel Gómez @ KeepCoding                   |
| **Curso:**      | Full Stack Web Bootcamp XIX - Frontend Pro |
| **Fecha:**      | Diciembre 2025                             |
