# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.contrib.gis.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


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


class ConstituencyData(models.Model):
    geom = models.MultiPolygonField(blank=True, null=True)
    adm2_en = models.CharField(max_length=50, blank=True, null=True)
    adm1_en = models.CharField(max_length=50, blank=True, null=True)
    population = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    populati_1 = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    numberofho = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    averagehou = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    area = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    below18 = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'constituency_data'


class Croplands(models.Model):
    geom = models.MultiPolygonField(blank=True, null=True)
    objectid = models.BigIntegerField(blank=True, null=True)
    crops = models.CharField(max_length=254, blank=True, null=True)
    main_crop = models.CharField(max_length=254, blank=True, null=True)
    other_crop = models.CharField(max_length=254, blank=True, null=True)
    county_nam = models.CharField(max_length=254, blank=True, null=True)
    watering = models.CharField(max_length=254, blank=True, null=True)
    area_km2 = models.FloatField(blank=True, null=True)
    shape_leng = models.FloatField(blank=True, null=True)
    shape_area = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'croplands'


class DisasterCamps(models.Model):
    name = models.CharField(max_length=50)
    capacity = models.IntegerField()
    population = models.IntegerField()
    image = models.CharField(max_length=100)
    is_active = models.BooleanField()
    geom = models.PointField(blank=True, null=True)
    commissoned = models.DateTimeField()
    decomissioned = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'disaster_camps'


class DisasterUserlocation(models.Model):
    first_name = models.CharField(max_length=50)
    geom = models.PointField()
    description = models.TextField()
    image = models.CharField(max_length=100)
    is_evacuated = models.BooleanField()
    reported = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'disaster_userlocation'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Floodedarea(models.Model):
    geom = models.MultiPolygonField(blank=True, null=True)
    gridcode = models.BigIntegerField(blank=True, null=True)
    area = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'floodedarea'


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


class Householdsdata(models.Model):
    geom = models.PointField(blank=True, null=True)
    objectid = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'householdsdata'


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
