import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: false,
    infoText:''
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ showSuggestions: true });
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText: 'We can not find the city you are looking for. Please try another city',
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText: ''
      });
    }
  }

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion
    });
  
    this.props.updateEvents(suggestion);
  }

  render() {
    const { numberOfEvents } = this.props;

    return (
      <div className="citySearch">
        <div className="citySearch__alert">
          <InfoAlert text={this.state.infoText} />
        </div>
        
        <div className="citySearch__grid">
          <label htmlFor={this.state.query}>Search for a city</label>
          <input type="text"
            className="city"
            value={this.state.query}
            onChange={this.handleInputChanged}
            onFocus={() => { this.setState({ showSuggestions: true }) }}
          />

          <ul className="suggestions" style={this.state.showSuggestions ? {} : { display: 'none' }}>
            {this.state.suggestions.map((suggestion) => (
              <li key={suggestion} onClick={() => this.handleSuggestionClicked(suggestion, numberOfEvents)}>{suggestion}</li>
            ))}
            <li key="all" onClick={() => this.handleSuggestionClicked("all", numberOfEvents)}>
              <b >See all cities</b>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default CitySearch;