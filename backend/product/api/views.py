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
from .filters import ProductFilter,InstockFilterBackend
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination
from rest_framework.permissions import BasePermission, IsAuthenticated

    
class ProductViewSet(viewsets.ModelViewSet):
    
    queryset = Product.objects.all()
    serializer_class =ProductSerializer
    filterset_class=ProductFilter
    #in this way we will have the default pagination setting 
    pagination_class=LimitOffsetPagination
    
    #this way is custom pagination
    # pagination_class=PageNumberPagination
    # pagination_class.page_size=2
    #note that we do not show 2 pages we show 2 products in a page
    # pagination_class.page_query_param='pagenum'
    filter_backends=[DjangoFilterBackend,
                     filters.SearchFilter,
                     filters.OrderingFilter,
                     InstockFilterBackend]
    search_fields=['name', 'price','description']
    #if we want to examin that the searched item is exactlly the searced field put =name
    ordering_fields=['name','price','stock']
    
    
    my_tags = ["Product"]