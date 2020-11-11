from django.contrib import admin
from .models import Product

# Register your models here.


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name','price', 'category', 'available', 'stored_qtt')
    search_fields = ('name',)
    list_filter = ['category']
    prepopulated_fields = {'slug': ('name',)}


admin.site.register(Product, ProductAdmin)
