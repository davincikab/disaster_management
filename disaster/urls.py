from django.urls import path
from .views import home_view, get_line_data, get_point_data, get_polygon_data
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("", home_view, name="home"),
    path("line_data/", get_line_data, name="line-data"),
    path("polygon_data/", get_polygon_data, name="polygon-data"),
    path("point_data/", get_point_data, name="point-data")
]


# configure static anf media files
if settings.DEBUG:
    urlpatterns +=  static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns +=  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

