from django.urls import path,include
from . import views

urlpatterns = [path("",views.my_view,name="my_view")]