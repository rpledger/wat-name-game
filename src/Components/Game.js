import React, { Component } from 'react';
import People from './People';

class Game extends Component {
	render() {
		console.log(this.props.selected);
		return (
			<div className="Game">
				Game: {this.props.name}
				<People choices={this.props.choices} selected={this.props.selected} />
			</div>
		);
	}
}

export default Game;
