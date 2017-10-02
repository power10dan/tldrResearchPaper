from django.conf.urls import url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt


from uploads.core import views


urlpatterns = [
    url(r'^api/uploadFile/(?P<filename>[^/]+)$', views.FileUploadView.as_view()),
    url(r'^api/getAllFiles/$', views.GetAllFiles.as_view()),
    url(r'^api/deleteFile/(?P<filename>[^/]+)$', views.DeleteFile.as_view()),
    url(r'^admin/', admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
