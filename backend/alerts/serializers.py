from rest_framework import serializers
from .models import Alert, Evidence

# # Serializer para listar alertas (GET /api/v1/alerts/)
class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        # Campos que se devuelven en JSON
        fields = ['id', 'title', 'severity', 'status', 'created_at']
        # Campos que no se pueden modificar
        read_only_fields = ['id', 'created_at']


# Serializer para listar evidencias (GET /api/v1/alerts//evidences/)
class EvidenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evidence
        fields = ['id', 'alert', 'source', 'summary', 'is_reviewed', 'created_at']
        read_only_fields = ['id', 'alert', 'created_at']