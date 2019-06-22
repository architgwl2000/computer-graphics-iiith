//Getting the Canvas Element
var c = document.getElementById("myCanvas"); 
var context = c.getContext("2d");

//Google "html5 compositing"
context.globalCompositeOperation = 'source-over';

//For Printing The Values
var p0=document.getElementById("print0");
var p1=document.getElementById("print1");
var p2=document.getElementById("print2");
var p3=document.getElementById("print3");
var p4=document.getElementById("print4");
var p5=document.getElementById("print5");
var p6=document.getElementById("print6");
var p7=document.getElementById("print7");
var p8=document.getElementById("print8");
var p9=document.getElementById("print9");

//Declaring the variables for input values
var width, height;//for width and Height of the Polygon
var polyside;//For Sides Of the Polygon
var polyco;//For storing the coordinates in Text Form
var polygonPath=[];//For Storing actual Coordinates;
var lineRecord=[];
//var coordinates=[[2,2],[2,8],[8,8],[8,2],[10,10],[12,13],[14,15],[16,17],[18,19],[20,21]];//temproray storage of coordinates
var coordinates=[[50,200],[200,50],[350,200],[200,350],[360,150],[320,290],[250,380],[200,420],[150,250],[100,210]];


function update() 
{
	//Getting the values given by the user
	width=document.getElementById("width").value;
	height=document.getElementById("height").value;
	polyco = document.getElementById("polyco").value;
	polyside=document.getElementById("polyside").value;

	//Clearing canvas
	context.clearRect(0,0,500,550);

	//Clearing all back values
	polygonPath=[];
	lineRecord=[];
}

function initial()
{
	/*update();
	var x=0,y=0;
	var j=0,i=0;
	for(i=0;i<polyco.length;i++)
	{
		if(polyco[i]== " " || polyco[i]== ",")
		{
			coordinates[x][y]=Number(polyco.substring(j,i));
			y++;
			j=i+1;
			if(polyco[i] == ",")
			{
				x++;
				y=0;
			}
		}
	}*/
	alert(coordinates);
}