from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Airport, Passenger, Booking


class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    password = serializers.CharField()
    email = serializers.EmailField()

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        user = User.objects.create(**validated_data)
        return user

class AirportSerializer(serializers.Serializer):
    code = serializers.CharField()
    name = serializers.CharField()

class FlightSerializer(serializers.Serializer):
    origin = AirportSerializer()
    destination = AirportSerializer()
    departure_time = serializers.DateTimeField()
    arrival_time = serializers.DateTimeField()
    price_economy = serializers.DecimalField(max_digits = 100, decimal_places = 2)
    price_business = serializers.DecimalField(max_digits = 100, decimal_places = 2)
    price_first = serializers.DecimalField(max_digits = 100, decimal_places = 2)
    total_seats = serializers.IntegerField()
    available_seats = serializers.IntegerField()

class PassengerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    flights = FlightSerializer(many=True)

    class Meta:
        model = Passenger
        fields = ['id', 'user', 'flights']

# class PassengerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Passenger
#         fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    passenger = PassengerSerializer()
    flight = FlightSerializer()

    class Meta:
        model = Booking
        fields = ['id', 'passenger', 'flight', 'seat_class', 'booking_date', 'total_price']

class PassengerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = ['user', 'flights']