     //get variables from window context passed in the fct call
     var sampleListBonsai = stage.options.sampleList;
     var radius = stage.options.radius;
     
     var placeX, placeY; // will contain the calcuated location of currently drawn sample
     var currentName = ''; // ---------------name ---------------------------------------
     var nameDisplay = new Text('').attr({x: stage.options.width/2, textAlign: 'center', textFillColor: 'black', fontSize: '20', fontFamily: 'helvetica'});
     var prevSelected = new Object();
     var nowSelected= new Object();
     nowSelected = {sParent: {sName: ""}, mute: false}; // initially no sample selected
     

    for(var i=0; i<sampleListBonsai.length; i++){ // go through kick/snare/ohh/chh list
      placeX = sampleListBonsai[i].coordX * (stage.options.width-12)+6; 
      placeY = sampleListBonsai[i].coordY * (stage.options.height-50)+40;
      currentName = sampleListBonsai[i].sName;
      
      sampleListBonsai[i].circle  = new Circle(placeX,placeY, radius);
      sampleListBonsai[i].circle.sParent = sampleListBonsai[i]; // to access the circles parent sample
      sampleListBonsai[i].circle.fill('gray').addTo(stage)
      .on('click', function(e){ 
        if(this.sParent.sName!=nowSelected.sParent.sName) { // if clicked sample is not already selected, select it (and start playing it in rhythm)
          prevSelected = nowSelected;
          nowSelected= this;
          nowSelected.fill('red');
          if(prevSelected.attr) { // if there was a previously selected sample, unselect it
            prevSelected.fill('gray');
            stage.sendMessage('rhythmStop', {sName: prevSelected.sParent.sName});
          } 
          //START PLAY IN RHYTHM
          stage.sendMessage('rhythmPlay', {sName: nowSelected.sParent.sName}); 
        } else { // if clicked sample was already selected, unselect it
          nowSelected = {sParent: {sName: ""}};
          this.fill('gray');
          // STOP PLAY IN RHYTHM
          stage.sendMessage('rhythmStop', {sName: this.sParent.sName});
        }
        nameDisplay.attr('text', nowSelected.sParent.shortName); // update displayed name
      })
      .on('mouseover',function(e){
        if(nowSelected.sParent.sName=="") { // mouseover playback only works if theres no sample selected in the current drumspace
          this.fill('white');
          nameDisplay.attr('text', this.sParent.shortName); // update displayed name
          console.log(this.sParent.shortName);
          // PLAY JUST ONCE
          stage.sendMessage('soloPlay', {sName: this.sParent.sName});
        }
      })
      .on('mouseout',function(e){
          if(nowSelected.sParent.sName=="") {
            this.fill('gray');
            nameDisplay.attr('text', '');
          }
      });
    } // end forloop on list
      

    //build namebox
    var container = new Group().addTo(stage);
    
    var rectangle = new Rect(stage.options.width/3,0,200,30)
                          .fill('white')
                          .addTo(container);
    var deselectBtn = new Path("M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z")
                          .attr({x: 5+2*stage.options.width/3, y:3})
                          .addTo(container)
                          .fill('black')
                          .on('click', function(e){
                            nowSelected.fill('gray');
                            stage.sendMessage('rhythmStop', {sName: nowSelected.sParent.sName});
                            nowSelected = {sParent: {sName: ""}};
                            nameDisplay.attr('text', nowSelected.sParent.sName);
                          });
    var unmuteBtn =new Path("M4.998,12.127v7.896h4.495l6.729,5.526l0.004-18.948l-6.73,5.526H4.998z M18.806,11.219c-0.393-0.389-1.024-0.389-1.415,0.002c-0.39,0.391-0.39,1.024,0.002,1.416v-0.002c0.863,0.864,1.395,2.049,1.395,3.366c0,1.316-0.531,2.497-1.393,3.361c-0.394,0.389-0.394,1.022-0.002,1.415c0.195,0.195,0.451,0.293,0.707,0.293c0.257,0,0.513-0.098,0.708-0.293c1.222-1.22,1.98-2.915,1.979-4.776C20.788,14.136,20.027,12.439,18.806,11.219z M21.101,8.925c-0.393-0.391-1.024-0.391-1.413,0c-0.392,0.391-0.392,1.025,0,1.414c1.45,1.451,2.344,3.447,2.344,5.661c0,2.212-0.894,4.207-2.342,5.659c-0.392,0.39-0.392,1.023,0,1.414c0.195,0.195,0.451,0.293,0.708,0.293c0.256,0,0.512-0.098,0.707-0.293c1.808-1.809,2.929-4.315,2.927-7.073C24.033,13.24,22.912,10.732,21.101,8.925z")
                          .addTo(container)
                          .fill('black')
                          .attr('x', 2*stage.options.width/3 -25);
    var muteBtn = new Path("M4.998,12.127v7.896h4.495l6.729,5.526l0.004-18.948l-6.73,5.526H4.998z")
                          .addTo(container)
                          .fill('black')
                          .attr('x', 2*stage.options.width/3 -25)
                          .on('click', function(e){
                            if(nowSelected.mute==true)  {
                              stage.sendMessage('rhythmUnmute', {sName: nowSelected.sParent.sName});
                              rectangle.fill('white');
                              unmuteBtn.fill('black');
                              muteBtn.fill('transparent');
                              nowSelected.mute = false;
                            } else {
                              stage.sendMessage('rhythmMute', {sName: nowSelected.sParent.sName});
                              rectangle.fill('gray');
                              nowSelected.mute= true;
                              muteBtn.fill('black');
                              unmuteBtn.fill('transparent');
                            }
                          });
    nameDisplay.addTo(container);