import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount,shallow } from "enzyme";
import { mockData } from "../mock-data";
import App from "../App";
import EventList from "../EventList";
import Event from "../Event";

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  // Scenario 1
  test('An event element is collapsed by default', ({ given, when, then }) => {

    given('this user is on the main page', () => {
  
    });

    let EventListWrapper;
    when('the user recieves a list of upcoming events', () => {
      EventListWrapper = shallow(<EventList events={mockData} />);
      expect(EventListWrapper.find('.EventList')).toHaveLength(1);
    });

    let EventWrapper;
    then('the event element is collapsed by default', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      let eventDetails = EventWrapper.find('.event .extra-details');
      expect(EventWrapper.state('collapsed')).toBe(true);
    });
  });

  //Scenario 2
  test('User can expand an event to see its details', ({ given, when, then }) => {
    let EventWrapper;
    given('the user is on the main page and has a list of the events', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      expect(EventWrapper.state('collapsed')).toBe(true);
    });

    
    when('the user clicks on the Show details button of an event element', () => {
      const showDetailsButton = EventWrapper.find('.event .show-details-btn');
      showDetailsButton.simulate('click');        
    });

    then('the user can expand the event to see its details', () => {
      expect(EventWrapper.state('collapsed')).toBe(false);
    });
  });

  //Scenario 3
  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let EventWrapper;
    given('the user has expanded to see the event\'s details', () => {
      EventWrapper = shallow(<Event event={ mockData[0]} />);
      EventWrapper.setState({ collapsed: false});
    });

    when('the user clicks on the Hide details button of the event element', () => {
      const showDetailsButton = EventWrapper.find('.event .hide-details-btn');
      showDetailsButton.simulate('click');
    });

    then('the event\'s details will be hidden', () => {
      expect(EventWrapper.state('collapsed')).toBe(true);
    });
  });
});