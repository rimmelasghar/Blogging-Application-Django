from django.contrib import admin
from django.urls import path ,re_path 
from . import views

# url was depreciated in later version so we are using re_path instead of url.


urlpatterns = [
    re_path(r'^$', views.home, name='home'),
    re_path(r'^boards/(?P<pk>\d+)/$', views.board_topics,name = 'board_topics'),
    re_path(r'^boards/(?P<pk>\d+)/new/$',views.new_topics,name = 'new_topics'),
    re_path(r'^boards/(?P<pk>\d+)/topics/(?P<topic_pk>\d+)/$', views.topic_posts, name='topic_posts'),
    re_path(r'^boards/(?P<pk>\d+)/topics/(?P<topic_pk>\d+)/reply/$', views.reply_topic, name='reply_topic'),
]
# new way to define url.
# path('boards/int:pk/topics/int:topic_pk/', views.topic_posts, name='topic_posts')