import React from "react";
import { FormBtn } from "./FormButton.js";
import { Input } from "../Input/Input.js";
import { Textarea } from "../Input/Textarea.js";
import "../Input/Input.css";


const Form = props =>

	<div className="row">
		<div className="col-sm-12">
			<form className="formText" role="form">
				<div className="form-group">
				<Input
					className="inputForm"
					type="text"
					value={props.charName}
					onChange={props.handleInputChange}
					name="charName"
					placeholder={props.charType}
					id = "charName"
					labelname = {props.charType}
				/>
				<Input
					className="inputForm"
					type="text"
					value={props.initBonus}
					onChange={props.handleInputChange}
					name="initBonus"
					placeholder="Initiative Bonus"
					id="initBonus"
					labelname = "Initiative Bonus"
				/>
				<Input
					className="inputForm"
					type="text"
					value={props.dexterity}
					onChange={props.handleInputChange}
					name="dexterity"
					placeholder="Dexterity Bonus"
					id="dexterity"
					labelname = "Dexterity Bonus"
				/>
				<Input
					className="inputForm"
					value={props.hitPoints}
					onChange={props.handleInputChange}
					name="hitPoints"
					placeholder="HitPoints"
					id="hitPoints"
					labelname = "Hit Point Damage"
				/>
				<div className="row">
					<div className="col-sm-12">
						<Textarea
							value={props.conditions}
							onChange={props.handleInputChange}
							name="conditions"
							className="hundred"
							placeholder="Conditions"
							id="conditions"
							labelname = "Conditions"
						/>
					</div>
				</div>
				<FormBtn
					onClick={props.handleFormSubmit}
				>
					<span className="formText">Submit</span>
				</FormBtn>
				</div>
			</form>
		</div>
	</div>

export default Form;
