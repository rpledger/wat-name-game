import React, { Component } from 'react';
import Person from './Person'

class People extends Component {
	render() {
		let personList;
		let selectedName = this.props.selected.firstName + ' ' + this.props.selected.lastName
		if(this.props.choices){
			personList = this.props.choices.map(person => {
				console.log(person);
				return(
					<Person key={person.id} imgurl={person.headshot.url} name={person.firstName + ' ' + person.lastName} />
				);
			});
		}
		return (
			<div className="People">
				<h3>Who is {selectedName}?</h3>
				<div className="row">
				{personList}
				</div>
			</div>
		);
	}
}

export default People;