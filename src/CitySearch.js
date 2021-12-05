import React, { Component } from "react";
import { InfoAlert } from "./Alert";

class CitySearch extends Component {
  state = {
    query: "",
    suggestions: [],
    showSuggestions: false,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ showSuggestions: true });
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText: `I can't find the location "${value}". Please try again.`,
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText: "",
      });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestions: [],
      infoText: "",
      showSuggestions: false,
    });
    this.props.updateEvents(suggestion);
  };

  render() {
    return (
      <div className="city-search-wrapper">
        <h2>Search</h2>
        <div className="CitySearch">
          <InfoAlert text={this.state.infoText} />
          <input
            type="text"
            className="city"
            value={this.state.query}
            placeholder="Enter a city or country"
            onChange={this.handleInputChanged}
            onFocus={() => this.setState({ showSuggestions: true })}
          />
          <ul
            className={`suggestions ${
              this.state.showSuggestions ? "show" : "hide"
            }`}
          >
            {this.state.suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="suggestion"
                onClick={() => {
                  return this.handleItemClicked(suggestion);
                }}
              >
                {suggestion}
              </li>
            ))}
            <li key="all" onClick={() => this.handleItemClicked("all")}>
              <b>See all cities</b>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default CitySearch;