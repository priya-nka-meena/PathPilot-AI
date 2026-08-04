from django.urls import path, include
from django.http import JsonResponse

# Shared base API urls. Include app-level routes under /api/...
urlpatterns = [
    path('', lambda request: JsonResponse({'status': 'ok', 'message': 'API root'})),
    path('auth/', include('apps.accounts.urls')),
    path('profile/', include('apps.profiles.urls')),
]
