import React from "react";
import "../Input/Input.css";

export const FormBtn = props =>
	<button {...props} style={{ float: "right" }} className="btn btn-primary inputForm">
		{props.children}
	</button>;