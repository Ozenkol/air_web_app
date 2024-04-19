import { Injectable } from '@angular/core';
import { RestDataSourceService } from './rest-data-source.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private datasource: RestDataSourceService) { }
  
  authenticate(username: string, password: string): Observable<boolean> { 
    console.log("Auth valid")
    return this.datasource.authenticate(username, password); 
  } 
  get authenticated(): boolean { 
    return this.datasource.auth_token != null; 
  } 
  clear() { 
    this.datasource.auth_token = undefined; 
  } 

}
