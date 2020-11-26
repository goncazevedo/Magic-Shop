from django.shortcuts import redirect, render
from category.forms import CategoryForm
from django.utils.text import slugify
from category.models import Category
# Create your views here.

def create(request):
    form = CategoryForm(request.POST or None)
    if form.is_valid():
        post = form.save(commit=False)
        post.slug = slugify(post.name)
        post.save()
        form = CategoryForm()
    
    return render(request, "form.html", {'form': form, 'name': "Categoria"})

def edit(request, id):
    category = Category.objects.get(id=id)
    if request.POST:
        form = CategoryForm(request.POST, instance= category)
        if form.is_valid():
            post = form.save(commit=False)
            post.slug = slugify(post.name)
            post.save()
            return redirect('product:catalogo')
    else:
        form = CategoryForm(instance= category)
    request.session['Category_id'] = id
    
    return render(request, "form.html", {'form': form,'name': "Produto"} )

def delete(request, id):
    category = Category.objects.get(id=id)
    if request.POST:
        category.delete()
        return redirect('product:catalogo')