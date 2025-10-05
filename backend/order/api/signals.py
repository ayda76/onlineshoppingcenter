from django.dispatch import receiver
from django.db.models.signals import post_save,post_delete
from order.models import Order
from django.core.cache import cache

@receiver([post_save,post_delete], sender=Order)
def invalidate_product_cache(sender,instance,**kwargs):
    
    cache.delete_pattern('*order_list*')