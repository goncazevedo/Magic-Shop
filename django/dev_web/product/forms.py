from product.models import Product
from django import forms

class ProductForm(forms.ModelForm):
    
    class Meta:
        model = Product
        fields = ("category", "name", "description", "price", "image", "stored_qtt" )


