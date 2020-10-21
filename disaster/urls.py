from django.urls import path
from .views import home_view, get_line_data, get_point_data, get_polygon_data, \
    camps, create_update_camp, delete_camp, get_camps, report_user_location
from django.conf import settings
from django.conf.urls.static import static

app_name = 'disaster'

urlpatterns = [
    path("", home_view, name="home"),
    path("line_data/", get_line_data, name="line-data"),
    path("polygon_data/", get_polygon_data, name="polygon-data"),
    path("point_data/", get_point_data, name="point-data"),
    path("camps/", camps, name="camps"),
    path("get_camps/", get_camps, name="get-camps"),
    path("create_update_camp/", create_update_camp, name="create-update-camp"),
    path("delete_camp/<int:camp_id>/", delete_camp, name="delete-camps"),
    path("add_user_location/", report_user_location, name="user-location")
]


# configure static anf media files
if settings.DEBUG:
    urlpatterns +=  static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns +=  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

