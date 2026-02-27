from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import *
# Create your tests here.

    
class TestProfile(TestCase):
    def setUp(self):
        self.user=User.objects.create_user(username='testuser', password='testpassword')
        
    def test_model_profile(self):
        Profile.objects.create(
            user=self.user,
            firstname='testProfile',
            lastname='testlastname',
            phone='09147689387',
            address='uuuuuu kioo lskslslk hgccccc',
            email='test@gmail.com'
        )    
