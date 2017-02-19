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

	var wheel_position = 0;
	var centerDisabled = false;

	$("#center").click(function(event) {

		if (centerDisabled)
			return;

		wheel_position = (wheel_position + 90) % 360;

		var params = {
			id: "center"
		};

		$.ajax({
			url: "move_wall?" + $.param(params),
			type: "GET"
		})
		.done(record);

		function record(){
			console.log("center wheel succesfully rotated");
		};

		/*$("#center").animate({
			"-webkit-transform": 	"rotate("+wheel_position+"deg)",
			transform:		"rotate("+wheel_position+"deg)"
		});*/

		centerDisabled = true;
		setTimeout(function(){centerDisabled = false;}, 3000);

	});
});
