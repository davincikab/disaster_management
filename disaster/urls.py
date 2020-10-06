from django.urls import path
from .views import home_view, get_line_data
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("", home_view, name="home"),
    path("line_data/", get_line_data, name="line-data")
]


# configure static anf media files
if settings.DEBUG:
    urlpatterns +=  static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns +=  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

