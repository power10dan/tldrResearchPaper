from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.views import obtain_auth_token


from uploads.views import views


urlpatterns = [
    url(r'^api/uploadFile/(?P<filename>[^/]+)$', views.FileUploadView.as_view()),
    url(r'^api/getAllFiles/$', views.GetAllFiles.as_view()),
    url(r'^api/deleteFile/(?P<filename>[^/]+)$', views.DeleteFile.as_view()),
    url(r'^admin/', admin.site.urls),
    url(r'^api/createUser/$'
        , views.CreateUser.as_view()
        , name='account-create'),
    # use /rest-auth/logout/ or /rest-auth/login/, this imports a bunch of urls
    # see here: http://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
