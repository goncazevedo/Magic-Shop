from django.db import models
from django.urls import reverse

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length = 100,db_index = True, unique=True)
    slug = models.SlugField(max_length = 100)

    class Meta:
        db_table = 'category'
        managed = True
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def get_absolute_url(self):
        print(reverse("product:catalogo_por_categoria", args=[self.slug]))
        return reverse("product:catalogo_por_categoria", args=[self.slug])
    

    def __str__(self):
        return self.name

