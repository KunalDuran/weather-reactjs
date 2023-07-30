# Weather Web Application


## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Setup](#setup)
4. [Usage](#usage)
5. [Side Note](#side-note)

## Introduction

The Weather Web Application is designed to provide users weather data for different cities. Users can create an account, log in, and start searching for weather information. The application also stores the search history, allowing users to view their past searches and manage their history.
The application is built using NextJS framework.
Live URL to the application : https://weather.duranz.in

## Features

The Weather Web Application offers the following features:

1. **Login**: Users can log in to their accounts using their credentials (username and password) to access the application's features.

2. **Signup**: New users can sign up by providing a unique username and a secure password.

3. **Search City for Weather**: Once logged in, users can enter the name of a city in the search box and retrieve the current weather information for that city. The weather data may include temperature, weather conditions, humidity, and wind speed.

4. **Weather History**: The application keeps a record of users' search history. Users can view their past weather searches, making it easy to track previous weather information for different cities.

5. **Delete Single History Search**: Users have the option to delete individual search records from their weather history.

6. **Clear All Search History**: Additionally, users can choose to clear their entire weather search history, removing all the recorded data.

*\*Error handling and action feedbacks are applied to enhance user experience*

## Setup

To set up and run the Weather Web Application locally, follow these steps:

1. Clone the project repository from [GitHub Repo URL].

2. Navigate to the project directory in your terminal.

3. Install any required dependencies using [package manager] with the following command:
   ```
   npm install
   ```

4. Start the application by running the following command:
   ```
   npm run dev
   ```
   or 
   
   First build the application using the following command:
   ```
    npm run build
    ```
    Then start the application using the following command:
    ```
   npm run start
   ```

5. Access the application by opening your web browser and entering the following URL:
   ```
   http://localhost:3000/
   ```

## Usage

1. **Signing Up**: When accessing the application for the first time, users can sign up by clicking on the "Sign Up" button and providing a unique username and secure password.

2. **Logging In**: After signing up, users can log in to their accounts by clicking on the "Log In" button and entering their credentials (username and password).

3. **Searching for Weather**: Upon successful login, users will be redirected to the main page. Here, they can use the search box to find the weather information for a particular city. Type city name and enter will display the weather data if it is available.

4. **Viewing Weather History**: The application will maintain a history of the user's weather searches. To view the weather history, users can click on the "History" tab. Here, they will see a list of their past weather searches.

5. **Deleting Single History Search**: To delete an individual search entry from the weather history, users can click on the "Delete" button next to the specific search record.

6. **Clearing All Search History**: If users wish to remove all their weather search history at once, they can click on the "Clear History" button.

#### Side Note

Please note that the "Update History" functionality is intentionally not implemented in this version of the Weather Web Application. The decision was made because updating the history did not seem meaningful or relevant in the context of weather searches.