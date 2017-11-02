import React, { Component } from 'react';
import TopNav from "../TopNav/TopNav.js";
import API from "../../utils/API.js";
import ReactDOM from 'react-dom';
import './LogReg.scss';
import {BrowserRouter as Router,Route,Link,Redirect,withRouter} from 'react-router-dom';

class LogReg extends Component{
    state = {
        username: "",
        password: "",
        email: "",
        redirect: false
    }
    
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    handleFormSubmit = event => {
        event.preventDefault();
        // console.log("Username: ",this.state.username," Password: ",this.state.password," Email: ",this.state.email);
        API.createUser({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        })
        .then(res => {
            console.log("Created User!",res.data);
            this.setState({redirect: true});
        })
        .catch((err) => {console.log("Some Error (from API): ",err);});
    }

    handleLogin = event => {
        event.preventDefault();
        API.login({
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            this.setState({redirect: true});
        }).catch(err => {
            console.log("Handle Login Error: ", err);
        });
    }

    handleLogout = event => {
        event.preventDefault();
        API.logout();
    }
    
    render(){
        const { redirect } = this.state;
        if(redirect) {
            return <Redirect to="/dashboard"/>;
        }
        return(
            <div>
                <TopNav/>
            
                <div className="signupSection">
                    <div className="info">
                    <h2>BattleBoard</h2>
                    <i className="icon ion-ios-ionic-outline" aria-hidden="true"></i>
                    <p>Role Playing Game</p>
                    </div>
                    <form action="#" method="POST" className="signupForm" name="signupform">
                    <h2>Sign Up</h2>
                    <ul className="noBullet">
                        <li>
                        <label for="username"></label>
                        <input type="text" className="inputFields" id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInputChange} required/>
                        </li>
                        <li>
                        <label for="password"></label>
                        <input type="password" className="inputFields" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} required/>
                        </li>
                        <li>
                        <label for="email"></label>
                        <input type="email" className="inputFields" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} required />
                        </li>
                        <li id="center-btn">
                        <input type="submit" id="join-btn" name="join" alt="Join" value="Join" onClick={this.handleFormSubmit}/>
                        </li>
                    </ul>
                    </form>
                    <br/><br/><br/>
                    <form action="#" method="POST" className="signupForm" name="signupform">
                    <h2>Sign Up</h2>
                    <ul className="noBullet">
                        <li>
                        <label for="username"></label>
                        <input type="text" className="inputFields" id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInputChange} required/>
                        </li>
                        <li>
                        <label for="password"></label>
                        <input type="password" className="inputFields" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} required/>
                        </li>
                        <li id="center-btn">
                        <input type="submit" id="join-btn" name="login" alt="Login" value="Login" onClick={this.handleLogin}/>
                        </li>
                    </ul>
                    </form>
                    <br/><br/><br/>
                    <button className="btn btn-primary center-block" onClick={this.handleLogout} type="submit" value="logout"><span className="buttonText">Logout!</span></button>
                </div>
            </div>
        );
        
    }
}
export default LogReg;







var alertRedInput = "#8C1010";
var defaultInput = "rgba(10, 180, 180, 1)";

function userNameValidation(usernameInput) {
    var username = document.getElementById("username");
    var issueArr = [];
    if (/[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(usernameInput)) {
        issueArr.push("No special characters!");
    }
    if (issueArr.length > 0) {
        username.setCustomValidity(issueArr);
        username.style.borderColor = alertRedInput;
    } else {
        username.setCustomValidity("");
        username.style.borderColor = defaultInput;
    }
}

function passwordValidation(passwordInput) {
    var password = document.getElementById("password");
    var issueArr = [];
    if (!/^.{7,15}$/.test(passwordInput)) {
        issueArr.push("Password must be between 7-15 characters.");
    }
    if (!/\d/.test(passwordInput)) {
        issueArr.push("Must contain at least one number.");
    }
    if (!/[a-z]/.test(passwordInput)) {
        issueArr.push("Must contain a lowercase letter.");
    }
    if (!/[A-Z]/.test(passwordInput)) {
        issueArr.push("Must contain an uppercase letter.");
    }
    if (issueArr.length > 0) {
        password.setCustomValidity(issueArr.join("\n"));
        password.style.borderColor = alertRedInput;
    } else {
        password.setCustomValidity("");
        password.style.borderColor = defaultInput;
    }
}
