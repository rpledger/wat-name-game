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

  componentWillMount() {
    this.setState({people: [
      {
        name: 'Jane Doe'
      },
      {
        name: 'Joe Person'
      },
      {
        name: 'Sally Seashells'
      },
      {
        name: 'John Smith'
      },
      {
        name: 'Suzy Smith'
      },
      {
        name: 'Sam Person'
      }
    ]})
  }

// Do AJAX call here (lifecycle method) componentWillMount()

  render() {
    return (
      <div className="App">
        <h1>The Name Game!</h1>
        My App
        <Game people={this.state.people}/>
      </div>
    );
  }
}

export default App;
