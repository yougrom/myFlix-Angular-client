// src/app/app.component.ts
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MovieCardComponent } from '../app/movie-card/movie-card.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component'; // Import the Login Component

// This is the root component of the app
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) { }

  // Opens the registration dialog  
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
    width: '280px'
    });
  }

  // Opens the login dialog
  openLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280pm'
    });
  }

  // Opens the movies dialog
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px'
    });
  }
}

