from django import forms
from .models import Camps, UserLocation

class CreateCampForm(forms.ModelForm):
    class Meta:
        model = Camps
        exclude = ("geom", "decomissioned")

class UserLocationForm(forms.ModelForm):
    description = forms.CharField(label="Point Description", max_length=255, required=False,
        widget=forms.Textarea({'rows':8})
    )
    class Meta:
        model = UserLocation
        fields = ["first_name", "description", "image"]
