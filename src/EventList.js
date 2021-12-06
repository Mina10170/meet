import React, { Component } from 'react';
import Event from './Event';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <Row className="d-flex justify-content-center event-list-wrapper">
        
        {events.map(event =>
          <Col sm={12} md={6} lg={4}  key={event.id}>
            <Event event={event} />
          </Col>
        )}

      </Row>
    );
  }
}

export default EventList;