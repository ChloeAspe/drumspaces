

// SAMPLEOBJECT CONSTRUCTOR
function sampleObject(argName, argX, argY, argType) {
	this.sName = argName;
	this.coordX = argX;
	this.coordY = argY;
	this.sType = argType;
  this.shortName = argName.replace(/.wav/, "").replace(/Kick|Snare|OpenHH|ClosedHH/, "");
}

//useless
sampleObject.prototype.isHovered= false;
sampleObject.prototype.isSelected= false;
//global. useless
sampleObject.selectedSample = '';

var sampleObjects = {}
function getSampleObjects(jsonData,type){
  var list = new Array();
    for ( var i in jsonData ){
     list.push(new sampleObject(i,
      (jsonData[i][0]+0.5),
      (jsonData[i][1]+0.5),
      type))
  }
  return list;

}


var RADIUS = 6;
var canvasDim = new Object();
canvasDim.x = 250
canvasDim.y =500


window.onload = function(){
  //get divs where we will draw
  var kickCanvas = document.getElementById("kick-canvas");
  var snareCanvas = document.getElementById("snare-canvas");
  var ohhCanvas = document.getElementById("ohh-canvas");
  var chhCanvas = document.getElementById("chh-canvas");
  var w = kickCanvas.width; // (all kick,snare,hh canvas have same dimensions-- as defined in .drumspace css)
  var h = kickCanvas.height;

  // draw the sample spaces
  var kickBonsai = bonsai.run(kickCanvas, {
    url: 'bonsaicode.js',
    height: canvasDim.x,
    width: canvasDim.y,
    sampleList: getSampleObjects(KickPos,"Kick"),
    radius: RADIUS
  });

  var snareBonsai = bonsai.run(snareCanvas, {
    url: 'bonsaicode.js',
    height: canvasDim.x,
    width: canvasDim.y,
    sampleList: getSampleObjects(SnarePos,"Snare"),
    radius: RADIUS
  });

  var ohhBonsai = bonsai.run(ohhCanvas, {
    url: 'bonsaicode.js',
    height: canvasDim.x,
    width: canvasDim.y,
    sampleList: getSampleObjects(OpenHHPos,"OpenHH"),
    radius: RADIUS
  });

  var chhBonsai = bonsai.run(chhCanvas, {
    url: 'bonsaicode.js',
    height: canvasDim.x,
    width: canvasDim.y,
    sampleList: getSampleObjects(ClosedHHPos,"ClosedHH"),
    radius: RADIUS
  });

  // handle interface messages-- from the bonsaijs runner context
  // the OSC msgs will be sent from here
  kickBonsai.on('load', function() {
    kickBonsai.on('message:rhythmPlay', function(data) {
      console.log("rhythm play : "+ data.sName);
      setMidiMap("Kick",data.sName);

    }).on('message:soloPlay',function(data) {
      playOne("Kick",data.sName); 
    }).on('message:rhythmMute',function(data) {
      // console.log("rhyth mute : "+ data.sName);
    }).on('message:rhythmUnmute',function(data) {
      // console.log("rhyth unmute : "+ data.sName);
    // }).on('message:rhythmStop',function(data) {
      // console.log("rhythm stop : "+ data.sName);
    });
  });

  snareBonsai.on('load', function() {
    snareBonsai.on('message:rhythmPlay', function(data) {
      console.log("rhythm play : "+ data.sName);
      setMidiMap("Snare",data.sName);
    }).on('message:soloPlay',function(data) {
      playOne("Snare",data.sName); 
    }).on('message:rhythmMute',function(data) {
      // console.log("rhyth mute : "+ data.sName);
    }).on('message:rhythmUnmute',function(data) {
      // console.log("rhyth unmute : "+ data.sName);
    // }).on('message:rhythmStop',function(data) {
      // console.log("rhythm stop : "+ data.sName);
    });
  });

  ohhBonsai.on('load', function() {
    ohhBonsai.on('message:rhythmPlay', function(data) {
      setMidiMap("OpenHH",data.sName);
      console.log("rhythm play : "+ data.sName);
    }).on('message:soloPlay',function(data) {
      playOne("OpenHH",data.sName); 
    }).on('message:rhythmMute',function(data) {
      // console.log("rhyth mute : "+ data.sName);
    }).on('message:rhythmUnmute',function(data) {
      // console.log("rhyth unmute : "+ data.sName);
    // }).on('message:rhythmStop',function(data) {
      // console.log("rhythm stop : "+ data.sName);
    });
  });

  chhBonsai.on('load', function() {
    chhBonsai.on('message:rhythmPlay', function(data) {
      console.log("rhythm play : "+ data.sName);
      setMidiMap("ClosedHH",data.sName);
    }).on('message:soloPlay',function(data) {
      playOne("ClosedHH",data.sName); 
    }).on('message:rhythmMute',function(data) {
      // console.log("rhyth mute : "+ data.sName);
    }).on('message:rhythmUnmute',function(data) {
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


//TASK TIMING

  // TASK CHRONOMETER
  var time=0;
  var pause = false;
  var timeWidth=0;
  var timelineWidth = $("#timeline").css("width");
  var proportion = parseInt(timelineWidth)/300;
  function updateTimeLine() {
    if(time>=280) {
      $("#timeline > span").css("background-color", "tomato");
      if(time==300){
      //SAVE SET AND GO TO NEXT TASK
      }
    }
    timeWidth = time *proportion;
    $("#timeline > span").css("width", timeWidth);
    console.log(timeWidth);
  }
  function count() {
    if(pause!=true){
      if(time<300){
        time=time+10;
        updateTimeLine();
      } else {
        clearInterval(interval);
      }
    }
  }
  var interval=setInterval(count, 10000);

  //PAUSE TIMER-- in case of whatever problem during the experiment
  $("#pause-btn").click(function() {
    pause = true;
    console.log("timer pause");
    alert("Click OK when ready");
    pause = false;
    console.log("timer resume");
  })

  //DONE
  $("#done-btn").click(function() {
    var done= confirm("Sure?");
    if(done==true){
      //SAVE SET AND GO TO NEXT TASK
    }
    //else do nothing and continue current task
  })


} // end window onload




