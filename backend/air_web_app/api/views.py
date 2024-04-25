from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import views, status
from rest_framework.decorators import authentication_classes, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Airport, Flight, Passenger, Booking, User
from .forms import SearchForm, BookingForm
from .serializers import AirportSerializer, BookingCreateSerializer, BookingUpdateSerializer, FlightSerializer, BookingSerializer, PassengerCreateSerializer, \
    PassengerSerializer, PassengerSerializer, UserSerializer


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

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def book_flight_view(request, pk):
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def booking_list_view(request):
    passenger = get_object_or_404(Passenger, user=request.user)
    bookings = Booking.objects.filter(passenger=passenger)
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_booking(request):
    # Extracting user from the request
    user = request.user
    try:
        # Attempt to get the passenger associated with the user
        passenger = Passenger.objects.get(user=user)
    except Passenger.DoesNotExist:
        # If the passenger doesn't exist, create a new one
        passenger = Passenger.objects.create(user=user)

    # Validating and saving the booking
    data = request.data
    data['passenger'] = passenger.id
    serializer = BookingSerializer(
        data = request.data
    )
    if serializer.is_valid():
        serializer.validated_data['passenger'] = passenger
        print(serializer.validated_data)
        serializer.save()
        return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors)

class BookingDetailView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        booking = get_object_or_404(Booking, pk=pk)
        if request.user == booking.passenger.user:
            serializer = BookingSerializer(booking)
            return Response(serializer.data)
        else:
            return Response("You don't have permission to view this booking.", status=status.HTTP_403_FORBIDDEN)

    def post(self, request):
        # Extracting user from the request
        user = request.user

        try:
            # Attempt to get the passenger associated with the user
            passenger = Passenger.objects.get(user=user)
        except Passenger.DoesNotExist:
            # If the passenger doesn't exist, create a new one
            passenger = Passenger.objects.create(user=user)

        # Validating and saving the booking
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            # Assigning the passenger to the booking
            serializer.validated_data['passenger'] = passenger
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        booking = get_object_or_404(Booking, pk=pk)
        if request.user == booking.passenger.user:
            serializer = BookingUpdateSerializer(booking, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response("You don't have permission to update this booking.", status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, pk):
        booking = get_object_or_404(Booking, pk=pk)
        if request.user == booking.passenger.user:
            booking.delete()
            return Response("Booking deleted successfully.", status=status.HTTP_204_NO_CONTENT)
        else:
            return Response("You don't have permission to delete this booking.", status=status.HTTP_403_FORBIDDEN)

class GetPassengerByUser(APIView):
    def get(self, request):
        user_id = request.user.id
        try:
            passenger = Passenger.objects.get(user_id=user_id)
            serializer = PassengerSerializer(passenger)
            return Response(serializer.data)
        except Passenger.DoesNotExist:
            return Response({'error': 'Passenger not found for this user'}, status=status.HTTP_404_NOT_FOUND)

class PassengerCreateView(views.APIView):
    def post(self, request):
        username = request.user  # Assuming username is provided in the request data
        print(username)
        user = User.objects.get(username=username)
        print(user.id)
        passenger_data = {'user': user.id, 'flights': []}  # Customize data as needed
        serializer = PassengerCreateSerializer(data=passenger_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserSignUpAPIView(views.APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        print(request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)