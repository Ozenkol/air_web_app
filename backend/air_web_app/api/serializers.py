from rest_framework import serializers
from .models import Airport

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