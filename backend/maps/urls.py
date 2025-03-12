from django.urls import path
from .views import MapListCreateView, MapDeleteView

urlpatterns = [
    path('maps/', MapListCreateView.as_view(), name='map-list-create'),
    path('maps/<int:pk>/', MapDeleteView.as_view(), name='map-delete'),
]
