import React, { Component } from 'react';

class ScoreBoard extends Component {

	render() {
		let score = this.props.score;
		let highscore = this.props.highscore;
		let secondsleft = this.props.secondsleft;

		// Don't report timer or scores when practicing
		if (this.props.practice === true ){
			score = "--"
			highscore = "--"
			secondsleft = "--"
		}

		return (
			<div className="ScoreBoard">
				<div className="score"><h5>Score:</h5><h5>{score}</h5> </div>
				<div className="score"><h5>Timer:</h5> <h5>{secondsleft}</h5></div>
				<div className="score"><h5>High Score:</h5> <h5>{highscore}</h5> </div>
			</div>
		);
	}
}

export default ScoreBoard;
