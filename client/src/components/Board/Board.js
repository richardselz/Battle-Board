import React, { Component } from 'react';
import API from "../../utils/API.js";
import "./Board.css";
import TopNav from "../TopNav/TopNavLoggedIn";
import Character from "../Character/Character.js";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,Redirect,withRouter} from 'react-router-dom';
import { sockets } from "../../utils/sockets.js";


class Board extends Component {

    constructor(props) {
		super(props);
		
    	this.state = {
			charArray: [],
			gameName: "",
			round: 0,
			turn_id: null,
			redirect: false,
			userPromise: false
		};

		this.getBoard = this.getBoard.bind(this);

		sockets.listenForBoardUpdate((data) => {
			let gameID = {
				gameID: sessionStorage.getItem("gameID")
			};
			console.log("from the server", data);
			this.getBoard(gameID);
		});
  	}

	componentDidMount() {
		API.userLoggedIn()
		.then(res => {
			this.setState({userPromise: true});
			console.log("Got res from API in Dashboard: ",res);
			if(res.data.status === "4xx") {
				this.setState({redirect: true});
			}
		})
		.catch(err => {
			console.log("Error from API in Dashboard: ",err);
			this.setState({redirect: true});
		});
		let gameID = {
			gameID: sessionStorage.getItem("gameID")
		};

		let turnID = {
			turn_id: null
		};

		API.getGames()
		.then(res => {
			let index = res.data.findIndex(x => x.game_id == gameID.gameID);
			this.setState({
				gameName: res.data[index].game_name
			});
			if(res.data[index].turn_id === null)
				{
					console.log("I don't think I know who goes first");
				}
		});

		this.getBoard(gameID);
	}

	getBoard(gameID) {
		let myOrderArray = [];
		API.getBoardCharacters(gameID)
		.then(res => {
			for (let i = 0; i < res.data[0].length; i++) {
				let charEntry = {};
				charEntry.uniqueValue = i;
				charEntry.charID = res.data[0][i].character_id;
				charEntry.charName = res.data[0][i].character_name;
				charEntry.hitPoints = res.data[0][i].hitpoints;
				charEntry.initBonus = res.data[0][i].initiative_bonus;
				charEntry.dexterity = res.data[0][i].dexterity;
				charEntry.initRoll = res.data[0][i].initiative_roll;
				charEntry.finalInit = 0;
				charEntry.conditions = res.data[0][i].conditions;
				if(res.data[0][i].isCharacter) {
					charEntry.deleteButton = "toggleDisplayOff";
				}
				myOrderArray.push(charEntry);
			}
			for (let i = 0; i < myOrderArray.length; i++) {
				myOrderArray[i].finalInit = myOrderArray[i].initRoll + myOrderArray[i].initBonus + myOrderArray[i].initBonus/100 + myOrderArray[i].dexterity/10000;
			}
			myOrderArray.sort(function(a, b) {
				return parseFloat(a.finalInit) - parseFloat(b.finalInit);
			}).reverse();
			this.setState({charArray: myOrderArray});
		})
		.catch(err => console.log(err));
		this.setState({charArray: myOrderArray});
	}

	handleChange = event => {
		let value = event.target.value;
		let name = event.target.name;
		this.setState({
			[name]: value
		});
	};

	triggerBoard = event => {
		event.preventDefault();
		let gameID = {
			gameID: sessionStorage.getItem("gameID")
		};
		console.log("after trigger, charArray is", this.state.charArray);
	}

	getRender() {
		const { redirect } = this.state;
		if(redirect) {
			return <Redirect to="/login-signup"/>;
		}
			else {
				return (
					<div>
						<TopNav/>
						<div className="container">
							<div className="row">
								<div className="col-sm-12 headerText">
									Battle Board for {this.state.gameName}
								</div>
							</div>
							<div className="row">
								<div className="col-sm-2 headerText">
									<button className="btn btn-primary" onClick={this.addMonster}><span className="buttonText">Add Monster</span></button>
								</div>
								<div className="col-sm-2 headerText text-right">
									Round
								</div>
								<div className="col-sm-1 headerText">
									{this.state.round}
								</div>
							</div>
						</div>
						<div className="Board">
							<div className="container">
								<div className = "row">
									{this.state.charArray.map(info => (
										<Character charList={info} updateBoard={this.getBoard}/>
									))}
								</div>
							</div>
						</div>
					</div>
				)		
			}
	}

	addMonster() {
		window.location = "/createMonster";
	};

	render() {
		const { userPromise } = this.state;
		return userPromise ? this.getRender() : (<span>Loading...</span>);
	}		
}



export default Board;