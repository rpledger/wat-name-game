import React, { Component } from 'react';
import Game from './Components/Game'
import './App.css';
import axios from 'axios'

class App extends Component {
	constructor() {
		super();
		this.state = {
			people: [],
			choices: [],
			selected: {}
		};
	}

	componentDidMount() {
		axios.get('https://willowtreeapps.com/api/v1.0/profiles/').then(response => {
			console.log(response);
			this.setState({
				people: response.data,
				choices: randomChoices(response.data, 5),
				selected: pickFirst(response.data)
			});
		})
		.catch(function (error) {
			console.log(error);
		});
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
				<Game people={this.state.people} choices={this.state.choices} selected={this.state.selected}/>
			</div>
		);
	}
}

function randomChoices(list, num){
	let choices = list.slice(0,5);
	return choices
}

function pickFirst(list){
	return list[0]
}

export default App;
