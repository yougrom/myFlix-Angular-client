# Movie Angular Client Documentation

This project was created with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Description
This is the client-side application for myMovie, based on its pre-existing server-side implementation (REST API and database).

## Dependencies
* Angular: A web application framework for developing single-page client applications.
* Angular Material: A UI component library for Angular, following Google's Material Design guidelines.
* TypeDoc: A tool that generates HTML API documentation from TypeScript code.

## The API used in this project
[Movie API](https://github.com/yougrom/myflix)

## Link to the application
[Hosted on GitHub](https://yougrom.github.io/myFlix-Angular-client/welcome)

## Views
### Welcome View
* Allows users to log in with a username and password or to sign up

### Main View
* Displays all movies from the API
* Allows users to view director details, genre details, and the synopsis of each movie
* Navbar includes:
    * Log out option
    * Navigation to Profile View

### Profile View
* Shows user registration details
* Enables users to update their information (username, email, date of birth)
* Allows users to deregister
* Displays a list of favorite movies
    * Enables users to remove movies from their favorites list

## Setting Up the App
* Clone this repository.
* Navigate to the myMovie-Angular-client folder and run `npm install`
* Run `ng serve`, then navigate to `http://localhost:4200/`
