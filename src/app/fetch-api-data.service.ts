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

  /**
   * Retrieves the token from local storage.
   * @returns The token if it exists, otherwise null.
   */
  private getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

    /**
   * Registers a new user.
   * @param userDetails - The details of the user to register.
   * @returns An Observable containing the response from the API.
   */
  // Making the API call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Logs in a user.
   * @param userDetails - The details of the user to log in.
   * @returns An Observable containing the response from the API.
   */
  // Making the API call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves all movies.
   * @returns An Observable containing the list of all movies.
   */
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

  /**
   * Retrieves a single movie.
   * @param Title - The title of the movie to retrieve.
   * @returns An Observable containing the movie.
   */
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

    /**
   * Retrieves a director by name.
   * @param Name - The name of the director to retrieve.
   * @returns An Observable containing the director's details.
   */
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

  /**
   * Retrieves a genre by name.
   * @param Name - The name of the genre to retrieve.
   * @returns An Observable containing the genre's details.
   */
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

  /**
   * Retrieves a user by username.
   * @param Username - The username of the user to retrieve.
   * @returns An Observable containing the user's details.
   */
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

    /**
   * Retrieves the favorite movies of a user.
   * @param Username - The username of the user whose favorite movies are to be retrieved.
   * @returns An Observable containing the list of favorite movies.
   */
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
  /**
   * Edits the user's details.
   * @param updatedUser - The updated user details.
   * @returns An Observable containing the response from the API.
   */
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

  /**
   * Deletes the user's account.
   * @returns An Observable containing the response from the API.
   */
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

  /**
   * Adds a movie to the user's list of favorite movies.
   * @param Username - The username of the user.
   * @param _id - The ID of the movie to add to the list of favorite movies.
   * @returns An Observable containing the response from the API.
   */
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

  /**
   * Removes a movie from the user's list of favorite movies.
   * @param Username - The username of the user.
   * @param _id - The ID of the movie to remove from the list of favorite movies.
   * @returns An Observable containing the response from the API.
   */
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

    /**
   * Extracts response data.
   * @param res - The response to extract data from.
   * @returns The extracted data.
   */
  // Non-typed response extraction
  private extractResponseData(res: any): any {
    return res || {};
  }

  /**
   * Handles errors in API calls.
   * @param error - The error to handle.
   * @returns An error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(`Error Status code ${error.status}, Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
