from django.shortcuts import render
from django.http import HttpResponse

# serializer
from django.core.serializers import serialize

# models 
from .models import *

# util
import json

# Create your views here.
def home_view(reqeust):
    return render(reqeust, "disaster/index.html")

# read point data
def get_point_data(request):
    hospital = serialize("geojson", Hospitals.objects.all())
    primary = serialize("geojson", Prischools.objects.all())
    secondary = serialize("geojson", Secschools.objects.all())
    irrigation = serialize("geojson", Irrigationschemes.objects.all()) 
    village = serialize("geojson", Villages.objects.all())
    trading = serialize("geojson", Tradingcentres.objects.all())
    waterPoint = serialize("geojson", Waterpoints.objects.all())
    settlement = serialize("geojson", Settlementschemes.objects.all())

    context = {'hospital':hospital, 'primary':primary, 'secondary':secondary, 'irrigation':irrigation, 'village':village, 'trading':trading, 'waterPoint':waterPoint, 'settlement':settlement}
    return HttpResponse(json.dumps(context))

# read line data
def get_line_data(request):
    river = serialize("geojson", Rivernzoia.objects.all())
    return HttpResponse(river)

def get_polygon_data(request):
    basin = serialize("geojson", Basin.objects.all())
    lake = serialize("geojson", Lakevictoria.objects.all())

    context = {'basin':basin, 'lake':lake}
    return HttpResponse(json.dumps(context))
# read polygon data