# aleho-dev-frontend

¡Bienvenido al frontend de aleho-dev! Esta aplicación está construida con React y Vite, diseñada para ser rápida, escalable y visualmente atractiva utilizando Tailwind CSS y shadcn/ui.

## 📑 Tabla de Contenidos

- [aleho-dev-frontend](#aleho-dev-frontend)
  - [📑 Tabla de Contenidos](#-tabla-de-contenidos)
  - [🧐 Sobre el Proyecto](#-sobre-el-proyecto)
  - [🚀 Empezando](#-empezando)
    - [Prerrequisitos](#prerrequisitos)
    - [Instalación](#instalación)
  - [🛠️ Uso](#️-uso)
    - [Scripts Disponibles](#scripts-disponibles)
  - [✨ Características](#-características)
  - [📂 Estructura del Proyecto](#-estructura-del-proyecto)
  - [💻 Tecnologías Utilizadas](#-tecnologías-utilizadas)
  - [🤝 Contribuciones](#-contribuciones)
  - [📞 Contacto](#-contacto)

## 🧐 Sobre el Proyecto

Este proyecto es la interfaz de usuario para la plataforma `aleho-dev`. Proporciona una experiencia de usuario moderna y receptiva, interactuando con el backend para gestionar usuarios, chatbots y visualización de datos.

## 🚀 Empezando

Sigue estos pasos para tener el frontend funcionando en tu entorno local.

### Prerrequisitos

*   **Node.js y pnpm:** Asegúrate de tener instaladas las últimas versiones. Puedes descargarlas desde [nodejs.org](https://nodejs.org/).
*   **Un editor de código:** Visual Studio Code, Sublime Text, o tu preferido.

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/Aleho84/aleho-dev-frontend.git
    ```

2.  **Navega al directorio del proyecto:**
    ```bash
    cd aleho-dev-frontend
    ```

3.  **Instala las dependencias:**
    ```bash
    pnpm install
    ```

4.  **Configura las variables de entorno:** Crea un archivo `.env` en la raíz del proyecto si es necesario (consulta la configuración del proyecto para variables específicas como `VITE_BACKEND_URL`).

5.  **Inicia el servidor de desarrollo:**
    ```bash
    pnpm dev
    ```

6.  **¡Explora la aplicación!** 🎉 El frontend estará disponible en `http://localhost:5173` (o el puerto que indique la consola).

## 🛠️ Uso

### Scripts Disponibles

En el `package.json`, encontrarás varios scripts para facilitar el desarrollo:

*   `pnpm dev`: Inicia el servidor de desarrollo con Vite.
*   `pnpm build`: Construye la aplicación para producción.
*   `pnpm preview`: Previsualiza la build de producción localmente.
*   `pnpm lint`: Ejecuta ESLint para verificar la calidad del código.

## ✨ Características

*   **React + Vite:** Desarrollo rápido con recarga en caliente (HMR) instantánea.
*   **Tailwind CSS:** Diseño moderno y responsivo mediante utilidades.
*   **Shadcn/ui:** Componentes de interfaz de usuario accesibles y personalizables.
*   **Gestión de Rutas:** Navegación fluida con React Router.
*   **Iconos:** Integración con Lucide React para iconografía consistente.

## 📂 Estructura del Proyecto

El proyecto sigue una estructura organizada para facilitar el mantenimiento:

```
aleho-dev-frontend/
├── dist/           # Archivos de la build de producción
├── public/         # Archivos estáticos (imágenes, favicon)
├── src/            # Código fuente
│   ├── components/ # Componentes reutilizables (UI, Layouts)
│   ├── config/     # Archivos de configuración
│   ├── context/    # Contextos de React (Estado Global)
│   ├── lib/        # Utilidades y funciones auxiliares
│   ├── services/   # Servicios de API y Autenticación
│   ├── App.jsx     # Componente principal
│   └── main.jsx    # Punto de entrada
├── index.html      # Plantilla HTML principal
├── package.json    # Dependencias y scripts
├── vite.config.js  # Configuración de Vite
└── tailwind.config.js # Configuración de Tailwind CSS
```

## 💻 Tecnologías Utilizadas

*   **React:** Librería para construir interfaces de usuario.
*   **Vite:** Herramienta de compilación ultrarrápida.
*   **Tailwind CSS:** Framework de CSS.
*   **Radix UI / Shadcn:** Primitivas de componentes accesibles.
*   **React Router:** Enrutamiento declarativo.
*   **Lucide React:** Iconos vectoriales ligeros.
*   **Axios / Fetch:** Para peticiones HTTP (según implementación en servicios).

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres mejorar este proyecto, por favor, haz un fork del repositorio, realiza tus cambios y crea un pull request.

## 📞 Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme.

*   **Email:** alejandro.r.abraham@gmail.com
*   **GitHub:** [Aleho84](https://github.com/Aleho84)
