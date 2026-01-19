from django.urls import path
from .views import (
    AlertListAPIView,
    AlertDetailAPIView,
    AlertEvidencesAPIView,
    EvidenceReviewAPIView,
)

urlpatterns = [
    path("alerts/", AlertListAPIView.as_view()),
    path("alerts/<int:pk>/", AlertDetailAPIView.as_view()),
    path("alerts/<int:pk>/evidences/", AlertEvidencesAPIView.as_view()),
    path("evidences/<int:pk>/", EvidenceReviewAPIView.as_view()),
]
