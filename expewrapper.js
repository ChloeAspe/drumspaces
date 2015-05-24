	//lots of global variables
	var h, viewScript, viewType, jsonDataKick, jsonDataSnare, jsonDataOHH, jsonDataCHH, rhythmIsOn;
	var selectedKick, selectedSnare, selectedOHH, selectedCHH, rhythmIsOn;
	var expResult, taskResult;
	var expReady, taskReady, taskNo;
	var interval, time, timeWidth, timelineWidth, proportion, pause, start;

	// ---------------------------------------------
	// ---------------- EXPE SETTINGS --------------
	var MAX_TASKTIME = 300;
	
	var sequence = [ // ordered sequence of [view, rhythm pattern]
		[3, 1],
		[1, 2],
		[1, 3],
		[2, 4],
		[1, 5],
		[3, 6],
		[2, 7],
		[1, 8],
		[3, 9]
	];

	var participant = "PTEST";
	// --------------------------------------------
	// --------------------------------------------


	var initExp = function() {	
	// initialize experiment variables
	// called once on window loaded
		taskNo = -1;
		expResult = {
			'pid': participant,
			'seq': sequence,
			'taskResults' : []
		};
		timelineWidth = $("#timeline").css("width");
		proportion = parseInt(timelineWidth)/MAX_TASKTIME;
	}

	var initTask= function() {
	// initialize task
	// called before starting each task
		clearInterval(interval);
		selectedKick={};
		selectedSnare={};
		selectedOHH={};
		selectedCHH={};
		rhythmIsOn=false;
		
		// destroy previous bonsai movies
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

	    // set view (list/space/space)
		taskNo+=1;
		viewType=sequence[taskNo][0];
		console.log("viewtype : "+viewType);

		// (re)initialize timer
		time = 0;
		timeWidth = 0;
		pause = true;
		start = false;

		// new object for holding task data (also need to save nb of samples that were listened/selected)
		taskResult = {
		 'selection': {},
		 'time': 0
		};

		$("#pause-btn > span").text("START ");
	}

	
	function addBtnHandlers() {
	// add event handlers on global buttons 
	// called once on window loaded
		$("#pause-btn").click(function() {
		    if(start===true) {  // during task --> pause timer
		      pause = true;
		      console.log("timer pause");
		      alert("Click OK when ready");
		      pause = false;
		      console.log("timer resume");
		    } else { // start===false --> start new task
		      alert("Ready to start?");
		      pause=false;
		      start=true;
		      $("#pause-btn > span").text("PAUSE ");
		      startTask();
		    }
		});

		$("#done-btn").click(function() {
			var done= confirm("Sure?");
			if(done===true){
			  //SAVE SET AND GO TO NEXT TASK
			  StopMidi();
			  saveData();
			  initTask();
			}
			//else do nothing and continue current task
		});

		var muteType;
	    $(".mute-btn").click(function() {
	      muteType = $(this).attr("alt");
	      if($(this).attr("src")=="img/mutebtn.svg") { // group is muted, unmute it
	        console.log("unmute " + muteType);
	        $(this).attr("src", "img/unmute.svg");
	        setMuted(muteType, false);
	      } else { // group is not muted, mute it
	        console.log("mute " + muteType);
	        $(this).attr("src", "img/mutebtn.svg");
	        setMuted(muteType, true);
	      }
	    });

	    $("#PlayBtn").click(function() { // toggle PLAY/STOP RHYTHM
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
		loadView(viewType); // load bonsai movies (in index.js)
	}

	var saveData = function() {
	// save task data and put it in expe data
		taskResult.selection = {'Kick': selectedKick.sName, 'Snare' : selectedSnare.sName, 'OpenHH': selectedOHH.sName, 'closedHH': selectedCHH.sName};
		taskResult.time=time;
		console.log(taskResult);
		expResult.taskResults[taskNo] = taskResult;
		console.log(expResult);
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
				saveData();
				initTask();
			}
		}
	}

// ON LOAD INITIALIZE EXP AND FIRST TASK + ADD EVENT HANDLERS ON start/pause, done, play rhythm, mute
window.onload = function() {
	var startExp = initExp();
	var startTask = initTask();
	addBtnHandlers();
};


