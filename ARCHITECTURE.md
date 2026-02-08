# Architecture Documentation

## 1. Project Structure (`/src`)

The project follows a modular Vue.js structure with Quasar, organized as follows:

- **`boot/`**: Initialization files (e.g., `axios.ts`). Code here runs before the root Vue app instance is instantiated.
- **`layouts/`**: high-level application layouts (e.g., `MainLayout.vue`, `AppLayout.vue`). Used by the router to wrap pages.
- **`pages/`**: Application views/routes. 
  - Organized by domain (e.g., `Finances/`, `Auth/`, `Maintenances/`).
  - Page-specific components are often collocated within the page folder (e.g., `Finances/components/`).
- **`router/`**: Vue Router configuration (`routes.ts`).
- **`services/`**: API interaction layer.
  - Contains class-based services with static methods (e.g., `FinancialService.ts`).
  - Interacts with the backend via the `api()` factory from `boot/axios`.
- **`shared/`**: Reusable code shared across the application.
  - **`assets/`**: Static assets (icons, logos).
  - **`components/`**: generic UI components (e.g., `AppBar.vue`).
  - **`types/`**: TypeScript type definitions.
- **`stores/`**: Pinia state management stores.
  - Contains both Setup Stores (`carStore.ts`) and Options Stores (`financialStore.ts`).
  - Stores interact with `services` to fetch data.

## 2. Data Flow Architecture

The application defines a clear unidirectional data flow:

1.  **Component (View)**: triggers an action (e.g., `onMounted`, button click).
2.  **Store (Pinia)**: The component calls a method in a Pinia store.
3.  **Service (API Layer)**: The store calls a static method in a Service class (e.g., `FinancialService.getBalance`).
4.  **API (Axios)**: The service uses the configured `api()` instance to make an HTTP request.
    - **Interceptor**: The `api()` instance automatically injects the JWT token from storage.
5.  **State Update**: The Service returns data to the Store, which updates its reactive state (`ref` or `state`).
6.  **Reactivity**: Components observing the store state automatically update.

## 3. Key Patterns

- **API Configuration**: Centralized in `src/boot/axios.ts`. Generates an Axios instance with interceptors for Auth (JWT).
- **Styling**: 
  - Uses SCSS with **BEM** (Block Element Modifier) naming convention for custom styles (e.g., `.appbar__title`).
  - Scoped styles in Vue components.
  - Usage of Quasar utility classes is present but secondary to custom SCSS in some components.
- **TypeScript**: 
  - **Types**: Used for unions, props, and simple structures.
  - **Interfaces**: Used for domain entities (`Car`, `DailyCheck`).

## 4. GESTÃO DE CONTEXTO E SKILLS
- `/.context/skills`: Diretório reservado para "Habilidades" importadas de skills.sh ou prompts de sistema personalizados.
  - Cada skill deve ser um ficheiro Markdown (ex: `vue-best-practices.md`, `dotnet-clean-arch.md`).
  - O Agente DEVE ler estes ficheiros quando a tarefa for relacionada com o tema da skill.
