from django.urls import path

from . import views

app_name='encyclopedia'
urlpatterns = [
    path("", views.index, name="index"),
    path('wiki/<str:title>/', views.detail, name='detail'),
    path('wiki/search', views.search, name='search'),
    path('wiki/random', views.randomize, name='random'),
    path('wiki/new_page', views.new_page, name='new_page'),
    path('wiki/edit_page/<str:title>', views.edit_page, name='edit_page'),
]
