var c = document.getElementById("myCanvas"); //Getting the Canvas Element
var ctx = c.getContext("2d");
	//Getting the Rectangle Coordinates
	var x1s=document.getElementById("x1s").value;
	var x2s=document.getElementById("x2s").value;
	var y1s=document.getElementById("y1s").value;
	var y2s=document.getElementById("y2s").value;
function square_draw()  //Function for Drawing the Square
{
	ctx.strokeRect(x1s, y1s, x2s - x1s, y2s - y1s);
}	
function poly_draw()
{
	var polyco = document.getElementById("polyco").value;
	var polyside=document.getElementById("polyside").value;
	var polyco_length=polyco.length;
	var coordinates=[[20,120],[120,20],[150,135],[200,200],[360,150],[320,290],[250,380],[200,420],[150,250],[100,210]];
	var x=0,y=0;
	var j=0;
	for(var i=0;i<polyco_length;i++)
	{
		if(polyco[i]== " " || polyco[i]== ",")
		{
			coordinates[x][y]=10*parseInt(polyco.substring(j,i-1));
			y++;
			j=i+1;
			if(polyco[i] == ",")
			{
				x++;
				y=0;
			}
		}
		
	}
	ctx.fillStyle = 'lightgreen';
	ctx.beginPath();
	ctx.moveTo(coordinates[polyside-1][0], coordinates[polyside-1][1]);
	var i;
	for(i=0;i<polyside;i++)
	{
		ctx.lineTo(coordinates[i][0],coordinates[i][1]);
		
	}
	ctx.closePath();
	ctx.fill();

	square_draw();

}