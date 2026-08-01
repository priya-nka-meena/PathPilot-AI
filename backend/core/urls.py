from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Base API route for all apps
    path('api/', include('apps.common.urls')),
]
