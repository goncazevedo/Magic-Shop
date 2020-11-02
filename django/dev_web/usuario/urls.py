from usuario import views
from django.urls import path

app_name = "usuario"

urlpatterns = [
    path('login', views.login, name = "login"),
    path('cadastro', views.signup, name = "cadastro"),
]
