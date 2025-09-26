from django.contrib import admin

from .resources import *
from import_export.admin import ImportExportModelAdmin 
# Register your models here.
from .models import *



@admin.register(Product)
class ProductAdmin(ImportExportModelAdmin):

    list_display = ('id','name' )


    resource_class = ProductResource
