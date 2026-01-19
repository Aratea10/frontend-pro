# 🧹 Frontend Pro - Final Quidditch

<div align="center">

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/multipage/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS&logoColor=white)](https://www.w3.org/Style/CSS/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Parcel](https://img.shields.io/badge/Parcel-3182CE?style=for-the-badge&logo=parcel&logoColor=white)](https://parceljs.org/)
[![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

## 📖 Descripción 
### ¿Qué es este proyecto?
Es una aplicación web dedicada a la gran fin del mundial de **Quidditch de Harry Potter**, desarrollada con **TypeScript**, **SCSS** y **Web Components** como proyecto para el módulo Frontend PRO del Bootcamp de Desarrollo Web FullStack de KeepCoding.

### ¿Por qué lo hice?
- **Motivación personal**: profundizar en el ecosistema de herramientas modernas de frontend.
- **Objetivo académico**: demostrar el dominio de Parcel, TypeScript y metodologías de estilos avanzadas.
- **Desafío técnico**: construir componentes reutilizables (Web Components) y consumir APIs externas de forma eficiente.

---

## ✨ Características principales
### 🎨 Diseño y UX
- ✅ **Diseño Mobile First** - Optimizado para cualquier dispositivo.
- ✅ **Estilos Modulares** - Arquitectura escalable con SCSS Modules y Tailwind CSS.
- ✅ **Componentes Web Nativos** - Modal de personajes encapsulado con Shadow DOM.
- ✅ **UI Temática** - Interfaz inmersiva del universo Harry Potter.

### ⚡ Funcionalidades Técnicas
- ✅ **TypeScript Estricto** - Código robusto y orientado a objetos.
- ✅ **Consumo de API** - Integración con HP-API para datos en tiempo real.
- ✅ **Empaquetado Moderno** - Build optimizado con Parcel.js.
- ✅ **Validación de Formularios** - Gestión de errores y feedback visual (Toast).

### 📱 Responsive Design
- **Móvil**: < 768px (enfoque principal)
- **Tablet**: ≥ 768px
- **Desktop**: ≥ 1024px

---

## 🛠️ Stack Tecnológico

| Frontend | Diseño | Herramientas |
|----------|---------|-------------|
| TypeScript | SCSS Modules | Parcel |
| Web Components | Tailwind CSS | Git / GitHub |
| HTML5 Semantic | Responsive Design | PostHTML |

---

## 🚀 Cómo Ejecutar el Proyecto

### Prerrequisitos
- Node.js (versión LTS recomendada)
- npm (gestor de paquetes)

### Pasos para iniciar
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm start  # o npm run dev
```

### Construir para producción
```bash
npm run build
```

## 📁 Estructura de Archivos
```text
frontend-pro/
├── 📄 index.html        # Página principal (Home)
├── 📄 teams.html        # Listado de equipos
├── 📄 contact.html      # Formulario de contacto
├── 📁 src/
│   ├── 📁 pages/        # Lógica de las páginas (Teams.ts, Contact.ts...)
│   ├── 📁 services/     # Comunicación con APIs (HPApiService.ts)
│   ├── 📁 styles/       # SASS Modules y configuración global
│   ├── 📁 ui/           # Componentes UI (CharacterModal, Toast)
│   └── 📄 main.ts       # Punto de entrada
└── 📁 docs/             # Documentación adicional
```

## 🎓 Aprendizajes y Desafíos

### 💡 Conceptos técnicos dominados
- **Web Components & Shadow DOM** - Encapsulación real de estilos y estructura.
- **TypeScript POO** - Clases, interfaces y tipado fuerte para servicios y vistas.
- **SCSS Architecture** - Uso de partials, mixins y variables avanzadas.
- **Integración Tailwind + SCSS** - Lo mejor de ambos mundos para estilizado.

### 🚧 Desafíos superados
- **Gestión de estado en modales** - Comunicación fluida entre componentes y páginas.
- **Manipulación del DOM tipada** - Evitando 'any' y asegurando tipos correctos.
- **Configuración de Parcel** - Pipeline de assets eficiente.

## 🤝 Guía de Contribución
¿Tienes ideas para mejorar este proyecto? ¡Las contribuciones son bienvenidas!

### 🐛 Reportar un error
1. Ve a [Issues](https://github.com/Aratea10/frontend-pro/issues)
2. Haz clic en "New Issue"
3. Describe el error y cómo reproducirlo 

### 💡 Sugerir una mejora
1. Haz fork del proyecto
2. Crea una rama: `git checkout -b feature/mi-mejora`
3. Commit tus cambios: `git commit -m 'feat: agrega mejora increíble'`
4. Push: `git push origin feature/mi-mejora`

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Esto significa que:
✅ **Puedes**: Usar, copiar, modificar, fusionar, publicar, distribuir
✅ **Debes**: Incluir el copyright original
✅ **No necesitas**: Pedir permiso ni compartir tus modificaciones

## 👨💻 Autor
**Sara Gallego Méndez**
*Estudiante de Desarrollo Web Full Stack y de Administración de Sistemas Informáticos en Red*

## 🌐 Contacto y Redes
- **GitHub**: [Aratea](https://github.com/Aratea10)
- **LinkedIn**: [Sara Gallego Méndez](https://www.linkedin.com/in/sara-gallego-mendez)
- **X**: [@SaraGallegoM10](https://x.com/SaraGallegoM10)

### 🙏 Agradecimientos
- **KeepCoding Bootcamp** - Por la formación y oportunidades.
- **J.K. Rowling** - Por el universo de Harry Potter.

---

## 🏆 Reflexión Final
> *"El código limpio y la arquitectura sólida son la magia detrás de una gran experiencia de usuario."*

Este proyecto representa un paso adelante en mi camino hacia la profesionalización en el desarrollo frontend.

**¿Preguntas o comentarios?** ¡No dudes en contactarme!

---

*Desarrollado con ❤️ como proyecto académico - Bootcamp Full Stack Web XIX*
