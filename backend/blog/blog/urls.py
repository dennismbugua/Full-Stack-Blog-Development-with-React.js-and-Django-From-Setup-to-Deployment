from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from backend import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/blog/', include('backend.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

urlpatterns += [path('.*', TemplateView.as_view(template_name='index.html'))]

admin.site.site_header = "Welcome Dennis"
admin.site.site_title = "Dennis Mbugua Dashboard"
admin.site.index_title = "Dennis Mbugua Blog Administration"