import React, { Component } from "react";
import "./Dashboard.css";
import TopNav from "../TopNav/TopNavLoggedIn";
import API from "../../utils/API.js";
import { sockets } from "../../utils/sockets.js";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,Redirect,withRouter} from 'react-router-dom';



class Game extends Component {
    constructor(props) {
		super(props);
		
    	this.state = {
			userID: sessionStorage.getItem("userID"),
			charList: [],
			foundChars: false,
			// userID: localStorage.getItem("userID"),
			sentMessage: '',
			redirect: false,
			userPromise: false,
			character_id: -1,
			charName: "",
			dexterity: 0,
			hitPoints: 0,
			initBonus: 0,
			conditions: "",
			gameList: [],
			gameButtonDisplay: "toggleDisplayOff",
			gameCharList: [],
			gameName: "",
			chosenList: []
		};

		sockets.listenForGameList((data) => {
			console.log("from the server", data);
			this.getGames();
		});
  	}

	createCharacter(event) {
		event.preventDefault();
		// console.log("hi");
		// this.setState({someValue: true});
		// this.setState({characterRedirect: true});
		window.location ="/createCharacter";
	}
	
	createGame(event) {
		event.preventDefault();
		window.location = "/game";
	}

	componentDidMount() {
		let userID = {
			userID: this.state.userID
		};

		this.getCharacters();
		this.getGames();
		API.userLoggedIn()
		.then(res => {
			this.setState({userPromise: true})
			console.log("Got res from API in Dashboard: ",res.data);
			if(res.data.status === "4xx") {
				this.setState({redirect: true});
			}
		})
		.catch(err => {
			console.log("Error from API in Dashboard: ",err);
			this.setState({redirect: true});
		});
	}

	handleChange = event => {
		let value = event.target.value;
		let name = event.target.name;
		this.setState({
			[name]: value
		});
	};

	getCharacters(userID) {
		API.getUserCharacters(userID)
		.then(res => {
			console.log("Inside get Chars:",res);
			if (res.data.length !== 0) {
				res.data.forEach(itm => {
					itm.charDisplay = "toggleDisplayOff";
					itm.buttonColor = "btn btn-primary pull-right";
				});
				this.setState({
					charList: res.data
				});					
			}
				else {
					let noChars = [{
						character_name: "No characters found",
						charDisplay: "toggleDisplayOff",
						buttonColor: "toggleDisplayOff"
					}];
					this.setState({
						charList: noChars
					});
				}
		})
		.catch(err => console.log("Get user Error: ",err));
	}

	getGames() {
		API.getGames()
		.then(res => {
			if (res.data.length !== 0) {
				res.data.forEach(itm => {
					itm.gameDisplay = "toggleDisplayOff";
					itm.buttonColor = "btn btn-primary pull-right";
				});
				this.setState({
					gameList: res.data,
					gameButtonDisplay: "toggleDisplayOn"
				});					
			}
				else {
					let noGames = [{
						game_name: "No games",
						gameDisplay: "toggleDisplayOff",
						buttonColor: "toggleDisplayOff"
					}];
					this.setState({
						gameList: noGames,
						gameButtonDisplay: "toggleDisplayOff"
					});
				}
		})
		.catch(err => console.log(err));
	}

	getRender() {
		const { redirect } = this.state;
		if(redirect) {
			return <Redirect to="/login-signup"/>;
		}
			else {
				return (
					<div>
						<TopNav />
						<div className="container">
							<div className="row">
								<div className="col-sm-12 headerText text-center">
									Dashboard
								</div>
							</div>
						</div>
						<div className="container dashText">
							<div className="row">
								<div className = "col-sm-12 col-md-5">
									<div className="row">
										<div className="panel panel-default">
											<div className="panel-body text-center">
												Your Characters:
											</div>
										</div>
									</div>
									<div className="row">
										<div className="panel panel-default">
											<div className="panel-body fixed-panel">
												{this.state.charList.map(info => (
													<div>
														<div className = "row">
															<div className = "col-sm-12 top-buffer">
																{info.character_name}
																<a className={info.buttonColor} onClick={() => this.editCharacter(info.character_id)}><span className="buttonText">Edit</span></a>
															</div>
														</div>
														<div className={info.charDisplay}>
															<div className="row">
																<div className="col-sm-12">
																	<form className="formText" role="form">
																		<div className="form-group">
																			Character Name{this.state.character_name}:<br/>
																			<input
																				name="charName"
																				id="charName"
																				type="text"
																				placeholder={info.character_name}
																				value={this.state.charName}
																				onChange={this.handleChange}
																				required
																			/><br/>
																			Initiative Bonus:<br/>
																			<input
																				name="initBonus"
																				id="initBonus"
																				type="text"
																				placeholder={info.initiative_bonus}
																				value={this.state.initBonus}
																				onChange={this.handleChange}
																				required
																			/><br/>
																			Dexterity Bonus:<br/>
																			<input
																				name="dexterity"
																				id="dexterity"
																				type="text"
																				placeholder={info.dexterity}
																				value={this.state.dexterity}
																				onChange={this.handleChange}
																				required
																			/><br/>
																			Hit Point Damage:<br/>
																			<input
																				name="hitPoints"
																				id="hitPoints"
																				type="text"
																				placeholder={info.hitpoints}
																				value={this.state.hitPoints}
																				onChange={this.handleChange}
																			/><br/>
																			Conditions:<br/>
																			<div className="row">
																				<div className="col-sm-12">
																					<textarea
																						className="hundred"
																						name="conditions"
																						id="conditions"
																						placeholder={info.conditions}
																						value={this.state.conditions}
																						onChange={this.handleChange}
																					/>
																				</div>
																			</div>
																			<div className="row">
																				<div className = "col-sm-12">
																					<button onClick={this.deleteChar} className="btn btn-primary pull-left" type="submit" value="Delete"><span className="buttonText">Delete</span></button>
																					<button onClick={this.updateChar} className="btn btn-primary pull-right" type="submit" value="Save"><span className="buttonText">Save</span></button>
																				</div>
																			</div>
																		</div>
																	</form>
																</div>
															</div>
														</div>
														<hr />
													</div>
												))}
											</div>
										</div>
									</div>
									<div className="row">
										<div className = "col-sm-12">
											<button className="btn btn-primary center-block" onClick={this.createCharacter} type="submit" value="CreateCharacter"><span className="buttonText">Create New Character</span></button>
										</div>
									</div>
								</div>
								<div className = "col-sm12 col-md-6 col-md-offset-1">
									<div className = "row">
									<div className = "panel panel-default">
										<div className = "panel-body text-center">
											Available Games:
										</div>
									</div>
									</div>
									<div className = "row">
										<div className = "panel panel-default">
											<div className = "panel-body fixed-panel">
												{this.state.gameList.map(info => (
													<div>
														<div className = "row">
															<div className = "col-sm-8 top-buffer">
																{info.game_name}
															</div>
															<div className = "col-sm-4 top-buffer">
																<div className={this.state.gameButtonDisplay}>
																	<div className="btn-toolbar pull-right">
																		<a className="btn btn-primary" onClick={(event) => {event.preventDefault(); this.goBattle(info.game_id)}}><span className="buttonText">Battle</span></a>
																		<a className={info.buttonColor} onClick={() => this.editGame(info.game_id)}><span className="buttonText">Edit</span></a>
																	</div>
																</div>
															</div>
														</div>
														<div className={info.gameDisplay}>
															<div className="row">
																<div className="col-sm-12">
																	<form className="form-horizontal formText">
																			Game Name<br/>
																			<input
																				name="gameName"
																				id="gameName"
																				type="text"
																				placeholder={info.game_name}
																				value={this.state.gameName}
																				onChange={this.handleChange}
																				required
																			/><br/><br/>
																		<div className="row">
																			<div className="panel panel-default">
																				<div className="text-center">
																					Chosen Characters
																				</div>
																				<div className = "panel-body">
																					<div className = "row">
																						{this.state.chosenList.map(info => (
																							<div className = "col-sm-4 text-center">
																								{info.character_name}
																							</div>
																						))}
																					</div>
																				</div>
																			</div>
																		</div>
																		<div className="row">
																			<div className="panel panel-default">
																				<div className="panel-body">
																					{this.state.gameCharList.map(info => (
																						<div className = "row">
																							<div className = "col-sm-12 text-center">
																								<button className="btn btn-primary bottomPadding" onClick={(event) => {event.preventDefault(); this.chooseMe(info)}}><span className="buttonText">{info.character_name}</span></button>
																							</div>
																						</div>
																					))}
																				</div>
																			</div>
																		</div>
																		<div className="row">
																			<div className="col-sm-12">
																				<button onClick={(event) => {event.preventDefault(); this.deleteGame(info.game_id)}} className="btn btn-primary pull-left" type="submit" value="Delete"><span className="buttonText">Delete</span></button>
																				<button onClick={this.updateGame} className="btn btn-primary pull-right" type="submit" value="Save"><span className="buttonText">Save</span></button>
																			</div>
																		</div>
																	</form>
																</div>
															</div>
														</div>
														<hr />
													</div>
												))}
											</div>
										</div>
									</div>
									<div className = "row">
										<div className = "col-sm-12">
											<button className="btn btn-primary center-block" onClick={this.createGame} type="submit" value="CreateGame"><span className="buttonText">Create New Game</span></button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				);		
			}
	}

	editCharacter(charID) {
		let charArray = this.state.charList;
		let index = charArray.map(function(e) { return e.character_id; }).indexOf(charID);
		for (let i = 0; i < charArray.length; i++) {
			if (i !== index) {
				charArray[i].charDisplay = "toggleDisplayOff";
				charArray[i].buttonColor = "btn btn-primary pull-right";
			}
		}
		if (charArray[index].charDisplay === "toggleDisplayOn") {
			charArray[index].charDisplay = "toggleDisplayOff";
			charArray[index].buttonColor = "btn btn-primary pull-right";
			this.setState({
				charList: charArray,
				charName: "",
				dexterity: 0,
				hitPoints: 0,
				initBonus: 0,
				conditions: "",
				charID: -1
			});			
		}
			else {
				charArray[index].charDisplay = "toggleDisplayOn";
				charArray[index].buttonColor = "btn btn-success pull-right";
				this.setState({
					charList: charArray,
					charID: charArray[index].character_id,
					charName: charArray[index].character_name,
					dexterity: charArray[index].dexterity,
					hitPoints: charArray[index].hitpoints,
					initBonus: charArray[index].initiative_bonus,
					conditions: charArray[index].conditions,
				});
			}
	}

	chooseMe(info) {
		let inArray = false;
		let charIndex = 0;
		for (let i = 0; i < this.state.chosenList.length; i++) {
			if (this.state.chosenList[i].character_id === info.character_id) {
				inArray = true;
				charIndex = i;
			}
		}
		if (!inArray) {
			let newArray = this.state.chosenList;
			newArray.push(info);
			this.setState({chosenList: newArray});
		}
			else {
				let newArray = this.state.chosenList;
				newArray.splice(charIndex, 1);
				this.setState({chosenList: newArray});
			}
	}

	editGame(gameID) {
		this.setState({
			chosenList: []
		});
		API.getAllCharacters()
		.then(res => {
			if (res.data.length !== 0) {
				this.setState({
					gameCharList: res.data
				});					
			}
				else {
					let noChars = [{
						character_name: "No characters"
					}];
					this.setState({
						charList: noChars
					});
				}
			let boardID = {
				gameID: gameID
			};
			API.getBoardCharacters(boardID)
			.then(res => {
				let currentList = [];
				for (let i = 0; i < res.data[0].length; i++) {
					currentList.push(res.data[0][i]);
				}
				this.setState({
					chosenList: currentList
				})
			});
		})
		.catch(err => console.log(err));
		let gameArray = this.state.gameList;
		let index = gameArray.map(function(e) { return e.game_id; }).indexOf(gameID);
		for (let i = 0; i < gameArray.length; i++) {
			if (i !== index) {
				gameArray[i].gameDisplay = "toggleDisplayOff";
				gameArray[i].buttonColor = "btn btn-primary pull-right";
			}
		}
		if (gameArray[index].gameDisplay === "toggleDisplayOn") {
			
			gameArray[index].gameDisplay = "toggleDisplayOff";
			gameArray[index].buttonColor = "btn btn-primary pull-right";
			this.setState({
				gameList: gameArray,
				gameName: "",
				gameID: -1
			});
		}
			else {
				gameArray[index].gameDisplay = "toggleDisplayOn";
				gameArray[index].buttonColor = "btn btn-success pull-right";
				this.setState({
					gameList: gameArray,
					gameID: gameArray[index].game_id,
					gameName: gameArray[index].game_name
				})
			}
		this.setState({
			gameList: gameArray
		});
	}

	// When the form is submitted, run the search
	updateChar = event => {
		// Preventing the default behavior of the form submit (which is to refresh the page)
		event.preventDefault();
		let charInfo =  {
			character_name: this.state.charName,
			dexterity: this.state.dexterity,
			initiative_bonus: this.state.initBonus,
			hitpoints: this.state.hitPoints,
			conditions: this.state.conditions,
			isCharacter: true,
			user_id: sessionStorage.getItem("userID"),
			character_id: this.state.charID
		};
		let userID = {
			userID: this.state.userID
		};

		API.updateCharacter(charInfo).then(res => {
			sockets.sendBoardUpdate(res.data);
			this.getCharacters(userID)
		})
		.catch(err => console.log(err));
	};

	updateGame = event => {
		event.preventDefault();
		if ((this.state.gameName.trim().length !== 0) && (this.state.chosenList.length !== 0)) {
			let gameInfo = {
				game_id: this.state.gameID,
				game_name: this.state.gameName
			};
			let boardInfo = {
				game_id: this.state.gameID,
				charList: this.state.chosenList
			};
			API.updateGame(gameInfo).then(res => {
				API.updateBoard(boardInfo).then(res => {
					this.getGames();
				}).catch(err => console.log(err));
			}).catch(err => console.log(err));	
		}
	}

	deleteGame(game_id) {
		let gameID = {
			game_id: game_id
		};
		API.deleteGame(gameID).then(res => {
			API.deleteBoard(gameID).then(res => {
				this.getGames();
			}).catch(err => console.log(err));
		}).catch(err => console.log(err));
	}

	deleteChar = event => {
		event.preventDefault();
		let charID = {
			character_id: this.state.charID
		};
		let userID = {
			userID: this.state.userID
		};
		API.deleteChar(charID).then(res => {
			API.deleteCharFromBoard(charID).then(res => {
				API.getGames().then(res => {
					if (res.data.length === 0) {
						this.getCharacters(userID);
					}
						else {
							API.updateGameLoseChar(charID).then(res => {
								this.getCharacters(userID);
							}).catch(err => console.log(err));
						}
				}).catch(err => console.log(err));	
			}).catch(err => console.log(err));
		}).catch(err => console.log(err));
	}

	goBattle(game_id) {
		console.log("I think the game_id is", game_id);
		sessionStorage.setItem("gameID", game_id);
		window.location = "/board";
	}


    render() {
		const { redirect } = this.state;
		const { userPromise } = this.state;
		// const { characterRedirect } = this.state;
		return userPromise ? this.getRender() : (<span>Loading...</span>);
    }
  }

export default Game;