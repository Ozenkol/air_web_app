import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Airport, Flight, RestDataSourceService } from '../rest-data-source.service';
import { FlightsComponent } from '../flights/flights.component';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css'
})
export class FlightSearchComponent implements OnInit {
  airports?: Airport[];
  flights?: Flight[];
  sortedFlights?: Flight[];
  selectedOrigin!: Airport;
  selectedDestination!: Airport;

  constructor(private datasource: RestDataSourceService) {

  }

  ngOnInit(): void {
      this.datasource.airports.subscribe(
        data => this.airports = data
      )
  }

  filter() {
    this.datasource.flights.subscribe(
      data => this.sortedFlights = data,
    )
    this.flights = this.sortedFlights?.filter(
      (f) => f.origin.name === this.selectedOrigin?.name
    ).filter(
      (f) => f.destination.name === this.selectedDestination?.name
    )
  }

}
