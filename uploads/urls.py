from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.views import obtain_auth_token


from views import views


urlpatterns = [
    url(r'^api/uploadFile/(?P<filename>[^/]+)$', views.FileUploadView.as_view()),
    url(r'^api/getAllFiles/$', views.GetAllFiles.as_view()),
    url(r'^api/deleteFile/(?P<filename>[^/]+)$', views.DeleteFile.as_view()),
    url(r'^admin/', admin.site.urls),
    url(r'^api/login/', obtain_auth_token, name='login'),
    # the name parameter allows us to refer to the url in our code, see TestUser
    url(r'^api/createUser/$'
        , views.CreateUser.as_view()
        , name='account-create'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
