import axios from "axios";

export default {
	searchGames: function() {
		return axios.get("/games").then((games) => {
			return games;
		});
	},

	createGame: function(gameName) {
		return axios.post("/games/create", gameName).then((games) => {
			return games;
		});
	},

	createCharacter: function(charInfo) {
		return axios.post("/characters/create", charInfo).then((data) => {
			return data;
		});
	},

	createMonster: function(charInfo) {
		console.log("In API CreateMunsta");
		return axios.post("/characters/createMonster", charInfo).then((data) => {
			console.log("Monster API data: ", data);
			return data;
		});
	},

	createBoard: function(boardInfo) {
		return axios.post("/boards/create", boardInfo).then((boards) => {
			return boards;
		});
	},

	getUserCharacters: function() {
		return axios.post("/characters/user/").then((characters) => {
			return characters;
		});
	},

	getAllCharacters: function() {
		return axios.get("/characters/all/").then((characters) => {
			return characters;
		});
	},

	getGames: function() {
		return axios.get("/games/all").then((games) => {
			return games;
		});
	},

	createUser: function(data) {
		return axios.post("/signup", data);
	},

	login: function(data) {
		return axios.post("/signin", data);
	},

	userLoggedIn: function() {
		return axios.get("/auth/userid").then((user) => {
			return user;
		}).catch(err => console.log("Error in userLoggedIn: ",err));
	},

	logout: function() {
		return axios.get("/auth/logout").then((res) => console.log("Logout Response: ",res)).catch(err => console.log("Logout Error: ",err));
	},

	getBoardCharacters: function(gameID) {
		return axios.post("/boards/characters", gameID).then((characters) => {
			return characters;
		});
	},

	updateCharacter: function(charInfo) {
		return axios.post("/characters/update", charInfo).then((characters) => {
			return characters;
		});
	},

	updateGame: function(gameInfo) {
		return axios.post("/games/update", gameInfo).then((games) => {
			return games;
		});
	},

	updateGameLoseChar: function(charInfo) {
		return axios.post("/games/resetturn", charInfo).then((games) => {
			return games;
		});
	},

	updateBoard: function(boardInfo) {
		return axios.post("/boards/update", boardInfo).then((boards) => {
			return boards;
		});
	},

	deleteChar: function(charInfo) {
		return axios.post("/characters/delete", charInfo).then((characters) => {
			return characters;
		});
	},

	deleteCharFromBoard: function(charInfo) {
		return axios.post("/boards/deletechar", charInfo).then((boards) => {
			return boards;
		});
	},

	deleteGame: function(gameID) {
		return axios.post("/games/delete", gameID).then((games) => {
			return games;
		});
	},

	deleteBoard: function(gameID) {
		return axios.post("/boards/delete", gameID).then((games) => {
			return games;
		});
	}
};