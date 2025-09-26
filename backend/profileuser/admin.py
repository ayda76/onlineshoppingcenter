from django.contrib import admin

from .resources import *
from import_export.admin import ImportExportModelAdmin 
# Register your models here.
from .models import *



@admin.register(Profile)
class ProfileAdmin(ImportExportModelAdmin):

    list_display = ('user','lastname' )


    resource_class = ProfileResource