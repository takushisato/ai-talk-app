from django.conf import settings
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
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
