import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
  errorMessage?: string
  airports?: Airport[];
  flights?: Flight[];
  sortedFlights?: Flight[];
  selectedOrigin!: Airport;
  selectedDestination!: Airport;
  seat_class!: string;
  passanger!: Passanger

  constructor(private datasource: RestDataSourceService,
    private route: Router
  ) {

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
      err => {
        if(err) {
          this.errorMessage = "Unauthorized"
        }
      }
    )
    this.flights = this.sortedFlights?.filter(
      (f) => f.origin.name === this.selectedOrigin?.name
    ).filter(
      (f) => f.destination.name === this.selectedDestination?.name
    )
  }

  createBook(passanger: Passanger, flight: Flight, seat_class: string, total_price: number) {
    if (seat_class == 'economic') {
      total_price = flight.price_economy
    }
    else if (seat_class == 'business') {
      total_price = flight.price_business
    }
    else if (seat_class == 'first') {
      total_price = flight.price_first
    }
    this.datasource.createBook(
      passanger,
      flight,
      seat_class,
      total_price
    ).subscribe(
      data => {
        if(data) {
          this.errorMessage = undefined
          this.route.navigateByUrl('')
        }
      },
      error => { if(error) {
        this.errorMessage = "Unauthorizated"
        console.log(this.errorMessage)
      }
      }
    )
  }

}
