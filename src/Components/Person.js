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
			'wrong': this.state.guessed && !this.props.selected,
			'hide': !this.state.guessed
		});

		return (
			<div className="Person" onClick={(this.guess.bind(this, this.props.person.id))}>
				<img  className="img-fluid" alt={this.props.person.firstName + ' ' + this.props.person.lastName} src={this.props.person.headshot.url} />
				<span className={classString}>
					<div><h4>{this.props.person.firstName + ' ' + this.props.person.lastName}</h4></div>
				</span>

			</div>
		);
	}
}

export default Person;