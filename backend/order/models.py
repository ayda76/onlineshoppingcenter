from django.db import models
import uuid
from profileuser.models import Profile
from product.models import Product
# Create your models here.
class Order(models.Model):
    class StatusChoices(models.TextChoices):
        PENDING ='pending'
        CONFIRMED='confirmed'
        CANCELLED='cancelled'
        
    order_id=models.UUIDField(primary_key=True,default=uuid.uuid4)
    profile=models.ForeignKey(Profile,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)
    status=models.CharField(max_length=10,choices=StatusChoices.choices, default=StatusChoices.PENDING)
    products=models.ManyToManyField(Product,through='orderItem',related_name="orderproducts")
    
    def __str__(self):
        return f"order{self.order_id}by {self.profile.lastname}"
    
    
class OrderItem(models.Model):
    order=models.ForeignKey(Order,on_delete=models.CASCADE)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity=models.PositiveIntegerField()
    
    @property
    def item_subtotal(self):
        return self.product.price * self.quantity
    
    def __str__(self) :
        return f"{self.order.order_id} {self.product.name} :{self.quantity}"