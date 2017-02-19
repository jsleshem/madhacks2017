$(function() {
	/*$("#maze").click(function(event) {
		// watch out for negative values
		var params = {
			x: event.offsetX,
			y: event.offsetY
		};

		$.ajax({
			url: "move_wall?" + $.param(params),
			type: "GET"
		})
		.done(sentCoords);

		function sentCoords() {
			console.log("x: " + params.x);
			console.log("y: " + params.y);
		};
	});*/


  var seconds = 00; 
  var tens = 00; 
  var appendTens = document.getElementById("tens")
  var appendSeconds = document.getElementById("seconds")
  var buttonStart = document.getElementById('button-start');
  var buttonStop = document.getElementById('button-stop');
  var buttonReset = document.getElementById('button-reset');
  var Interval ;

  buttonStart.onclick = function() {
    
     clearInterval(Interval);
     Interval = setInterval(startTimer, 10);
  }
  
    buttonStop.onclick = function() {
       clearInterval(Interval);
  }
  

  buttonReset.onclick = function() {
     clearInterval(Interval);
    tens = "00";
  	seconds = "00";
    appendTens.innerHTML = tens;
  	appendSeconds.innerHTML = seconds;
  }
  
   
  
  function startTimer () {
    tens++; 
    
    if(tens < 9){
      appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9){
      appendTens.innerHTML = tens;
      
    } 
    
    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
  
  }

	class Wall {
	    constructor(id, active) {
            this.id = id;
            this.active = active;
            if (this.active) {
                this.activate();
            }
            else {
                this.deactivate();
            }
	    }

	    activate() {
	        $("#"+this.id).css({
	            opacity: 1
	        });
	    }

	    deactivate() {
	        $("#"+this.id).css({
	            opacity: 0.3
	        });
	    }

	    flip() {
	        if (this.active) {
	            this.deactivate();
	        }
	        else {
	            this.activate();
	        }
	        this.active = !this.active;
	    }
	}

	var params = new Object();

	let alt1 = new Wall("alt1", false);
	let alt2 = new Wall("alt2", true);

	let alts = [alt1, alt2];
    var altsDisabled = false;

	$("#" + alt1.id).click(function(event) {
	    if (altsDisabled) {
	        return;
	    }
	    alts.forEach(function(element) {
	        element.flip();
	    });
	    moveWall(alt1.id);
	    altsDisabled = true;
	    setTimeout(function() { altsDisabled = false; }, 3000);
	});

	$("#" + alt2.id).click(function(event) {
	    if (altsDisabled) {
	        return;
	    }
	    alts.forEach(function(element) {
	        element.flip();
	    });
	    moveWall(alt2.id);
	    altsDisabled = true;
	    setTimeout(function() { altsDisabled = false; }, 3000);
	});

	var swingDisabled = false;
	var closed = true;
	$("#swing").click(function(event) {
	    if (swingDisabled) {
	        return;
	    }
	    let curHeight = $("#swing").css("height");
	    let curWidth = $("#swing").css("width");
	    let curRight = $("#swing").css("right");
	    $("#swing").css({
	        height: curWidth,
	        width: curHeight,
	        right: parseInt(curRight) + ((closed ? parseInt(curWidth) : -parseInt(curHeight))) + "px"
	    });
	    moveWall("swing");
	    closed = !closed;
	    swingDisabled = true;
	    setTimeout(function() { swingDisabled = false; }, 3000);
	});


	var wheel_position = 0;
	var wheel_angle = 90;
	var centerDisabled = false;

	$("#center").click(function(event) {

		if (centerDisabled)
			return;

		moveWall("center");

		$("#center").css({
			"-webkit-animation-name": 	"rotate"+wheel_position,
			"-webkit-animation-duration":	"1s",
			"-webkit-animation-iteration-count":	"1",
			"-webkit-animation-timing-function":	"linear",
                        "-moz-animation-name":       "rotate"+wheel_position,
                        "-moz-animation-duration":   "1s",
                        "-moz-animation-iteration-count":    "1",
                        "-moz-animation-timing-function":    "linear",

			"-webkit-transform":		"rotate("+wheel_angle+"deg)",
			"-moz-transform":		"rotate("+wheel_angle+"deg)"

		});

		wheel_position = (wheel_position + 1) % 4;
		wheel_angle = (wheel_position + 1) * 90;

		centerDisabled = true;
		setTimeout(function(){centerDisabled = false;}, 3000);
	});

	function moveWall(id) {
	    params.id = id;
	    $.ajax({
	        url: "move_wall?" + $.param(params),
	        type: "GET"
	    })
	    .done(function() {
	        console.log(id + " moved");
	    });
	}
});
