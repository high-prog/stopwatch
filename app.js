$(function(){
  var mode = false; //app mode
  var timeCounter = 0;//time control
  var lapCounter = 0;//lap counter
  var action //variable for setInterval
  var lapNumber = 0; // umber of laps
  var timeminutes , timeseconds, timecentiseconds,lapminutes , lapseconds, lapcentiseconds;

  //on app load
  hideShowButtons("#startbutton","#lapbutton");
  //click on startbutton
  $("#startbutton").click(function(){
    mode = true;
    hideShowButtons("#stopbutton","#lapbutton");
    //start counter
    startAction();
    

  });

  //stp button
  $("#stopbutton").click(function(){
    hideShowButtons("#resumebutton","#resetbutton");
    //stp counteer
    clearInterval(action);
  });

    //resume button
    $("#resumebutton").click(function(){
      hideShowButtons("#stopbutton","#lapbutton");
      //stp counteer
      startAction();
    });

        //reset button
        $("#resetbutton").click(function(){
          location.reload();
        });
    
      //lap button
      $("#lapbutton").click(function(){
        if(mode){
          clearInterval(action);
          lapCounter = 0;
          addlap();
          startAction();
        }
      });

// toshow laps
function addlap(){
  lapNumber++;
  var myLapDetails = 
  ' <div class = "lap">' +
       '<div class = "laptimetitle">' + 
            "lap " + lapNumber + 
       '</div>' +
       
       '<div class = "laptime">' +
          '<span>' + foramt(lapminutes) + '</span>'+ ':' +
          '<span>' + foramt(lapseconds) + '</span>'+ ':' +
          '<span>' + foramt(lapcentiseconds) + '</span>'+
       '</div>' +
  
  '</div>';
  $(myLapDetails).prependTo('#laps'); 
}

  //functions
  function hideShowButtons(x,y){
    $(".control").hide();
    $(x).show();
    $(y).show();
  }

  //counter
  function startAction(){
    action = setInterval(function(){
      timeCounter++;
      if(timeCounter == 100*60*100){
        timeCounter = 0;
      }
      lapCounter++;
      if(lapCounter == 100*60*100){
        lapCounter = 0;
      }
      updateTime();
    },10);   
  }

  //update time
  function updateTime(){
    timeminutes = Math.floor(timeCounter/6000);
    timeseconds = Math.floor((timeCounter%6000)/100);
    timecentiseconds = (timeCounter%6000)%100;

    $("#timeminute").text(foramt(timeminutes));
    $("#timesecond").text(foramt(timeseconds));
    $("#timecentisecond").text(foramt(timecentiseconds));
  
    lapminutes = Math.floor(lapCounter/6000);
    lapseconds = Math.floor((lapCounter%6000)/100);
    lapcentiseconds = (lapCounter%6000)%100;

    $("#lapminute").text(foramt(lapminutes));
    $("#lapsecond").text(foramt(lapseconds));
    $("#lapcentisecond").text(foramt(lapcentiseconds));


  }

  //format number
  function foramt(nummber){
    if(nummber < 10){
      return '0'+nummber;
    }
    else{
      return nummber;
    }
  }
});