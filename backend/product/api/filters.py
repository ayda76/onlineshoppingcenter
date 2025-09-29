import django_filters
from product.models import Product
from rest_framework import filters

class InstockFilterBackend(filters.BaseFilterBackend):
    """
    Filter objects that have stock greater than 0.
    """
    def filter_queryset(self, request, queryset, view):
        return queryset.filter(stock__gt=0)
    

class ProductFilter(django_filters.FilterSet):
    class Meta:
        model= Product
        fields={
            'name':['iexact','icontains'],
            'price':['exact','lt','gt','range']}