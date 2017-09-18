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
			let people = response.data;
			let choices = randomChoices(people, 5);
			this.setState({
				people: people,
				choices: choices,
				selected: pickFirst(choices)
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
	let choices = [];
	while(choices.length < num){
		let rand = list[Math.floor(Math.random() * list.length)];
	 	while(choices.indexOf(rand) !== -1 ){
	 		rand = list[Math.floor(Math.random() * list.length)];
	 	}
	 	choices.push(rand);
	 }
	 console.log(choices);
	 return choices
}

function pickFirst(list){
	return list[0]
}

export default App;
