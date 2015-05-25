	var h, viewScript, viewType, jsonDataKick, jsonDataSnare, jsonDataOHH, jsonDataCHH, rhythmIsOn;
	var selectedKick, selectedSnare, selectedOHH, selectedCHH, rhythmIsOn;
	var expResult, taskResult;
	var wasSelected, wasListened, nbSelected, nbListened;
	var expReady, taskReady, taskNo;
	var interval, time, timeWidth, timelineWidth, proportion, pause, start;

	// CONST
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


	var initExp = function() {	
		// init parameters
		taskNo = -1;
		expResult = {
			'pid': participant,
			'seq': sequence,
			'taskResults' : []
		};
		timelineWidth = $("#timeline").css("width");
		proportion = parseInt(timelineWidth)/MAX_TASKTIME;


		console.log("initexp");
	}

		// INIT TASK
	var initTask= function() {
		clearInterval(interval);
		selectedKick={};
		selectedSnare={};
		selectedOHH={};
		selectedCHH={};
		rhythmIsOn=false;
		
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
		start = false;
		taskResult = {
		 'view': 0,
		 'pattern': 0,
		 'selection': {},
		 'time': 0, 
		 'nbSelected':0,
		 'nbListened':0
		};
		$("#pause-btn > span").text("START ");
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
		  StopMidi();
		  saveData();
		  var delay= setTimeout(initTask, 1000);
		  //initTask();
		}
		//else do nothing and continue current task
	});

	var muteType;
    $(".mute-btn").click(function() {
      muteType = $(this).attr("alt");
      if($(this).attr("src")=="img/mutebtn.svg") {
        // UNMUTE KICK/SNARE/... in rhythm
        console.log("unmute " + muteType);
        $(this).attr("src", "img/unmute.svg");
        setMuted(muteType, false);
        //window[muteType+'Bonsai'].sendMessage('mute', false);
      } else {
        // MUTE KICK/SNARE/... in rhythm
        console.log("mute " + muteType);
        $(this).attr("src", "img/mutebtn.svg");
        setMuted(muteType, true);
        //window[muteType+'Bonsai'].sendMessage('mute', true);
      }
    });

    $("#PlayBtn").click(function() {
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
	}

	function exportToCsv(dataObject, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
	    var JSONData = JSON.stringify(dataObject);
	    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
	    var CSV = '';
	    //Set Report title in first row or line
	    CSV  = ReportTitle +'\r\n\n';

	    /*This condition will generate the Label/Header
	    if (ShowLabel) {
	        var row = "";
	        //This loop will extract the label from 1st index of on array
	        for (var index in arrData[0]) {
	            //Now convert each value to string and comma-seprated
	            row  = index+',';
	        }
	        row = row.slice(0, -1);
	        //append Label row with line break
	        CSV += row +'\r\n';
	    }

	    //1st loop is to extract each row
	    for (var i = 0; i < arrData.length; i  ) {
	        var row = "";
	        //2nd loop will extract each column and convert it in string comma-seprated
	        for (var index in arrData[i]) {
	            row  = '"'+arrData[i][index]+'",';
	        }
	        row.slice(0, row.length - 1);
	        //add a line break after each row
	        CSV  += row  +'\r\n';
	    }*/

	    CSV+=JSONData;
	    console.log(CSV);
	    if (CSV == '') {
	        alert("Invalid data");
	        return;
	    }

	    //Generate a file name
	    var fileName = "MyReport_";
	    //this will remove the blank-spaces from the title and replace it with an underscore
	    fileName  = "Report_"+ ReportTitle.replace(/ /g, "_");

	    //Initialize file format you want csv or xls
	    var uri = 'data:text/csv;charset=utf-8,'+escape(CSV);

	    // Now the little tricky part.
	    // you can use either>> window.open(uri);
	    // but this will not work in some browsers
	    // or you will not get the correct file extension    

	    //this trick will generate a temp <a /> tag
	    var link = document.createElement("a");
	    link.href = uri;

	    //set the visibility hidden so it will not effect on your web-layout
	    link.style = "visibility:hidden";
	    link.download = fileName +".csv";

	    //this part will append the anchor tag and remove it after automatic click
	    document.body.appendChild(link);
	    link.click();
	    document.body.removeChild(link);
	}

	var saveData = function() {
		taskResult.view=sequence[taskNo][0];
		taskResult.pattern=sequence[taskNo][1];
		taskResult.selection = {'Kick': selectedKick.sName, 'Snare' : selectedSnare.sName, 'OpenHH': selectedOHH.sName, 'closedHH': selectedCHH.sName};
		taskResult.time=time;
		taskResult.nbSelected = nbSelected;
		taskResult.nbListened = nbListened;
		console.log(taskResult);
		expResult.taskResults[taskNo] = taskResult;
		console.log(expResult);
		if(taskNo===8) {
			exportToCsv(expResult, expResult.pid, false);
		}
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

window.onload = function() {
	var startExp = initExp();
	var startTask = initTask();
	addBtnHandlers();
};


