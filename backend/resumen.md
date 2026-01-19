## 1. SETUP INICIAL

```bash
# Crear directorio del proyecto
mkdir backend
cd backend

# Crear entorno virtual de Python
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Crear archivo de dependencias
```

```bash
# Instalar dependencias
pip install -r requirements.txt

# Crear migraciones
python manage.py makemigrations

# Correr migraciones
python manage.py migrate
# Crear superusuario
python manage.py createsuperuser

# Ejecutar seed de datos
python manage.py seed_alerts

# Correr servidor de desarrollo
python manage.py runserver

# Verificar configuración
python manage.py check
```


https://pypi.org/project/django-cors-headers/

# select_related: Para ForeignKey y OneToOne (hace JOIN en 1 query)
# Ejemplo: Evidence.objects.select_related('alert')

# prefetch_related: Para ManyToMany y reverse ForeignKey (hace 2 queries optimizadas)
# Ejemplo: Alert.objects.prefetch_related('evidences')


# Endpoints

## GET /api/v1/alerts/
Debe tener:
- Filtros: severity y status
- Búsqueda por título (contains/icontains)
- Paginación
- Ordenar por -created_at (más recientes primero)

## GET /api/v1/alerts/<id>/
- Detalle de una alerta específica
Tenemos:
RetrieveAPIView

## GET /api/v1/alerts/<id>/evidences/
- Lista de evidencias de esa alerta
- Paginado
- Ordenar por -created_at
Tenemos:
ListAPIView

## PATCH /api/v1/evidences/<id>/
- SOLO actualizar el campo is_reviewed
- No permitir modificar otros campos

## RESUMEN
✅ 4 endpoints implementados
✅ Filtros por severity, status y búsqueda por título
✅ Paginación automática (10 por página)
✅ Bug 3 resuelto con select_related
✅ Solo actualiza is_reviewed en PATCH
✅ 30 alertas con 5-15 evidencias cada una

Requisitos técnicos:
✅ Evitar N+1 queries (usar select_related/prefetch_related)
✅ Manejar errores HTTP (404, 400) correctamente
✅ Crear fixtures/seed con 20-30 alertas, cada una con 5-15 evidencias

## 12. EXPLICACIÓN BUG 3 - N+1 QUERIES

**PROBLEMA:**
```python
# SIN select_related:
Evidence.objects.filter(alert_id=pk).order_by("-created_at")
# = 1 query + 100 queries (una por cada evidence.alert) = 101 queries
```

**SOLUCIÓN:**
```python
# CON select_related:
Evidence.objects.filter(alert_id=pk).select_related("alert").order_by("-created_at")
# = 1 query con JOIN = 1 query total
```