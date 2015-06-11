//get variables from window context passed in the fct call
     var sampleListBonsai = stage.options.sampleList;
     var radius = stage.options.radius;
     
     var placeX=0;
     var placeY=0; // will contain the calcuated location of currently drawn sample
     var currentName = ''; // ----------------- name ----------------------------
     var currentY=0; // will be incremented on each new list element
     var prevprevSelected = new Object();
     var prevSelected = {sParent: {sName: ""}, mute: false};
     var nowSelected = {sParent: {sName: ""}, mute: false}; // initially no sample selected
     

    for(var i=0; i<sampleListBonsai.length; i++){ // go through kick/snare/ohh/chh list
      currentName = sampleListBonsai[i].shortName;
      var line = new Group();
      line.rect  = new Rect(20, placeY, stage.options.width-20, 19).addTo(stage);
      line.playbackRect  = new Rect(0, placeY, 20, 19).addTo(stage);
      line.circle = new Circle(10, placeY+10, radius).addTo(line);
      line.sParent = sampleListBonsai[i]; // to access the rects parent sample
      line.rect.fill('lightgray').stroke('transparent', 0);
      line.playbackRect.fill('lightgray');
      line.circle.fill('darkgray');
      line.rectText = new Text(currentName).attr({x: 30, y:(placeY+5), textAlign: 'left', textFillColor: 'black', fontSize: '14', fontFamily: 'helvetica', selectable: 'false'}).addTo(stage);
      line.addTo(stage)
      .on('click', function(e){ 
        if(this.sParent.sName!=nowSelected.sParent.sName) { // if clicked sample is not already selected, select it
          prevprevSelected = prevSelected;
          prevSelected = nowSelected;
          nowSelected= this;
          nowSelected.circle.fill('#FF6347');
          if(prevSelected.attr) { // if there was a previously selected sample, unselect it
            prevSelected.circle.animate('1s', { fillColor: '#DEA297' });
            if(prevprevSelected.attr && prevprevSelected!==nowSelected) {
              prevprevSelected.circle.animate('1s', { fillColor: 'darkgray' });
            }
            stage.sendMessage('deselectSample', {sName: prevSelected.sParent.sName});// useless
          }
          //ADD TO RHYTHM
          stage.sendMessage('selectSample', {sName: nowSelected.sParent.sName}); 
        } 
        /*else { // if clicked sample was already selected, unselect it
          nowSelected = {sParent: {sName: ""}};
          this.circle.fill('darkgray');
          // REMOVE FROM RHYTHM
          stage.sendMessage('removeFromRhythm', {sName: this.sParent.sName});
        }
        */
      })
      .on('mouseover',function(e){
          this.circle.fill('white');
          stage.sendMessage('mouseOver', {sName: this.sParent.sName});
        //}
      })
      .on('mouseout', function(e){
          if(this.sParent.sName == nowSelected.sParent.sName) {
            this.circle.fill('#FF6347'); 
          } else if(this.sParent.sName == prevSelected.sParent.sName) {
            this.circle.fill('#DEA297');
            stage.sendMessage('mouseOut', {sName: this.sParent.sName}); //so that it is removed from rhythm
          } else{
            this.circle.fill('darkgray');
            stage.sendMessage('mouseOut', {sName: this.sParent.sName}); //so that it is removed from rhythm
          }
      });

      placeY=placeY+20;
    } // end forloop on list


    /*stage.on('message:mute', function(data){
      if(nowSelected.rect) {
        if(data==true) {
          nowSelected.rect.fill('#555');
        } else{
          nowSelected.rect.fill('#FF6347');
        }
      }
    });*/
    
  