from django.shortcuts import render
from .models import Post,Comment
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.shortcuts import render, redirect
from blog.forms import SignUpForm

def home(request):
    post = Post.objects.all()
    return render(request, 'blogs.html',{"post":post})


def login_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            message = "Invalid login credentials"
            return render(request, 'login.html', {'message': message})
    else:
        return render(request, 'login.html')


def register(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    return render(request, 'register.html')

def logout_view(request):
    logout(request)
    return redirect('home')


def aboutdev(request):
    return render(request,"about.html")


# Blogs:

def getblog(request,id):
    # blog = Post.objects.filter(id=id)
    # author_blogs = Post.objects.filter(author=blog[0].author)

    blog = Post.objects.filter(id=id).first()
    author_blogs = Post.objects.filter(author=blog.author)
    return render(request,"blog_view.html",{"blog":blog})

def post_comments(request,id):
    blog = Post.objects.filter(id=id).first()
    
