import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'https://gorest.co.in/public/v2/users';
  private accessToken = 'Bearer 0acf06a1753f9eb1dee64d7388f1491e75977765c003909a0287b2186fa4701e';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.accessToken
    })
  };

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  postUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.patch(this.apiUrl + '/' + id, user, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError('Something went wrong; please try again later.');
  }

}
