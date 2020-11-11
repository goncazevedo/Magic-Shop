from product import views
from django.urls import path

app_name = 'product'

urlpatterns = [
    path('', views.catalogue, name= "catalogo"),
    path('<int:page>', views.catalogue, name= "catalogo_por_pagina"),
    path('<slug:category_slug>', views.catalogue, name= "catalogo_por_categoria"),
    path('<int:id>/<slug:product_slug>', views.product, name= "produto")
]
