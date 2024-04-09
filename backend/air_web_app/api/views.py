from django.shortcuts import render

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from .models import Flight, Passenger, Booking
from .forms import SearchForm, BookingForm

def flight_list(request):
    flights = Flight.objects.all()
    search_form = SearchForm(request.GET)
    if search_form.is_valid():
        origin = search_form.cleaned_data.get('origin')
        destination = search_form.cleaned_data.get('destination')
        flights = flights.filter(origin=origin, destination=destination)
    return render(request, 'flight_list.html', {'flights': flights, 'search_form': search_form})

def flight_detail(request, pk):
    flight = get_object_or_404(Flight, pk=pk)
    return render(request, 'flight_detail.html', {'flight': flight})

@login_required
def book_flight(request, pk):
    flight = get_object_or_404(Flight, pk=pk)
    if request.method == 'POST':
        form = BookingForm(request.POST)
        if form.is_valid():
            passenger = Passenger.objects.get(user=request.user)
            seat_class = form.cleaned_data['seat_class']
            total_price = flight.get_price(seat_class)
            booking = Booking.objects.create(passenger=passenger, flight=flight, seat_class=seat_class, total_price=total_price)
            flight.book_seat()
            return redirect('booking_detail', pk=booking.pk)
    else:
        form = BookingForm()
    return render(request, 'book_flight.html', {'flight': flight, 'form': form})

def booking_detail(request, pk):
    booking = get_object_or_404(Booking, pk=pk)
    if request.user == booking.passenger.user:
        return render(request, 'booking_detail.html', {'booking': booking})
    else:
        return HttpResponseForbidden("You don't have permission to view this booking.")
