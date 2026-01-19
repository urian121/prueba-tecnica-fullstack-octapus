from django.db import models

# Modelo de alerta
class Alert(models.Model):
    # Lista de prioridades de alerta
    SEVERITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
        ("critical", "Critical"),
    ]

    # Lista de estados de alerta
    STATUS_CHOICES = [
        ("open", "Open"),
        ("in_progress", "In Progress"),
        ("closed", "Closed"),
    ]

    title = models.CharField(max_length=255, help_text="Título de la alerta")
    severity = models.CharField(max_length=10, choices=SEVERITY_CHOICES, help_text="Prioridad de la alerta")
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, help_text="Estado de la alerta")
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Ordenar por fecha de creación descendente por defecto
    class Meta:
        # Ordenar por fecha más reciente primero
        db_table = 'tb_alerts'
        ordering = ['-created_at']


    def __str__(self):
        return f"{self.title} - {self.severity} - {self.status}"


# Modelo de evidencia
class Evidence(models.Model):
    # Lista de fuentes de evidencia
    SOURCE_CHOICES = [
        ("twitter", "Twitter"),
        ("linkedin", "LinkedIn"),
        ("instagram", "Instagram"),
        ("web", "Web"),
        ("agent", "Agent"),
    ]

    # Relación con la alerta
    alert = models.ForeignKey(Alert, related_name="evidences", on_delete=models.CASCADE)
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES, help_text="Fuente de la evidencia")
    summary = models.CharField(max_length=255, help_text="Resumen de la evidencia")
    is_reviewed = models.BooleanField(default=False, help_text="Indica si la evidencia ya fue revisada")
    created_at = models.DateTimeField(auto_now_add=True)

    # Ordenar por fecha de creación descendente por defecto
    class Meta:
        db_table = 'tb_evidences'
        # Ordenar por fecha más reciente primero
        ordering = ['-created_at']
    
    # Método para representar el objeto como cadena
    def __str__(self):
        return f"Evidence {self.id} - {self.source}"
