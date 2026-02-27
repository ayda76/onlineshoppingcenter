from django.test import TestCase
from .models import Product
# Create your tests here.


class TestProduct(TestCase):
    def test_model_product(self):
        product_test=Product.objects.create(
            name='shirt',
            description=' very nice one ',
            price=100,
            stock=5
        )
        
        self.assertTrue(isinstance(product_test,Product))
        self.assertEqual(str(product_test),'shirt')
        

