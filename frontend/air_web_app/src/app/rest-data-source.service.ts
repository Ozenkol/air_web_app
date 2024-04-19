import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  
  get flights() : Observable<Flight[]> {
    return this.http.get<Flight[]>(
      this.baseUrl + "api/flights/"
    )
  } 

  authenticate(username : string, password : string) : Observable<Token> {
    console.log(this.baseUrl)
    return this.http.post<Token>(
      this.baseUrl + "auth/login/",
      {
        username: username,
        password: password
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

export class Flight {
  constructor(
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

export class Token {
  constructor(
    public  access: string,
    public  refresh: string
  ) {}
}