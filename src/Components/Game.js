import React, { Component } from 'react';
import People from './People';

class Game extends Component {
	onGuess(id){
		this.props.onGuess(id);
	}

	render() {
		return (
			<div className="Game">
				<People onGuess={this.onGuess.bind(this)} choices={this.props.choices} selected={this.props.selected} />
			</div>
		);
	}
}

export default Game;
