// src/app/user-profile/user-profile.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() userData = { Username: "", Email: "", Birthday: "", FavoriteMovies: [] };

  user: any = {};
  movies: any[] = [];
  FavoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProfile();
    this.getFavMovies();
  }

  private getUserFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem('user') || '{}');
    }
    return null;
  }

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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

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

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '450px',
    });
  }

  openSynopsisDialog(description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        Description: description,
      },
      width: '450px',
    });
  }

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

  isFav(movie: any): boolean {
    const MovieID = movie._id;
    return this.FavoriteMovies.some((favMovie: any) => favMovie === MovieID);
  }

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
