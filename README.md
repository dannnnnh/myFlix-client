# MyFlix React App

This React.js application allows users to sign up, log in, and view a list of movies with their details. Users can also add and remove movies from their list of favorites.

## Features

- User registration and authentication
- Display of all movies from the MyFlix database
- Detailed view of individual movies
- User's profile view showing liked movies
- Adding and removing movies to/from user's list of favorites
- Log out functionality

## Code Overview

The application is composed of multiple components, including:

- `MovieCard`: Displays a single movie in the list view.
- `MovieView`: Shows detailed view of a single movie.
- `LoginView`: Handles user login.
- `SignupView`: Handles new user registration.
- `ProfileView`: Displays user's profile including liked movies.
- `NavigationBar`: The navigation bar.

The main component, `MainView`, handles user authentication state, data fetching from the MyFlix API, and client-side routing using react-router-dom.

## MainView Hooks

- `useState`: The application uses the `useState` hook for managing local state including user token, movie list, user details, search term and liked movies.
- `useEffect`: The `useEffect` hook is used to fetch movie data from the MyFlix API, both on initial render and whenever the search term changes.

## API Interaction

The app interacts with the MyFlix API, performing CRUD (Create, Read, Update, Delete) operations. For authentication, it stores the user's token in localStorage.

## Routing

The app uses `react-router-dom` for client-side routing.

## How to Run

This is a standard React app. You can run it with npm/yarn:

1. Clone this repository
2. Run `npm install`
3. Run `npm start`
4. Visit http://localhost:3000
