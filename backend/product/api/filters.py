import django_filters
from product.models import Product

class ProductFilter(django_filters.FilterSet):
    class Meta:
        model= Product
        fields={
            'name':['iexact','icontains'],
            'price':['exact','lt','gt','range']}