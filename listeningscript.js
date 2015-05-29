var setlist=[];
var object1={"view":3,"pattern":1,"selection":{"Kick":"Kick Mendon 1.wav","Snare":"Snare Sahara 2.wav","OpenHH":"OpenHH Porter 3.wav","ClosedHH":"ClosedHH Runaround 1.wav"},"time":10,"nbSelected":4,"nbListened":25}
var object2={"view":1,"pattern":2,"selection":{"Kick":"Kick Airbase 2.wav","Snare":"Snare Backwoods 2.wav","OpenHH":"OpenHH 909.wav","ClosedHH":"ClosedHH 909X 2.wav"},"time":14,"nbSelected":4,"nbListened":8}
var object3={"view":1,"pattern":3,"selection":{"Kick":"Kick Alley 1.wav","Snare":"Snare Baller 1.wav","OpenHH":"OpenHH 909 3.wav","ClosedHH":"ClosedHH 808.wav"},"time":14,"nbSelected":4,"nbListened":12}
setlist=[object1, object2, object3];
var currentPos=0;
var currentSet={};
var currentScore=0;
var setNb=setlist.length;
var playing=false;
var expeResult={};

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


	$(".score-item").hover(function() {
		if(currentScore===0) {
			colorScore(this, $(this).text());
		}
	}).mouseout(function() {
		if(currentScore===0) {
			colorScore(this, 15);
		}
	}).click(function() {
		if(currentScore!=$(this).text()) {
			currentScore=$(this).text();
			expeResult.setlist[currentPos].score=currentScore;
			colorScore(this, currentScore);
		}
	});

	$("#form-btn").click(function() {
		var name= $("#name").val();
		var email = $("#email").val();
		var pid = $("#pid").val();
		initExpe(name, email, pid);

	});
}

function initExpe(name, email, pid) { // whatever info is needed from the user
	expeResult = {
		'participant' : 
			{'name': name,
			'email': email,
			'pid': pid },
		'setlist' : setlist
	};
	closeModal();
}

function displayPos(pos) {
	$('#current-pos').text(pos);
}

function nav(list, direction) { // direction: 1=next, -1=previous
	currentPos+=direction;
	currentSet=list[currentPos].selection;
	console.log(currentSet);
	displayPos(currentPos+1);
	setTheMidi();
}


function colorScore(item, score) { 
	var color;
	$(".score-item").css({"background-color": "#333"});
	switch(score) {
		case '1': color="#de4b2a"; break;
		case '2': color="#ea6834"; break;
		case '3': color="#feaf3f"; break;
		case '4': color="#fedd34"; break;
		case '5': color="#f5f337"; break;
		case '6': color="#baf134"; break;
		case '7': color="#88ea34"; break;
		default : color="#333"; break;
	}
	$(item).css({"background-color": color});
}

function clearScene() {
	currentScore=0;
	$(".score-item").css({"background-color": "#333"});
}

function setTheMidi() {
	setMidiMap("Kick", currentSet.Kick);
	setMidiMap("Snare", currentSet.Snare);
	setMidiMap("OpenHH", currentSet.OpenHH);
	setMidiMap("ClosedHH", currentSet.ClosedHH);
}

function helloUser() { // open user form
	$("#backdrop").css("display", "block");
	$("#dialog-form").css("display", "block");  
}

function closeModal () { // close user form
	$("#backdrop").css("display", "none");
	$("#dialog-form").css("display", "none");
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
	$('#total-pos').text("/"+setNb);
	addBtnHandlers();
	helloUser();
	nav(setlist, 0);
};
