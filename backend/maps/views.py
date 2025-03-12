from rest_framework import generics
from rest_framework.response import Response
from .models import Map
from .serializers import MapSerializer

class MapListCreateView(generics.ListCreateAPIView):
    queryset = Map.objects.all()
    serializer_class = MapSerializer

class MapDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Map.objects.all()
    serializer_class = MapSerializer