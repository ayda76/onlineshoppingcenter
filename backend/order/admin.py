from django.contrib import admin

from .resources import *
from import_export.admin import ImportExportModelAdmin 
# Register your models here.
from .models import *



@admin.register(Order)
class OrderAdmin(ImportExportModelAdmin):

    list_display = ('order_id','profile' )


    resource_class = OrderResource
    
@admin.register(OrderItem)
class OrderItemAdmin(ImportExportModelAdmin):

    list_display = ('id','product' )


    resource_class = OrderItemResource