from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

from . import views
from .views import UserSignUpAPIView, FlightListView, FlightDetailView, BookFlightView, BookingDetailView, airportsList

urlpatterns = [
    path('airports/', airportsList),
    path('flights/', FlightListView.as_view(), name='flight_list'),
    path('flights/<int:pk>/', FlightDetailView.as_view(), name='flight_detail'),
    path('book/<int:pk>/', BookFlightView.as_view(), name='book_flight'),
    path('booking/<int:pk>/', BookingDetailView.as_view(), name='booking_detail'),
    path('sign-in/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('sign-in/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('sign-up/', UserSignUpAPIView.as_view(), name='user-sign-up'),
]