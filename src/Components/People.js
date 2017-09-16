import React, { Component } from 'react';
import Person from './Person'

class People extends Component {
	render() {
		let personList;
		if(this.props.people){
			personList = this.props.people.map(person => {
				//console.log(person);
				return(
					<Person key={person.firstName} name={person.firstName + ' ' + person.lastName} />
				);
			});
		}
		return (
			<div className="People">
				<h3>People:</h3>
				{personList}
			</div>
		);
	}
}

export default People;