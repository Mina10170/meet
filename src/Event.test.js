import React from "react";
import { shallow } from "enzyme";
import { mockData } from "../helpers/mock-data";
import Event from "../components/Event";

describe("<Event /> component", () => {
  let eventWrapper;
  let event = mockData[0];
  beforeAll(() => {
    eventWrapper = shallow(<Event event={event} />);
  });

  test("the element is collapsed by default", () => {
    eventWrapper.setState({
      collapsed: true,
    });
    expect(eventWrapper.find(".extra-details").hasClass("hide")).toEqual(true);
  });

  test("renders summary in the collapsed event element", () => {
    expect(eventWrapper.find(".summary")).toHaveLength(1);
  });

  test("renders date in the collapsed event element", () => {
    expect(eventWrapper.find(".start-date")).toHaveLength(1);
  });

  test("renders location in the collapsed event element", () => {
    expect(eventWrapper.find(".location")).toHaveLength(1);
  });

  test("renders a button to show details", () => {
    expect(eventWrapper.find(".show-details-btn")).toHaveLength(1);
  });

  test("clicking on show details button should show extra details", () => {
    eventWrapper.setState({
      collapsed: true,
    });
    eventWrapper.find(".show-details-btn").simulate("click");
    expect(eventWrapper.state("collapsed")).toBe(false);
  });

  test("clicking on hide details button should hide the extra details", () => {
    eventWrapper.setState({
      collapsed: false,
    });
    eventWrapper.find(".hide-details-btn").simulate("click");
    expect(eventWrapper.state("collapsed")).toBe(true);
  });
});