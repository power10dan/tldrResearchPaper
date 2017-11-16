from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_jwt.views import obtain_jwt_token

from uploads.views import views

urlpatterns = [
    url(r'^api/uploadFile/(?P<filename>[^/]+)$', views.FileUploadView.as_view()),
    url(r'^api/getAllFileNames/$', views.GetAllFileNames.as_view()),
    url(r'^api/deleteFile/(?P<filename>[^/]+)$', views.DeleteFile.as_view()),
    url(r'^admin/', admin.site.urls),
    url(r'^api/getSummary/', views.SummaryOutputView.as_view()),
    url(r'^api/getXMLFile/', views.getXMLFile.as_view(), name='getXMLFile'),
    url(r'^api/getPDFFile/', views.getPDFFile.as_view(), name='getPDFFile'),
    url(r'^api/getXMLAndSums/', views.getXMLAndSums.as_view(), name='getXMLAndSums'),
    url(r'^api/addUserSummary/', views.SummaryInputView.as_view(), name='summaryInput'),
    #url(r'^api/createUser/$'
    #    , views.CreateUser.as_view()
    #    , name='account-create'),
    # use /rest-auth/logout/ or /rest-auth/login/, this imports a bunch of urls
    # see here: http://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html
   # url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/',
        include('rest_auth.registration.urls'),
        name='create-user'),
    url(r'^login/',obtain_jwt_token,name='login')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
