import React, { Component } from 'react';
import API from "../../utils/API.js";
import './Character.css';
import { sockets } from "../../utils/sockets.js";


class Character extends Component {

	constructor(props) {
		super(props);
		this.state = {
			charID: this.props.charList.charID,
			charName: this.props.charList.charName,
			conditions: this.props.charList.conditions,
			dexterity: this.props.charList.dexterity,
			finalInit: this.props.charList.finalInit,
			hitPoints: this.props.charList.hitPoints,
			initBonus: this.props.charList.initBonus,
			initRoll: this.props.charList.initRoll,
			deleteButton: this.props.charList.deleteButton
		}
	}

	handleChange = event => {
		let value = event.target.value;
		let name = event.target.name;
		this.setState({
			[name]: value
		});
	};

	saveChar(charID) {
		let charList =  {
			hitpoints: this.state.hitPoints,
			conditions: this.state.conditions,
			character_id: this.state.charID,
			initiative_roll: this.state.initRoll
		};
		let userID = {
			userID: this.state.userID
		};

		API.updateCharacter(charList).then(res => {
			let gameID = {
				gameID: sessionStorage.getItem("gameID")
			};
			sockets.sendBoardUpdate(res.data);
			this.props.updateBoard(gameID);
		})
		.catch(err => console.log(err));
	}

	deleteChar(charID) {
		let characterID = {
			character_id: charID
		};
		console.log("Character ID is", characterID);
		let userID = {
			userID: 0
		};
		API.deleteChar(characterID).then(res => {
			API.deleteCharFromBoard(characterID).then(res => {
				let gameID = {
					gameID: sessionStorage.getItem("gameID")
				};
				sockets.sendBoardUpdate(res.data);
				this.props.updateBoard(gameID);
			}).catch(err => console.log(err));
		}).catch(err => console.log(err));
	}


	render() {
		return (
			<div className = "col-sm-4 charCard">
				<div class="panel panel-default">
					<div class="panel-body">
						<p className="charName">{this.state.charName}</p>
						<form className="bodyText" role="form">
							<div className="form-group">
								Initiative Bonus: {this.state.initBonus}<br />
								Dexterity Bonus: {this.state.dexterity}<br />
								Final Initiative: {this.state.finalInit.toFixed(4)}<br />
								Initiative Roll:
								<input
									name="initRoll"
									id="initRoll"
									type="text"y
									placeholder={this.state.initRoll}
									value={this.state.initRoll}
									onChange={this.handleChange}
									required
								/><br/>
								Hit Point Damage:<br/>
								<input
									name="hitPoints"
									id="hitPoints"
									type="text"
									placeholder={this.state.hitpoints}
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
											placeholder={this.state.conditions}
											value={this.state.conditions}
											onChange={this.handleChange}
										/>
									</div>
								</div>
								<div className="row">
									<div className = "col-sm-12">
										<div className={this.state.deleteButton}>
										<button onClick={(event) => {event.preventDefault(); this.deleteChar(this.state.charID)}} className="btn btn-primary pull-left" type="submit" value="Save"><span className="buttonText">Delete</span></button>
										</div>
										<button onClick={(event) => {event.preventDefault(); this.saveChar(this.state.charID)}} className="btn btn-primary pull-right" type="submit" value="Save"><span className="buttonText">Save</span></button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default Character;