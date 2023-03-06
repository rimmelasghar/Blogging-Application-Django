from django.urls import path,include
from . import views

urlpatterns = [
    path("",views.home,name="home"),
    path("login/",views.login_user,name="login"),
    path("register/",views.register,name="register"),
    path("logout/",views.logout_view,name="logout"),
    path("aboutdev/",views.aboutdev,name="aboutdev"),
    path("getblog/<int:id>",views.getblog,name="getblog"),
               ]