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

  registration(username: string, email: string, password: string) {
    
  }
  
  authenticate(username: string, password: string): Observable<any> { 
    return this.datasource.authenticate(username, password).pipe(
      tap(response => this.setSession(response)),
      shareReplay(),
    )
  } 
  get authenticated(): boolean { 
    return this.datasource.auth_token != null; 
  } 
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
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
