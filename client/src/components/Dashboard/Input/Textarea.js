import React from "react";
import "./Input.css";

export const Textarea = props =>
	<div className="form-group inputForm">
			{props.labelname}:<br />
			<textarea className="form-control" {...props} />
	</div>