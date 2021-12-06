import React, { Component } from 'react';
import logo from './images/logo.png';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { Container, Row, Col } from 'react-bootstrap';
import { InfoAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import EventGenre from './EventGenre';


class App extends Component {


  state = {

    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 16,
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
       if (this.mounted) {
         this.setState({ events, locations: extractLocations(events) });
        }
      });
     }
  }
    

  componentWillUnmount(){
    this.mounted = false;
  }
  
  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ? events : events.filter((event) => event.location === location);
      const { numberOfEvents } = this.state;
      this.setState({
        events: locationEvents.slice(0, numberOfEvents)
      });
    });
  }

  updateNumberOfEvents = (eventCount) => {
    const { currentLocation } = this.state;
    this.setState({
      numberOfEvents: eventCount
    });
    this.updateEvents(currentLocation, eventCount);
  }
  
  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  render(){
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    
    return (
      <Container>
        <div className="App">
       
          <div className="App-logo" >
            <img src={logo} alt="meet app logo"/>
            { !navigator.onLine ? (<InfoAlert text='You are offline!' />) : (<InfoAlert text=' ' />)}
          </div>

          <CitySearch 
            locations={this.state.locations} 
            updateEvents={this.updateEvents}/>

          <NumberOfEvents 
            numberOfEvents={this.state.numberOfEvents} 
            updateNumberOfEvents={this.updateNumberOfEvents} />
          <div className="charts-wrapper">
            <Row className="d-flex justify-content-center">
              <Col xs={8} sm={12} md={12} lg={6}>
                <EventGenre events={this.state.events} />
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                <ResponsiveContainer height={400} >
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis 
                      tick={{ fill: "#fff" }} 
                      type="category" 
                      dataKey="city" 
                      name="city" 
                    />
                    <YAxis
                      tick={{ fill: "#fff" }} 
                      allowDecimals={false}
                      type="number"
                      dataKey="number"
                      name="number of events"
                    />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter data={this.getData()} fill="#3aa0e4" />
                  </ScatterChart>
                </ResponsiveContainer>
              </Col>
            </Row>
          </div>
          <EventList events={this.state.events} />
          <WelcomeScreen
            showWelcomeScreen={this.state.showWelcomeScreen}
            getAccessToken={() => {
              getAccessToken();
            }}
          /> 
        </div>
      </Container>
    );
  }
 
}



export default App;
