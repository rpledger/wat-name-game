import React, { Component } from 'react';
import Person from './Person';

class Game extends Component {
  render() {
    return (
      <div className="Game">
        Game
        <Person />
      </div>
    );
  }
}

export default Game;
