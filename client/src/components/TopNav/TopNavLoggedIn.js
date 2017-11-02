import React from 'react'
import { Link } from 'react-router-dom'
import './TopNav.css';
import logo from '../../Battle-Board.png';

// The Header creates links that can be used to navigate
// between routes.
const TopNav = () => (

	<div className="TopNav">
		<div className="container-fluid">
			<div className="row">
				<div className="col-sm-6">
					<img src={logo} alt="Battle Board Logo"/>
				</div>
				<div className="col-sm-6 text-right">
					<Link style={{ color: '#428bca' }} to='/'>Home</Link>
					&nbsp; | &nbsp;
		 			<Link style={{ color: '#428bca' }} to="/dashboard">Dashboard</Link>
		 			&nbsp; | &nbsp;
		 			<Link style={{ color: '#428bca' }} to="/game">Game</Link>
		 			&nbsp; | &nbsp;
		 			<Link style={{ color: '#428bca' }} to="/board">Board</Link>
					&nbsp; | &nbsp;
					<Link style={{ color: '#428bca' }} to="/login-signup">Log/Register</Link>
				</div>
			</div>
		</div>
	</div>
)

export default TopNav