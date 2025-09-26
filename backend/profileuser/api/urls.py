from rest_framework.routers import DefaultRouter
from profileuser.api.views import *
from django.contrib import admin
from django.urls import path , include



router = DefaultRouter()

router.register("profile", ProfileViewSet)




urlpatterns = [
    
    path("", include(router.urls)),
    #path('nnnnnn/', nameeee.as_view(), ),  
 
]
