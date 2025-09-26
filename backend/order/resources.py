from import_export import resources
from .models import *


class OrderResource(resources.ModelResource):
     class Meta:
          model = Order
          

class OrderItemResource(resources.ModelResource):
     class Meta:
          model = OrderItem