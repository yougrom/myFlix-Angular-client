// src/app/app.component.ts
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MovieCardComponent } from '../../../../cf-course/full-stack/6-collab-doc/6-4-advanced-angular-part-2/movie-card/movie-card.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component'; // Import the Login Component



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

