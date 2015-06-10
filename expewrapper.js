	var h, viewScript, viewType, jsonDataKick, jsonDataSnare, jsonDataOHH, jsonDataCHH, rhythmIsOn;
	var selectedKick, selectedSnare, selectedOHH, selectedCHH, rhythmIsOn;
	var expResult, taskResult;
	var wasSelected, wasListened, nbSelected, nbListened;
	var expReady, taskReady, taskNo;
	var interval, time, timeWidth, timelineWidth, proportion, pause, start;
	var satisfaction;

	// CONST
	var MAX_TASKTIME = 300;
	
	var sequence = [ // ordered sequence of [view, rhythm pattern]
		[1, 1],
		[1, 2],
		[1, 3],
		[2, 4],
		[1, 5],
		[3, 6],
		[2, 7],
		[1, 8],
		[3, 9]
	];

	var pid = 0;


	var initExp = function() {	
		// init parameters
		taskNo = -1;
		expResult = {
			'pid': pid,
			'seq': sequence,
			'taskResults' : []
		};
		start=false;
		$("#pause-btn > span").text("START ");
		timelineWidth = $("#timeline").css("width");
		proportion = parseInt(timelineWidth)/MAX_TASKTIME;
		console.log("initexp");

		insertParticipant(); // insert participant in DB
	}

		// INIT TASK
	var initTask= function() {
		clearInterval(interval);
		selectedKick={};
		selectedSnare={};
		selectedOHH={};
		selectedCHH={};
		rhythmIsOn=false;
		$('#play-btn').find("p").text("PLAY RHYTHM");
		
		if(window.kickBonsai) { 
	      kickBonsai.destroy();
	    }
	    if(window.snareBonsai) { 
	      snareBonsai.destroy();
	    }
	    if(window.ohhBonsai) { 
	      ohhBonsai.destroy();
	    }
	    if(window.chhBonsai) { 
	      chhBonsai.destroy();
	    }

		taskNo+=1;
		viewType=sequence[taskNo][0];
		console.log("viewtype : "+viewType);
		time = 0;
		wasSelected=[];
		wasListened=[];
		nbSelected=0;
		nbListened=0;
		timeWidth = 0;
		pause = true;
		taskResult = {
		 'view': 0,
		 'pattern': 0,
		 'selection': {
		 	'Kick': "",
		 	'Snare': "",
		 	'OpenHH': "",
		 	'ClosedHH': ""
		 },
		 'time': 0, 
		 'nbSelected':0,
		 'nbListened':0, 
		 'satisfaction':0
		};
		$("#timeline > span").css("background-color", "#34BB62");

	}

	//-------------- TASK TIMING ----------------
	// User controls
	// PAUSE TIMER-- in case of whatever problem during the experiment
	
function addBtnHandlers() {
	$("#pause-btn").click(function() {
	    if(start===true) {  
	      pause = true;
	      console.log("timer pause");
	      alert("Click OK when ready");
	      pause = false;
	      console.log("timer resume");
	    } else { // start===false
	      alert("start?");
	      pause=false;
	      start=true;
	      $("#pause-btn > span").text("PAUSE ");
	      startTask();
	    }
	});

	// DONE WITH CURRENT TASK
	$("#done-btn").click(function() {
		var done= confirm("Sure?");
		if(done===true){
		  //SAVE SET AND GO TO NEXT TASK
		  	var missing="";
			if(!selectedKick.sName) { missing+="kick "};
			if(!selectedSnare.sName) { missing+="snare "};
			if(!selectedOHH.sName) { missing+="open hihat "};
			if(!selectedCHH.sName) { missing+="closed hihat "};
			if(missing!=="") {
				alert("Please select one sample in each category. Missing the "+missing);
			} else {
				StopMidi();
				satisfaction = prompt("How did you like this pattern? \n0=not at all, 1=OK, 2=very much", "0");
		  		saveData();
		  		var delay= setTimeout(function() {
					  			initTask();
					  			startTask();
					  		}, 1000);
		  	}
		  //initTask();
		}
		//else do nothing and continue current task
	});

	var muteType;
    $(".mute-btn").click(function() {
      muteType = $(this).data("sname");
      if($(this).data("mutestate")=="yes") {
        // UNMUTE KICK/SNARE/... in rhythm
        console.log("unmute " + muteType);
        $(this).data("mutestate", "no");
        $(this).closest("h1").css("color", "#fff");
        $(this).text("MUTE").css({"margin-left":"35px"});
        setMuted(muteType, false);
      } else {
        // MUTE KICK/SNARE/... in rhythm
        console.log("mute " + muteType);
        $(this).data("mutestate", "yes");
        $(this).closest("h1").css("color", "#aaa");
        $(this).text("UNMUTE").css({"margin-left":"15px", "color":"#fff"});
        setMuted(muteType, true);
      }
    });

    $("#play-btn").click(function() {
      if(rhythmIsOn===false) {
        $(this).find("p").text("STOP RHYTHM");
        console.log("play button - start");
        StartMidi();
        rhythmIsOn=true;
      }else{
        $(this).find("p").text("PLAY RHYTHM");
        console.log("play button - stop");
        StopMidi();
        rhythmIsOn=false;
      }
    });
}
		
	var startTask = function() {
		interval=setInterval(count, 1000); //set chrono
		loadView(viewType);
		loadDefaultMidiMap();
		loadMidiIdx(sequence[taskNo][1]);

	}


	var saveData = function() {
		taskResult.view=sequence[taskNo][0];
		taskResult.pattern=sequence[taskNo][1];
		taskResult.selection = {'Kick': selectedKick.sName, 'Snare' : selectedSnare.sName, 'OpenHH': selectedOHH.sName, 'ClosedHH': selectedCHH.sName};
		taskResult.time=time;
		taskResult.nbSelected = nbSelected;
		taskResult.nbListened = nbListened;
		taskResult.satisfaction = satisfaction;
		expResult.taskResults[taskNo] = taskResult;
		// save in database
		insertTaskResult(taskResult, expResult.pid);
	}

	var insertParticipant = function() {
		$.ajax({
		  type: 'POST', 
		  url: 'includes/php/insertParticipant.php', 
		  dataType:'json',
		  data: {
		  }, 
		  success: function(data, textStatus, jqXHR) {
		    expResult.pid=data.participant; // save created Participant ID
		    alert('Created participant num. '+ data.participant);
		  },
		  error: function(jqXHR, textStatus, errorThrown) {
		    console.log(textStatus);
		    alert('failed creating participant');
		  }
		});
	}

	var insertTaskResult = function(taskData, participant) {
		$.ajax({
		  type: 'POST', 
		  url: 'includes/php/insertTaskResult.php', 
	  	  dataType:'json',
		  data: {
		    taskdata: taskData,
		    pid: participant
		  }, 
		  success: function(data, textStatus, jqXHR) {
		  },
		  error: function(jqXHR, textStatus, errorThrown) {
		    console.log(textStatus);
		    alert("failed saving taskresult in database")
		  }
		});
	}

	  
	var updateTimeLine = function(time) { //updates chrono display
		timeWidth = time *proportion;
		$("#timeline > span").css("width", timeWidth);
		if(time>=280) {  // change color at 20secs from chrono end
			$("#timeline > span").css("background-color", "#FF6347");
		}
	}

	var count = function () { // increase Time by 1 every second until MAX TASKTIME (300s)
		if(pause!==true){
			if(time<MAX_TASKTIME){
				time=time+1;
				if(time===1 || time%10===0) { // every 10sec update timeline
					updateTimeLine(time);
				}
			} else { // end task
				if(rhythmIsOn===true) {
					StopMidi();
				}
				// check each category has a sample selected
				if(!selectedKick.sName || !selectedSnare.sName || !selectedOHH.sName || !selectedCHH.sName) {
					// if one is missing, restart task
					alert("Restarting task num. "+taskNo);
					taskNo=taskNo-1; // because initTask increments taskNo
				} else {
					// else save and go to next
					saveData();
				}
				initTask();
			}
		}
	}

window.onload = function() {
	var startExp = initExp();
	var startTask = initTask();
	addBtnHandlers();
};


