import React, { Component } from 'react';
import classNames from 'classnames'
import Octicon from 'react-octicon'

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

		//this.props.onGuess(id);
	}

	render() {
		let classString = classNames({
			'right': this.state.guessed && this.props.selected,
			'wrong': this.state.guessed && !this.props.selected,
			'hidden': !this.state.guessed
		});
		let octiconClass = classNames({
			'check': this.props.selected,
			'x': !this.props.selected,
		});
		// imgurl={person.headshot.url} name={person.firstName + ' ' + person.lastName
		return (
			<div className="Person">
				<img onClick={(this.guess.bind(this, this.props.person.id))} className="img-fluid" alt={this.props.person.firstName + ' ' + this.props.person.lastName} src={this.props.person.headshot.url} />
				<span className={classString}>
					<div><h4>{this.props.person.firstName + ' ' + this.props.person.lastName}</h4></div>
					<Octicon mega name={octiconClass}/>
				</span>

			</div>
		);
	}
}

export default Person;