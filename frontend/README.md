# Frontend – Evidence Inbox (React)

Aplicación de interfaz para listar alertas, filtrarlas y ver su detalle incrustado (estilo Gmail).

## Stack
- React 19 + Vite
- Tailwind CSS v4
- React Router v7 (BrowserRouter desde react-router-dom; Routes/Route/Link/Outlet desde react-router)
- Axios (servicios en `src/services/api.js`)

## API
- Base: `http://localhost:8000/api/v1`
- Endpoints usados: `/alerts/`, `/alerts/:id/`, `/alerts/:id/evidences/`, `PATCH /evidences/:id/`

## Scripts
- Instalar: `npm install`
- Desarrollo: `npm run dev` (http://localhost:5174)
- Lint: `npm run lint`

## Rutas
- `/` Lista de alertas (layout principal)
- `/alerts/:id` Detalle incrustado dentro del layout (Outlet)

## Funcionalidad
- Filtros por severidad y estado, búsqueda por título (≥ 2 chars)
- Paginación server-side
- Columna "Actions" con enlace "View" para abrir detalle
- Toggle de "Reviewed" en evidencias (actualiza backend)

## Estructura
- `src/components/AlertsInbox.jsx` Layout y lista con filtros y paginación
- `src/components/AlertDetail.jsx` Detalle incrustado con evidencias
- `src/components/AlertRow.jsx` Fila de tabla (incluye enlace a detalle)
- `src/components/skeleton/*` Placeholders de carga
- `src/services/api.js` Llamadas al backend
- `src/utils/badges.js` Clases de estilo para badges
- `src/App.jsx` Configuración de rutas

## Puesta en marcha
1. Levanta el backend en `http://localhost:8000`
2. Ejecuta `npm run dev` en `frontend/`
3. Usa el enlace "View" para abrir el detalle incrustado
