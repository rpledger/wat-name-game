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
			mattPeople: [],
			choices: [],
			selected: {},
			highscore: 0,
			score: 0,
			practice: false,
			play: false, 
			mode: "normal",
			secondsleft: 0,
		};
	}

	componentDidMount() {
		// Load WT People Data
		axios.get('https://willowtreeapps.com/api/v1.0/profiles/').then(response => {
			let people = response.data;
			// Prepare Matt Filter
			let mattPeople = mattFilter(people);
			
			this.setState({
				people: people,
				mattPeople: mattPeople,
				score: 0,
				highscore: 0
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

//**********************************************
//************* TIMER TICK *********************
//**********************************************

	// Tick -1 second for countdown timer
	tick(){
		this.setState({
			secondsleft: this.state.secondsleft - 1
		});
		if (this.state.secondsleft <= 0){
			//Call handleGuess w/ null person to reload new People w/o scoring
			this.handleGuess(null);
		}
	}

//**********************************************
//************* PLAY MODES *********************
//**********************************************

	// Practice mode loads new choices and doesn't use timer
	practice() {
		console.log("Practice");
		let choices = randomChoices(this.state.people, 5);

		this.setState({
			practice: true,
			play: false,
			mode: 'normal',
			choices: choices,
			selected: randomChoices(choices, 1),
		});
		// No timer
		clearInterval(this.interval);
	}

	// Back button sends us back to main menu
	back() {
		this.setState({
			practice: false,
			play: false,
		});
	}

	// Timed Challenge has two modes: normal & matt
	timedStart(mode) {
		// Reset Timer
		clearInterval(this.interval);
		// Choose from all people or only matts depending on mode
		let choices = [];
			if (mode === "normal"){
				choices = randomChoices(this.state.people, 5);
			}else{
				choices = randomChoices(this.state.mattPeople, 5);
			}
		// Start timer
		this.interval = setInterval(this.tick.bind(this), 1000);
		this.setState({
			mode: mode,
			choices: choices,
			selected: randomChoices(choices, 1),
			play: true,
			practice: false,
			secondsleft: 15,
			score: 0,
		});

	}

//**********************************************
//************* GUESS LOGIC ********************
//**********************************************

	// On Person click, this functino gets called to handle scoring and loading new choices
	handleGuess(id){
		//Handle scoring
		if (this.state.play === true){
			// Update score if selected correclty
			if(id === this.state.selected.id){
				this.setState({
					score: this.state.score + 1

				});
			}else{
				// Only update high score when we get one wrong
				if (this.state.score > this.state.highscore){
					this.setState({
						highscore: this.state.score,
					});
				}
				// Delay going back to main menu to see animated result
				setTimeout(() =>{
					this.setState({
						score: 0,
						timer: 0,
						play: false,
					});
				}, 1000);
				// Stop timer
				clearInterval(this.interval);
			}
		}

		// Re-load People
		let choices = [];
		if (this.state.mode === "normal"){
				// Use memory to always load a new set of people (also allows for better animation)
				choices = randomChoicesWithMemory(this.state.people, this.state.choices, 5);
		}else{
			// Not enough Mat(t)s to use memory w/ animation
			choices = randomChoices(this.state.mattPeople, 5);
		}
		console.log(choices);
		let timer = 15;
		if (this.state.practice === true || this.state.play === false){
			timer = 0;
		}

		// Delay setting state to view result animation
		setTimeout(() =>{
			this.setState({
				secondsleft: timer,
				choices: choices,
				selected: randomChoices(choices, 1)
			});
		}, 1000);
	}

//**********************************************
//************* BUTTON LOGIC *******************
//**********************************************

	// Display menu when practice and play is off, show back button only on practice
	buttonLogic(){
		let buttons = (
			<div className="buttons">
				<div><button onClick={this.practice.bind(this)} type="button" className="btn btn-outline-primary btn-lg">Practice First?</button></div>
				<div><button onClick={this.timedStart.bind(this, 'normal')} type="button" className="btn btn-outline-primary btn-lg">Play Timer Challenge</button></div>
				<div><button onClick={this.timedStart.bind(this, 'matt')} type="button" className="btn btn-outline-primary btn-lg">Play Mat(t)'s Timer Challenge</button></div>
			</div>
		);
		let backButton = (
			<div><button onClick={this.back.bind(this)} type="button" className="btn btn-outline-primary back">Back</button></div>
		);
		if(this.state.practice){
			buttons = backButton;
		}else if(this.state.play){
			buttons = null;	
		}
		return buttons;
	}

//**********************************************
//************* APP RENDER *********************
//**********************************************

	render() {
		let game= null;

		// Display the gameboard if practice or play has been selected
		if(this.state.practice || this.state.play){
			game = <Game onGuess={this.handleGuess.bind(this)} practice={this.state.practice} secondsleft={this.state.secondsleft} score={this.state.score} highscore={this.state.highscore} people={this.state.people} choices={this.state.choices} selected={this.state.selected}/>

		}
		// Separate button logic for readability
		let buttons = this.buttonLogic();


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

//**********************************************
//************* HELPER FUNCTIONS ***************
//**********************************************

// ********* randomChoicesWithMemory()***********************
// Inputs:
// 		list: Array of all options
//		prev: Array of previously selected choices
//		num:  Number of choices to select
// Output: 
//		choices: List of <num> random choices from list that are not in prev
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
	 if (num === 1){
	 	return choices[0]
	 }
	 return choices
}

// ********* randomChoices()***********************
// Inputs:
// 		list: Array of all options
//		num:  Number of choices to select
// Output: 
//		choices: List of <num> random choices from list
function randomChoices(list, num){
	let choices = [];
	while(choices.length < num){
		let rand = list[Math.floor(Math.random() * list.length)];
	 	while(choices.indexOf(rand) !== -1 || typeof rand.headshot.url === 'undefined'){
	 		rand = list[Math.floor(Math.random() * list.length)];
	 	}
	 	choices.push(rand);
	 }
	 if (num === 1){
	 	return choices[0]
	 }
	 return choices
}

// ********* mattFiler()***********************
// Inputs:
// 		people: Array of all people
// Output: 
//		mattPeople: List of people who's first name begins with Mat
function mattFilter(people){
	var regexp = new RegExp('^mat', 'i');
	let mattPeople = people.filter(person => {
                            return regexp.test(person.firstName);
                        })
	return mattPeople;
}

export default App;
