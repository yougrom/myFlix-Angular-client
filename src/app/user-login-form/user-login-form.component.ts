// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

//  Component for the user login form.
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {

  // User data input for login.
  @Input() userData = {
    Username: '',
    Password: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>, //The reference to the dialog.
    public snackBar: MatSnackBar, //The service for showing snack bar notifications.
    private router: Router
  ) { }

  //  * Lifecycle hook called after component initialization.
  ngOnInit(): void { }

  // Logs in the user.
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
