// src/app/user-profile/user-profile.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';

/**
 * UserProfileComponent is used to display and manage the user's profile.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    /**
   * The user's data including username, email, birthday, and favorite movies.
   */
  @Input() userData = { Username: "", Email: "", Birthday: "", FavoriteMovies: [] };

  user: any = {};
  movies: any[] = [];
  FavoriteMovies: any[] = [];

    /**
   * Constructs the UserProfileComponent.
   * 
   * @param fetchApiData The service to fetch API data.
   * @param snackBar The service to show snack bar notifications.
   * @param router The router service to navigate.
   * @param dialog The dialog service to open dialogs.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) { }

    /**
   * Initializes the component by fetching the user's profile and favorite movies.
   */
  ngOnInit(): void {
    this.getProfile();
    this.getFavMovies();
  }

    /**
   * Retrieves the user data from local storage.
   * 
   * @returns The user data from local storage.
   */
  private getUserFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem('user') || '{}');
    }
    return null;
  }

    /**
   * Fetches the user's profile information and their favorite movies.
   */
  getProfile(): void {
    const user = this.getUserFromLocalStorage();
    if (user) {
      this.fetchApiData.getOneUser(user.Username).subscribe((response) => {
        this.user = response;
        this.userData.Username = this.user.Username;
        this.userData.Email = this.user.Email;
        this.userData.Birthday = this.user.Birthday;
        this.fetchApiData.getAllMovies().subscribe((response) => {
          this.FavoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
        });
      });
    }
  }

    /**
   * Updates the user's profile information.
   */

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(result));
      }
      this.snackBar.open('User update successful', 'OK', {
        duration: 2000
      });
      this.user = result; // Update local user data
      this.userData.FavoriteMovies = this.user.FavoriteMovies;
    }, (error) => {
      this.snackBar.open('Failed to update user', 'OK', {
        duration: 2000
      });
    });
  }

    /**
   * Deletes the user's profile.
   */
  deleteUser(): void {
    this.router.navigate(['welcome']).then(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.clear();
      }
      this.snackBar.open('User successfully deleted.', 'OK', {
        duration: 2000
      });
    });
    this.fetchApiData.deleteUser().subscribe((result) => {
      console.log(result);
    });
  }

    /**
   * Fetches all movies.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

    /**
   * Opens a dialog with information about the director.
   * 
   * @param name The name of the director.
   * @param bio The biography of the director.
   * @param birth The birth date of the director.
   * @param death The death date of the director.
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
   * Opens a dialog with information about the genre.
   * 
   * @param name The name of the genre.
   * @param description The description of the genre.
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
   * Opens a dialog with the synopsis of a movie.
   * 
   * @param description The description of the movie.
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
   * Fetches the user's favorite movies.
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
   * Checks if a movie is a favorite of the user.
   * 
   * @param movie The movie to check.
   * @returns True if the movie is a favorite, false otherwise.
   */
  isFav(movie: any): boolean {
    const MovieID = movie._id;
    return this.FavoriteMovies.some((favMovie: any) => favMovie === MovieID);
  }

    /**
   * Deletes a movie from the user's favorite movies.
   * 
   * @param movie The movie to delete from favorites.
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
