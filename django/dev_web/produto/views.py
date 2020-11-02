from django.shortcuts import render

# Create your views here.

def catalogue(request):
    return render(request, "catalogue.html")

def product(request):
    return render(request, "product.html")