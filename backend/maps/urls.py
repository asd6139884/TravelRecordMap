from django.urls import path
from .views import MapListCreateView, MapDetailView

urlpatterns = [
    path('maps/', MapListCreateView.as_view(), name='map-list-create'),
    path('maps/<int:pk>/', MapDetailView.as_view(), name='map-detail'),
]
