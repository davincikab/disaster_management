from django.shortcuts import render
from django.http import HttpResponse

# serializer
from django.core.serializers import serialize

# models 
from .models import *

# Create your views here.
def home_view(reqeust):
    return render(reqeust, "disaster/index.html")

# read point data
def get_point_data(request):
    return HttpResponse("Point Data")

# read line data
def get_line_data(request):
    river = serialize("geojson", Rivernzoia.objects.all())
    return HttpResponse(river)

def get_polygon_data(request):
    return HttpResponse("Polygon Data")
# read polygon data