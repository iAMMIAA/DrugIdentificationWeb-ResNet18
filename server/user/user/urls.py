from django.contrib import admin
from django.urls import path
from django.urls import path, include
from account.views import account, user
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('account.urls')),  # Include the app's URLs    
    path('', account),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)