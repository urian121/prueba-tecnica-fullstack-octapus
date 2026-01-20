# Evidence Inbox – Frontend (React + Vite)

UI moderna para listar y filtrar alertas con paginación y búsqueda con debounce.
Detalle incrustado estilo Gmail; integra con API Django/DRF, Tailwind v4 y React Router v7.

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


## Puesta en marcha
1. Levanta el backend en `http://localhost:8000`
2. Ejecuta `npm run dev` en `frontend/`
3. Usa el enlace "View" para abrir el detalle incrustado
