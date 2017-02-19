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
	        $(this.id).css({
	            opacity: 1
	        });
	    }

	    deactivate() {
	        $(this.id).css({
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

	let alt1 = new Wall("#alt1", false);
	let alt2 = new Wall("#alt2", true);

	let alts = [alt1, alt2];
    var altsDisabled = false;

	$(alt1.id).click(function(event) {
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

	$(alt2.id).click(function(event) {
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
	var centerDisabled = false;

	$("#center").click(function(event) {

		if (centerDisabled)
			return;

		wheel_position = (wheel_position + 90) % 360;

		moveWall("center");

		/*$("#center").animate({
			"-webkit-transform": 	"rotate("+wheel_position+"deg)",
			transform:		"rotate("+wheel_position+"deg)"
		});*/

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
