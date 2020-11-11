from django.shortcuts import render
from product.models import Product

def home(request):
    sale = Product.objects.filter(sale= True)
    return render(request, "home.html",{'sale':sale})

def about(request):
    return render(request, "about.html")