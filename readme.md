# Octapus – Prueba Técnica (fullstack)

Este proyecto contiene dos aplicaciones:
- backend/ (Django + DRF)
- frontend/ (React + Vite + Tailwind)

## Backend
- Stack: Django, Django REST Framework
- Endpoints principales:
  - Listar alertas: `GET /api/v1/alerts/`
  - Detalle alerta: `GET /api/v1/alerts/{id}/`
  - Evidencias de alerta: `GET /api/v1/alerts/{id}/evidences/`
  - Actualizar evidencia: `PATCH /api/v1/evidences/{id}/` (campo `is_reviewed`)
- Setup rápido:
  - Crear entorno e instalar dependencias: `python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt`
  - Migraciones: `python manage.py migrate`
  - Seed de datos (30 alertas + evidencias): `python manage.py seed_alerts`
  - Servidor: `python manage.py runserver` (http://localhost:8000)

## Frontend
- Stack: React 19, Vite, Tailwind v4, react-router v7, lucide-react
- API base: `http://localhost:8000/api/v1`
- Comandos:
  - Instalar: `npm install`
  - Desarrollo: `npm run dev` (http://localhost:5174)
  - Lint: `npm run lint`
- Funcionalidad:
  - Listado con filtros por severidad/estado y búsqueda por título (mín. 2 caracteres)
  - Columna “Actions” con enlace “View” para abrir el detalle
  - Detalle estilo Gmail renderizado dentro del panel principal (rutas anidadas)
  - Toggle de “Reviewed” sobre evidencias (optimistic update)
- Ruteo:
  - Layout principal: `/`
  - Detalle: `/alerts/:id` (como ruta hija del layout)
  - Import recomendado: `BrowserRouter` desde `react-router-dom`; `Routes/Route/Link/Outlet` desde `react-router`

## Notas
- Mantener las URLs del backend con “/” final (especialmente en `PATCH /evidences/{id}/`).
- El repositorio Git debe inicializarse en la raíz: `prueba-tecnica-octapus/` para versionar backend y frontend juntos.
- .gitignore existen en ambos subproyectos; se puede añadir uno raíz para reglas comunes.

## Estructura
- backend/: Django project y app `alerts`
- frontend/: Vite + React, componentes en `src/components`, servicios en `src/services/api.js`

## Desarrollo
1. Levantar backend en `http://localhost:8000`
2. Levantar frontend en `http://localhost:5174`
3. Usar el enlace “View” en la tabla para abrir el detalle incrustado
