const express = require('express');
const {Wit, log} = require('node-wit');
const path = require('path');
const app = express();

var handle_problems = require('./handle_problems.js');

const client = new Wit({accessToken: 'FJC4JZDUKOJTYXL4Z7XMVBJOFM2NPPQN'});


app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});

app.post('/', function (req, res) {
	console.log("why hello there");
	console.log(req);
	res.send("message recieved");
});

function ask_wit_ai(query) {
	client.message(query, {})
		.then((data) => {
			let string_result = JSON.stringify(data);
			console.log('Yay, got Wit.ai response: ' + string_result);
			// safety first
			if (data.entities.hasOwnProperty('safety')){
				handle_problems.handle_safety();
			} else if (data.entities.hasOwnProperty('lost_things')) {
				handle_problems.handle_lost_item();
			} else if (data.entities.hasOwnProperty('sentiment')) {
				if (data.entities.sentiment.value = "negative") {
					handle_problems.clarify_safety();
				}
			} else {

			}
		})
		.catch(console.error);
}

// INPUT FROM TEXT





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





