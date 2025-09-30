from django.dispatch import receiver
from django.db.models.signals import post_save,post_delete
from product.models import Product
from django.core.cache import cache

@receiver([post_save,post_delete], sender=Product)
def invalidate_product_cache(sender,instance,**kwargs):
    cache.delete_pattern('*product_list*')