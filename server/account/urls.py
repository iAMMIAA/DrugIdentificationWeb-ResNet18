# accounts/urls.py
from django.urls import path
from . import views
# from .views import register_user, user_login, user_logout, view_list, change_password

urlpatterns = [
    #API User
    path('listUser/', views.view_list),
    path('register/', views.register_user, name='register'),
    path('login/', views.user_login, name='login'),
    path('change_password/', views.change_password, name='change_password'),
    path('update_profile/', views.update_individual_info, name = 'update'),
    path('logout/', views.user_logout, name='logout'),
    path('deleteUser/<str:pk>/', views.delete_user),

    #API Drug
    path('', views.apiOverview , name = 'overview'),
    path('listDrug/', views.drugList, name = 'drugList'),
    path('detail/<str:pk>/', views.drugDetail, name = 'drugDetail'),
    path('create/', views.drugCreate, name = 'drugCreate'),
    path('update/<str:pk>/', views.drugUpdate, name = 'updateDrug'),
    path('delete/<str:pk>/', views.drugDelete, name = 'drugDelete'),
    # path('register/', views.register, name="register"),

    #Xam
    path('home/', views.home),
    path('prescription/', views.prescription),
    path('settings/', views.settings),
    path('about/', views.about),
]
