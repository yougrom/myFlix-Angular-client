import { Component } from '@angular/core';

/**
 * The root component of the application.
 * This component serves as the entry point for the Angular application.
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    /**
   * The title of the application.
   */
  title = 'myMovie-Angular-client';
}