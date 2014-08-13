var Form = function(socket) {
	this.socket = socket;
}

Form.prototype.sendMessage = function(name, email, message) {
	var message = {
		name : name,
		email : email,
		message : message
	};
	this.socket.emit('formSubmit', message);
};