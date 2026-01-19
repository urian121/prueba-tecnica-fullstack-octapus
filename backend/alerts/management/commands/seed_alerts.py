import random
from django.core.management.base import BaseCommand
from faker import Faker

from alerts.models import Alert, Evidence

# Crear instancia de Faker
fake = Faker()


class Command(BaseCommand):
    help = "Seed alerts and evidences"

    def handle(self, *args, **options):
        self.stdout.write("Creando datos de prueba...")

        severities = ["low", "medium", "high", "critical"]
        statuses = ["open", "in_progress", "closed"]
        sources = ["twitter", "linkedin", "instagram", "web", "agent"]

        Alert.objects.all().delete()

        alerts_count = 30

        for _ in range(alerts_count):
            alert = Alert.objects.create(
                title=fake.sentence(nb_words=6),
                severity=random.choice(severities),
                status=random.choice(statuses),
            )

            evidences_count = random.randint(5, 15)

            evidences = [
                Evidence(
                    alert=alert,
                    source=random.choice(sources),
                    summary=fake.text(max_nb_chars=120),
                    is_reviewed=random.choice([True, False]),
                )
                for _ in range(evidences_count)
            ]

            Evidence.objects.bulk_create(evidences)

        self.stdout.write(self.style.SUCCESS("Seed completado"))
