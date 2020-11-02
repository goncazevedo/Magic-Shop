from produto import views
from django.urls import path

app_name = 'produto'

urlpatterns = [
    path('', views.catalogue, name= "catalogo"),
    path('i', views.product, name= "produto")
]
