import React, { Component } from 'react';
import logo from '../../Battle-Board.png';
import '../../App.css';
import TopNav from "../TopNav/TopNav";


class Home extends Component {
	componentDidMount() {
		if (typeof(Storage) !== "undefined") {
			// Store
			sessionStorage.setItem("userID", "1");
			// Retrieve
		} else {
			alert("Sorry, your browser does not support Web Storage...");
		}
	}

	render() {
		return (
			<div>
				<TopNav/>
				<div className="App">
					<div className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
					</div>
					<div className="container BBintro">
						<div className = "row">
							<div className="col-sm-8 col-sm-offset-2 App-intro">
								Battle Board is a role-playing game utility that helps players keep track of combat.<br /><br />
							</div>
						</div>
						<div className = "row">
							<div className = "col-sm-12 App-sub text-left">
								<p>
									Which round is it?  Whose turn is it?  How much damage have I taken?  What conditions are on the monster?
									All of these can be managed and tracked through the combat.
									Users can manage multiple characters through multiple games.
									When combat begins, roll initiative and Battle Board determines the order of combat.
									Easily add monsters to the scene and let the battle begin!<br /><br />
								</p>
								<p>
									Need to take a break in the middel fo combat?  We know, we know...who would stop in the middle of a combat?
									But, life happens...the pizza guy arrives, your little one needs to be tucked into bed, or it's way too late
									and you can't think of what you need to do next.
									No worries!  Battle Board stores the combat session so the next time you come to the game, you can pick up
									where you left off.<br /><br />
								</p>
								<p>
									Play in multiple game groups?  We've got you covered.  Create as many boards as you need!
									Add the characters for that particular game to the board and you're good to go.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}



export default Home;