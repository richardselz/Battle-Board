import React, { Component } from "react";
import "./Dashboard.css";
import TopNav from "../TopNav/TopNavLoggedIn";
import API from "../../utils/API.js";
import Form from "./Form/Form.js";


class MonsterInfo extends Component {

	state = {
		charName: "",
		initBonus: 0,
		dexterity: 0,
		hitPoints: 0,
		conditions: ""
	}


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
			isCharacter: false,
			UserId: 0
		};

		API.createMonster(charInfo)
		.then(res => {
			console.log("Got a value in monster return", res);
			charInfo.character_id = res.data.character_id;
			let monsterInfo = [charInfo];
			let boardInfo = {
				gameID: sessionStorage.getItem("gameID"),
				charInfo: monsterInfo
			}
			console.log("Before saving, I have a boardInfo of", boardInfo);
			API.createBoard(boardInfo).then(window.location = "/board");
		}).catch(err => {
			console.log("Catching Error on Monsters: ",err);	
		});
		
	};

    render() {
      return (
        <div>
			<TopNav />
			<div className="container">
				<div className="row">
					<div className = "col-sm-12 col-md-6 col-md-offset-3 gameForm">
						<div className="panel panel-default">
							<div className="panel-body">
								<Form
									charType="Monster Name"
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

export default MonsterInfo;