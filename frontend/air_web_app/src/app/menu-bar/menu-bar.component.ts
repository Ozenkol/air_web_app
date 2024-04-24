import { Component } from '@angular/core';
import { LogInComponent } from '../log-in/log-in.component';
import { FlightsComponent } from '../flights/flights.component';
import { FlightSearchComponent } from '../flight-search/flight-search.component';
import { BooksComponent } from '../books/books.component';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [LogInComponent, FlightsComponent, FlightSearchComponent, BooksComponent],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {

}
