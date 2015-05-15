

// SAMPLEOBJECT CONSTRUCTOR
function sampleObject(argName, argX, argY, argType) {
	this.sName = argName;
	this.coordX = argX;
	this.coordY = argY;
	this.sType = argType;
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
    }).on('message:soloPlay',function(data) {
      playOne("Kick",data.sName); 
    }).on('message:rhythmMute',function(data) {
      console.log("rhyth mute : "+ data.sName);
    }).on('message:rhythmUnmute',function(data) {
      console.log("rhyth unmute : "+ data.sName);
    }).on('message:rhythmStop',function(data) {
      console.log("rhythm stop : "+ data.sName);
    });
  });

  snareBonsai.on('load', function() {
    snareBonsai.on('message:rhythmPlay', function(data) {
      console.log("rhythm play : "+ data.sName);
    }).on('message:soloPlay',function(data) {
      playOne("Snare",data.sName); 
    }).on('message:rhythmMute',function(data) {
      console.log("rhyth mute : "+ data.sName);
    }).on('message:rhythmUnmute',function(data) {
      console.log("rhyth unmute : "+ data.sName);
    }).on('message:rhythmStop',function(data) {
      console.log("rhythm stop : "+ data.sName);
    });
  });

  ohhBonsai.on('load', function() {
    ohhBonsai.on('message:rhythmPlay', function(data) {
      console.log("rhythm play : "+ data.sName);
    }).on('message:soloPlay',function(data) {
      playOne("OpenHH",data.sName); 
    }).on('message:rhythmMute',function(data) {
      console.log("rhyth mute : "+ data.sName);
    }).on('message:rhythmUnmute',function(data) {
      console.log("rhyth unmute : "+ data.sName);
    }).on('message:rhythmStop',function(data) {
      console.log("rhythm stop : "+ data.sName);
    });
  });

  chhBonsai.on('load', function() {
    chhBonsai.on('message:rhythmPlay', function(data) {
      console.log("rhythm play : "+ data.sName);
    }).on('message:soloPlay',function(data) {
      playOne("ClosedHH",data.sName); 
    }).on('message:rhythmMute',function(data) {
      console.log("rhyth mute : "+ data.sName);
    }).on('message:rhythmUnmute',function(data) {
      console.log("rhyth unmute : "+ data.sName);
    }).on('message:rhythmStop',function(data) {
      console.log("rhythm stop : "+ data.sName);
    });
  });

} // end window onload




