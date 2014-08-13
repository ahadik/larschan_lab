var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'alexander_hadik@brown.edu',
		pass: 'youdeserveahadik'
	}
});

exports.listen = function(server, socketio){
	//piggyback new Socket.io server on HTTP server passed as function argument
	io = socketio.listen(server);
	
	io.set('log level', 1);
	//define how a new connection is handled
	io.sockets.on('connection', function(socket) {
		handleFormBroadcasting(socket);
	});
};

exports.report = function(reportResults){
	var results = handleFormRequest(reportResults);
	
}

//given a socket
function handleFormBroadcasting(socket){
	//broadcast the message of the socket
	socket.on('formSubmit', function (message) {
		
		var mailOptions = {};
		mailOptions["from"] = message.name+' <'+message.email+'>';
		mailOptions["to"] = 'alexander_hadik@brown.edu',
		mailOptions["subject"] = 'New Web Form Submission',
		mailOptions["text"] = message.message,
		mailOptions["html"] = message.message
		
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				console.log(error);
			}else{
				socket.emit("formSuccess", {});
			}
		});
	});
}

function handleFormRequest(reportResults){
	MongoClient.connect(process.env.MONGOHQ_DB, function(err, db) {
		var collection = db.collection('registrations');
		collection.find({}).toArray(function(err,docs){
			if (err){
				return console.error(err);
			}
			reportResults(docs);
		});
	});
}