import React, { Component } from 'react';
import classNames from 'classnames'

class Person extends Component {
	constructor() {
		super();
		this.state = {
			guessed: false,
		};
	}

	guess(id){
		this.setState({
			guessed: true,
		});
		this.props.onGuess(id);
	}

	render() {
		let classString = classNames({
			'right': this.state.guessed && this.props.selected,
			'wrong': this.state.guessed && this.props.selected,
		});
		// imgurl={person.headshot.url} name={person.firstName + ' ' + person.lastName
		return (
			<div className="Person {classString}">
				<img onClick={(this.guess.bind(this, this.props.person.id))} className="img-fluid" alt={this.props.person.firstName + ' ' + this.props.person.lastName} src={this.props.person.headshot.url} />
			</div>
		);
	}
}

export default Person;