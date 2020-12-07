from product import views
from django.urls import path

app_name = 'product'

urlpatterns = [
    path('', views.catalogue, name= "catalogo"),
    path('ajax', views.ajax, name= "ajax"),
    path('ajax-update', views.ajax_update, name= "ajax-update"),
    path('ajax-remove', views.ajax_remove, name= "ajax-remove"),
    path('<int:page>', views.catalogue, name= "catalogo_por_pagina"),
    path('add', views.create, name= "criar_produto"),
    path('edit/<int:id>', views.edit, name= "editar_produto"),
    path('delete/<int:id>', views.delete, name= "deletar_produto"),
    path('<slug:category_slug>', views.catalogue, name= "catalogo_por_categoria"),
    path('<int:id>/<slug:product_slug>', views.product, name= "produto")
]
