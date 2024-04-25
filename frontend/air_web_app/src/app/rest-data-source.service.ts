import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';

const PROTOCOL = "http";
const PORT = "8000";


@Injectable({
  providedIn: 'root'
})
export class RestDataSourceService {
  baseUrl = `${PROTOCOL}://localhost:${PORT}/`;
  auth_token ?: string;

  constructor(private http: HttpClient) { 
  
  }

  get airports() : Observable<Airport[]> {
    return this.http.get<Airport[]>(
      this.baseUrl + "api/" + "airports/"
    )
  }
  
  get flights() : Observable<Flight[]> {
    return this.http.get<Flight[]>(
      this.baseUrl + "api/flights/"
    )
  } 

  books() : Observable<Book[]> {
    return this.http.get<Book[]>(
      this.baseUrl + "api/booking"
    )
  }

  get passanger() : Observable<any> {
    return this.http.get<any>(
      this.baseUrl + "api/passenger/"
    )
  }

  createBook(passanger: Passanger, flight: Flight, seat_class: string, total_price: number):
  Observable<any> {
    return this.http.post(
      this.baseUrl + "api/booking/create/",
      {
        flight: flight.id,
        seat_class: seat_class,
        total_price: total_price,
      }
    )
  }

  updateBook(id: number, seat_class: string, total_price: number) {
    return this.http.put<any>(
      this.baseUrl + "api/booking/" + id,
      {
        seat_class: seat_class,
        total_price : total_price
      }
    )
  }

  deleteBook(id: number) : Observable<any> {
    return this.http.delete(
      this.baseUrl + "api/booking/" + id
    )
  }

  authenticate(username : string, password : string) : Observable<any> {
    return this.http.post<any>(
      this.baseUrl + "api/"+"sign-in/",
      {
        username: username,
        password: password
      }
    )
  }
  registration(username : string, 
    first_name : string, last_name : string,
    password : string, email: string) : Observable<any> {
    return this.http.post<any>(
      this.baseUrl +"api/"+ "sign-up/",
      {
        username: username,
        first_name: first_name,
        last_name: last_name,
        password: password,
        email: email
      }
    )
  }
  createPassenger() {
    return this.http.post<any>(
      this.baseUrl + "api/" + "passenger/create/",
      {
        
      }
    )
  }
 
}

export class Airport {
  constructor(
    public id : number,
    public code : number,
    public name : string
  ) {}
}

export class User {
  constructor(
    public id : number
  ) {}
}

export class Passanger {
  constructor(
     public id: number,
     public user: User,
     public flights: Flight[]
  ) {}
}

export class Book {
  constructor(
    public id: number,
    public passenger: Passanger,
    public flight: Flight,
    public seat_class: string,
    public booking_date: Date,
    public total_price: number
  ){}
}

export class Flight {
  constructor(
    public id: number,
    public origin : Airport,
    public destination: Airport,
    public departure_time : Date,
    public arrival_time : Date,
    public price_economy : number,
    public price_business : number,
    public price_first : number,
    public total_seats : number,
    public available_seats : number
  ) {}
}
