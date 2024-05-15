// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The UserRegistrationFormComponent is responsible for rendering the user registration form
 * and handling the registration logic by interacting with the backend API.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

    /**
   * @property {Object} userData - The data model for user registration.
   * @property {string} userData.Username - The username entered by the user.
   * @property {string} userData.Password - The password entered by the user.
   * @property {string} userData.Email - The email entered by the user.
   * @property {Date} userData.Birthday - The birthday entered by the user.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: Date, };

    /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service to interact with the API.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to the dialog opened.
   * @param {MatSnackBar} snackBar - Snackbar for displaying notifications.
   */
  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar) { }

    /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Initialize any necessary data or perform any needed setup.
   * 
   * @memberof UserRegistrationFormComponent
   */
  ngOnInit(): void {
  }

    /**
   * Registers a new user by sending the user data to the backend.
   * Closes the dialog and shows a snackbar notification upon successful registration.
   * 
   * @memberof UserRegistrationFormComponent
   */
  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
      this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
        // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      console.log(response);
      
      this.snackBar.open('user registration successfully', 'OK', {
          duration: 2000
      });
      }, (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
    });
  }
}