from django.contrib import admin
from .models import Alert, Evidence

# Registrar modelo Alert y Evidence en el admin de Django
@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'severity', 'status', 'created_at']
    list_filter = ['severity', 'status']
    search_fields = ['title']

@admin.register(Evidence)
class EvidenceAdmin(admin.ModelAdmin):
    list_display = ['id', 'alert', 'source', 'is_reviewed', 'created_at']
    list_filter = ['source', 'is_reviewed']