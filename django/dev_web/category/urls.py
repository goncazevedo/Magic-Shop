from category import views
from django.urls import path

app_name = 'category'

urlpatterns = [
    path('add', views.create, name= "criar_categoria"),
    path('edit/<int:id>', views.edit, name= "editar_categoria"),
    path('delete/<int:id>', views.delete, name= "deletar_categoria")
]
