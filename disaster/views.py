from django.shortcuts import render

# Create your views here.
def home_view(reqeust):
    return render(reqeust, "disaster/index.html")