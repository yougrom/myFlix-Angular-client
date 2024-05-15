// src/app/user-profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  user: any = {};
  userData = { Username: "", FavoriteMovies: [] };
  FavoriteMovies: any[] = [];
  isFavMovie: boolean = false;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
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

  getUserFromLocalStorage(): any {
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem('user') || '{}');
    }
    return null;
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

  toggleFav(movie: any): void {
    const isFavorite = this.isFav(movie);
    if (isFavorite) {
      this.deleteFavMovies(movie);
    } else {
      this.addFavMovies(movie);
    }
  }

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
