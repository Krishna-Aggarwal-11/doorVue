# ![image](https://github.com/user-attachments/assets/db3c48f8-2356-4b33-b04a-bc4c19b1bbfb) DoorVue

DoorVue is a mobile application built with React Native and Expo that allows users to explore and find properties nearby (within 30meter). The app provides a user-friendly interface for searching properties, viewing details, and managing user profiles.

## Features

- **User Authentication**: Users can sign up, sign in, and manage their profiles.
- **Property Listings**: Users can browse various property listings with images, descriptions, prices, and locations.
- **Search Functionality**: Users can search for properties by location and filter by categories (e.g., house, apartment, villa).
- **Property Details**: Users can view detailed information about each property, including facilities and distance from their current location.
- **Logout Functionality**: Users can log out and return to the welcome screen.

## Technologies Used

- **React Native**: For building the mobile application.
- **Expo**: For easier development and deployment of the React Native app.
- **React Query**: For data fetching and state management.
- **AsyncStorage**: For local storage of user data.
- **React Navigation**: For navigating between different screens in the app.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Krishna-Aggarwal-11/doorVue
   cd doorvue
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm expo start
   ```

4. **Run the app**:
   - Use the Expo Go app on your mobile device or an emulator to scan the QR code displayed in the terminal.

## Usage

1. **Sign Up**: Create a new account by providing a username, email, and password.
2. **Sign In**: Log in to access the app with your credentials. (or use email = test@eample.com and password = password).
3. **Guest Mode**: Access as a guest and just browsing.
4. **Explore Properties**: Browse through the property listings and use the search bar to find specific locations.
5. **View Property Details**: Click on a property to view its details, including price, description, and facilities.
6. **Unlock Property**: Unlock properties within 30 meters of your location.
6. **Logout**: Click the logout button in your profile to return to the welcome screen.

## API Usage

 The app communicates with a mock API to retrieve property listings.
- Api link : `https://6790da50af8442fd73780560.mockapi.io/estate`
- For single property details: `https://6790da50af8442fd73780560.mockapi.io/estate/:id`

## Folder Structure
![image](https://github.com/user-attachments/assets/0f901db8-7445-4a02-a18f-ebbd5d305db7)


