
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	var x1s=document.getElementById("x1s").value;
	var x2s=document.getElementById("x2s").value;
	var y1s=document.getElementById("y1s").value;
	var y2s=document.getElementById("y2s").value;

	
	ctx.strokeRect(x1s, y1s, x2s - x1s, y2s - y1s);
	