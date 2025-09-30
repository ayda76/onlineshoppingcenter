from rest_framework import serializers
from order.models import *
from product.models import *
from product.api.serializers import ProductSerializer
from django.db import transaction

class OrderItemSerializer(serializers.ModelSerializer):
    product_name=serializers.ReadOnlyField(source='product.name')
    profile_lastname=serializers.ReadOnlyField(source='order.profile.lastname')
    class Meta:
        model=OrderItem
        fields="__all__"
class OrderCreateSerializer(serializers.ModelSerializer):
    
    class OrderItemCreateSerializer(serializers.ModelSerializer):
        class Meta:
            model=OrderItem
            fields=('product','quantity')
            
    order_id=serializers.UUIDField(read_only=True)        
    orderItemsrelated=OrderItemCreateSerializer(many=True,required=False)
    def update(self, instance,validated_data):
        orderItem_Data=validated_data.pop('orderItemsrelated')
        with transaction.atomic():
            instance=super().update( instance,validated_data)
        
            if orderItem_Data is not None:
                instance.orderItemsrelated.all().delete()
                for item in orderItem_Data:
                    OrderItem.objects.create(order=instance,**item)
                
        return instance
    def create(self,validated_data):
        orderItem_Data=validated_data.pop('orderItemsrelated')
        with transaction.atomic():
            order=Order.objects.create(**validated_data)
            for item in orderItem_Data:
                OrderItem.objects.create(order=order,**item)
        return order    
    class Meta:
        model=Order
        fields=('order_id','profile','status','orderItemsrelated')
        extra_kwargs={'profile':{'read_only':True}}
        
class OrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields ='__all__'
        
class OrderWithRelatedsSerializer(serializers.ModelSerializer):
    orderItemsrelated=OrderItemSerializer(many=True,required=False)
   
    class Meta:
        model=Order
        fields='__all__'
        

        