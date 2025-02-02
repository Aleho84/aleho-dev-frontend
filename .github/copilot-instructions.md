# AI Coding Agent Instructions for `aleho-dev-frontend`

## Project Overview
This project is a React-based frontend application built with Vite. It uses modern tools and libraries such as Tailwind CSS for styling and a modular component structure. The codebase is organized to support scalability and maintainability.

### Key Features:
- **React + Vite**: Fast development with Hot Module Replacement (HMR).
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Component-based Architecture**: Modular and reusable components.
- **API Integration**: Services for interacting with backend APIs.

## Codebase Structure
- `src/`
  - `components/`: Contains reusable UI components and feature-specific components.
    - `child/`: Components like `CardStatus`, `ErrorDisplay`, etc.
    - `main/`: Pages such as `Dashboard`, `Login`, `Notfoundpage`.
    - `ui/`: Generic UI components like `button`, `card`, `input`.
  - `config/`: Configuration files, e.g., `apiConfig.js`.
  - `context/`: React Context files for state management.
  - `lib/`: Utility functions.
  - `services/`: API and authentication services.
- `public/`: Static assets like `favicon.ico` and `logo.jpg`.
- `tailwind.config.js`: Tailwind CSS configuration.
- `vite.config.js`: Vite configuration.

## Developer Workflows
### Build and Run
- Install dependencies: `pnpm install`
- Start development server: `pnpm dev`
- Build for production: `pnpm build`
- Preview production build: `pnpm preview`

### Testing
- **Unit Tests**: Add test files alongside components (e.g., `Component.test.jsx`).
- Run tests: `pnpm test`

### Debugging
- Use browser developer tools.
- Check API responses in `services/api.js`.

## Project-Specific Conventions
- **Component Naming**: Use PascalCase for component files (e.g., `CardStatus.jsx`).
- **State Management**: Use React Context for global state (e.g., `LoadingContext.jsx`).
- **Styling**: Use Tailwind CSS classes directly in JSX.
- **API Services**: Centralize API calls in `services/`.

## Integration Points
- **Backend APIs**: Defined in `services/api.js`.
- **Authentication**: Handled in `services/auth.js`.
- **Icons**: Managed via `services/lucideIcon.js`.

## Examples
### Adding a New Component
1. Create the component file in the appropriate directory (e.g., `src/components/ui/NewComponent.jsx`).
2. Follow the existing patterns for props and state management.
3. Add Tailwind CSS classes for styling.

### API Call Example
```javascript
import { fetchData } from '../services/api';

fetchData('/endpoint').then(response => {
  console.log(response);
});
```

---

Feel free to update this document as the project evolves!