// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Component for the user login form.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {

    /**
   * User data input for login.
   * @type {{ Username: string, Password: string }}
   */
  @Input() userData = {
    Username: '',
    Password: '',
  };

    /**
   * Creates an instance of UserLoginFormComponent.
   * @param {FetchApiDataService} fetchApiData - The service for fetching API data.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - The reference to the dialog.
   * @param {MatSnackBar} snackBar - The service for showing snack bar notifications.
   * @param {Router} router - The Angular Router service.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>, //The reference to the dialog.
    public snackBar: MatSnackBar, //The service for showing snack bar notifications.
    private router: Router
  ) { }

    /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit(): void { }

    /**
   * Logs in the user.
   * Sends the user data to the login API and handles the response.
   * On success, stores the user and token in local storage, closes the dialog,
   * shows a success notification, and navigates to the movies page.
   * On failure, shows an error notification.
   */
  loginUser(): void {
    console.log('Logging in with user data:', this.userData);

    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      this.dialogRef.close(); // Will close modal on success
      this.snackBar.open('User login successful', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies'])
    }, (error) => {
      console.error('Login error:', error);
      let errorMessage = error.error.message || 'No error message provided by server';
      this.snackBar.open(`User login failed: ${errorMessage}`, 'OK', {
        duration: 2000
      });
    });
  }
}
