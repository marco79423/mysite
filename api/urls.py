from django.conf.urls import url

from api import views

urlpatterns = [
    url(r'^articles/$', views.get_article_list),
]
