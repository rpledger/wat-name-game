import React, { Component } from 'react';
import Person from './Person'

class People extends Component {
	onGuess(id){
		this.props.onGuess(id);
	}

	render() {
		let personList;
		let selectedName = this.props.selected.firstName + ' ' + this.props.selected.lastName
		if(this.props.choices){
			personList = this.props.choices.map(person => {
				console.log(person);
				return(
					<Person onGuess={this.onGuess.bind(this)} key={person.id} person={person} />
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