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
    def perform_create(self, serializer):
        profileSelected=Profile.get_user_jwt(self,self.request)
        return serializer.save(profile=profileSelected)
    
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