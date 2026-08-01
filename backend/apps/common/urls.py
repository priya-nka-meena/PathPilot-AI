from django.urls import path
from django.http import JsonResponse

# Shared base API urls. Keep empty now; apps will include their own urls under /api/...
urlpatterns = [
    path('', lambda request: JsonResponse({'status': 'ok', 'message': 'API root'})),
]
