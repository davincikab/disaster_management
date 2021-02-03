from django.contrib import admin

# 3rd party
from leaflet.admin import LeafletGeoAdmin

# local
from .models import UserLocation

# Register your models here.
admin.site.register(UserLocation, LeafletGeoAdmin)
