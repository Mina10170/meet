import React, { Component } from 'react';
import { ErrorAlert, WarningAlert } from './alert';
// import './css/NumberOfEvents.css';

class NumberOfEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 32
    };
  }

  handleInputChanged = (event) => {
    const value = this.RemoveNonNumeric(event.target.value);
    this.setState({
      number: value,
    });
    
    //unit test for NumberOfEvents fails if it tries to run this function
    if (this.props.updateNumberOfEvents)
      this.props.updateNumberOfEvents(value);

  }

  RemoveNonNumeric = (text) => {
    return text.replace(/[^0-9]/g, '');
  }

  render() {
    const { currentNumberOfEvents } = this.props;
    const { number, displayErrorText } = this.state;
    const displayWarning = currentNumberOfEvents < number;
    const warningText = 'There are not that many events available';
    const errorText = 'Number of Events must be a non-negative integer';
    return (
      <div className="number-of-events">
        <div className="number-of-events__error">
          { displayWarning && <WarningAlert text={warningText} />}
          { displayErrorText && <ErrorAlert text={errorText} /> }
          
        </div>
        <div className="number-of-events__grid">
          <label id="number-of-events__label" htmlFor="number-of-events__input">Number of Events:</label>
          <input id="number-of-events__input" value={this.state.number} onChange={this.handleInputChanged} />
        </div>
      </div>
    )
  }
}

export default NumberOfEvents;