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
    def get_user_jwt(self, request):
        raw = get_authorization_header(request).decode('utf-8')
        if not raw or raw.strip() == "":
            raise exceptions.AuthenticationFailed('Authorization Header is missing')

        # Header looks like "JWT eyJ..." — strip the prefix
        parts = raw.split()
        if len(parts) != 2:
            raise exceptions.AuthenticationFailed('Invalid Authorization header format')

        token = parts[1]  # just the JWT token, without "JWT " prefix

        try:
            decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired')
        except jwt.DecodeError:
            raise exceptions.AuthenticationFailed('Invalid token')

        user_id = decoded.get('user_id')
        if not user_id:
            raise exceptions.AuthenticationFailed('Token missing user_id')
        print(user_id)
        profileselected=Profile.objects.get(user__id=user_id)
        return profileselected
