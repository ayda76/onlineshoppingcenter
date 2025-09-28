from rest_framework import serializers
from order.models import *
from product.models import *
from product.api.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product_name=serializers.ReadOnlyField(source='product.name')
    profile_lastname=serializers.ReadOnlyField(source='order.profile.lastname')
    class Meta:
        model=OrderItem
        fields="__all__"

class OrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields ='__all__'
        
class OrderWithRelatedsSerializer(serializers.ModelSerializer):
    orderItemsrelated=OrderItemSerializer(many=True,required=False)
   
    class Meta:
        model=Order
        fields='__all__'
        

        