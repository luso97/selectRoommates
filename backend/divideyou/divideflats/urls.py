from django.conf.urls import url 
from divideflats import views
from django.conf.urls import url 

urlpatterns = [ 
    url(r'^api/pisos$', views.piso_list),
    url(r'^api/pisos/(?P<pk>[0-9]+)$', views.piso_detail),
    url(r'^api/punts$', views.puntuaciones_list),
]