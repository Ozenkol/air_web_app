from django.db import models

from django.db import models
from django.contrib.auth import get_user_model


#User model
User = get_user_model()

class Airport(models.Model):
    code = models.CharField(max_length=3, unique=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.code})"

class Flight(models.Model):
    origin = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='departures')
    destination = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='arrivals')
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    price_economy = models.DecimalField(max_digits=10, decimal_places=2)
    price_business = models.DecimalField(max_digits=10, decimal_places=2)
    price_first = models.DecimalField(max_digits=10, decimal_places=2)
    total_seats = models.IntegerField()
    available_seats = models.IntegerField()

    def __str__(self):
        return f"Flight {self.id} - {self.origin} to {self.destination}"

class Passenger(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    flights = models.ManyToManyField(Flight, blank=True)

    def __str__(self):
        return self.user.username

class Booking(models.Model):
    passenger = models.ForeignKey(Passenger, on_delete=models.CASCADE)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    seat_class = models.CharField(max_length=10, choices=[('economy', 'Economy'), ('business', 'Business'), ('first', 'First')])
    booking_date = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Booking {self.id} - {self.passenger.user.username} on {self.flight} ({self.seat_class})"
