from django.shortcuts import render
from category.models import Category
from product.models import Product

# Create your views here.


def catalogue(request, category_slug=None, page=0):
    i = 0
    end = False
    j=0

    print(page)

    products = []
    categories = Category.objects.all().order_by('name')
    if category_slug:
        category = Category.objects.get(slug=category_slug)
        aux = category.products.all().order_by('name')
    else:
        category = None
        aux = Product.objects.all().order_by('name')
    
    for i in range(len(aux)//9):
        vet = []    
        while(j<(i+1)*9):
            vet.append(aux[j])
            j+=1
        products.append(vet)

    vet = []

    while(len(aux)-j>0):
        vet.append(aux[j])
        j+=1

    if vet:
        products.append(vet)





    return render(request, "catalogue.html", {'categories': categories, 'products': products, 'category': category, 'pages':range(len(products)), 'page':page})


def product(request, id, product_slug):
    product = Product.objects.get(id=id)
    return render(request, "product.html", {'product': product})
