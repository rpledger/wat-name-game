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
			selected: {},
			highscore: 0,
			score: 0
		};
	}

	componentDidMount() {
		axios.get('https://willowtreeapps.com/api/v1.0/profiles/').then(response => {
			let people = response.data;
			let choices = randomChoices(people, 5);
			this.setState({
				people: people,
				choices: choices,
				selected: randomChoices(choices, 1),
				score: 0,
				highscore: 0
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

	handleGuess(id){
		console.log("Clicked!");
		if(id === this.state.selected.id){
			console.log("Selected Correctly!")
			this.setState({
				//correct: true,
				score: this.state.score + 1
			});
		}else if (this.state.score > this.state.highscore){
			this.setState({
				highscore: this.state.score,
				score: 0
			});
		}else{
			this.setState({
				score: 0
			});
		}
		console.log(this.state);
	}

	render() {
		return (
			<div className="App">
				<h1>The Name Game</h1>
				<button onClick={this.practice.bind(this)} type="button" className="btn btn-primary">Practice</button>
				<button onClick={this.timedStart.bind(this)} type="button" className="btn btn-primary">Start</button>
				<Game onGuess={this.handleGuess.bind(this)} score={this.state.score} highscore={this.state.highscore} people={this.state.people} choices={this.state.choices} selected={this.state.selected}/>
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
	 if (num === 1){
	 	return choices[0]
	 }
	 return choices
}

export default App;
