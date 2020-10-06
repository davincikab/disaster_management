# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.contrib.gis.db import models


class Basin(models.Model):
    geom = models.MultiPolygonField(blank=True, null=True)
    area = models.FloatField(blank=True, null=True)
    perimeter = models.FloatField(blank=True, null=True)
    lbasin_field = models.FloatField(db_column='lbasin_', blank=True, null=True)  # Field renamed because it ended with '_'.
    lbasin_id = models.FloatField(blank=True, null=True)
    boundc_field = models.FloatField(db_column='boundc_', blank=True, null=True)  # Field renamed because it ended with '_'.
    boundc_id = models.FloatField(blank=True, null=True)
    bound = models.IntegerField(blank=True, null=True)
    basin_gejo = models.FloatField(blank=True, null=True)
    item001 = models.FloatField(blank=True, null=True)
    basin_1 = models.CharField(max_length=-1, blank=True, null=True)
    basin_2 = models.CharField(max_length=-1, blank=True, null=True)
    basin_3 = models.CharField(max_length=-1, blank=True, null=True)
    gejo = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=-1, blank=True, null=True)
    area_1 = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'basin'


class Constituencies(models.Model):
    geom = models.MultiPolygonField(blank=True, null=True)
    objectid = models.FloatField(blank=True, null=True)
    st_area_sh = models.FloatField(blank=True, null=True)
    constituen = models.CharField(max_length=-1, blank=True, null=True)
    county = models.CharField(max_length=-1, blank=True, null=True)
    population = models.FloatField(blank=True, null=True)
    populati_1 = models.IntegerField(blank=True, null=True)
    numberofho = models.CharField(max_length=-1, blank=True, null=True)
    averagehou = models.FloatField(blank=True, null=True)
    area = models.FloatField(blank=True, null=True)
    below18 = models.FloatField(blank=True, null=True)
    household = models.FloatField(blank=True, null=True)
    households = models.CharField(max_length=-1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'constituencies'


class Hospitals(models.Model):
    geom = models.PointField(blank=True, null=True)
    fno = models.IntegerField(blank=True, null=True)
    f_name = models.CharField(max_length=-1, blank=True, null=True)
    hmis_field = models.IntegerField(db_column='hmis_', blank=True, null=True)  # Field renamed because it ended with '_'.
    prov = models.CharField(max_length=-1, blank=True, null=True)
    dist = models.CharField(max_length=-1, blank=True, null=True)
    division = models.CharField(max_length=-1, blank=True, null=True)
    location = models.CharField(max_length=-1, blank=True, null=True)
    sub_locati = models.CharField(max_length=-1, blank=True, null=True)
    long = models.FloatField(blank=True, null=True)
    lat = models.FloatField(blank=True, null=True)
    spatial_re = models.CharField(max_length=-1, blank=True, null=True)
    f_type = models.IntegerField(blank=True, null=True)
    agency = models.CharField(max_length=-1, blank=True, null=True)
    n14 = models.CharField(max_length=-1, blank=True, null=True)
    n15 = models.CharField(max_length=-1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'hospitals'


class Irrigationschemes(models.Model):
    geom = models.PointField(blank=True, null=True)
    province = models.CharField(max_length=-1, blank=True, null=True)
    district = models.CharField(max_length=-1, blank=True, null=True)
    division = models.CharField(max_length=-1, blank=True, null=True)
    scheme_nam = models.CharField(max_length=-1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'irrigationschemes'


class Lakevictoria(models.Model):
    geom = models.MultiPolygonField(blank=True, null=True)
    lcid = models.CharField(max_length=-1, blank=True, null=True)
    landcover = models.CharField(max_length=-1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'lakevictoria'


class Prischools(models.Model):
    geom = models.PointField(blank=True, null=True)
    objectid = models.IntegerField(blank=True, null=True)
    name_of_sc = models.CharField(max_length=-1, blank=True, null=True)
    province = models.CharField(max_length=-1, blank=True, null=True)
    district = models.CharField(max_length=-1, blank=True, null=True)
    division = models.CharField(max_length=-1, blank=True, null=True)
    location = models.CharField(max_length=-1, blank=True, null=True)
    sublocatio = models.CharField(max_length=-1, blank=True, null=True)
    costituenc = models.CharField(max_length=-1, blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    acreage = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'prischools'


class Rivernzoia(models.Model):
    geom = models.MultiLineStringField(blank=True, null=True)
    osm_id = models.CharField(max_length=-1, blank=True, null=True)
    code = models.IntegerField(blank=True, null=True)
    fclass = models.CharField(max_length=-1, blank=True, null=True)
    width = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=-1, blank=True, null=True)
    length = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rivernzoia'


class Roads(models.Model):
    geom = models.MultiLineStringField(blank=True, null=True)
    osm_id = models.CharField(max_length=-1, blank=True, null=True)
    code = models.IntegerField(blank=True, null=True)
    fclass = models.CharField(max_length=-1, blank=True, null=True)
    name = models.CharField(max_length=-1, blank=True, null=True)
    oneway = models.CharField(max_length=-1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'roads'


class Secschools(models.Model):
    geom = models.PointField(blank=True, null=True)
    objectid = models.IntegerField(blank=True, null=True)
    name_of_sc = models.CharField(max_length=-1, blank=True, null=True)
    province = models.CharField(max_length=-1, blank=True, null=True)
    district = models.CharField(max_length=-1, blank=True, null=True)
    division = models.CharField(max_length=-1, blank=True, null=True)
    costituenc = models.CharField(max_length=-1, blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'secschools'


class Settlementschemes(models.Model):
    geom = models.PointField(blank=True, null=True)
    z_field = models.IntegerField(db_column='z__', blank=True, null=True)  # Field renamed because it contained more than one '_' in a row. Field renamed because it ended with '_'.
    ufi = models.IntegerField(blank=True, null=True)
    uni = models.IntegerField(blank=True, null=True)
    dlat = models.FloatField(blank=True, null=True)
    dlong = models.FloatField(blank=True, null=True)
    lat = models.IntegerField(blank=True, null=True)
    long = models.IntegerField(blank=True, null=True)
    mgrs = models.CharField(max_length=-1, blank=True, null=True)
    utm = models.CharField(max_length=-1, blank=True, null=True)
    jog = models.CharField(max_length=-1, blank=True, null=True)
    fc = models.CharField(max_length=-1, blank=True, null=True)
    dsg = models.CharField(max_length=-1, blank=True, null=True)
    pc = models.IntegerField(blank=True, null=True)
    cc1 = models.CharField(max_length=-1, blank=True, null=True)
    adm1 = models.IntegerField(blank=True, null=True)
    adm2 = models.IntegerField(blank=True, null=True)
    dim = models.IntegerField(blank=True, null=True)
    cc2 = models.IntegerField(blank=True, null=True)
    nt = models.CharField(max_length=-1, blank=True, null=True)
    lc = models.IntegerField(blank=True, null=True)
    short_form = models.IntegerField(blank=True, null=True)
    generic = models.IntegerField(blank=True, null=True)
    sort_name = models.CharField(max_length=-1, blank=True, null=True)
    full_name = models.CharField(max_length=-1, blank=True, null=True)
    full_name_field = models.CharField(db_column='full_name_', max_length=-1, blank=True, null=True)  # Field renamed because it ended with '_'.
    newdlat = models.FloatField(blank=True, null=True)
    newdlong = models.FloatField(blank=True, null=True)
    code = models.IntegerField(blank=True, null=True)
    district = models.CharField(max_length=-1, blank=True, null=True)
    region = models.CharField(max_length=-1, blank=True, null=True)
    location = models.CharField(max_length=-1, blank=True, null=True)
    sub_locati = models.CharField(max_length=-1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'settlementschemes'


class Tradingcentres(models.Model):
    geom = models.PointField(blank=True, null=True)
    objectid = models.IntegerField(blank=True, null=True)
    area = models.FloatField(blank=True, null=True)
    perimeter = models.FloatField(blank=True, null=True)
    town_name = models.CharField(max_length=-1, blank=True, null=True)
    town_id = models.FloatField(blank=True, null=True)
    town_type = models.CharField(max_length=-1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tradingcentres'


class Villages(models.Model):
    geom = models.PointField(blank=True, null=True)
    area = models.FloatField(blank=True, null=True)
    perimeter = models.FloatField(blank=True, null=True)
    kenyavil_field = models.FloatField(db_column='kenyavil_', blank=True, null=True)  # Field renamed because it ended with '_'.
    kenyavil_i = models.FloatField(blank=True, null=True)
    name = models.CharField(max_length=-1, blank=True, null=True)
    country = models.CharField(max_length=-1, blank=True, null=True)
    theme = models.CharField(max_length=-1, blank=True, null=True)
    admincode = models.FloatField(blank=True, null=True)
    longdd = models.FloatField(blank=True, null=True)
    latdd = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'villages'


class Waterpoints(models.Model):
    geom = models.PointField(blank=True, null=True)
    lat_deg = models.FloatField(blank=True, null=True)
    lon_deg = models.FloatField(blank=True, null=True)
    adm1 = models.CharField(max_length=-1, blank=True, null=True)
    adm2 = models.CharField(max_length=-1, blank=True, null=True)
    activity_i = models.CharField(max_length=-1, blank=True, null=True)
    country_id = models.CharField(max_length=-1, blank=True, null=True)
    water_sour = models.CharField(max_length=-1, blank=True, null=True)
    water_tech = models.CharField(max_length=-1, blank=True, null=True)
    instal_yea = models.FloatField(blank=True, null=True)
    management = models.CharField(max_length=-1, blank=True, null=True)
    pay = models.CharField(max_length=-1, blank=True, null=True)
    installer = models.CharField(max_length=-1, blank=True, null=True)
    status_id = models.CharField(max_length=-1, blank=True, null=True)
    status = models.CharField(max_length=-1, blank=True, null=True)
    source = models.CharField(max_length=-1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'waterpoints'
