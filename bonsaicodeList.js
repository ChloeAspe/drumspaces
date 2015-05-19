     //get variables from window context passed in the fct call
     var sampleListBonsai = stage.options.sampleList;
     
     var placeX=0;
     var placeY=0; // will contain the calcuated location of currently drawn sample
     var currentName = ''; // ----------------- name ----------------------------
     var currentY=0; // will be incremented on each new list element
     var nameDisplay = new Text('').attr({x: stage.options.width/2, textAlign: 'center', textFillColor: '#696969', fontSize: '20', fontFamily: 'helvetica'});
     var prevSelected = new Object();
     var nowSelected= new Object();
     nowSelected = {sParent: {sName: ""}, mute: false}; // initially no sample selected
     

    for(var i=0; i<sampleListBonsai.length; i++){ // go through kick/snare/ohh/chh list
      currentName = sampleListBonsai[i].sName;
      
      var line = new Group();
      line.rect  = new Rect(0,placeY,stage.options.width, 30).addTo(line);
      line.sParent = sampleListBonsai[i]; // to access the rects parent sample
      line.rect.fill('lightgray');
      line.rectText = new Text(currentName).attr({x: 10, y:(placeY+3), textAlign: 'left', textFillColor: 'black', fontSize: '20', fontFamily: 'helvetica', selectable: 'false'}).addTo(line);
      line.addTo(stage)
      .on('click', function(e){ 
        if(this.sParent.sName!=nowSelected.sParent.sName) { // if clicked sample is not already selected, select it (and start playing it in rhythm)
          prevSelected = nowSelected;
          nowSelected= this;
          nowSelected.rect.fill('#FF6347');
          if(prevSelected.attr) { // if there was a previously selected sample, unselect it
            prevSelected.rect.fill('lightgray');
            stage.sendMessage('removeFromRhythm', {sName: prevSelected.sParent.sName});
          } 
          //START PLAY IN RHYTHM
          stage.sendMessage('addToRhythm', {sName: nowSelected.sParent.sName}); 
        } else { // if clicked sample was already selected, unselect it
          nowSelected = {sParent: {sName: ""}};
          this.rect.fill('lightgray');
          // STOP PLAY IN RHYTHM
          stage.sendMessage('removeFromRhythm', {sName: this.sParent.sName});
        }
        nameDisplay.attr('text', nowSelected.sParent.shortName); // update displayed name; // update displayed name
      })
      .on('mouseover',function(e){
        //if(nowSelected.sParent.sName=="") { // mouseover playback only works if theres no sample selected in the current drumspace
          this.rect.fill('white');
          nameDisplay.attr('text', this.sParent.shortName); // update displayed name

          // PLAY JUST ONCE
          stage.sendMessage('soloPlay', {sName: this.sParent.sName});
        //}
      })
      .on('mouseout', function(e){
          if(this.sParent.sName == nowSelected.sParent.sName) {
            this.rect.fill('#FF6347');
          }
          else{
            this.rect.fill('lightgray');
          }
          nameDisplay.attr('text', '');

      });

      placeY=placeY+30;
    } // end forloop on list
      

    stage.on('message:mute', function(data){
      if(nowSelected.rect) {
        if(data==true) {
          nowSelected.rect.fill('#555');
        } else{
          nowSelected.rect.fill('#FF6347');
        }
      }
    });
    
  