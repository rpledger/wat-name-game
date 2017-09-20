import React, { Component } from 'react';
import People from './People';
import ScoreBoard from './Scoreboard'

class Game extends Component {
	onGuess(id){
		this.props.onGuess(id);
	}

	render() {
		return (
			<div className="Game">
				<ScoreBoard secondsleft={this.props.secondsleft} score={this.props.score} highscore={this.props.highscore}/>
				<People onGuess={this.onGuess.bind(this)} choices={this.props.choices} selected={this.props.selected} />
			</div>
		);
	}
}

export default Game;
