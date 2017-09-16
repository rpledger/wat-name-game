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

	practice() {
		console.log("Practicing");
	}	

	start(){
		
	}

	render() {
		return (
			<div className="App">
				<h1>The Name Game!</h1>
				<button onClick={this.practice} type="button" className="btn btn-outline-success">Practice First?</button>
				<button onClick={this.start} type="button" className="btn btn-outline-success">Start</button>
				<Game people={this.state.people}/>
			</div>
		);
	}
}

export default App;
