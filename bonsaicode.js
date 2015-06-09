//get variables from window context passed in the fct call
     var sampleListBonsai = stage.options.sampleList;
     var radius = stage.options.radius;
     
     var placeX, placeY; // will contain the calcuated location of currently drawn sample
     var currentName = ''; // ---------------name ---------------------------------------
     var nameDisplay = new Text('').attr({x: stage.options.width/2, y: 10, textAlign: 'center', textFillColor: '#696969', fontSize: '20', fontFamily: 'helvetica'});
     var prevprevSelected = new Object();
     var prevSelected = {sParent: {sName: ""}, mute: false};
     var nowSelected = {sParent: {sName: ""}, mute: false}; // initially no sample selected
     

    for(var i=0; i<sampleListBonsai.length; i++){ // go through kick/snare/ohh/chh list
      placeX = sampleListBonsai[i].coordX * (stage.options.width-12)+6; 
      placeY = sampleListBonsai[i].coordY * (stage.options.height-50)+40;
      currentName = sampleListBonsai[i].sName;
      
      sampleListBonsai[i].circle  = new Circle(placeX,placeY, radius);
      sampleListBonsai[i].circle.sParent = sampleListBonsai[i]; // to access the circles parent sample
      sampleListBonsai[i].circle.fill('gray').addTo(stage)
      .on('click', function(e){ 
        if(this.sParent.sName!=nowSelected.sParent.sName) { // if clicked sample is not already selected, select it (and start playing it in rhythm)
          prevprevSelected = prevSelected;
          prevSelected = nowSelected;
          nowSelected= this;
          nowSelected.fill('#FF6347');
          if(prevSelected.attr) { // if there was a previously selected sample, unselect it
            prevSelected.animate('1s', { fillColor: '#DEA297' });
            if(prevprevSelected.attr && prevprevSelected!==nowSelected) {
              prevprevSelected.animate('1s', { fillColor: 'gray' });
            }
            stage.sendMessage('deselectSample', {sName: prevSelected.sParent.sName}); // useless
          } 
          //ADD TO RHYTHM
          stage.sendMessage('selectSample', {sName: nowSelected.sParent.sName}); 
        } /*
        else { // if clicked sample was already selected, unselect it
          
          // not sure we need that, we can already mute them
          // yes mais d'habitude pour déselectionner un objet on re clic dessus..?
          // to keep only one way to "mute " an object may be simpler (when you re not hearing you have only one thing to check ( dumbproof feature))

          // nowSelected = {sParent: {sName: ""}};
          // this.fill('gray');
          // // REMOVE FROM RHYTHM
          // stage.sendMessage('removeFromRhythm', {sName: this.sParent.sName});
        }*/
        nameDisplay.attr('text', nowSelected.sParent.shortName); // update displayed name; // update displayed name
      })
      .on('mouseover',function(e){
        // if(nowSelected.sParent.sName=="") { // mouseover playback only works if theres no sample selected in the current drumspace
          this.fill('white');
          nameDisplay.attr('text', this.sParent.shortName); // update displayed name
          
          // PLAY JUST ONCE
          stage.sendMessage('mouseOver', {sName: this.sParent.sName});
        // }
      })
      .on('mouseout',function(e){
          if(this.sParent.sName == nowSelected.sParent.sName) {
            this.fill('#FF6347');
          } else if(this.sParent.sName == prevSelected.sParent.sName) {
            this.fill('#DEA297');
          } else{
            this.fill('gray');
            stage.sendMessage('mouseOut', {sName: this.sParent.sName});
          }
          nameDisplay.attr('text', ( nowSelected.sParent.shortName || ''));
      });
    } // end forloop on list
      

    //build namebox
    var container = new Group().addTo(stage);
    
    var rectangle = new Rect(stage.options.width/4,0,250,30)
                          .fill('#D3D3D3')
                          .addTo(container);
    /*var deselectBtn = new Path("M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z")
                          .attr({x: 5+2*stage.options.width/3, y:3})
                          .addTo(container)
                          .fill('#696969')
                          .on('click', function(e){
                            nowSelected.fill('gray');
                            stage.sendMessage('rhythmStop', {sName: nowSelected.sParent.sName});
                            nowSelected = {sParent: {sName: ""}};
                            nameDisplay.attr('text', nowSelected.sParent.sName);
                          });*/
    nameDisplay.addTo(container);