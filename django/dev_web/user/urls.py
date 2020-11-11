from user import views
from django.urls import path

app_name = "user"

urlpatterns = [
    path('login', views.login, name = "login"),
    path('cadastro', views.signup, name = "cadastro"),
]
