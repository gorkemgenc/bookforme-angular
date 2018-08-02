import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
const jwt = new JwtHelperService();
import 'rxjs/Rx';

class DecodedToken {
    exp: number = 0;
    username: string = '';
}

@Injectable()
export class AuthService{
    private decodedToken;
      
      constructor(private http: HttpClient){
          this.decodedToken = JSON.parse(localStorage.getItem('booking_meta')) || new DecodedToken();
      }

      private saveToken(token: string) : string {
        this.decodedToken = jwt.decodeToken(token);

        localStorage.setItem('booking_auth', token);
        localStorage.setItem('booking_meta', JSON.stringify(this.decodedToken));

        return token;
      }

      public register(userData: any): Observable<any>{
          return this.http.post('api/v1/users/register', userData);
      }

      private getExpiration(){
        return moment.unix(this.decodedToken.exp);
      }

      public login(userData: any): Observable<any>{
        return this.http.post('api/v1/users/auth', userData).map(
            (token:string) => this.saveToken(token));
    }

    public logout(){
        localStorage.removeItem('booking_auth');
        localStorage.removeItem('booking_meta');
        this.decodedToken = new DecodedToken();
    }

    public isAuthenticated(): boolean {
        return moment().isBefore(this.getExpiration());
    }

    public getUserName() : string {
        return this.decodedToken.username;
    }
}