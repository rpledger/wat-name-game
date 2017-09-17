import React, { Component } from 'react';
import People from './People';

class Game extends Component {
	render() {
		console.log(this.props.selected);
		return (
			<div className="Game">
				Game: {this.props.name}
				<People people={this.props.choices} />
			</div>
		);
	}
}

export default Game;
