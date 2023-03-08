from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator, RegexValidator
from .models import PostImage

class SignUpForm(UserCreationForm):
    email = forms.CharField(max_length=254, required=True, widget=forms.EmailInput())
    password1 = forms.CharField(
        label='password1',
        widget=forms.PasswordInput,
        validators=[
            MinLengthValidator(8, message='Password must be at least 8 characters'),
            RegexValidator(
                regex='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$',
                message='Password must include at least one lowercase letter, one uppercase letter, and one number'
            )
        ]
    )
    password2 = forms.CharField(
        label='password2',
        widget=forms.PasswordInput,
        validators=[
            MinLengthValidator(8, message='Password must be at least 8 characters'),
            RegexValidator(
                regex='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$',
                message='Password must include at least one lowercase letter, one uppercase letter, and one number'
            )
        ]
    )
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')


class PostImageForm(forms.ModelForm):
    class Meta:
        model = PostImage
        fields = ['image']