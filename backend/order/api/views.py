from rest_framework import generics, viewsets  
from rest_framework.response import Response
from rest_framework import status
import datetime
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView , CreateAPIView
from order.models import *
from .serializers import *
from rest_framework.exceptions import ValidationError

class OrderViewSet(viewsets.ModelViewSet):
    
    queryset = Order.objects.prefetch_related('orderItemsrelated__product').all()
    serializer_class =OrderWithRelatedsSerializer
    my_tags = ["Order"]
    
    
class OrderItemViewSet(viewsets.ModelViewSet):
    
    queryset = OrderItem.objects.all()
    serializer_class =OrderItemSerializer
    my_tags = ["Order"]