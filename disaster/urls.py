from django.urls import path
from .views import home_view
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("", home_view, name="home")
]


# configure static anf media files
if settings.DEBUG:
    urlpatterns +=  static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns +=  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

