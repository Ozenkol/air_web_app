from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import views, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Airport, Flight, Passenger, Booking
from .forms import SearchForm, BookingForm
from .serializers import AirportSerializer, FlightSerializer, BookingSerializer, PassengerSerializer, UserSerializer


def airportsList(request):
    objects = Airport.objects.all()
    serializer = AirportSerializer(objects, many = True)
    print(serializer.data)
    return JsonResponse(serializer.data, safe = False)

class FlightListView(views.APIView):
    def get(self, request):
        flights = Flight.objects.all()
        search_form = SearchForm(request.GET)
        print(request.user)
        if search_form.is_valid():
            origin = search_form.cleaned_data.get('origin')
            destination = search_form.cleaned_data.get('destination')
            flights = flights.filter(origin=origin, destination=destination)
        serializer = FlightSerializer(flights, many=True)
        return Response(serializer.data)

class FlightDetailView(views.APIView):
    def get(self, request, pk):
        flight = get_object_or_404(Flight, pk=pk)
        serializer = FlightSerializer(flight)
        return Response(serializer.data)
    

@authentication_classes([JWTAuthentication])
class BookFlightView(views.APIView):
    print("LOL")
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, pk):
        flight = get_object_or_404(Flight, pk=pk)
        form = BookingForm(request.data)
        if form.is_valid():
            passenger = Passenger.objects.get(user=request.user)
            seat_class = form.cleaned_data['seat_class']
            total_price = flight.get_price(seat_class)
            booking = Booking.objects.create(passenger=passenger, flight=flight, seat_class=seat_class, total_price=total_price)
            flight.book_seat()
            serializer = BookingSerializer(booking)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

class BookingDetailView(views.APIView):
    def get(self, request):
        booking = Booking.objects.all()
        serializer = BookingSerializer(booking)
        if request.user == booking.passenger.user:
            return Response(serializer.data)
        else:
            return Response("You don't have permission to view this booking.", status=status.HTTP_403_FORBIDDEN)

class UserSignUpAPIView(views.APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        print(request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)