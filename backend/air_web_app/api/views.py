from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from rest_framework import views, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Flight, Passenger, Booking, User
from .forms import SearchForm, BookingForm
from .serializers import FlightSerializer, BookingSerializer, UserSerializer, PassengerCreateSerializer


class FlightListView(views.APIView):
    def get(self, request):
        flights = Flight.objects.all()
        search_form = SearchForm(request.GET)
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

class BookFlightView(views.APIView):
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

class BookingListView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        passenger = get_object_or_404(Passenger, user_id=user_id)
        bookings = Booking.objects.filter(passenger=passenger)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)

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
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        booking = get_object_or_404(Booking, pk=pk)
        if request.user == booking.passenger.user:
            serializer = BookingSerializer(booking, data=request.data)
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

class PassengerDetailView(APIView):
    def get(self, request):
        passenger = get_object_or_404(Passenger, user=request.user)
        if request.user == passenger.user:
            return Response({"passenger": passenger}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response("You don't have permission to delete this booking.", status=status.HTTP_403_FORBIDDEN)

class PassengerCreateView(views.APIView):
    def post(self, request):
        username = request.data.get('username')  # Assuming username is provided in the request data
        user = User.objects.create(username=username)
        passenger_data = {'user': user.id, 'flights': []}  # Customize data as needed
        serializer = PassengerCreateSerializer(data=passenger_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        user.delete()  # Rollback user creation if passenger creation fails
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserSignUpAPIView(views.APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)