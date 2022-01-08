#Overview
Meet is a serverless, progressive web application (PWA) built with React and developed by using a Test-Driven Development (TDD) approach. The application uses the Google Calendar API to fetch upcoming events.

##Test Runners
Unit Testing: Jest
Integration Testing: Jest
Acceptance Testing: Cucumber
End-to-end testing: Puppeteer
Installation
To install the app and its dependencies run npm install

To run tests npm run test

To launch the app npm start

##Key Features
Filter events by city.
Show/hide event details.
Specify number of events.
Use the app when offline.
Add an app shortcut to the home screen.
View a chart showing the number of upcoming events by city
FEATURE 1: FILTER EVENTS BY CITY
User story: As a user, I would like to be able to filter events by city so that I can see the list of events that take place in that city.

Scenario 1: When user hasn't searched for a city, show upcoming events from all cities
Given user hasn’t searched for any city When the user opens the app Then the user should see a list of all upcoming events

Scenario 2: User should see a list of suggestions when they search for a city
Given the main page is open When user starts typing in the city textbox Then the user should see a list of cities (suggestions) that match what they’ve typed

Scenario 3: User can select a city from the suggested list
Given the user was typing “Berlin” in the city textbox And the list of suggested cities is showing When the user selects a city (e.g., “Berlin, Germany”) from the list Then their city should be changed to that city (i.e., “Berlin, Germany”) And the user should receive a list of upcoming events in that city

FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS
User story: As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.

Scenario 1: An event element is collapsed by default
Given a list of events is displayed on the page When a user looks at the list of events Then the user should see that each event is collapsed by default

Scenario 2: User can expand an event to see its details
Given a list of collapsed events on the page When the user clicks on the "Show details" button of an event element Then the event element expands, showing the event's details

Scenario 3: User can collapse an event to hide its details
Given an expanded event element When the user clicks on the "Hide details" button of the event element Then the event element collapses, hiding the details of the event

FEATURE 3: SPECIFY NUMBER OF EVENTS
User story: As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.

###Scenario 1: When user hasn’t specified a number, 32 is the default number
Given the user hasn't specified a number of events to display When the search is executed Then the search result will display 32 results, which is the default number

###Scenario 2: User can change the number of events they want to see
Given the user decides to see a different number n!=32 of events in the search results When the user types a number n Then the search results will display n event elements

FEATURE 4: USE THE APP WHEN OFFLINE
User story: As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online.

###Scenario 1: Show cached data when there’s no internet connection
Given the user is not connected to the Internet When the user opens up the app Then the app displays the events cached from the last search

###Scenario 2: Show error when user changes the settings (city, time range)
Given the user is not connected to the Internet When the user executes a new search, changing the search parameters Then the app displays an error

FEATURE 5: DATA VISUALIZATION
User story: As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.

#Scenario 1: Show a chart with the number of upcoming events in each city
Given the chart page is open When the user selects the option to see the upcoming events Then the app shows a chart with the number of upcoming events in each city