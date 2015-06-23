



// Array storing player 
var sounds;
var explorationPlayer;
// array storing  sounds Classes (Kick,HH,....)
var soundClasses;
// actual mp3 have 50ms silence in the begining due to the converter (sox)
// for now it's preferable to use wave files
var useMp3 = false;

var loadingSamples = {}

// callback functions to override

// all 4 sounds are loaded (kit ready to be played)
var allLoadedCallback = function(){console.log("allLoaded")};
// percent loaded on current Kit
var loadingCallBack = function(pct){ console.log(pct,loadingSamples);}

var localAudioFilePath = "https://raw.githubusercontent.com/MartinHN/drumspaces/gh-pages/samples/";


var loadAll = function(){
	
	loadPlayer();
	loadMidiIdx(0);
	loadDefaultMidiMap();
	midiMap = new Array();
	midiMap[0]="Kick"
	midiMap[1]="Snare"
	midiMap[2]="ClosedHH"
	midiMap[3]="OpenHH"
	console.log(noteOn)

	window.addEventListener("keypress", function(e){
		if(e.keyCode == 32){
			// toggleMidiPlayBack()
			$("#play-btn").click();
			e.preventDefault();
		};
	});

	MutedGroup["Kick"] = false;
	MutedGroup["Snare"] = false;
	MutedGroup["ClosedHH"] = false;
	MutedGroup["OpenHH"] = false;
}

soundManager.setup({debugMode: false,useHighPerformance : true,flashVersion: 9, onready:loadAll})

// audio Player

var loadPlayer = function(){
	sounds = {};
	soundClasses = new Array();
	
	for ( var type  in audioFiles){
		soundClasses.push(type);
		loadingSamples[type] = 0;
		sounds[type] = new soundManager.createSound({
		   id: type,
		   // url: "",//"samples/" + type + "/"+ audioFiles[type][0],
		   volume: 70,
		   multiShot: true,
		   autoLoad: true,
		   autoPlay : false,
		   stream: false,
		   whileloading : function(){
		   	
		   	// avoid multiple or empty calls from SM2
		   	if(!this.bytesTotal || loadingSamples[this.id]==100)return;
		   	loadingSamples[this.id] = this.bytesLoaded*100/this.bytesTotal;
		   	var pct=0;
		   	var size=0;
		   	for (var key in loadingSamples){
		   		pct +=loadingSamples[key];
		   		size++;
		   	}
		   	pct/= size;
		   	
		   	loadingCallBack(pct);
		   	
		   },
		   onload : function(b){
		   	// avoid multiple call from SM2
		   	if(loadingSamples[this.id] == 100){return}
		   	if(b)loadingSamples[this.id]  = 100;
		   	var allLoaded = true;
		   	var size = 0;
		   	for (var key in loadingSamples){
		   		size++;
		   		allLoaded&= loadingSamples[key] ==100
		   	}
		   	if(allLoaded && size == 4){
		   		allLoadedCallback();
		   	}

		   }
		 });
	}

	explorationPlayer = new soundManager.createSound({
		   id: "explorationPlayer",
		   // url: "",
		   volume: 70,
		   multiShot: false,
		   autoLoad: true,
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
	var fname = "";
	
	if(_fname !== undefined) {
		
		var idx = _fname.lastIndexOf('.');
		if(idx> 0 ){fname =  _fname.substr(0,idx);}
		else {fname = _fname;}
	
	
	/* otherwise error when trying to reset midimap to selectedSample
	on mouseout a not selected sample
	(when rhythmIsOn and mouseovered samples are played on rhythm instead of the selected one) */
	if (useMp3){
		return localAudioFilePath+"mp3/" + type + "/"+ fname+'.mp3'
	}
	else{
		return localAudioFilePath+"wav/" + type + "/"+ fname+'.wav'
	}


}

}



var setMidiMap = function(type,fname,directory){
if(fname!== undefined){
	// sounds[type].stop();
	var _type = type
	if(directory!=undefined){_type = directory}
	loadingSamples[type] = 0;
	sounds[type].url = getSoundPath(_type,fname);
	sounds[type].load();
	console.log("loading",getSoundPath(_type,fname))
}
}
var loadDefaultMidiMap = function(){
	setMidiMap("Kick","Kick","Default");
	setMidiMap("Snare","Snare","Default");
	setMidiMap("OpenHH","OpenHH","Default");
	setMidiMap("ClosedHH","ClosedHH","Default");
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



var loadMidiIdx = function(i){
	var midiToLoad= Object.keys(midiFiles)[i%Object.keys(midiFiles).length] ;
	 loadMidi(midiToLoad) ;
	 console.log("loading midi : "+midiToLoad)
}
var getNumMidiFiles = function(){return midiFiles.key().length;}

var loadMidi = function(midiName){
	
	midi.loadFile('data:audio/midi;base64,'+midiFiles[midiName].data,function(){
		bpm = midiFiles[midiName].bpm;
		noteOn = new Array();
		noteOff = new Array();
		for(var i = 0 ; i < 4 ; i ++){noteOn[i] = new Array();noteOff[i] = new Array();}
		
		var nIdx =[0,0,0,0];
		var deltaCount = [0,0,0,0];
		
		timeFactor = 60000.0/(bpm*midi.ticksPerBeats);
		var runningCount = [0,0,0,0];

		for( var i = 0 ; i < midi.data.length ; i++){
			var audioType = midi.data[i][0].event["channel"];
			if(audioType<4){
				if (midi.data[i][0].event["subtype"] == "noteOn"  ){
					
					var note =  Object();
					note.audioType =audioType;
					note.idx = nIdx[note.audioType];
					note.deltaTime = deltaCount[note.audioType] + midi.data[i][0].event["deltaTime"];
					note.startTime
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





// if (window.addEventListener) // W3C standard
// {
//   window.addEventListener('load', loadAll, false); // NB **not** 'onload'
// } 
// else if (window.attachEvent) // Microsoft
// {
//   window.attachEvent('onload', loadAll);
// }
// else{
	
// }