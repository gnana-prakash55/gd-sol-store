from django.urls import  path,include
from .import views

urlpatterns = [
    path('',views.home,name='home'),
    path('category/',include('api.category.urls')),
    path('product/',include('api.product.urls')),
    path('user/',include('api.user.urls')),
    path('order/',include('api.order.urls')),
    path('payment/',include('api.payment.urls')),
]
