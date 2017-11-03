import React, { Component } from 'react';
import TopNav from "../TopNav/TopNav.js";
import API from "../../utils/API.js";
import ReactDOM from 'react-dom';
import logo from '../../Battle-Board.png';
import './LogReg.css';
import {BrowserRouter as Router,Route,Link,Redirect,withRouter} from 'react-router-dom';

class LogReg extends Component{
    state = {
        username: "",
        password: "",
        usernameLog: "",
        passswordLog: "",
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
            username: this.state.usernameLog,
            password: this.state.passwordLog
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
                                <Link style={{ color: '#428bca' }} to="/" onClick={this.handleLogout}>Log Out</Link>
                            </div>
                        </div>
                    </div>
                </div>
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
                    <form action="#" method="POST" className="signupForm" name="signupform">
                    <h2>Log In</h2>
                    <ul className="noBullet" id="login-container">
                        <li>
                        <label for="username"></label>
                        <input type="text" className="inputFields" name="usernameLog" placeholder="Username" value={this.state.usernameLog} onChange={this.handleInputChange} required/>
                        </li>
                        <li>
                        <label for="password"></label>
                        <input type="password" className="inputFields" name="passwordLog" placeholder="Password" value={this.state.passwordLog} onChange={this.handleInputChange} required/>
                        </li>
                        <li id="center-btn">
                        <input type="submit" id="join-btn" name="login" alt="Login" value="Login" onClick={this.handleLogin}/>
                        </li>
                    </ul>
                    </form>
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
