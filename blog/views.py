from django.shortcuts import render

def my_view(request):
    context = 'Hello, world!'
    return render(request, 'base.html')
