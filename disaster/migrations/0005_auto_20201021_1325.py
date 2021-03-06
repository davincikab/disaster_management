# Generated by Django 3.1.1 on 2020-10-21 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('disaster', '0004_auto_20201021_1313'),
    ]

    operations = [
        migrations.AddField(
            model_name='userlocation',
            name='is_evacuated',
            field=models.BooleanField(default=False, verbose_name='Evacuation Status'),
        ),
        migrations.AddField(
            model_name='userlocation',
            name='reported',
            field=models.DateTimeField(auto_now=True, verbose_name='Reported On'),
        ),
    ]
