import { mockData } from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

const checkToken = async (accessToken) => {
  /**
   * Send access token to the google API server.
   * If the token is valid, get a json response.
   * If the token is invalid, we get an error object.
   * If we get an error, that is checked by ' || tokenCheck.error '
   * in the getAccessToken function. This would cause you to be 
   * sent to the authorization screen to get a valid token.
   */
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());
  return result;
}

const removeQuery = () => {
  /**
   * This function removes the code from the url
   */
  if (window.history.pushState && window.location.pathname) {
    var newurl = 
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname;
    window.history.pushState('', '', newurl);
  } else {
    newurl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newurl);
  }
}

const getToken = async (code) => {
  /**
   * Takes an access code and sends it to the Google API to exchange for an access token
   */
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    `https://efibyb54fl.execute-api.us-east-2.amazonaws.com/dev/api/token/${encodeCode}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);

    access_token && localStorage.setItem('access_token', access_token);

    return access_token;
}

export const getEvents = async () => {
  /**
   * We use the mock data when we are testing on localhost,
   * but we use the real API data when we are live.
   */
  NProgress.start(); //This is a loading bar libray

  //Return mock data while testing
  if (window.location.href.startsWith('http://localhost')) {
    NProgress.done();
    return mockData;
  } 

  if (!navigator.onLine) {
    const data = localStorage.getItem("lastEvents");
    NProgress.done();
    return data ? JSON.parse(data).events : [];
  }

  const token = await getAccessToken();

  if (token) {
    //removeQuery(); //remove the code from the url once we are done with it
    const url = `https://efibyb54fl.execute-api.us-east-2.amazonaws.com/dev/api/get-calendar-events/${token}`;
    const result = await axios.get(url);
    if (result.data) {
      var locations = extractLocations(result.data.events);
      localStorage.setItem('lastEvents', JSON.stringify(result.data));
      localStorage.setItem('locations', JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }

};

export const getAccessToken = async () => {
  /* Step 1 is to check and see if the user already has a valid access token */
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  /* If there is no valid access token, we need to get one */
  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    /* There is no valid access token, but we can check for a valid code */
    const code = await searchParams.get('code');
    if (!code) {
      /* There is no code, so redirect to my getAuthUrl endpoint */
      const results = await axios.get(
        "https://efibyb54fl.execute-api.us-east-2.amazonaws.com/dev/api/get-auth-url"
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
}