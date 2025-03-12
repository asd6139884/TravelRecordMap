from django.db import models

# Create your models here.
class Map(models.Model):
    name = models.CharField(max_length=255)  # 地圖名稱
    created_at = models.DateTimeField(auto_now_add=True)  # 創建時間

    def __str__(self):
        return self.name