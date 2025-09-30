from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
from rest_framework.authentication import get_authorization_header
from django.conf import settings
from rest_framework import exceptions
import jwt

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
    def get_user_jwt(self,request):
        
        token = get_authorization_header(request).decode('utf-8')
        if token is None or token == "null" or token.strip() == "":
            raise exceptions.AuthenticationFailed('Authorization Header or Token is missing on Request Headers')
        
        decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        
        username = decoded['user_id']
        return Profile.objects.get(user__id=username)    