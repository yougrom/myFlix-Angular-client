// src/app/navbar/navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @description Component representing the navbar.
 * @selector 'app-navbar'
 * @templateUrl './navbar.component.html'
 * @styleUrls ['./navbar.component.scss']
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  /**
   * @constructor - Constructor for NavbarComponent. 
   * @param {Router} router - Router service for navigation.
   * @param {MatSnackBar} snackBar - Material snack bar service for displaying notifications.
   */
  constructor(
  public router: Router,
  public snackBar: MatSnackBar
  ) {}
  
  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * @returns {void}
   */
  ngOnInit(): void {}

  /**
   * Navigates to the movies page.
   * @returns {void}
   */
  public openMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to the profile page.
   * @returns {void}
   */
  public openProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logs out the user by clearing the local storage and navigating to the welcome page.
   * Displays a snackbar notification indicating successful logout.
   * @returns {void}
   */
  public logoutUser(): void {
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    this.router.navigate(['welcome']);
    this.snackBar.open('User logout successful', 'OK', {
      duration: 2000
    })
  }
}