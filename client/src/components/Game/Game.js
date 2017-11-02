import React, { Component } from "react";
import "./Game.css";
import TopNav from "../TopNav/TopNavLoggedIn";
import API from "../../utils/API.js";
import Button from "./Button.js";
import {sockets} from "../../utils/sockets";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,Redirect,withRouter} from 'react-router-dom';

class Game extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
			gameName: '',
			charList: [],
			foundChars: true,
			chosenList: [],
			redirect: false,
			userPromise: false
		};
		
      this.handleChange = this.handleChange.bind(this);
	  this.handleBuild = this.handleBuild.bind(this);
	  this.handleBattle = this.handleBattle.bind(this);
	}
	
	componentDidMount() {
		API.getAllCharacters()
		.then(res => {
			if (res.data.length !== 0) {
				this.setState({
					charList: res.data
				});					
			}
				else {
					let noChars = [{
						character_name: "No characters found"
					}];
					this.setState({
						charList: noChars
					});
				}
		})
		.catch(err => console.log(err));

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
	}
  
    handleChange(event) {
		this.setState({gameName: event.target.value});
	}
	  
    handleBuild(event) {
		event.preventDefault();
		let gameName =  {
			game_name: this.state.gameName
		};

		if ((gameName.game_name.trim().length !== 0) && (this.state.chosenList.length > 0)) {
			API.createGame(gameName).then(res => {
				sessionStorage.setItem("gameID", res.data.game_id);				
				let boardInfo = {
					gameID: res.data.game_id,
					charInfo: this.state.chosenList
				}
				API.createBoard(boardInfo).then(res => console.log("in create board")).catch(err=>console.log("In create Board error: ",err));
				sockets.sendGameList(res.data);
				window.location = "/dashboard";
			});	
		}
	}
	
	handleBattle(event) {
		event.preventDefault();
		let gameName =  {
			game_name: this.state.gameName
		};

		if ((gameName.game_name !== "") && (this.state.chosenList.length > 0)) {
			API.createGame(gameName).then(res => {
				sessionStorage.setItem("gameID", res.data.game_id);
				let boardInfo = {
					gameID: res.data.game_id,
					charInfo: this.state.chosenList
				}
				API.createBoard(boardInfo);
				sockets.sendGameList(res.data);
				window.location = "/board";
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

	getRender() {
	const { redirect } = this.state;
	if(redirect) {
		return <Redirect to="/login-signup"/>;
	}
	return (
        <div>
			<TopNav />
			<div className="container">
				<div className="row">
					<div className = "col-sm-12 col-md-6 col-md-offset-3 gameForm">
						<div className="panel panel-default">
							<div className="panel-body">
								<form className="form-horizontal">
									<label className="text-center">
										Create New Campaign:
										<input width="100%" type="text" placeholder="Campaign Name (required)" value={this.state.value} onChange={this.handleChange} required />
									</label>
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
												{this.state.charList.map(info => (
													<div className = "row">
														<div className = "col-sm-12 text-center">
															<button className="btn btn-primary" onClick={(event) => {event.preventDefault(); this.chooseMe(info)}}><span className="buttonText">{info.character_name}</span></button>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
									<button onClick={this.handleBuild} className="btn btn-primary pull-left" type="submit" value="Build and Return"><span className="buttonText">Build and Return</span></button>
									<button onClick={this.handleBattle} className="btn btn-primary pull-right" type="submit" value="Build and Battle"><span className="buttonText">Build and Battle</span></button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>
	  );
	}
  
    render() {
		const { userPromise } = this.state;
		return userPromise ? this.getRender() : (<span>Loading...</span>);
    }
  }

export default Game;