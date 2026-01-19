# 🎓 Ejercicio Final - Frontend Pro

## 📖 Descripción del Proyecto
El objetivo de este ejercicio final es crear la **versión 2.0 de tu Portfolio Profesional**, evolucionando el proyecto que realizaste en el módulo de Fundamentos Web. Esta nueva versión debe ser una **aplicación web profesional** que demuestre tu dominio de las tecnologías y técnicas avanzadas aprendidas en Frontend Pro.

### ¿Qué competencias demostrarás?
- **Parcel** como empaquetador de módulos moderno
- **TypeScript** para tipado estático y programación orientada a objetos
- **SCSS** para estilos modulares, mantenibles y escalables
- **Consumo de APIs** REST (GitHub API para tus repositorios)
- **Validación de formularios** con Constraint Validation API
- **Programación Orientada a Objetos** con clases, herencia y encapsulación
- **Git** para control de versiones con buenas prácticas

> *Este portfolio será tu carta de presentación profesional, una pieza clave para conseguir tu primer trabajo como desarrollador web.*

---

## 🎯 Requisitos Técnicos Obligatorios

### 1. Estructura y Empaquetado
- ✅ El proyecto debe utilizar **Parcel** como empaquetador y seguir una arquitectura modular profesional.

### 2. TypeScript
El proyecto debe estar completamente desarrollado en **TypeScript**.

#### 2.1 Tipado Estricto
- **NO usar `any`** en ninguna parte del código.
- Definir **interfaces** para todos los objetos de la API (GitHub).
- Usar **tipos genéricos** en servicios y funciones reutilizables.
- Implementar **type guards** cuando sea necesario.
- Crear **tipos personalizados** para tu portfolio (Project, Skill, etc.).

#### 2.2 Programación Orientada a Objetos
- Usar **clases** para organizar la lógica de cada página.
- Implementar **herencia** (todas las páginas extienden `Page`).
- Aplicar **encapsulación** (propiedades privadas con `private`).
- Usar **modificadores de acceso** (`public`, `private`, `protected`).
- Implementar **métodos estáticos** cuando sea apropiado (servicios, factory).

### 3. SCSS
El proyecto debe utilizar **SCSS** para los estilos, aplicando buenas prácticas y características avanzadas.

#### 3.1 Arquitectura de Estilos
Organizar los estilos usando **partials** y el sistema de módulos de SCSS (`_config.scss`, `_variables.scss`, etc.).

#### 3.2 Uso de Características SCSS
- **Variables** para colores, fuentes, espaciados.
- **Nesting** para organizar selectores.
- **Mixins** para código reutilizable (responsive, flex, etc.).
- **Funciones** (darken, lighten, etc.).
- **Operadores** para cálculos.
- **@use** en lugar de @import (sintaxis moderna).
- **Placeholders** y @extend para extender estilos.

### 4. Consumo de API
Utilizar la **GitHub API** para mostrar dinámicamente tus repositorios reales: [GitHub REST API](https://api.github.com).

> ⚠️ **Nota**: La GitHub API tiene un límite de 60 peticiones por hora sin autenticación, suficiente para desarrollo.

#### 4.1 Funcionalidades de API Requeridas
- **Perfil de usuario**: Mostrar tu información básica.
- **Lista de repositorios**: Obtener tus repositorios públicos.
- **Filtrado/Destacados**: Mostrar repositorios específicos o los más populares.
- **Detalle de repositorio**: Información extra de un repo específico.

#### 4.2 Manejo de Errores
Implementar un manejo robusto de errores (`try/catch`) y mostrar feedback al usuario si la API falla.

### 5. Validación de Formularios
Los formularios deben implementar validación avanzada utilizando la **Constraint Validation API** nativa del navegador.

#### 5.1 Formulario de Contacto
- **Campos**: Nombre, Email, Mensaje.
- **Validación en tiempo real** (blur y input events).
- **Mensajes de error personalizados**.
- **Feedback visual** (clases CSS para estados válido/inválido).
- **Toast/Notificación** para confirmación de envío.

---

## 📱 Páginas y Diseño

### Páginas Requeridas
Tu portfolio debe tener **al menos 3 páginas** principales (ej: Home, Proyectos, Contacto).

### Requisitos de Diseño
- **Estética Profesional**: Coherente y atractiva.
- **Responsive Design**: Adaptable a todos los dispositivos.
- **Mobile First**: Diseñado pensando primero en móviles.

### README.md Requerido
Tu proyecto debe incluir un **README.md completo** documentando el proyecto.

---

## 📚 Recursos de Ayuda

### Documentación Oficial
| Core | APIs Web | APIs Externas |
|------|-----------|---------------|
| [Parcel Docs](https://parceljs.org/docs/) | [Web Components](https://developer.mozilla.org/es/docs/Web/Web_Components) | [GitHub REST API](https://docs.github.com/es/rest) |
| [TypeScript Handbook](https://www.typescriptlang.org/docs/) | [Shadow DOM](https://developer.mozilla.org/es/docs/Web/API/Web_components/Using_shadow_DOM) | [User Endpoints](https://docs.github.com/es/rest/users) |
| [Sass Documentation](https://sass-lang.com/documentation/) | [Constraint Validation](https://developer.mozilla.org/es/docs/Web/API/Constraint_validation) | [Repo Endpoints](https://docs.github.com/es/rest/repos) |

---

## ℹ️ Información del Ejercicio

| Concepto | Detalle |
|----------|---------|
| **Autor** | Nauel Gómez @ KeepCoding |
| **Curso** | Full Stack Web Bootcamp XIX - Frontend Pro |
| **Fecha** | Diciembre 2025 |

---

> *"Code is like humor. When you have to explain it, it’s bad."* – Cory House
