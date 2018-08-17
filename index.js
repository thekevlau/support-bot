const express = require('express');
const {Wit, log} = require('node-wit');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


var handle_problems = require('./handle_problems.js');

const client = new Wit({accessToken: 'FJC4JZDUKOJTYXL4Z7XMVBJOFM2NPPQN'});


app.listen((process.env.PORT || 3000), function () {
	console.log('app listening on port ' + process.env.PORT);
});


console.log("we are alive");

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});


const accountSid = 'ACc1b8310d23d8d6d1d231a3fc13d1a31a';
const authToken = '7f5a3ce61a1ea84699171a238574821d';
const twilio_client = require('twilio')(accountSid, authToken);


function ask_wit_ai(query) {
	client.message(query, {})
		.then((data) => {
			let sent_message = "";
			let string_result = JSON.stringify(data);
			console.log('Yay, got Wit.ai response: ' + string_result);
			// safety first
			if (data.entities.hasOwnProperty('safety')){
				sent_message = handle_problems.handle_safety();
			} else if (data.entities.hasOwnProperty('lost_things')) {
				sent_message = handle_problems.handle_lost_item();
			} else if (data.entities.hasOwnProperty('sentiment')) {
				if (data.entities.sentiment.value == "negative") {
					sent_message = handle_problems.clarify_safety();
				}
			} else if (data.entities.hasOwnProperty('new_driver')) {
				sent_message = handle_problems.driver_sign_up();
			} else {
				sent_message = handle_problems.contact_support();
			}

			twilio_client.messages
				.create({
					body: sent_message,
					from: 'whatsapp:+14155238886',
					statusCallback: 'https://help.uber.com/h/88b80350-8701-40c0-8493-9b21189a71ec',
					to: 'whatsapp:+16507853674'
				})
				.then(message => console.log(message.sid))
				.done();
		})
		.catch(console.error);
}

// INPUT FROM TEXT
// whatsapp to the app -->
const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/say_hello', (req, res) => {
	console.log(req.body.Body);
	ask_wit_ai(req.body.Body);
	// const twiml = new MessagingResponse();

	// twiml.message('The Robots are coming! Head for the hills!');

	// res.writeHead(200, {'Content-Type': 'text/xml'});
	// res.end(twiml.toString());
});

// app responds -->



// INPUT FROM STDIN

// Get process.stdin as the standard input object.
// var standard_input = process.stdin;

// // Set input character encoding.
// standard_input.setEncoding('utf-8');

// // Prompt user to input data in console.
// console.log("Hello I am UberBot. Please tell me your problems by inputting text:");

// // When user input data and click enter key.
// standard_input.on('data', function (data) {

// 	// User input exit.
// 	if(data === 'exit\n'){
// 		// Program exit.
// 		console.log("User input complete, program exit.");
// 		process.exit();
// 	} else {
// 		// Process Input
// 		ask_wit_ai(data);

// 	}
// });


// use case
// make a thing that helps define responses to consumer complaints





