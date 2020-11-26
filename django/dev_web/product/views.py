from django.shortcuts import redirect, render
from category.models import Category
from product.models import Product
from product.forms import ProductForm
from django.utils.text import slugify
from random import randint
# Create your views here.


def catalogue(request, category_slug=None, page=0):
    i = 0
    end = False
    j=0

    
    if 'search' in request.GET:
        search = slugify(request.GET['search'])
    else:
        search = None
    products = []
    aux = []
    best_seller = Product.objects.order_by('stored_qtt')[:4]
    categories = Category.objects.all().order_by('name')

    category = Category.objects.filter(slug=category_slug).first()
    if category:
        q = category.products.all().order_by('name')
    else:
        category = None
        q = Product.objects.all().order_by('name')
    
    if search:
        for i in q:
            if search in i.slug  or search in i.category.slug:
                aux.append(i);
    else:
        aux = q

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

    return render(request, "catalogue.html", {'categories': categories, 'products': products, 'category': category, 'search':search, 'pages':range(len(products)), 'page':page, 'best_seller': best_seller})

def product(request, id, product_slug):
    product = Product.objects.get(id=id)
    return render(request, "product.html", {'product': product})

def create(request):
    form = ProductForm(request.POST or None)
    if form.is_valid():
        post = form.save(commit=False)
        post.slug = slugify(post.name)
        post.save()
        form = ProductForm()
    
    return render(request, "form.html", {'form': form,'name': "Produto"} )


def edit(request, id):
    product = Product.objects.get(id=id)
    if request.POST:
        form = ProductForm(request.POST, instance= product)
        if form.is_valid():
            post = form.save(commit=False)
            post.slug = slugify(post.name)
            post.save()
            return redirect(product.get_absolute_url())
    else:
        form = ProductForm(instance= product)
    request.session['product_id'] = id
    
    return render(request, "form.html", {'form': form,'name': "Produto"} )

def delete(request, id):
    product = Product.objects.get(id=id)
    if request.POST:
        product.delete()
        return redirect('product:catalogo')