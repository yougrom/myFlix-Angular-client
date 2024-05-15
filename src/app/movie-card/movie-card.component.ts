// src/app/user-profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * MovieCardComponent is responsible for displaying the list of movies,
 * opening dialogs with movie information, and managing favorite movies.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  /** Array of movies to be displayed */
  movies: any[] = [];
  /** User object containing user details */
  user: any = {};
  /** User data containing username and favorite movies */
  userData = { Username: "", FavoriteMovies: [] };
  /** Array of favorite movies */
  FavoriteMovies: any[] = [];
  /** Boolean flag to check if a movie is a favorite */
  isFavMovie: boolean = false;

    /**
   * Constructor for MovieCardComponent
   * @param fetchApiData Service to fetch data from API
   * @param dialog Service to open dialogs
   * @param snackBar Service to show snack bar notifications
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

    /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }

    /**
   * Fetches the list of all movies from the API.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

    /**
   * Opens a dialog with director information.
   * @param name - Director's name
   * @param bio - Director's biography
   * @param birth - Director's birth date
   * @param death - Director's death date
   */
  openDirectorDialog(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      },
      width: '450px',
    });
  }

    /**
   * Opens a dialog with genre information.
   * @param name - Genre name
   * @param description - Genre description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '450px',
    });
  }

    /**
   * Opens a dialog with movie synopsis.
   * @param description - Movie description
   */
  openSynopsisDialog(description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        Description: description,
      },
      width: '450px',
    });
  }

    /**
   * Retrieves user data from local storage.
   * @returns User object or null if not found
   */
  getUserFromLocalStorage(): any {
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem('user') || '{}');
    }
    return null;
  }

    /**
   * Fetches the list of favorite movies for the logged-in user.
   */
  getFavMovies(): void {
    const user = this.getUserFromLocalStorage();
    if (user) {
      this.fetchApiData.getOneUser(user.Username).subscribe((response) => {
        this.user = response;
        this.userData.FavoriteMovies = this.user.FavoriteMovies;
        this.FavoriteMovies = this.user.FavoriteMovies;
      });
    }
  }

    /**
   * Checks if a movie is a favorite.
   * @param movie - Movie object
   * @returns True if the movie is a favorite, false otherwise
   */
  isFav(movie: any): boolean {
    const MovieID = movie._id;
    return this.FavoriteMovies.some((favMovie: any) => favMovie === MovieID);
  }

    /**
   * Toggles the favorite status of a movie.
   * @param movie - Movie object
   */
  toggleFav(movie: any): void {
    const isFavorite = this.isFav(movie);
    if (isFavorite) {
      this.deleteFavMovies(movie);
    } else {
      this.addFavMovies(movie);
    }
  }

    /**
   * Adds a movie to the user's list of favorite movies.
   * @param movie - Movie object
   */
  addFavMovies(movie: any): void {
    const user = this.getUserFromLocalStorage();
    if (user) {
      this.fetchApiData.addFavoriteMovie(user.Username, movie._id).subscribe((result: any) => {
        this.user.FavoriteMovies.push(movie._id);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(this.user));
        }
        this.FavoriteMovies = this.user.FavoriteMovies;
        this.snackBar.open('Movie has been added to your favorites!', 'OK', {
          duration: 3000,
        });
      });
    }
  }

    /**
   * Removes a movie from the user's list of favorite movies.
   * @param movie - Movie object
   */
  deleteFavMovies(movie: any): void {
    const user = this.getUserFromLocalStorage();
    if (user) {
      this.fetchApiData.deleteFavoriteMovie(user.Username, movie._id).subscribe((result: any) => {
        this.user.FavoriteMovies = this.user.FavoriteMovies.filter((id: string) => id !== movie._id);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(this.user));
        }
        this.FavoriteMovies = this.user.FavoriteMovies;
        this.snackBar.open('Movie has been deleted from your favorites!', 'OK', {
          duration: 3000,
        });
      });
    }
  }
}
