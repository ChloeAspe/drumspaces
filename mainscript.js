//test JSON data parsing
var text = '{ "kicks" : [' +
    '{ "sampleName":"KennyA", "sampleX":1010, "sampleY":105 },' +
	  '{ "sampleName":"KennyB", "sampleX":860, "sampleY":325 },' + 
    '{ "sampleName":"KennyC", "sampleX":230, "sampleY":255 },' + 
    '{ "sampleName":"KennyD", "sampleX":1240, "sampleY":175 },' + 
    '{ "sampleName":"KennyE", "sampleX":1750, "sampleY":205 },' + 
    '{ "sampleName":"KennyF", "sampleX":380, "sampleY":125 },' + 
    '{ "sampleName":"KennyG", "sampleX":70, "sampleY":155 },' + 
    '{ "sampleName":"KennyH", "sampleX":180, "sampleY":185 },' + 
    '{ "sampleName":"KennyI", "sampleX":590, "sampleY":205 } ] ,'+
    '"snares" : ['+
    '{ "sampleName":"StanA", "sampleX":50, "sampleY":185 },' +
    '{ "sampleName":"StanB", "sampleX":820, "sampleY":225 },' + 
    '{ "sampleName":"StanC", "sampleX":210, "sampleY":355 },' + 
    '{ "sampleName":"StanD", "sampleX":540, "sampleY":186 },' + 
    '{ "sampleName":"StanE", "sampleX":1168, "sampleY":205 },' + 
    '{ "sampleName":"StanF", "sampleX":60, "sampleY":125 },' + 
    '{ "sampleName":"StanG", "sampleX":225, "sampleY":235 },' + 
    '{ "sampleName":"StanH", "sampleX":780, "sampleY":385 },' + 
    '{ "sampleName":"StanI", "sampleX":1150, "sampleY":115 } ] ,'+
    '"openhh" : ['+
    '{ "sampleName":"OscarA", "sampleX":250, "sampleY":105 },' +
    '{ "sampleName":"OscarB", "sampleX":1020, "sampleY":125 },' + 
    '{ "sampleName":"OscarC", "sampleX":510, "sampleY":155 },' + 
    '{ "sampleName":"OscarD", "sampleX":1240, "sampleY":386 },' + 
    '{ "sampleName":"OscarE", "sampleX":868, "sampleY":205 },' + 
    '{ "sampleName":"OscarF", "sampleX":260, "sampleY":25 },' + 
    '{ "sampleName":"OscarG", "sampleX":325, "sampleY":235 },' + 
    '{ "sampleName":"OscarH", "sampleX":580, "sampleY":285 },' + 
    '{ "sampleName":"OscarI", "sampleX":750, "sampleY":115 } ] ,'+
    '"closedhh" : ['+
    '{ "sampleName":"ConanA", "sampleX":150, "sampleY":265 },' +
    '{ "sampleName":"ConanB", "sampleX":1220, "sampleY":225 },' + 
    '{ "sampleName":"ConanC", "sampleX":810, "sampleY":255 },' + 
    '{ "sampleName":"ConanD", "sampleX":1140, "sampleY":186 },' + 
    '{ "sampleName":"ConanE", "sampleX":368, "sampleY":105 },' + 
    '{ "sampleName":"ConanF", "sampleX":160, "sampleY":225 },' + 
    '{ "sampleName":"ConanG", "sampleX":925, "sampleY":135 },' + 
    '{ "sampleName":"ConanH", "sampleX":1580, "sampleY":185 },' + 
    '{ "sampleName":"ConanI", "sampleX":250, "sampleY":215 } ]'+
    '}';

var sampleset = JSON.parse(text);

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

//fill lists with the sampleObjects
var kickList = [];
var snareList = [];
var ohhList = [];
var chhList = [];

for(var i=0; i<sampleset.kicks.length; i++) {
	var current = sampleset.kicks[i];
	kickList[i]= new sampleObject(current.sampleName, current.sampleX, current.sampleY, "kicktype");
}
for(var i=0; i<sampleset.snares.length; i++) {
  var current = sampleset.snares[i];
  snareList[i]= new sampleObject(current.sampleName, current.sampleX, current.sampleY, "snaretype");
}
for(var i=0; i<sampleset.openhh.length; i++) {
  var current = sampleset.openhh[i];
  ohhList[i]= new sampleObject(current.sampleName, current.sampleX, current.sampleY, "ohhtype");
}
for(var i=0; i<sampleset.closedhh.length; i++) {
  var current = sampleset.closedhh[i];
  chhList[i]= new sampleObject(current.sampleName, current.sampleX, current.sampleY, "chhtype");
}


var RADIUS = 8;


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
    height: 250,
    width: 500,
    sampleList: kickList,
    radius: RADIUS
  });

  var snareBonsai = bonsai.run(snareCanvas, {
    url: 'bonsaicode.js',
    height: 250,
    width: 500,
    sampleList: snareList,
    radius: RADIUS
  });

  var ohhBonsai = bonsai.run(ohhCanvas, {
    url: 'bonsaicode.js',
    height: 250,
    width: 500,
    sampleList: ohhList,
    radius: RADIUS
  });

  var chhBonsai = bonsai.run(chhCanvas, {
    url: 'bonsaicode.js',
    height: 250,
    width: 500,
    sampleList: chhList,
    radius: RADIUS
  });

  // handle interface messages-- from the bonsaijs runner context
  // the OSC msgs will be sent from here
  kickBonsai.on('load', function() {
    kickBonsai.on('message:rhythmPlay', function(data) {
      console.log("rhythm play : "+ data.sName);
    }).on('message:soloPlay',function(data) {
      console.log("soloplay : "+ data.sName);
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
      console.log("soloplay : "+ data.sName);
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
      console.log("soloplay : "+ data.sName);
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
      console.log("soloplay : "+ data.sName);
    }).on('message:rhythmMute',function(data) {
      console.log("rhyth mute : "+ data.sName);
    }).on('message:rhythmUnmute',function(data) {
      console.log("rhyth unmute : "+ data.sName);
    }).on('message:rhythmStop',function(data) {
      console.log("rhythm stop : "+ data.sName);
    });
  });

} // end window onload




