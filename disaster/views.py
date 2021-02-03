from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST

# serializer
from django.core.serializers import serialize
from django.contrib.gis.geos import GEOSGeometry

# models 
from .models import *
from .forms import CreateCampForm, UserLocationForm

# util
import json

# Create your views here.
def home_view(reqeust):
    form = UserLocationForm()
    return render(reqeust, "disaster/index.html", {'form':form})

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
    camps = serialize("geojson", Camps.objects.all())


    context = {
        'hospital':hospital, 'primary':primary, 'secondary':secondary, 'irrigation':irrigation, 
        'village':village, 'trading':trading, 'waterPoint':waterPoint, 'settlement':settlement,
        'camp':camps
    }
    return HttpResponse(json.dumps(context))

# read line data
def get_line_data(request):
    river = serialize("geojson", Rivernzoia.objects.all())
    return HttpResponse(river)

# read polygon data
def get_polygon_data(request):
    basin = serialize("geojson", Basin.objects.all())
    lake = serialize("geojson", Lakevictoria.objects.all())
    cropland = serialize("geojson", Croplands.objects.all())

    context = {'basin':basin, 'lake':lake, 'cropland':cropland}
    return HttpResponse(json.dumps(context))


@login_required(login_url='/user/login/')
def camps(request):
    form = CreateCampForm()
    return render(request, 'disaster/camps.html', {'form':form})


# Camps CRUD
def create_update_camp(request):
    print("Creating")
    if request.method == 'POST':
        print("Recieved Request")
        print(request.POST)
        if request.POST.get('camp_id'):
            try:
                updateCamp = Camps.objects.get(id = request.POST.get('camp_id'))
                form = CreateCampForm(request.POST or None, request.FILES, instance=updateCamp)
            except Camps.DoesNotExist:
                return HttpResponse(json.dumps({'message':'Error: No camp with such Id'}))
        else:
            print("Createing Form")
            form = CreateCampForm(request.POST, request.FILES)

        if form.is_valid():
            print("Valid")
            geom = request.POST.get('geom')
            camp = form.save(commit=False)
            camp.geom = GEOSGeometry(f'POINT ({geom})')
            camp.save()
            return HttpResponse(json.dumps({'message':'success'}))
        else:
            print("Invalid Form Data")
            return HttpResponse(json.dumps({'error':form.errors}))

    else:
        return HttpResponse(json.dumps({'message':'404 Error'}))

def get_camps(request):
    camps = serialize("geojson", Camps.objects.all())
    return HttpResponse(camps)

@csrf_exempt
def delete_camp(request, camp_id):
    print(camp_id)
    if request.method == "DELETE":
        try:
            camp = Camps.objects.get(id = camp_id)
            camp.delete()
            return HttpResponse(json.dumps({'message':'Delete operation Successful'}))
        except Camps.DoesNotExist:
            return HttpResponse(json.dumps({'message':'Error: No such camp'}))


# Add user Location
@require_POST
def report_user_location(request):
    print(request.POST)
    form = UserLocationForm(request.POST, request.FILES)

    if form.is_valid():
        geom = request.POST.get('geom')
        user_location = form.save(commit=False)
        user_location.geom = GEOSGeometry(f'POINT ({geom})')

        user_location.save()
        return HttpResponse(json.dumps({'message':"success"}))
    else:
        HttpResponse(json.dumps({'message':"error"}))

# serialize reported location
def reported_location(request):
    return render(request, 'disaster/reported_location.html')

def get_reported_location(request):
    distress_locations = serialize('geojson', UserLocation.objects.all())
    return HttpResponse(json.dumps({'location':distress_locations}))


def get_affected_households(request):
    # 
    flooded_geom = Floodedarea.objects.all()
    # houses = Householdsdata.objects.get(geom__intesects=)
    return HttpResponse(flooded_geom)