import React, { Component } from 'react';
import Game from './Components/Game'
import './App.css';
import axios from 'axios'

class App extends Component {
	constructor() {
		super();
		this.state = {
			people: []
		};
	}

	// Do AJAX call here (lifecycle method) componentWillMount()
	componentDidMount() {
		axios.get('https://willowtreeapps.com/api/v1.0/profiles/').then(response => {
			console.log(response);
			this.setState({people: response.data})
		});
		// this.setState({people: [
		// 	{
		// 		firstName: 'Jane',
		// 		lastName: 'Doe'
		// 	},
		// 	{
		// 		firstName: 'Joe Person',
		// 		lastName: 'Person'
		// 	},
		// 	{
		// 		firstName: 'Sally',
		// 		lastName: 'Seashells'
		// 	},
		// 	{
		// 		firstName: 'John',
		// 		lastName: 'Smith'
		// 	},
		// 	{
		// 		firstName: 'Suzy',
		// 		lastName: 'Smith'
		// 	},
		// 	{
		// 		firstName: 'Sam',
		// 		lastName: 'Person'
		// 	}
		// ]})
	}

	practice() {
		console.log("Practice");
	}

	timedStart() {
		console.log("Playing Game");
	}

	render() {
		return (
			<div className="App">
				<h1>The Name Game</h1>
				<button onClick={this.practice.bind(this)} type="button" className="btn btn-primary">Practice</button>
				<button onClick={this.timedStart.bind(this)} type="button" className="btn btn-primary">Start</button>
				<Game people={this.state.people}/>
			</div>
		);
	}
}

export default App;
