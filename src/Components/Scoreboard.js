import React, { Component } from 'react';

class ScoreBoard extends Component {

	render() {
		return (
			<div className="ScoreBoard">
				<div className="score"><h5>Score: {this.props.score}</h5> </div>
				<div className="highscore"><h5>High Score: {this.props.highscore}</h5> </div>
				<div className="Timer"><h5>Timer: {this.props.secondsleft}</h5></div>
			</div>
		);
	}
}

export default ScoreBoard;
