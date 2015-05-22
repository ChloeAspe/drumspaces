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
  console.log(jsonData);
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
  var jsonDataKick = KickPos;
  var jsonDataSnare = SnarePos;
  var jsonDataOHH = OpenHHPos;
  var jsonDataCHH = ClosedHHPos;
  var rhythmIsOn = false;
  var selectedKick, selectedSnare, selectedOHH, selectedCHH;

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
        console.log("listview");
        break;
      case 2:
        viewScript='bonsaicode.js';
        h=canvasDim.x;
        jsonDataKick = Alphabetic_KickPos;
        jsonDataSnare = Alphabetic_SnarePos;
        jsonDataOHH = Alphabetic_OpenHHPos;
        jsonDataCHH = Alphabetic_ClosedHHPos;
        $(".drumspace").removeClass("listview");
        console.log("spacerand view");
        break;
      case 3: 
        viewScript='bonsaicode.js';
        h=canvasDim.x;
        $(".drumspace").removeClass("listview");
        console.log("spaceorg view");
        break;
    }

    // draw the sample spaces
    window.kickBonsai = bonsai.run(kickCanvas, {
      url: viewScript,
      height: h,
      width: canvasDim.y,
      sampleList: getSampleObjects(jsonDataKick,"Kick"),
      radius: RADIUS
    });

    window.snareBonsai = bonsai.run(snareCanvas, {
      url: viewScript,
      height: h,
      width: canvasDim.y,
      sampleList: getSampleObjects(jsonDataSnare,"Snare"),
      radius: RADIUS
    });

    window.ohhBonsai = bonsai.run(ohhCanvas, {
      url: viewScript,
      height: h,
      width: canvasDim.y,
      sampleList: getSampleObjects(jsonDataOHH,"OpenHH"),
      radius: RADIUS
    });

    window.chhBonsai = bonsai.run(chhCanvas, {
      url: viewScript,
      height: h,
      width: canvasDim.y,
      sampleList: getSampleObjects(jsonDataCHH,"ClosedHH"),
      radius: RADIUS
    });

    // handle interface messages-- from the bonsaijs runner context
    // the OSC msgs will be sent from here
    kickBonsai.on('load', function() {
      kickBonsai.on('message:selectSample', function(data) {
        console.log("add to rhythm : "+ data.sName);
        setMidiMap("Kick",data.sName);
        selectedKick = data;
      }).on('message:mouseOver',function(data) {
        if(rhythmIsOn == true) { // if rhythm is On, replace selected CHH
          setMidiMap("Kick",data.sName);
          console.log("play in rhythm : "+ data.sName);
        } else { // otherwise just play it once
          playOne("Kick",data.sName); 
          console.log("soloplay : "+ data.sName);
        }
      }).on('message:mouseOut', function(data) {
        if(rhythmIsOn == true) { // if rhythm On, come back to selected CHH
          setMidiMap("Kick", selectedKick.sName);
          console.log("play in rhythm: "+selectedKick.sName)
        }
      }).on('message:rhythmMute',function(data) {
        setMuted("Kick",true);
      }).on('message:rhythmUnmute',function(data) {
        setMuted("Kick",false);
      });
    });

    snareBonsai.on('load', function() {
      snareBonsai.on('message:selectSample', function(data) {
        console.log("add to rhythm : "+ data.sName);
        setMidiMap("Snare",data.sName);
        selectedSnare = data;
      }).on('message:mouseOver',function(data) {
        if(rhythmIsOn == true) { // if rhythm is On, replace selected CHH
          setMidiMap("Snare",data.sName);
          console.log("play in rhythm : "+ data.sName);
        } else { // otherwise just play it once
          playOne("Snare",data.sName); 
          console.log("soloplay : "+ data.sName);
        }
      }).on('message:mouseOut', function(data) {
        if(rhythmIsOn == true) { // if rhythm On, come back to selected CHH
          setMidiMap("Snare", selectedSnare.sName);
          console.log("play in rhythm: "+selectedSnare.sName)
        }
      }).on('message:rhythmMute',function(data) {
        setMuted("Snare",true);
      }).on('message:rhythmUnmute',function(data) {
        setMuted("Snare",false);
      });
    });

    ohhBonsai.on('load', function() {
      ohhBonsai.on('message:selectSample', function(data) {
        setMidiMap("OpenHH",data.sName);
        console.log("add to rhythm : "+ data.sName);
        selectedOHH = data;
      }).on('message:mouseOver',function(data) {
        if(rhythmIsOn == true) { // if rhythm is On, replace selected CHH
          setMidiMap("OpenHH",data.sName);
          console.log("play in rhythm : "+ data.sName);
        } else { // otherwise just play it once
          playOne("OpenHH",data.sName); 
          console.log("soloplay : "+ data.sName);
        }
      }).on('message:mouseOut', function(data) {
        if(rhythmIsOn == true) { // if rhythm On, come back to selected CHH
          setMidiMap("OpenHH", selectedOHH.sName);
          console.log("play in rhythm: "+selectedOHH.sName)
        }
      }).on('message:rhythmMute',function(data) {
        setMuted("OpenHH",true);
      }).on('message:rhythmUnmute',function(data) {
        setMuted("OpenHH",false);
      });
    });

    chhBonsai.on('load', function() {
      chhBonsai.on('message:selectSample', function(data) {
        console.log("add to rhythm : "+ data.sName);
        setMidiMap("ClosedHH",data.sName);
        selectedCHH = data;
      }).on('message:mouseOver', function(data) {
        if(rhythmIsOn == true) { // if rhythm is On, replace selected CHH
          setMidiMap("ClosedHH",data.sName);
        } else { // otherwise just play it once
          playOne("ClosedHH",data.sName); 
        }
      }).on('message:mouseOut', function(data) {
        if(rhythmIsOn == true) { // if rhythm On, come back to selected CHH
          setMidiMap("ClosedHH", selectedCHH.sName);
        }
      }).on('message:rhythmMute',function(data) {
        setMuted("ClosedHH",true);
      }).on('message:rhythmUnmute',function(data) {
        setMuted("ClosedHH",false);
      });
    });

    $("#PlayBtn").click(function() {
      if($(this).find("p").text() == "PLAY RHYTHM") {
        $(this).find("p").text("STOP RHYTHM");
        StartMidi();
        rhythmIsOn=true;
      }else{
        $(this).find("p").text("PLAY RHYTHM");
        StopMidi();
        rhythmIsOn=false;
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
