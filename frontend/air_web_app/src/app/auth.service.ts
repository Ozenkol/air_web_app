import { Injectable } from '@angular/core';
import { RestDataSourceService } from './rest-data-source.service';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private datasource: RestDataSourceService) { }

  private setSession(authResult : any) {
    console.log("This is", authResult)
    const token = authResult.refresh;
    console.log("Token ", token)
    const payload = <JWTPayload> jwtDecode(token);
    console.log("This is payload ", payload)
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('token', authResult.refresh);
    console.log("This is token ", localStorage.getItem('token'))
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  get token() : string | null {
    return localStorage.getItem('token');
  }

  registration(username: string, 
    first_name: string, last_name:string,
    password: string, email: string) : Observable<any> {
    return this.datasource.registration(username, first_name, last_name, password, email)
  }
  
  authenticate(username: string, password: string): Observable<any> { 
    return this.datasource.authenticate(username, password).pipe(
      tap(response => this.setSession(response)),
      shareReplay(),
    )
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }
  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration ?? "");

    return moment(expiresAt);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  clear() { 
    this.datasource.auth_token = undefined; 
  } 

}

export class JWTPayload {
  constructor(
    public user_id: number,
    public username: string,
    public email: string,
    public exp: number
  ) {}
}
