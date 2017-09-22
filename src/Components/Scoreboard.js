import React, { Component } from 'react';

class ScoreBoard extends Component {

	render() {
		let score = this.props.score;
		let highscore = this.props.highscore;
		let secondsleft = this.props.secondsleft;
		if (this.props.practice === true){
			score = "--"
			highscore = "--"
			secondsleft = "--"
		}
		return (
			<div className="ScoreBoard">
				<div className="score"><h5>Score: {score}</h5> </div>
				<div className="highscore"><h5>High Score: {highscore}</h5> </div>
				<div className="Timer"><h5>Timer: {secondsleft}</h5></div>
			</div>
		);
	}
}

export default ScoreBoard;
