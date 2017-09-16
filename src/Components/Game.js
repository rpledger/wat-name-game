import React, { Component } from 'react';
import People from './People';

class Game extends Component {
  render() {
    return (
      <div className="Game">
      	<button type="button" className="btn btn-outline-success">Practice First?</button>
      	<button type="button" className="btn btn-outline-success">Start</button>
	      <br />
        Game: {this.props.name}
        <People people={this.props.people}/>
      </div>
    );
  }
}

export default Game;
