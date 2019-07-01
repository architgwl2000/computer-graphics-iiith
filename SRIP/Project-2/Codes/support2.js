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
var coordinates=[[2,2],[2,8],[8,8],[8,2],[10,10],[12,13],[14,15],[16,17],[18,19],[20,21]];//temporary storage of coordinates

//For Informing Initial Function If all Values are correct and within the range or not
var wrongInputs=0;

//Multiplication factor For Printing In canvas
var factor=50;

//Update Function
function update() 
{
	//Updating variable for wrong inputs
	wrongInputs=0;

	//Getting the values given by the user
	width=document.getElementById("width").value;
	height=document.getElementById("height").value;
	polyco = document.getElementById("polyco").value;
	polyside=document.getElementById("polyside").value;

	//Clearing canvas
	context.clearRect(0,0,550,550);

	//Clearing all back values
	polygonPath=[];
	lineRecord=[];

	//Clearing the Printing Area
	p1.innerHTML="Updates The Values ";
	p2.innerHTML="Now Start The Experiment";
	p3.innerHTML="";
	p4.innerHTML="";
	p5.innerHTML="";
	p6.innerHTML="";
	p7.innerHTML="";
	p8.innerHTML="";
	p9.innerHTML="";
	p0.innerHTML="";

	

	//Alert Conditions On entering wrong values by the user 
	var alreadyChecked=1;

	//Checking For the Wrong Inputs Given By the User
	if(width>25 || height>25 || width<1 || height<1)//for correct frame values 
	{
		p1.innerHTML="";
		p2.innerHTML="";
		alert("For Frame Width and Height\nMin. Value is 1\nMax. value is 25\nRe-enter the Values and Update");
		wrongInputs =1;
		alreadyChecked=0;
	}
	if(alreadyChecked)//for min. and max. polygon coordinate values
	{
		var p=0;var even=0;
		for(var q=0;q<polyco.length;q++)
		{
			if(polyco[q]== " " || polyco[q]== ",")
			{
				var t = Number(polyco.substring(p,q));
				p=q+1;
				if(t<0 || (even%2==0 && t>=width) || (even%2!=0 && t>=height))
				{
					p1.innerHTML="";
					p2.innerHTML="";
					alert("Polygon \nMin. value of coordinates (0,0)\nMax. value of coordinates ("+(width-1)+","+(height-1)+")\nRe-enter the Values and Update");
					wrongInputs=1;
					break;
				}
				even++;
			}
		}
	}
	alreadyChecked=1;
	if(polyside<3 || polyside>10)//for correct polygon sides
	{
		p1.innerHTML="";
		p2.innerHTML="";
		alert("Min. Value of Polygon Sides is 3 \nMax. Value of Polygon Sides is 10\nRe-enter the Values and Update");
		wrongInputs=1;
		alreadyChecked=0;

	}
	var commaCount =0;
	var spaceCount =0;
	for (var i = 0; i < polyco.length; i++) //for correct order of inputs in textarea
	{
		if(polyco[i] == "," && commaCount<polyside )
			commaCount++;
		if(polyco[i] == " " && commaCount<polyside)
			spaceCount++;
		if(isNaN(polyco[i]) && (polyco[i]!=" ") && (polyco[i]!=","))
		{
			p1.innerHTML="";
			p2.innerHTML="";
			alert("Polygon Coordinates Entered Wrong\nEnter the Coordinates in format - x1 y1,x2 y2,x3 y3,\nRe-enter the Values and Update");
			wrongInputs=1;
			alreadyChecked=0;
			break;
		}	
	}
	if(alreadyChecked)	
	{
		if(commaCount<polyside)
		{
			p1.innerHTML="";
			p2.innerHTML="";
			alert("Enter the Remaining Coordinates and Update");
			wrongInputs=1;
		}
		else if(spaceCount!=polyside)
		{
			p1.innerHTML="";
			p2.innerHTML="";
			alert("Remove The Extra Spaces\nEnter the Coordinates in format - x1 y1,x2 y2,x3 y3,\nRe-enter the Values and Update");
			wrongInputs=1;
		}
	}
}
//Start Experiment Connected with it
function initial()
{
	update();
	if(wrongInputs)
	{
	}
	else
	{
		p1.innerHTML="Experiment to begin soon";
		p2.innerHTML="";
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
		}
		for (i = 0; i<polyside; i++) 
		{
			polygonPath.push([coordinates[i][0], coordinates[i][1]]);
		}
		p2.innerHTML=polygonPath;
		drawPolygon(polygonPath);
		drawGrid();
		p1.innerHTML=" begin soon";
		p2.innerHTML="";
	}

}
//For Next iteration
function nextIteration()
{
}

//For previous iteration
function previousIteration() 
{
	// body...
}


//Draws the Polygon
function drawPolygon(path)
{
	var leftMargin =40;
	var bottomMargin =510;
	var align=factor/2;
	context.beginPath();
	context.moveTo(path[0][0]*factor+leftMargin+align,bottomMargin-path[0][1]*factor-align);
	for(i=1; i<path.length; i++)
	{
		context.lineTo(path[i][0]*factor+leftMargin+align,bottomMargin-path[i][1]*factor-align);
	}
	context.lineTo(path[0][0]*factor+leftMargin+align,bottomMargin-path[0][1]*factor-align);
	context.lineWidth = 3;
	context.strokeStyle = "yellow";
	context.stroke();
}

//Draws The Grid
function drawGrid()
{
	var leftMargin =40;
	var bottomMargin =510;
	var align=(factor/2)-5;
	context.beginPath();
	for(i=0; i<=width; i++)
	{
		if(i<width)
		{
			context.fillStyle = "white";
			context.font="15px Arial";
			context.fillText(i,leftMargin+i*factor+align,bottomMargin+15)
		}
		context.moveTo(leftMargin+i*factor,bottomMargin);
		context.lineTo(leftMargin+i*factor,bottomMargin-height*factor);
	}
	for(i=0; i<=height; i++)
	{
		if(i<height)
		{
			context.fillStyle = "white";
			context.font="15px Arial";
			context.fillText(i,leftMargin-15,bottomMargin-i*factor-align)
		}
		context.moveTo(leftMargin,bottomMargin-i*factor);
		context.lineTo(leftMargin+width*factor,bottomMargin-i*factor);
	}
	context.lineWidth = 1;
	context.strokeStyle = 'white';
	context.stroke();
}

