import { Component } from '@angular/core';
import { Flight, RestDataSourceService } from '../rest-data-source.service';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent {
  flights ?: Flight[]

  constructor(private datasource : RestDataSourceService) {}
  getFlights() {
    this.datasource.flights.subscribe(
      data => this.flights = data
    )
  }
}
