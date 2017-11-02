import openSocket from 'socket.io-client';
// comment this out for local
// const SOCKETS_URL = 'https://create-react-express-sockets.herokuapp.com/'
const SOCKETS_URL = "http://localhost:3001/"
const socket = openSocket(SOCKETS_URL);

const sockets = {
    listenForMessage: (callback) => {
        socket.on('message', (data) => {
            callback(data);
        });
    },

    sendMessage: (data) => {
        socket.emit('message', data);
	},
	

    listenForGameList: (callback) => {
        socket.on("gameList", (data) => {
            callback(data);
        });
    },
    
    sendGameList: (data) => {
		socket.emit("gameList", data);
    },

    listenForBoardUpdate: (callback) => {
        socket.on("charArray", (data) => {
            callback(data);
        });
    },

    sendBoardUpdate: (data) => {
        socket.emit("charArray", data);
    }
    

};
export { sockets };