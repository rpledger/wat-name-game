import React, { Component } from 'react';
import Game from './Components/Game'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      people: []
    }
  }

// Do AJAX call here (lifecycle method) componentWillMount()

  render() {
    return (
      <div className="App">
        My App
        <Game />
      </div>
    );
  }
}

export default App;
