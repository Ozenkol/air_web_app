import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Airport, Flight, Passanger, RestDataSourceService } from '../rest-data-source.service';
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
  seat_class!: string;
  passanger!: Passanger

  constructor(private datasource: RestDataSourceService) {

  }

  ngOnInit(): void {
      this.datasource.airports.subscribe(
        data => this.airports = data
      )
      this.datasource.passanger.subscribe(
        data => this.passanger = data
      )
      console.log(this.passanger)
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

  createBook(passanger: Passanger, flight: Flight, seat_class: string, total_price: number) {
    this.datasource.createBook(
      passanger,
      flight,
      seat_class,
      total_price
    ).subscribe()
  }

}
