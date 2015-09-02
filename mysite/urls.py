from django.conf.urls import include, url
import blog.urls

urlpatterns = [
    url(r'^', include(blog.urls)),
]
