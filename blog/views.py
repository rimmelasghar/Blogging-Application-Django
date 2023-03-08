from django.shortcuts import render
from .models import Post,Comment,Tags
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.shortcuts import render, redirect
from blog.forms import SignUpForm
from django.contrib.auth.models import User
from django.contrib import messages
import markdown
from django.contrib.auth.decorators import login_required

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
            messages.success(request, 'Your account has been created! You can now log in.')
            return redirect('login')
        else:
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f"{field.capitalize()}: {error}")
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
    # tags_obj = Tags.objects.filter(post=blog).first()
    tags_obj = Tags.objects.filter(post=blog).first()
    if tags_obj is None:
        tags = []
    else:
        tags = [i for i in tags_obj.tags.split("#")][1:]
    print(tags)
    html_content = markdown.markdown(blog.content)
    author_blogs = Post.objects.filter(author=blog.author)
    comments = Comment.objects.filter(post=blog)
    no = len(comments)
    return render(request,"blog_view.html",{"tags":tags,"blog":blog,"blog_markdown":html_content,"author_blogs":author_blogs,"comments":comments,"no":no})

def post_comments(request,id,user_id):
    if request.method == "POST":
        comment = request.POST.get('comment')
        blog = Post.objects.filter(id=id).first()
        user = User.objects.filter(id=user_id).first()
        com = Comment(post = blog,author =user,content=comment )
        com.save()
        return redirect('getblog',id)

def like_post(request,id):
    if request.method == "POST":
        blog = Post.objects.filter(id=id).first()
        blog.increment_likes()
        blog.save()
        return redirect('home')

@login_required
def write_blog(request,user_id):
    author = User.objects.filter(id=user_id).first()
    if request.method == "POST":
        title = request.POST.get('title')
        content = request.POST.get('content')
        image_link = request.POST.get('image_link')
        tags = request.POST.get('tags')
        blog = Post(title= title,content=content,author=author,image_link = image_link )
        blog.save()
        tags = Tags(tags=tags,post=blog)
        return redirect('getblog',blog.id)
    return render(request,"writeblog.html")