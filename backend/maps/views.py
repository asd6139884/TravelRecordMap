from rest_framework import generics
from .models import Map
from .serializers import MapSerializer

# 取得所有地圖 & 建立新地圖
class MapListCreateView(generics.ListCreateAPIView):
    queryset = Map.objects.all()
    serializer_class = MapSerializer

# 刪除地圖
class MapDeleteView(generics.DestroyAPIView):
    queryset = Map.objects.all()
    serializer_class = MapSerializer
