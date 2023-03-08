from django.db import models
from django.contrib.auth.models import User





class Post(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    views = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)
    image_link = models.CharField(max_length=500,null=True,default=None)

    def __str__(self):
        return self.title
    def increment(self):
        self.views += 1
    def increment_likes(self):
        self.likes += 1



class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author.username}'s comment on {self.post.title}"
    
class Tags(models.Model):
    tags = models.CharField(max_length=255)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='tags')

    def __str__(self):
        return f"{self.tags} of {self.post.title}"
    

class PostImage(models.Model):
    image = models.ImageField(upload_to='images/',null=True)