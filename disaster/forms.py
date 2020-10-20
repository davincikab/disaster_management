from django import forms
from .models import Camps

class CreateCampForm(forms.ModelForm):
    class Meta:
        model = Camps
        exclude = ("geom", "decomissioned")
