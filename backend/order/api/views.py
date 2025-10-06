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
from rest_framework.pagination import LimitOffsetPagination
from django_filters.rest_framework import DjangoFilterBackend
from .filters import OrderFilter
from rest_framework.decorators import action
from rest_framework.permissions import BasePermission, IsAuthenticated
from profileuser.models import Profile

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie, vary_on_headers
from order.tasks import send_confirmation_email_order

### for running celery: celery -A onlineshop worker --loglevel=INFO 
### run redis: docker  run --name redis -p 6379:6379 -d redis
###docker start redis
##celery -A onlineshop worker -l info
###celery -A onlineshop worker -l info -P solo
class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.select_related('profile').prefetch_related('orderItemsrelated__product').all()
    # serializer_class =OrderWithRelatedsSerializer
    
    pagination_class=None
    filterset_class=OrderFilter
    filter_backends=[DjangoFilterBackend]
    my_tags = ["Order"]
    

    def get_queryset(self):
        qs=super().get_queryset()
        if not self.request.user.is_staff:
            profileSelected=Profile.get_user_jwt(self,self.request)
            qs=qs.filter(profile=profileSelected)
        return qs    
    
    @method_decorator(cache_page(60 * 15, key_prefix='order_list'))
    @method_decorator(vary_on_headers("Authorization"))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    def perform_create(self, serializer):
        profileSelected=Profile.get_user_jwt(self,self.request)
        order=serializer.save(profile=profileSelected)
        send_confirmation_email_order.delay(order.order_id,self.request.user.email)
 
    
    
    def get_serializer_class(self, *args, **kwargs):
        if self.request.method == 'POST'or'PUT'or'PATCH':
            return OrderCreateSerializer
        return super().get_serializer_class( *args, **kwargs)
    


    # @action(detail=False, methods=['get'], url_path='profile_orders')
    # def user_orders(self, request):
    #     profileSelected=Profile.get_user_jwt(self,request)
    #     orders = self.get_queryset().filter(profile=profileSelected)
    #     serialized_orders=self.get_serializer(orders,many=True)
    #     return Response(serialized_orders.data)
    
    
class OrderItemViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = OrderItem.objects.select_related('product','order').all()
    serializer_class =OrderItemSerializer
    
    my_tags = ["Order"]