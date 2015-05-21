soundManager.setup({debugMode: false,useHighPerformance : true,flashVersion: 9})



// Array storing player 
var sounds;
var explorationPlayer;
// array storing  sounds Classes (Kick,HH,....)
var soundClasses;
var useMp3 = false;


var loadAll = function(){
	bpm = 80;
	loadPlayer();
	loadMidi("jazz");
	midiMap = new Array();
	midiMap[0]="Kick"
	midiMap[1]="Snare"
	midiMap[2]="ClosedHH"
	midiMap[3]="OpenHH"
	console.log(noteOn)

	window.addEventListener("keypress", function(e){
		if(e.keyCode == 32){
			toggleMidiPlayBack()};
	});

	MutedGroup["Kick"] = false;
	MutedGroup["Snare"] = false;
	MutedGroup["ClosedHH"] = false;
	MutedGroup["OpenHH"] = false;
}


// audio Player

var loadPlayer = function(){
	sounds = {};
	soundClasses = new Array();
	
	for ( var type  in audioFiles){
		soundClasses.push(type);
		sounds[type] = new soundManager.createSound({
		   id: type,
		   url: "",//"samples/" + type + "/"+ audioFiles[type][0],
		   volume: 70,
		   multiShot: true,
		   autoLoad: true,
		   autoPlay : false,
		   stream: true
		 });
	}

	explorationPlayer = new soundManager.createSound({
		   id: "explorationPlayer",
		   url: "",
		   volume: 70,
		   multiShot: false,
		   autoLoad: false,
		   stream: true
		 });
}


var playType=function(type,vel){

	if(MutedGroup[type] == false){
	
	choke(type);
	sounds[type].play();
	sounds[type].volume = vel*100.0/127;
}

}

var playOne = function(type,fname){
	
	explorationPlayer.url = getSoundPath(type,fname);//"samples/" + type + "/"+ fname;
	explorationPlayer.play();
}


var getSoundPath = function(type ,_fname){
	var fname =  _fname.substr(0,_fname.lastIndexOf('.'));

	if (useMp3){
		return "samples/mp3/" + type + "/"+ fname+'.mp3'
	}
	else{
		return "samples/wav/" + type + "/"+ fname+'.wav'
	}

}
var setMidiMap = function(type,fname){

	sounds[type].url = getSoundPath(type,fname);//"samples/" + type + "/"+ name;
	if(fname!="")sounds[type].load();
}


var choke = function(type){
	if($.inArray(type, chokeGroup)){
		chokeGroup.map(function(t){
			sounds[t].stop();
		})
	}
}	

var setMuted = function(type,b){
	MutedGroup[type] = b;
}

var chokeGroup = ["OpenHH","ClosedHH"];



// Midi PlayBack


var loopLength;
var lastSilence;
var timeFactor;
var noteOn;
var noteOff;
var bpm;
var isPlaying = false;

var midiMap ;

var timeOuts = new Array();
var MutedGroup = {};



var midi = MIDI.Player;


var MyPlayOne = function(note){

	if(isPlaying ){
		
		playType(midiMap[note.audioType],note.velocity);
	}
}


var StartMidi = function(){
	isPlaying = true;
	//
	console.log("startMidi")
	timeOuts.map(function(t){clearTimeout(t);});
	timeOuts = new Array();
	timeOuts.push(setTimeout(StartMidi,loopLength*timeFactor));
	for(var i = 0 ; i < noteOn.length ; i++){
		if(noteOn[i][0]){
			var expected = 0;//firstNote.deltaTime*timeFactor;
			for( var j = 0 ; j < noteOn[i].length;j++){
			var note = noteOn[i][j];
			expected+=note.deltaTime*timeFactor;
			// anonymous function to ensure callback of pointed variable
				timeOuts.push(setTimeout( ( function(n){return function(){MyPlayOne(n);}} )
					(note),expected));

			}

			
		}
	}
	

}


var StopMidi = function(){
	isPlaying = false;
	soundManager.stopAll();
	timeOuts.map(function(t){clearTimeout(t);});
}

var toggleMidiPlayBack = function(){
if(isPlaying){
	StopMidi();
	$("#PlayBtn").find("p").text("START RHYTHM");
}
else{
	StartMidi();
	$("#PlayBtn").find("p").text("STOP RHYTHM");
}
}




		


var loadMidi = function(midiName){
	midi.loadFile('data:audio/midi;base64,'+midiFiles[midiName],function(){
		
		
		noteOn = new Array();
		noteOff = new Array();
		for(var i = 0 ; i < 4 ; i ++){noteOn[i] = new Array();noteOff[i] = new Array();}
		
		var nIdx =[0,0,0,0];
		var deltaCount = [0,0,0,0];
		
		timeFactor = 60000.0/(bpm*midi.ticksPerBeats);
		var runningCount = [0,0,0,0];

		for( var i = 0 ; i < midi.data.length ; i++){
			//

			var audioType = midi.data[i][0].event["channel"];
			if(audioType<4){
				if (midi.data[i][0].event["subtype"] == "noteOn"  ){
					
					var note =  Object();
					note.audioType =audioType;
					note.idx = nIdx[note.audioType];
					note.deltaTime = deltaCount[note.audioType] + midi.data[i][0].event["deltaTime"];
					runningCount[note.audioType]+= note.deltaTime ;
					note.velocity = midi.data[i][0].event["velocity"];
					deltaCount[note.audioType]=0;
					nIdx[note.audioType]++;

					noteOn[note.audioType].push(note);
				}
				else if( midi.data[i][0].event["subtype"] == "noteOff" ){
					noteOff[audioType].push(midi.data[i][0].event["deltaTime"]);
					deltaCount[audioType]+= midi.data[i][0].event["deltaTime"];
				}
			}
		}
		var lastnoteOff = 0;
		for(var i = 0 ; i < 4 ;i ++){
			if(runningCount[i]+deltaCount[i]>lastnoteOff ){
				lastNoteType = i;
				lastnoteOff=runningCount[i]+deltaCount[i];

			}
		}
		// hack as midi doesent include loop length info : take the next 4 beat roundness
		loopLength = (Math.ceil((lastnoteOff - 1)/(4.0*midi.ticksPerBeats))  ) *(4*midi.ticksPerBeats);
		
		lastSilence = loopLength - runningCount[lastNoteType]  ;
		
		
		
			
	})	

}





if (window.addEventListener) // W3C standard
{
  window.addEventListener('load', loadAll, false); // NB **not** 'onload'
} 
else if (window.attachEvent) // Microsoft
{
  window.attachEvent('onload', loadAll);
}
else{
	
}