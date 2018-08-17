module.exports = { 

	handle_safety: function(){
	// if safety concern
		return "If you feel your safety is compromised please call 911 immediately. If you would like to speak to a specialist about ";
	},
	handle_lost_item: function() {
		return "Please contact your driver at DRIVER_PROXY_NUMBER to coordinate pickup.";
	},
	clarify_safety: function() {
		return "wait I need more info. If you feel unsafe please say you feel unsafe.";
	},
	driver_sign_up: function() {
		return "Please visit this website at I_COULDNT_GET_LINKS_WORKING_IN_WHATSAPP";
	},
	contact_support: function() {
		return "Ah, sorry I didn't really understand that. My human support team counterparts can help you though. Give them a call: 650 415 6470";
	},


// function handle_rude(){
// 	// 
// 	console.log("you being rude homie? that's no gucci");
// }

// function handle_lost_item(){
// 	// I lost something
// 	// please contact your driver at SOME_PROXY_NUMBER
// 	// contact driver, return lost item, lost item return fee
// 	let lost_response = "Please contact your driver at DRIVER_PROXY_NUMBER to coordinate pickup.";
// 	console.log(lost_response);
// }

};





