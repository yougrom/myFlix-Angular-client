// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

// Component
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DirectorInfoComponent } from './director-info/director-info.component';
import { GenreInfoComponent } from './genre-info/genre-info.component';
import { MovieSynopsisComponent } from './movie-synopsis/movie-synopsis.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent},
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix'},
];

/**
 * Root module for the application.
 * @module AppModule
 */
@NgModule({
  declarations: [
    /** @component AppComponent */
    AppComponent, 
    /** @component UserRegistrationFormComponent */
    UserRegistrationFormComponent,
    /** @component UserLoginFormComponent */
    UserLoginFormComponent,
    /** @component MovieCardComponent */
    MovieCardComponent,
    /** @component WelcomePageComponent */
    WelcomePageComponent,
    /** @component NavbarComponent */
    NavbarComponent,
    /** @component UserProfileComponent */
    UserProfileComponent,
    /** @component DirectorInfoComponent */
    DirectorInfoComponent,
    /** @component GenreInfoComponent */
    GenreInfoComponent,
    /** @component MovieSynopsisComponent */
    MovieSynopsisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }