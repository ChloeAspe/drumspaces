/// ----------- SAMPLEOBJECT CONSTRUCTION -----------------

// constructor
function sampleObject(argName, argX, argY, argType) {
  this.sName = argName;
  this.coordX = argX;
  this.coordY = argY;
  this.sType = argType;
  this.shortName = argName.replace(/.wav/, "").replace(/Kick|Snare|OpenHH|ClosedHH/, "");
}

function getSampleObjects(jsonData,type){
  var list = new Array();
  console.log(jsonData)
    for ( var i in jsonData ){
     list.push(new sampleObject(i,
      (jsonData[i][0]+0.5),
      (jsonData[i][1]+0.5),
      type))
  }
  return list;
}

// constants
var RADIUS = 6;
var canvasDim = new Object();
canvasDim.x = 250
canvasDim.y =500

// VIEWTYPE : changes between the 3 tasks, random order
var viewType= 2; // 1-list, 2-spacerandom, 3-spaceorganized

window.onload = function(){
  //get divs where we will draw
  var kickCanvas = document.getElementById("kick-canvas");
  var snareCanvas = document.getElementById("snare-canvas");
  var ohhCanvas = document.getElementById("ohh-canvas");
  var chhCanvas = document.getElementById("chh-canvas");
  var h;
  var viewScript = '';

  //-------------- TASK TIMING ----------------

  // User controls
  // PAUSE TIMER-- in case of whatever problem during the experiment
  $("#pause-btn").click(function() {
    if(pause!=true) {  
      pause = true;
      console.log("timer pause");
      alert("Click OK when ready");
      pause = false;
      console.log("timer resume");
    } else {
      alert("start?");
      pause=false;
      start=true;
      $("#pause-btn > span").text("PAUSE ");
      loadView();
    }
  });

  // DONE WITH CURRENT TASK
  $("#done-btn").click(function() {
    var done= confirm("Sure?");
    if(done==true){
      //SAVE SET AND GO TO NEXT TASK
      clearInterval(interval);
      /*viewType=2;
      start=false;
      pause=true;
      $("#pause-btn > span").text("START ");
      time=0;
      var interval=setInterval(count, 10000);*/
    }
    //else do nothing and continue current task
  });

// TASK CHRONOMETER
  var time=0;
  var pause = true;
  var start = false;
  var timeWidth=0;
  var timelineWidth = $("#timeline").css("width");
  var proportion = parseInt(timelineWidth)/300;
  
  function updateTimeLine() { //updates chrono display
    timeWidth = time *proportion;
    $("#timeline > span").css("width", timeWidth);
    if(time>=280) {  // change color at 20secs from chrono end
      $("#timeline > span").css("background-color", "FF6347");
      if(time==300){
      //SAVE SET AND GO TO NEXT TASK
      }
    }
  }

  function count() { // increase Time by 10 every 10secs until 300secs
    if(pause!=true){
      if(time<300){
        time=time+10;
        updateTimeLine();
      } else {
        clearInterval(interval);
      }
    }
  }

  var interval=setInterval(count, 10000); //set chrono

  //-------------- END TASK TIMING ----------------


  // ------------- LOAD VIEW FCT ------------------
  // (view is only loaded when user clicks START)
  function loadView() {
    switch(viewType) {
      case 1: 
        viewScript='bonsaicodeList.js';
        h=14000;
        $(".drumspace").addClass("listview");
        $(".mute-btn").css("display", "inline");
        console.log("listview");
        break;
      case 2:
        viewScript='bonsaicode.js';
        h=canvasDim.x;
        $(".drumspace").removeClass("listview");
        $(".mute-btn").css("display", "none");
        console.log("spacerand view");
        break;
      case 3: 
        viewScript='bonsaicode.js';
        h=canvasDim.x;
        console.log("spaceorg view");
        break;
    }

    // draw the sample spaces
    window.kickBonsai = bonsai.run(kickCanvas, {
      url: viewScript,
      height: h,
      width: canvasDim.y,
      sampleList: getSampleObjects(Alphabetic_KickPos,"Kick"),
      radius: RADIUS
    });

    window.snareBonsai = bonsai.run(snareCanvas, {
      url: viewScript,
      height: h,
      width: canvasDim.y,
      sampleList: getSampleObjects(Alphabetic_SnarePos,"Snare"),
      radius: RADIUS
    });

    window.ohhBonsai = bonsai.run(ohhCanvas, {
      url: viewScript,
      height: h,
      width: canvasDim.y,
      sampleList: getSampleObjects(Alphabetic_OpenHHPos,"OpenHH"),
      radius: RADIUS
    });

    window.chhBonsai = bonsai.run(chhCanvas, {
      url: viewScript,
      height: h,
      width: canvasDim.y,
      sampleList: getSampleObjects(Alphabetic_ClosedHHPos,"ClosedHH"),
      radius: RADIUS
    });

    // handle interface messages-- from the bonsaijs runner context
    // the OSC msgs will be sent from here
    kickBonsai.on('load', function() {
      kickBonsai.on('message:addToRhythm', function(data) {
        console.log("add to rhythm : "+ data.sName);
        setMidiMap("Kick",data.sName);

      }).on('message:soloPlay',function(data) {
        playOne("Kick",data.sName); 
      }).on('message:rhythmMute',function(data) {
        setMuted("Kick",true);
        // console.log("rhyth mute : "+ data.sName);
      }).on('message:rhythmUnmute',function(data) {
        setMuted("Kick",false);
        // console.log("rhyth unmute : "+ data.sName);
      // }).on('message:rhythmStop',function(data) {
        // console.log("rhythm stop : "+ data.sName);
      });
    });

    snareBonsai.on('load', function() {
      snareBonsai.on('message:addToRhythm', function(data) {
        console.log("add to rhythm : "+ data.sName);
        setMidiMap("Snare",data.sName);
      }).on('message:soloPlay',function(data) {
        playOne("Snare",data.sName); 
      }).on('message:rhythmMute',function(data) {
        setMuted("Snare",true);
        // console.log("rhyth mute : "+ data.sName);
      }).on('message:rhythmUnmute',function(data) {
        setMuted("Snare",false);
        // console.log("rhyth unmute : "+ data.sName);
      // }).on('message:rhythmStop',function(data) {
        // console.log("rhythm stop : "+ data.sName);
      });
    });

    ohhBonsai.on('load', function() {
      ohhBonsai.on('message:addToRhythm', function(data) {
        setMidiMap("OpenHH",data.sName);
        console.log("add to rhythm : "+ data.sName);
      }).on('message:soloPlay',function(data) {
        playOne("OpenHH",data.sName); 
      }).on('message:rhythmMute',function(data) {
        setMuted("OpenHH",true);
        // console.log("rhyth mute : "+ data.sName);
      }).on('message:rhythmUnmute',function(data) {
        setMuted("OpenHH",false);
        // console.log("rhyth unmute : "+ data.sName);
      // }).on('message:rhythmStop',function(data) {
        // console.log("rhythm stop : "+ data.sName);
      });
    });

    chhBonsai.on('load', function() {
      chhBonsai.on('message:addToRhythm', function(data) {
        console.log("add to rhythm : "+ data.sName);
        setMidiMap("ClosedHH",data.sName);
      }).on('message:soloPlay',function(data) {
        playOne("ClosedHH",data.sName); 
      }).on('message:rhythmMute',function(data) {
        setMuted("ClosedHH",true);
        // console.log("rhyth mute : "+ data.sName);
      }).on('message:rhythmUnmute',function(data) {
        setMuted("ClosedHH",false);
        // console.log("rhyth unmute : "+ data.sName);
      // }).on('message:rhythmStop',function(data) {
        // console.log("rhythm stop : "+ data.sName);
      });
    });

    $("#PlayBtn").click(function() {
      if($(this).find("p").text() == "PLAY RHYTHM") {
        $(this).find("p").text("STOP RHYTHM");
        StartMidi();
      }else{
        $(this).find("p").text("PLAY RHYTHM");
        StopMidi();
      }
    });

    var muteType;
    $(".mute-btn").click(function() {
      muteType = $(this).attr("alt");
      if($(this).attr("src")=="img/mutebtn.svg") {
        // UNMUTE KICK/SNARE/... in rhythm
        console.log("unmute " + muteType);
        $(this).attr("src", "img/unmute.svg");
        window[muteType+'Bonsai'].sendMessage('mute', false);
      } else {
        // MUTE KICK/SNARE/... in rhythm
        console.log("mute " + muteType);
        $(this).attr("src", "img/mutebtn.svg");
        window[muteType+'Bonsai'].sendMessage('mute', true);
      }
    });
  };

  // ------------- END LOADVIEW FCT ----------------

} // end window.onload
