import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwt = new JwtHelperService();
import 'rxjs/Rx';

class DecodedToken {
    exp: number = 0;
    username: string = '';
}

@Injectable()
export class AuthService{
    private decodedToken;
      
      constructor(private http: HttpClient){}

      public register(userData: any): Observable<any>{
          return this.http.post('api/v1/users/register', userData);
      }

      public login(userData: any): Observable<any>{
        return this.http.post('api/v1/users/auth', userData).map(
            (token:string) => this.saveToken(token));
    }

    private saveToken(token: string) : string {
        this.decodedToken = jwt.decodeToken(token);

        localStorage.setItem('booking_auth', token);
        localStorage.setItem('booking_meta', JSON.stringify(this.decodedToken));

        return token;
    }
}