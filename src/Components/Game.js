import React, { Component } from 'react';
import People from './People';

class Game extends Component {
	render() {
		return (
			<div className="Game">
				Game: {this.props.name}
				<People people={this.props.people}/>
			</div>
		);
	}
}

export default Game;
