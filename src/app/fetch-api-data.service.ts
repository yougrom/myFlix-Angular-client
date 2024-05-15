// src/app/fetch-api-data.service.ts
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the API URL that will provide data for the client app
const apiUrl = 'https://dry-ridge-94435-1154c64a056a.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Making the API call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the API call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the API call for the get all movies endpoint
  getAllMovies(): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Making the API call for the get one movie endpoint - Title
  getOneMovie(Title: string): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies/' + Title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the API call for the get one director endpoint — Name
  getOneDirector(Name: string): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies/Director/' + Name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the API call for the get one genre endpoint — Name
  getOneGenre(Name: string): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies/Genre/' + Name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the API call for the get one user endpoint
  getOneUser(Username: string): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'users/' + Username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Making the API call for the get favorite movies for a user endpoint
  getFavoriteMovies(Username: string): Observable<any> {
    const token = this.getToken();
    return this.http.get(apiUrl + 'users/' + Username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }

  // Making the API call for the edit user endpoint
  editUser(updatedUser: any): Observable<any> {
    const token = this.getToken();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.put(apiUrl + `users/${user.Username}`, updatedUser, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Making the API call for the delete user endpoint
  deleteUser(): Observable<any> {
    const User = JSON.parse(localStorage.getItem('user') || '{}');
    const token = this.getToken();
    return this.http.delete(apiUrl + 'users/' + User.Username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Making the API call for the add a movie to favorite Movies endpoint
  addFavoriteMovie(Username: string, _id: string): Observable<any> {
    const token = this.getToken();
    return this.http.post(apiUrl + `users/${Username}/movies/${_id}`, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Making the API call for the delete a movie from the favorite movies endpoint
  deleteFavoriteMovie(Username: string, _id: string): Observable<any> {
    const token = this.getToken();
    return this.http.delete(apiUrl + `users/${Username}/FavoriteMovies/${_id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    return res || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(`Error Status code ${error.status}, Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
