from rest_framework.routers import DefaultRouter
from product.api.views import *
from django.contrib import admin
from django.urls import path , include



router = DefaultRouter()

router.register("product", ProductViewSet)




urlpatterns = [
    
    path("", include(router.urls)),
    #path('nnnn/', nameeeViewSet.as_view(), ),  
 
]
