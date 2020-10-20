from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("disaster.urls")),
    path("user/", include("user.urls"))
]

admin.site.site_header = "Disaster Management"
admin.site.title_header = "Disaster Management"
