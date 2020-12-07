from django.shortcuts import redirect, render
from category.models import Category
from product.models import Product
from product.forms import AjaxProductForm, ProductForm
from django.utils.text import slugify
from random import randint
from django.http.response import HttpResponseRedirect
from django.http import HttpResponse
import json
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

def ajax(request):
    # if request.method == 'POST':
    #     form = form = AjaxProductForm(request.POST)
    #     if form.is_valid():
    #         post = form.save(commit=False)
    #         post.author = request.user
    #         post.save()
    #         render(request, "ajax.html", {'form': form})
    # else:
    #     form = form = AjaxProductForm()

    # return render(request, "ajax.html", {'form': form})

    if request.method == 'POST':
        response_data = {}

        form = AjaxProductForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.slug = slugify(post.name)
            post.save()

        response_data['result'] = 'Create product successful!'
        response_data['id'] = post.pk
        response_data['name'] = post.name
        response_data['category'] = post.category.name
        response_data['price'] = request.POST.get("price")
        response_data['stored_qtt'] = request.POST.get("stored_qtt")



        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )
    else:
        p = Product.objects.all()
        form = AjaxProductForm()

        return render(request, "ajax.html", {'form': form, "prods":p})

def ajax_update(request):

    pk = request.POST.get("id")
    product = Product.objects.get(id=pk)
    if request.POST:
        p = {}
        p['id'] = product.id
        p['name'] = product.name
        p['category'] = product.category.id
        p['price'] = str(product.price)
        p['stored_qtt'] = str(product.stored_qtt)
        response_data = {}

        form = AjaxProductForm(p,instance= product)

        if form.is_valid():
            post = form.save(commit=False)
            post.stored_qtt = int(request.POST.get("qtt"))
            post.save()

            response_data['result'] = 'Create product successful!'
            response_data['id'] = post.pk
            response_data['name'] = post.name
            response_data['category'] = post.category.name
            response_data['price'] = str(post.price)
            response_data['stored_qtt'] = str(post.stored_qtt)
            return HttpResponse(
            json.dumps(response_data),
            content_type="application/json")

def ajax_remove(request):
    pk = request.POST.get("id")
    product = Product.objects.get(id=pk)
    if request.POST:
        product.delete()

        return HttpResponse(
            json.dumps({}),
            content_type="application/json")