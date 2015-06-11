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
  var list = [];
  console.log(jsonData);
  for ( var i in jsonData ){
     list.push(new sampleObject(i,
      (jsonData[i][0]+0.5),
      (jsonData[i][1]+0.5),
      type));
  }
  return list;
}

// constants
var RADIUS = 4;
var canvasDim = new Object();
canvasDim.x = 380
canvasDim.y =500

// VIEWTYPE : changes between the 3 tasks, random order
//var viewType= 3; // 1-list, 2-spacerandom, 3-spaceorganized

//window.onload = function(){
  

  // ------------- LOAD VIEW FCT ------------------
  // (view is only loaded when user clicks START)
  var loadView = function(viewType) {
        //get divs where we will draw
    var kickCanvas = document.getElementById("kick-canvas");
    var snareCanvas = document.getElementById("snare-canvas");
    var ohhCanvas = document.getElementById("ohh-canvas");
    var chhCanvas = document.getElementById("chh-canvas");
    var h, viewScript, jsonDataKick, jsonDataSnare, jsonDataOHH, jsonDataCHH;
    kickCanvas.innerHTML="";
    snareCanvas.innerHTML="";
    ohhCanvas.innerHTML="";
    chhCanvas.innerHTML="";


    switch(viewType) {
      case 1: 
        viewScript='bonsaicodeList.js';
        hk=8000;
        hs=4000;
        ho=4500;
        hc=4500;
        $(".drumspace").addClass("listview");
        jsonDataKick = KickPos;
        jsonDataSnare = SnarePos;
        jsonDataOHH = OpenHHPos;
        jsonDataCHH = ClosedHHPos;
        console.log("listview");
        break;
      case 2:
        viewScript='bonsaicode.js';
        hk=hs=ho=hc=canvasDim.x;
        jsonDataKick = Alphabetic_KickPos;
        jsonDataSnare = Alphabetic_SnarePos;
        jsonDataOHH = Alphabetic_OpenHHPos;
        jsonDataCHH = Alphabetic_ClosedHHPos;
        $(".drumspace").removeClass("listview");
        console.log("spacerand view");
        break;
      case 3: 
        viewScript='bonsaicode.js';
        hk=hs=ho=hc=canvasDim.x;
        jsonDataKick = KickPos;
        jsonDataSnare = SnarePos;
        jsonDataOHH = OpenHHPos;
        jsonDataCHH = ClosedHHPos;
        $(".drumspace").removeClass("listview");
        console.log("spaceorg view");
        break;
    }

    // draw the sample spaces
    window.kickBonsai = bonsai.run(kickCanvas, {
      url: viewScript,
      height: hk,
      width: canvasDim.y,
      sampleList: getSampleObjects(jsonDataKick,"Kick"),
      radius: RADIUS
    });

    window.snareBonsai = bonsai.run(snareCanvas, {
      url: viewScript,
      height: hs,
      width: canvasDim.y,
      sampleList: getSampleObjects(jsonDataSnare,"Snare"),
      radius: RADIUS
    });

    window.ohhBonsai = bonsai.run(ohhCanvas, {
      url: viewScript,
      height: ho,
      width: canvasDim.y,
      sampleList: getSampleObjects(jsonDataOHH,"OpenHH"),
      radius: RADIUS
    });

    window.chhBonsai = bonsai.run(chhCanvas, {
      url: viewScript,
      height: hc,
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
        if($.inArray(selectedKick.sName, wasSelected)===-1) {
          wasSelected.push(selectedKick.sName);
          nbSelected.Kick+=1;
          nbSelected.total+=1;
        }
      }).on('message:mouseOver',function(data) {
        if(rhythmIsOn == true) { // if rhythm is On, replace selected CHH
          setMidiMap("Kick",data.sName);
          console.log("play in rhythm : "+ data.sName);
        } else { // otherwise just play it once
          playOne("Kick",data.sName); 
          console.log("soloplay : "+ data.sName);
        }
        if($.inArray(data.sName, wasListened)===-1) {
          wasListened.push(data.sName);
          nbListened.Kick+=1;
          nbListened.total+=1;
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
    }).on('key', function(e) {
        console.log("blocked keypress");
        e.preventDefault();
    })

    snareBonsai.on('load', function() {
      snareBonsai.on('message:selectSample', function(data) {
        console.log("add to rhythm : "+ data.sName);
        setMidiMap("Snare",data.sName);
        selectedSnare = data;
        if($.inArray(selectedSnare.sName, wasSelected)===-1) {
          wasSelected.push(selectedSnare.sName);
          nbSelected.Snare+=1;
          nbSelected.total+=1;
        }
      }).on('message:mouseOver',function(data) {
        if(rhythmIsOn == true) { // if rhythm is On, replace selected CHH
          setMidiMap("Snare",data.sName);
          console.log("play in rhythm : "+ data.sName);
        } else { // otherwise just play it once
          playOne("Snare",data.sName); 
          console.log("soloplay : "+ data.sName);
        }
        if($.inArray(data.sName, wasListened)===-1) {
          wasListened.push(data.sName);
          nbListened.Snare+=1;
          nbListened.total+=1;
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
        if($.inArray(selectedOHH.sName, wasSelected)===-1) {
          wasSelected.push(selectedOHH.sName);
          nbSelected.OpenHH+=1;
          nbSelected.total+=1;
        }
      }).on('message:mouseOver',function(data) {
        if(rhythmIsOn == true) { // if rhythm is On, replace selected CHH
          setMidiMap("OpenHH",data.sName);
          console.log("play in rhythm : "+ data.sName);
        } else { // otherwise just play it once
          playOne("OpenHH",data.sName); 
          console.log("soloplay : "+ data.sName);
        }
        if($.inArray(data.sName, wasListened)===-1) {
          wasListened.push(data.sName);
          nbListened.OpenHH+=1;
          nbListened.total+=1;
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
        if($.inArray(selectedCHH.sName, wasSelected)===-1) {
          wasSelected.push(selectedCHH.sName);
          nbSelected.ClosedHH+=1;
          nbSelected.total+=1;
        }
      }).on('message:mouseOver', function(data) {
        if(rhythmIsOn == true) { // if rhythm is On, replace selected CHH
          setMidiMap("ClosedHH",data.sName);
        } else { // otherwise just play it once
          playOne("ClosedHH",data.sName); 
        }
        if($.inArray(data.sName, wasListened)===-1) {
          wasListened.push(data.sName);
          nbListened.ClosedHH+=1;
          nbListened.total+=1;
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


    
  };

  // ------------- END LOADVIEW FCT ----------------

// } // end window.onload
