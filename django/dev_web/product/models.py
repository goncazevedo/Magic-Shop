from django.db import models
from category.models import Category 
from django.urls import reverse

# Create your models here.
class Product(models.Model):
    category = models.ForeignKey(Category,related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length = 100,db_index = True, unique=True)
    description = models.TextField(max_length = 200)
    price = models.DecimalField(max_digits = 5, decimal_places=2)
    image = models.CharField(max_length= 50, blank=True)
    stored_qtt = models.BigIntegerField(default = 0) 
    available = models.BooleanField(default= True)
    sale = models.BooleanField(default= False)
    slug = models.SlugField(max_length = 100)

    class Meta:
        db_table = 'products'
        
        managed = True
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

    def get_absolute_url(self):
        return reverse("product:produto", args=[self.id, self.slug])
    

    def __str__(self):
        return self.name

