# Prueba Técnica Fullstack – Octapus

Mini funcionalidad **Evidence Inbox** construida con **Django + DRF** (backend) y **React** (frontend).
La arquitectura es REST desacoplada, el frontend consume APIs JSON del backend.


## Stack

### Backend

* Python 3.10+
* Django
* Django Rest Framework
* django-cors-headers
* drf-spectacular (Swagger)

### Frontend

* React 18


## 🚀 Backend – Instalación y ejecución

### 1. Crear entorno virtual

```bash
python -m venv venv
source venv/bin/activate -> Windows
source venv/bin/activate -> Linux/Mac
```

### 2. Instalar dependencias

```bash
pip install django
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

* 20–30 alertas
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

  * body:

    ```json
    {
      "is_reviewed": true
    }
    ```

## ⚠️ Notas importantes
* Se evita N+1 queries usando `select_related`
* Manejo correcto de errores HTTP (400 / 404)
* Paginación activa por defecto


## 🐞 Debug / Bug Fix

La solución incluye fixes para:

* Loop infinito en React por mal uso de `useEffect`
* Error por endpoint sin slash final (`/`)
* Optimización backend para evitar N+1 queries

## Estado del proyecto

* Backend completo y funcional
* Seed de datos realista
* API documentada
* Listo para consumo desde React