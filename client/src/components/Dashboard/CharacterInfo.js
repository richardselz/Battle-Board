import React, { Component } from "react";
import "./Dashboard.css";
import TopNav from "../TopNav/TopNavLoggedIn";
import API from "../../utils/API.js";
import Form from "./Form/Form.js";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,Redirect,withRouter} from 'react-router-dom';

class CharacterInfo extends Component {

	state = {
		charName: "",
		initBonus: 0,
		dexterity: 0,
		hitPoints: 0,
		conditions: "",
		redirect: false,
		userPromise: false
	}

	
	// componentDidMount() {
	// 	this.searchGames();
	// }

	// Whenever anything in the Form is updated, update the state so the search can be done
	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};
  
	// When the form is submitted, run the insertion into the database
	handleFormSubmit = event => {
		// Preventing the default behavior of the form submit (which is to refresh the page)
		event.preventDefault();
		let charInfo =  {
			character_name: this.state.charName,
			dexterity: this.state.dexterity,
			initiative_bonus: this.state.initBonus,
			hitpoints: this.state.hitPoints,
			conditions: this.state.conditions,
			isCharacter: true,
			user_id: sessionStorage.getItem("userID")
		};

		API.createCharacter(charInfo);
		window.location = "/dashboard";
	};

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
								<div className = "col-sm-12 col-md-6 col-md-offset-3 gameForm">
									<div className="panel panel-default">
										<div className="panel-body">
											<Form
												charType="Character Name"
												charName={this.state.charName}
												initBonus={this.state.initBonus}
												dexterity={this.state.dexterity}
												hitPoints={this.state.hitPoints}
												conditions={this.state.conditions}
												handleInputChange={this.handleInputChange}
												handleFormSubmit={this.handleFormSubmit}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			}
	}

	render() {
		const { userPromise } = this.state;
		return userPromise ? this.getRender() : (<span>Loading..</span>);
    }
  }

export default CharacterInfo;