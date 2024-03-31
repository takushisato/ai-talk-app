from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('thread', views.ThreadCrud)
router.register('question-and-answer', views.QuestionAndAnswerCrud)

urlpatterns = [
    path('', include(router.urls)),
    path('get-thread/', views.ThreadList.as_view()),
    path('get-talks/<str:pk>/', views.QuestionAndAnswerList.as_view()),
]
