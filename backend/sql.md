Buenísima pregunta 👌 y **clave real de backend**.
Te lo explico **en humano**, sin jerga rara.

---

## 🤯 Qué es el problema **N+1**

Imagina esto:

* Tienes **1 alerta**
* Esa alerta tiene **10 evidencias**

Tú haces:

```python
evidences = Evidence.objects.filter(alert_id=1)
```

👉 **Eso es 1 query** (la N).

Ahora en el serializer haces algo como:

```python
evidence.alert.title
```

¿Qué pasa?

* Django **no tiene cargado** el `alert`
* Entonces hace **OTRA query** para cada evidence

Resultado:

* 1 query para traer evidences
* +10 queries para traer el alert de cada una

💥 Total: **11 queries**
Eso es **N+1** (1 + N)

---

## 📉 Por qué es un problema

* Más queries = más tiempo
* Más DB hits = backend lento
* Con 100 evidences → 101 queries 💀

En local “funciona”, en producción **muere**.

---

## 🛠️ La solución

### 🔹 `select_related` (relaciones FK / OneToOne)

Le dices a Django:

> “tráeme todo de una vez con JOIN”

```python
Evidence.objects.select_related("alert")
```

Ahora:

* 1 sola query
* evidencia + alerta juntas

✔️ rápido
✔️ limpio

---

### 🔹 `prefetch_related` (relaciones inversas / many)

Para el caso contrario:

```python
Alert.objects.prefetch_related("evidences")
```

Django hace:

* 1 query para alerts
* 1 query para evidences
* Los une en memoria

✔️ sigue siendo 2 queries
✔️ no 1 + N

---

## 🧠 Cuándo usar cada uno

| Relación          | Usa                |
| ----------------- | ------------------ |
| FK / OneToOne     | `select_related`   |
| Many / reverse FK | `prefetch_related` |

---

## 🧪 Ejemplo concreto de tu prueba

### ❌ Código lento (N+1)

```python
evidences = Evidence.objects.filter(alert_id=pk)
for e in evidences:
    print(e.alert.title)  # 💥 query por cada evidence
```

---

### ✅ Código correcto

```python
evidences = (
    Evidence.objects
    .filter(alert_id=pk)
    .select_related("alert")
)
```

---

## 🎯 Por qué esto ES CLAVE en la prueba

El PDF lo menciona explícitamente porque:

* quieren ver que **piensas en performance**
* no solo que “funcione”
* es un bug **muy común en producción**

---

## Frase para entrevista 😄

> “Detecté un problema de N+1 queries al acceder a relaciones FK y lo solucioné usando `select_related` para reducir el número de queries a una sola.”

Con eso quedas como rey 👑


Resumen **ultra corto y claro** 👇

---

## `select_related`

👉 **Une tablas con SQL JOIN**

* Se usa en **ForeignKey / OneToOne**
* Trae todo en **una sola query**
* Más rápido para relaciones simples

```python
Evidence.objects.select_related("alert")
```

🧠 *“Tráeme la evidence y su alert de una vez”*

---

## `prefetch_related`

👉 **Hace varias queries y las une en memoria**

* Se usa en relaciones **many / reverse**
* Evita hacer una query por cada objeto

```python
Alert.objects.prefetch_related("evidences")
```

🧠 *“Tráeme alerts y luego todas sus evidences”*

---

## Regla rápida

| Relación              | Usa                |
| --------------------- | ------------------ |
| ForeignKey / OneToOne | `select_related`   |
| Many / reverse FK     | `prefetch_related` |

---

## Para qué sirven

✔️ Evitar N+1 queries
✔️ Backend más rápido
✔️ Menos golpes a la DB

Si entiendes esto, ya estás por encima del promedio 😄

