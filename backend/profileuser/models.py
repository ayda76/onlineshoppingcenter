from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
# Create your models here.
class Profile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    firstname=models.CharField(max_length=100, blank=True, null=True)
    lastname=models.CharField(max_length=200, blank=True, null=True)
    phone =PhoneNumberField(blank=True)
    address=models.TextField(blank=True, null=True)
    email=models.EmailField(blank=True, null=True)
    def __str__(self) :
        return f"{self.firstname}{self.lastname}"