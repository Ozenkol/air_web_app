from django.contrib import admin

from .models import Flight, Passenger, Booking, Airport

admin.site.register(Flight)
admin.site.register(Passenger)
admin.site.register(Booking)
admin.site.register(Airport)
