$(function() {
	$("#maze").click(function(event) {
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
	});
});