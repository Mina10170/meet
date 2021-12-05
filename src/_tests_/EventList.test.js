import React from "react";
import { shallow } from "enzyme";
import EventList from "../components/EventList";
import Event from "../components/Event";
import { mockData } from "../helpers/mock-data";

describe("<EventList /> component", () => {
  test("render correct number of events", () => {
    const eventListWrapper = shallow(<EventList events={mockData} />);
    expect(eventListWrapper.find(Event)).toHaveLength(mockData.length);
  });
});