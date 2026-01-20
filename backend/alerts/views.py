from rest_framework import generics, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from .models import Alert, Evidence
from .serializers import AlertSerializer, EvidenceSerializer

# GET /api/v1/alerts/
class AlertListAPIView(generics.ListAPIView):
    serializer_class = AlertSerializer

    def get_queryset(self):
        qs = Alert.objects.all().order_by("-created_at")

        severity = self.request.query_params.get("severity")
        status_param = self.request.query_params.get("status")
        search = self.request.query_params.get("search")

        if severity:
            qs = qs.filter(severity=severity)

        if status_param:
            qs = qs.filter(status=status_param)

        if search:
            qs = qs.filter(title__icontains=search)

        return qs


# GET /api/v1/alerts/<id>/
class AlertDetailAPIView(generics.RetrieveAPIView):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer


# GET /api/v1/alerts/<id>/evidences/
class EvidencePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class AlertEvidencesAPIView(generics.ListAPIView):
    serializer_class = EvidenceSerializer
    pagination_class = EvidencePagination

    def get_queryset(self):
        return (
            Evidence.objects
            .filter(alert_id=self.kwargs["pk"])
            .select_related("alert")   # evita N+1
            .order_by("-created_at")
        )


# PATCH /api/v1/evidences/<id>/
class EvidenceReviewAPIView(APIView):
    def patch(self, request, pk):
        evidence = get_object_or_404(Evidence, pk=pk)

        if "is_reviewed" not in request.data:
            return Response(
                {"detail": "is_reviewed is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        evidence.is_reviewed = request.data["is_reviewed"]
        evidence.save()

        return Response(
            EvidenceSerializer(evidence).data,
            status=status.HTTP_200_OK
        )
