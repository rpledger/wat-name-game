import React, { Component } from 'react';
import Person from './Person'

class People extends Component {
  render() {
  	let personList;
  	if(this.props.people){
  		personList = this.props.people.map(person => {
  			console.log(person);
  		});
  	}
    return (
      <div className="People">
        People:
        <Person />
      </div>
    );
  }
}

export default People;