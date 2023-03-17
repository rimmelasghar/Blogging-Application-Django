from django.urls import path,include
from . import views

# all the routes for the application.
urlpatterns = [
    path("",views.home,name="home"),
    path("login/",views.login_user,name="login"),
    path("register/",views.register,name="register"),
    path("logout/",views.logout_view,name="logout"),
    path("aboutdev/",views.aboutdev,name="aboutdev"),
    path("getblog/<int:id>",views.getblog,name="getblog"),
    path("writeblog/<int:user_id>",views.write_blog,name="write_blog"),
    path("like_post/<int:id>/<int:user_id>",views.like_post,name="like_post"),
    path("postcomments/<int:id>/<int:user_id>",views.post_comments,name="post_comments"),
    path("comment_like/<int:id>/<int:user_id>",views.comment_like,name="comment_like"),
               ]