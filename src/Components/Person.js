import React, { Component } from 'react';

class Person extends Component {
	guess(id){
		this.props.onGuess(id);
	}

	render() {
		// imgurl={person.headshot.url} name={person.firstName + ' ' + person.lastName
		return (
			<div className="Person">
				<img onClick={(this.guess.bind(this, this.props.person.id))} className="img-responsive" alt={this.props.person.firstName + ' ' + this.props.person.lastName} src={this.props.person.headshot.url} />
			</div>
		);
	}
}

export default Person;