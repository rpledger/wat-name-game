import React, { Component } from 'react';
import Game from './Components/Game'
import ScoreBoard from './Components/Scoreboard'
import './App.css';
import axios from 'axios'
import { CSSTransitionGroup } from 'react-transition-group'

class App extends Component {
	constructor() {
		super();
		this.state = {
			people: [],
			choices: [],
			selected: {},
			highscore: 0,
			score: 0,
			practice: false,
			play: false, 
			secondsleft: 0,
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
		if (this.state.play === true){
			this.setState({
				highscore: Math.max(this.state.score, this.state.highscore),
				score: 0
			});
		}
		this.setState({
			practice: true,
			play: false
		});
		clearInterval(this.interval);
	}

	tick(){
		this.setState({
			secondsleft: this.state.secondsleft - 1
		});
		if (this.state.secondsleft <= 0){
			this.handleGuess(null);
		}
	}

	timedStart() {
		clearInterval(this.interval);
		this.interval = setInterval(this.tick.bind(this), 1000);
		this.setState({
			play: true,
			practice: false,
			secondsleft: 15,
		});

	}

	handleGuess(id){
		console.log("Clicked!");
		if (this.state.play === true){
			if(id === this.state.selected.id){
				console.log("Selected Correctly!")
				this.setState({
					score: this.state.score + 1

				});
			}else{
				if (this.state.score > this.state.highscore){
					this.setState({
						highscore: this.state.score,
					});
				}
				setTimeout(() =>{
					this.setState({
						score: 0,
						play: false,
					});
				}, 1000);
			}
		}

		// Re-load People
		let choices = randomChoicesWithMemory(this.state.people, this.state.choices, 5);
		console.log(choices);
		let timer = 15;
		if (this.state.practice === true){
			timer = 0;
		}

		setTimeout(() =>{
			this.setState({
				secondsleft: timer,
				choices: choices,
				selected: randomChoices(choices, 1)
			});
		}, 1000);
	}

	render() {
		let game= null;
		let playButton = (
			<div className="button">
				<button onClick={this.timedStart.bind(this)} type="button" className="btn btn-outline-primary">Start Playing</button>
			</div>
		);
		let buttons = (
			<div className="buttons">
				<div><button onClick={this.practice.bind(this)} type="button" className="btn btn-outline-primary btn-lg">Practice First?</button></div>
				<div><button onClick={this.timedStart.bind(this)} type="button" className="btn btn-outline-primary btn-lg">Start Playing</button></div>
			</div>
		);
		if(this.state.practice || this.state.play){
			game = <Game onGuess={this.handleGuess.bind(this)} practice={this.state.practice} secondsleft={this.state.secondsleft} score={this.state.score} highscore={this.state.highscore} people={this.state.people} choices={this.state.choices} selected={this.state.selected}/>
		}

		if(this.state.practice){
			buttons = playButton;
		}else if (this.state.play){
			buttons = null;
		}


		return (
			<div className="App">
				<CSSTransitionGroup
			        transitionName="game"
			        transitionAppear={true}
			        transitionAppearTimeout={500}
			        transitionEnter={true}
			        transitionLeave={true}
			        transitionEnterTimeout={500}
			        transitionLeaveTimeout={100}>
			        <h1>The Name Game</h1>
			        <ScoreBoard practice={this.state.practice} secondsleft={this.state.secondsleft} score={this.state.score} highscore={this.state.highscore}/><br />
			        {buttons}
			        {game}
        		</CSSTransitionGroup>
			</div>
		);
	}
}

function randomChoicesWithMemory(list, prev, num){
	let choices = [];
	while(choices.length < num){
		let rand = list[Math.floor(Math.random() * list.length)];
		console.log(rand.headshot.url)
	 	while(choices.indexOf(rand) !== -1 || prev.indexOf(rand) !== -1 || typeof rand.headshot.url === 'undefined'){
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

function randomChoices(list, num){
	let choices = [];
	while(choices.length < num){
		let rand = list[Math.floor(Math.random() * list.length)];
	 	while(choices.indexOf(rand) !== -1 || typeof rand.headshot.url === 'undefined'){
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
