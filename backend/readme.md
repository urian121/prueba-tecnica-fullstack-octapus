# API con Django + DRF

API REST para Evidence Inbox (alerts/evidences) construida con Django + DRF.
Lista alertas con filtros (severity, status), búsqueda y paginación; incluye detalle y evidencias.
Actualización de evidencias vía PATCH /api/v1/evidences/:id/ (is_reviewed, requiere slash final).
Respuestas JSON con CORS habilitado; consultas optimizadas evitando N+1.

### Backend

* Python 3.10+
* Django
* Django Rest Framework
* django-cors-headers
* drf-spectacular (Swagger)

### Frontend

* React 19
* Vite
* Tailwind v4
* react-router v7
* lucide-react


## 🚀 Backend – Instalación y ejecución

### 1. Crear entorno virtual

```bash
python -m venv venv
source venv/bin/activate -> Windows
source venv/bin/activate -> Linux/Mac
```

### 2. Instalar dependencias

```bash
pip install django==5.2
pip install djangorestframework
pip install django-cors-headers
pip install drf-spectacular
pip install faker
```

### 3. Migraciones

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Seed de datos

Genera:

* 20–40 alertas
* 5–15 evidencias por alerta
* severities, status y sources mezclados

```bash
python manage.py seed_alerts
```

### 5. Levantar backend

```bash
python manage.py runserver
```

Backend disponible en:

```
http://127.0.0.1:8000
```

## 6. API Docs (Swagger)

Swagger disponible en:

```
http://127.0.0.1:8000/api/docs/
```

## Endpoints principales

### Alerts

* `GET /api/v1/alerts/`

  * filtros: `severity`, `status`
  * search: `search` (por título)
  * paginación
  * orden: `-created_at`

* `GET /api/v1/alerts/<id>/`

* `GET /api/v1/alerts/<id>/evidences/`

  * paginación
  * orden: `-created_at`

### Evidences

* `PATCH /api/v1/evidences/<id>/`
