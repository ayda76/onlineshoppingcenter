from rest_framework import generics, viewsets  
from rest_framework.response import Response
from rest_framework import status
import datetime
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView , CreateAPIView
from product.models import *
from .serializers import *
from rest_framework.exceptions import ValidationError
from .filters import ProductFilter
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

class ProductViewSet(viewsets.ModelViewSet):
    
    queryset = Product.objects.all()
    serializer_class =ProductSerializer
    filterset_class=ProductFilter
    filter_backends=[DjangoFilterBackend,filters.SearchFilter]
    search_fields=['name', 'price','description']
    my_tags = ["Product"]