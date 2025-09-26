from django.db import models

# Create your models here.
class Product(models.Model):
    name=models.CharField(max_length=200, blank=True, null=True)
    description=models.TextField(blank=True, null=True)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    stock=models.PositiveIntegerField()
    image=models.ImageField(upload_to='products/',blank=True, null=True)
    @property
    def in_stock(self):
        return self.stock > 0
    def __str__(self):
        return self.name
    


        
    
    
    
    