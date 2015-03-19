document.picked_sticks = 0;
document.turn = "";
var turn_para = $("#turn_p") ;
document.sticks_picked_by_user = 0;
document.help_string = " PICK ANY 4 : \
This is a two player game. Each player \n\
picks up to 1-4 sticks on their turn. \n\
The player who picks the last stick \n\
looses. You will play against the \n\
computer ."; 
document.you_loose_string = "Unfortunately, you chose the last stick this time. \n\
So, you loose. Sharpen your thinking skills and please try again.\n\
Best of luck for the next time. : )";
document.game_finish = false;
document.reloading = false;

// help alert box
function help_alert() {
	window.alert(document.help_string);
}

function you_lost_alert() {
	window.alert(document.you_loose_string);
}

function reload_game() {
	location.reload();

}




// CPU's logic
function cpu_plays() {

	var cpu_will_pick = 5 - document.sticks_picked_by_user;
	console.log("In cpu_plays() : ");
	console.log("The cpu will pick " + cpu_will_pick + " sticks ..." ); 
	console.log("here ps = "+document.picked_sticks);

	// wait superficially
	$("#cpu_thinks").text("Thinking ...");
	window.setTimeout(
		function() {
			$("#cpu_thinks").text("");
			if ( ( 21 - document.picked_sticks ) >= cpu_will_pick )  {	
				
				console.log("In 21 - ps if block");
				for(;cpu_will_pick != 0 ; cpu_will_pick-- ) {
					
					var first_remaining_stick = $(".stick:nth-of-type(2)");
					$("#cpu_stick_store").prepend(first_remaining_stick);
					first_remaining_stick.removeClass("stick");
		    		first_remaining_stick.addClass("picked_stick");
		    		document.picked_sticks += 1;
				}

			} else {
				
				document.picked_sticks += (21 - document.picked_sticks); // basically document.picked_sticks = 21
				// select all remaining
				console.log("In the 21 - ps else block");
				$('.stick').each(
					function(i, obj) {
		    			$("#cpu_stick_store").prepend(obj);
		    			obj.removeClass("stick");
		    			obj.addClass("picked_stick");
					}
				);

			}	
			console.log("The cpu has picked all it's sticks ...");
			console.log("ps = "+document.picked_sticks);
			document.turn = "user";
			document.sticks_picked_by_user = 0;
			$("#buzzer").css("background-color","#3232ff");
			turn_para.text("( your turn )");
			$("#status_p").text("It's your turn, pick up to 4 sticks and click on the buzzer when done");
			document.sticks_picked_by_user = 0;
		} ,

		2000		// waits for 2 seconds and then executes the function

	);

}


$(document).ready(
	function() {
		$("#turn_p").hide();
		// hide the start button when clicked
		$("#start_btn").click(
				function() {
					$(this).hide("slow");
					turn_para.text("( your turn )") ;
					turn_para.show();
					document.picked_sticks = 0;
					document.sticks_picked_by_user = 0;
					$("#buzzer").css("background-color","#3232ff");
					$("#status_p").text("It's your turn, pick up to 4 sticks and click on the buzzer when done");
					document.turn = "user";
					$("#help_button").hide();
					$("#user_stick_store").animate({"height":"+=4em"},"slow");
					$("#cpu_stick_store").animate({"height":"+=4em"},"slow");
				}
			);
		$("#buzzer").click(
				function() {
					// set the buzzer clicked var
					if (document.game_finish === true) {
						console.log("In true");
						reload_game();
						document.reloading = true ;
					}
					if ( document.turn === "" ) 
						return ;
					else if ( document.turn === "user" && document.reloading !== true ) {
						if (document.sticks_picked_by_user !== 0 ) {
							$(this).css("background-color","#CF3B3B");
							turn_para.text(" ( CPU's turn )");
							document.turn = "cpu";
							cpu_plays();
							$("#status_p").text("It's the CPU's turn... just wait for it finish.");
							console.log("in turn = user block");
						} else {
							$("#status_p").text("pick atleast 1 stick");
							console.log("Action Not Allowed :- At-least one stick has to be picked");
						}
					} else if ( document.turn === "cpu"){
						
						console.log("Action Not Allowed : - Not the user's turn");
					}
				}

			);

		// now when a stick is clicked , it can be either nobody's turn or the user's turn
		$(".stick").click(
				function() {
					if (document.turn === "user") {
						
						if (document.sticks_picked_by_user != 4) {
							

							$("#user_stick_store").prepend($(this));
							document.sticks_picked_by_user += 1;
							document.picked_sticks += 1;
							console.log("p_s =" + document.picked_sticks);
							console.log("s_p_b_u ="+ document.sticks_picked_by_user);
							// this is no longer a selectable stick
							$(this).removeClass("stick");
							$(this).addClass("picked_stick")
							if (document.picked_sticks === 21 ) {
								$("#status_p").text("You chose last. Hence you loose. Better luck next time. \
									Hit REPLAY or refresh the page to replay.");
								you_lost_alert();
								$("#buzz_p").html("REPLAY");
								$("#turn_p").html("");
								$("#buzzer").css("background-color","#329932");
								document.game_finish = true;
							}	
						
						} else {
							
							console.log("Action Not Allowed : - Maximum 4 sticks per turn.");
						}

					} else {

						console.log("Action Not Allowed : - Not your turn");
					}


					
				}

			);
		$("#help_button").hover(
			function() {
				$(this).css("color","white");
				$(this).css("background-color","#983298");

			},
			function() {
				$(this).css("color","#983298");
				$(this).css("background-color","white");

			}
			);



	}
);			



