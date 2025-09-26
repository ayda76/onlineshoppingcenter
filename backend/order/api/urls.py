from rest_framework.routers import DefaultRouter
from order.api.views import *
from django.contrib import admin
from django.urls import path , include



router = DefaultRouter()

router.register("order", OrderViewSet)
router.register("orderItem", OrderItemViewSet)



urlpatterns = [
    
    path("", include(router.urls)),
    #path('nnnnn/', nameeViewSet.as_view(), ),  
 
]


