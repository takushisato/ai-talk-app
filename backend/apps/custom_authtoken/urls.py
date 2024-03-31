from django.urls import path
from . import views

urlpatterns = [
    path('', views.CustomTokenCreateView.as_view()),
]
