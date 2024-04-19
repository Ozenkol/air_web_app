from django.urls import path
from . import views

urlpatterns = [
    path('flights/', views.flight_list),
    path('flights/<int:pk>/', views.flight_detail, name='flight_detail'),
    path('book/<int:pk>/', views.book_flight, name='book_flight'),
    path('booking/<int:pk>/', views.booking_detail, name='booking_detail'),
]