import React, { Component } from "react";
import RangeSlider from "react-bootstrap-range-slider";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  render() {
    return (
      <div className="NumberOfEvents mt-40">
        <h3>How Many Events?</h3>

        <RangeSlider
          min={0}
          max={33}
          className="num-events"
          value={this.props.numberOfEvents}
          onChange={(e) => this.props.updateNumberOfEvents(e)}
        />
        <ErrorAlert text={this.props.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;