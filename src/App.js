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
        firstName: 'Jane',
        lastName: 'Doe'
      },
      {
        firstName: 'Joe Person',
        lastName: 'Person'
      },
      {
        firstName: 'Sally',
        lastName: 'Seashells'
      },
      {
        firstName: 'John',
        lastName: 'Smith'
      },
      {
        firstName: 'Suzy',
        lastName: 'Smith'
      },
      {
        firstName: 'Sam',
        lastName: 'Person'
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
