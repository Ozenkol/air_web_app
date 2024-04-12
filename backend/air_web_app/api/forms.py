from django import forms
from .models import Booking

class SearchForm(forms.Form):
    origin = forms.CharField(label='Origin', max_length=3)
    destination = forms.CharField(label='Destination', max_length=3)

class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = ['seat_class']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['seat_class'].widget = forms.Select(choices=self.get_seat_class_choices())

    def get_seat_class_choices(self):
        return [
            ('economy', 'Economy'),
            ('business', 'Business'),
            ('first', 'First')
        ]
