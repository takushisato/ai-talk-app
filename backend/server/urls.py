from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.ai_talk.views import ThreadList, QuestionAndAnswerList, ThreadCrud, QuestionAndAnswerCrud
from apps.utility.views import CustomTokenCreateView

router = DefaultRouter()
router.register('thread', ThreadCrud)
router.register('question-and-answer', QuestionAndAnswerCrud)

urlpatterns = [
    # admin
    path('admin/', admin.site.urls),
    # apps
    path('ai_talk/', include(router.urls)),
    path('ai_talk/get_thread/', ThreadList.as_view()),
    path('ai_talk/get_talks/<str:pk>/', QuestionAndAnswerList.as_view()),
    path('api_token_auth/', CustomTokenCreateView.as_view()),
    # other
    path('api/v1/', include('rest_framework.urls')),
    path('api/v1/auth/', include('djoser.urls.authtoken')),
    path('api/v1/auth/', include('djoser.urls')),
]

if settings.DEBUG:
    from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
    # from rest_framework_swagger.views import get_swagger_view
    import debug_toolbar

    # schema_view = get_swagger_view(title="anymo API")
    urlpatterns += [
        # https://drf-spectacular.readthedocs.io/en/latest/readme.html#requirements
        path('api/v1/schema.json/', SpectacularAPIView.as_view(), name='schema'),
        path('api/v1/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
        path('api/v1/schema/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger'),
        path('__debug__/', include(debug_toolbar.urls)),
    ]
