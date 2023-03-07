from django.shortcuts import render
from .models import Post,Comment
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.shortcuts import render, redirect
from blog.forms import SignUpForm
from django.contrib.auth.models import User

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
    blog = Post.objects.filter(id=id).first()
    blog.increment()
    blog.save()
    author_blogs = Post.objects.filter(author=blog.author)
    comments = Comment.objects.filter(post=blog)
    no = len(comments)
    return render(request,"blog_view.html",{"blog":blog,"author_blogs":author_blogs,"comments":comments,"no":no})

def post_comments(request,id,user_id):
    if request.method == "POST":
        comment = request.POST.get('comment')
        blog = Post.objects.filter(id=id).first()
        user = User.objects.filter(id=user_id).first()
        com = Comment(post = blog,author =user,content=comment )
        com.save()
        return redirect('getblog',id)
    