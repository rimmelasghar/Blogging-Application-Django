from django.urls import path,include
from . import views

urlpatterns = [
    path("",views.home,name="home"),
    path("login/",views.login_user,name="login"),
    path("register/",views.register,name="register"),
    path("logout/",views.logout_view,name="logout"),
    path("aboutdev/",views.aboutdev,name="aboutdev"),
    path("getblog/<int:id>",views.getblog,name="getblog"),
    path("like_post/<int:id>",views.like_post,name="like_post"),
    path("postcomments/<int:id>/<int:user_id>",views.post_comments,name="post_comments"),
               ]