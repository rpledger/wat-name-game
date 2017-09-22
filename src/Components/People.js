import React, { Component } from 'react';
import Person from './Person'
import { CSSTransitionGroup } from 'react-transition-group'
import Delay from 'react-delay'

class People extends Component {
	onGuess(id){
		this.props.onGuess(id);
	}

	render() {
		let personList;
		let selectedName = this.props.selected.firstName + ' ' + this.props.selected.lastName

		if(this.props.choices){
			personList = this.props.choices.map(person => {
				let selected = this.props.selected.id === person.id
				return(
					<Person onGuess={this.onGuess.bind(this)} key={person.id} person={person} selected={selected} />
				);
			});
		}
		return (
			<div className="People">
				<h3>Who is {selectedName}?</h3>
				<Delay wait={500}>
					<div className="row">
						<CSSTransitionGroup
					        transitionName="example"
					        transitionAppear={true}
					        transitionAppearTimeout={500}
					        transitionEnter={true}
					        transitionLeave={false}
					        transitionEnterTimeout={500}
					        transitionLeaveTimeout={100}>
					        {personList}
		        		</CSSTransitionGroup>
		    		</div>
		    	</Delay>
			</div>
		);
	}
}

export default People;