import React, { Component } from 'react';

class Person extends Component {
  render() {
    return (
      <div className="Person">
        {this.props.person.name}
      </div>
    );
  }
}

export default Person;