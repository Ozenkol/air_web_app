import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

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

  authenticate(username : string, password : string) : Observable<boolean> {
    console.log("Data works!")
    console.log(username, password)
    return this.http.post<any>(
      this.baseUrl + "auth/login/",
      {
        username: username,
        password: password
      }
    ).pipe(map(response => { 
      this.auth_token = response.success ? response.token : null; 
      return response.success; 
    })); 
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
