var setlist=[];
var currentPos=0;
var currentSet={};
var setNb;
var currentScore=0;
var currentTID = 0; // id of taskresult being evaluated 
var playing=false;
var evalResult={};
var evaluatorID=0;

function addBtnHandlers() {
	$("#l-play-btn").click(function(){
		if(playing===false) {
			StartMidi();
			playing=true;
			$(this).find("img").attr("src", "img/pauseicon.svg");
		} else {
			StopMidi();
			playing=false;
			$(this).find("img").attr("src", "img/playicon.svg");
		}
	});


	$("#l-next-btn").click(function() {
		if(currentScore!=0) {
			if(currentPos<setNb-1) {
				nav(setlist, 1);
				clearScene();
			} else {
				thankYou();
			}
		} else {
			alert("waittttt you didn't grade this one");
		}
	});

	$("#form-btn").click(function() { // "START" btn (participant form)
		closeModal();
		recordEvaluator();
	})

	
	$(".score-item").hover(function() {
		if(currentScore===0) {
			colorScore(this, $(this).text());
		}
	}).mouseout(function() {
		if(currentScore===0) {
			colorScore(this, 15);
		}
	}).click(function() {
		if(currentScore!=$(this).data("note")) {
			currentScore=$(this).data("note");
			evalResult.setlist[currentPos].score=currentScore;
			recordScore();
		}
	});

}

function initEval(name, email, pid) { // save whatever info is needed from the user
	evalResult = {
		'participant' : 
			{'name': name,
			'email': email,
			'pid': pid },
		'setlist' : setlist
	};
}

function displayPos(pos) {
	$('#current-pos').text(pos);
}

function nav(list, direction) { // direction: 1=next, -1=previous
	currentPos+=direction;
	currentSet=list[currentPos];
	console.log(currentSet);
	currentTID=currentSet.TID; // database ID of the taskresult being evaluated
	displayPos(currentPos+1);
	setTheMidi();
}


function colorScore(item, score) { 
	var color;
	$(".score-item").css({"background-color": "#000"});
	switch(score) {
		case '1': color="#de4b2a"; break;
		case '2': color="#ea6834"; break;
		case '3': color="#feaf3f"; break;
		case '4': color="#fedd34"; break;
		case '5': color="#f5f337"; break;
		case '6': color="#baf134"; break;
		case '7': color="#88ea34"; break;
		default : color="#000"; break;
	}
	$(item).css({"background-color": color});
}

function clearScene() {// reinitialize score at each new listening
	currentScore=0;
	$(".score-item").css({"background-color": "#000"});
}

function setTheMidi() {
	setMidiMap("Kick", currentSet.KICK);
	setMidiMap("Snare", currentSet.SNARE);
	setMidiMap("OpenHH", currentSet.OPENHH);
	setMidiMap("ClosedHH", currentSet.CLOSEDHH);
}

function helloUser() { // open user form
	$("#backdrop").css("display", "block");
}

function closeModal () { // close user form
	$("#backdrop").css("display", "none");
	$("#dialog-form").css("display", "none");
}

function recordEvaluator() { // insert new evaluator in database
	// get values from form
	var evName = $("#ev-name").val();
	var evEmail = $("#ev-email").val();

	$.ajax({
	  type: 'POST', 
	  url: 'includes/php/insertEvaluator.php', 
	  dataType:'json',
	  data: {
	    name: evName,
	    email: evEmail
	  }, 
	  success: function(data, textStatus, jqXHR) {

	    setlist=data.setList; // get the list of sets to be evaluated by this evaluator
	    setNb=setlist.length; 
		$('#total-pos').text("/"+setNb);

		evaluatorID = data.evId; // get evaluator ID in database
	    initEval(evName, evEmail, evaluatorID); // start evaluation
	    nav(setlist, 0);

	  },
	  error: function(jqXHR, textStatus, errorThrown) {
	    console.log(textStatus);
	    alert("failed evaluator creation in DB");
	  }
	});
}

function recordScore() { // record given score in database (evalresults)
	$.ajax({
	  type: 'POST', 
	  url: 'includes/php/insertScore.php', 
	  //dataType:'json',
	  data: {
	  	score: currentScore,
	    eid: evaluatorID,
	    tid: currentTID
	  }, 
	  success: function(data, textStatus, jqXHR) {
	  },
	  error: function(jqXHR, textStatus, errorThrown) {
	    alert("SCORE FAIL");
	    console.log(textStatus);
	  }
	});
}

function thankYou() {
	StopMidi();
	$(".btn-box").text("");
	$(".score").text("");
	$(".inter").find("#pos").text("Thank you")
	.css({"font-size": "80px", 
		"color": "#fff"});
}

window.onload = function() {
	$('#current-pos').text(1);
	addBtnHandlers();
	helloUser();
};


