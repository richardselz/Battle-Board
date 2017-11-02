import React from "react";
import { withRouter } from 'react-router-dom';
import "./Game.css";

const Button = withRouter(({history}) => (
	<button
		type='submit'
		className="btn btn-primary"
		onClick={() => { 
			alert("I'm about to redirect");
			history.push('/');
		}}
	>
		<span className = "buttonText">Click Me!</span>
	</button>
  ));

  export default Button;