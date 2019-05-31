//Getting the Canvas Element
var c = document.getElementById("myCanvas"); 
var context = c.getContext("2d");

//Google "html5 compositing"
context.globalCompositeOperation = 'source-over';


//Getting All the Inputs Given by the User 
var x1s=document.getElementById("x1s").value;
var x2s=document.getElementById("x2s").value;
var y1s=document.getElementById("y1s").value;
var y2s=document.getElementById("y2s").value;
var polyco = document.getElementById("polyco").value;
var polyside=document.getElementById("polyside").value;
var polyco_length=polyco.length;
var coordinates=[[20,120],[120,20],[150,135],[200,200],[360,150],[320,290],[250,380],[200,420],[150,250],[100,210]];

//Coordinates of the Rectangle
var ax = x1s;
var ay = y1s;
var bx = x2s;
var by = y1s;
var cx = x2s;
var cy = y2s;
var dx = x1s;
var dy = y2s;

//Min and Max Coordinates Of the rectangle
var xmin = ax;
var xmax = cx;
var ymin = ay;
var ymax = cy;

//Array Of Saving the Coordinates Of the Polygon Current And Clipped
var polygonPath=[];
var clippedPath=[];

//Used In Clip Fuction as SwtichVariable for Clipping Squencially left-top-right-bottom
var clipEdge=0;

//Function for Drawing the Square
function square_draw()  
{
		//drawing line x=200, of length 300 units (pixels)
			context.beginPath();
			context.moveTo(ax, ay);
			context.lineTo(bx, by);
			context.stroke();	

			//drawing line y=200, length 300 pixels
			context.beginPath();
			context.moveTo(bx, by);
			context.lineTo(cx,cy);
			context.stroke();

			//drawing line x=500
			context.beginPath();
			context.moveTo(cx, cy);
			context.lineTo(dx, dy);
			context.stroke();

			//drawing line y=500
			context.beginPath();
			context.moveTo(dx, dy);
			context.lineTo(ax, ay);
			context.stroke();
}


//Function For Converting the polygon text coordinates to the coordinates stored in array	
function poly_draw()
{

	var x=0,y=0;
	var j=0,i=0;
	for(i=0;i<polyco_length;i++)
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
	for (i = 0; i<polyside; i++) 
	{
			polygonPath.push([coordinates[i][0], coordinates[i][1]]);
	}
	square_draw();
	context.fillStyle = 'red';
	drawPolygon(polygonPath);
}

//Function Clipping executes On Clicking Clip Everytime
function clipping()
{
	clipEdge++;
	clip(polygonPath);
}



function clip(path)
{
	switch(clipEdge)
	{
		case 1: 
				clip_left(path);
				break;
		
		case 2: 
				clippedPath = [];
				clip_top(path);
				break;

		case 3: 
				clippedPath = [];
				clip_right(path);
				break;

		case 4: 
				clippedPath = [];
				clip_down(path);
				break;
	}
}
//Clip the Left Edge
function clip_left(path)
{
	document.getElementById("print1").innerHTML = "Clipping from left";
	for(i=0; i<path.length-1; i++)
	{
		if(!isInside(path[i], 'left') && !isInside(path[i+1], 'left'))
		{
		}
		
		else if(isInside(path[i], 'left') && isInside(path[i+1], 'left'))
		{
			clippedPath.push(path[i]);
		}
		
		else if(isInside(path[i], 'left'))
		{
			if(!isInside(path[i+1], 'left'))
			{
				endpoints = [path[i], path[i+1]];
				intersection = find_intersection(endpoints, 'left');

				clippedPath.push(path[i]);
				clippedPath.push(intersection);
			}
		}
		else if(!isInside(path[i], 'left'))
		{
			if(isInside(path[i+1], 'left'))
			{
				endpoints = [path[i], path[i+1]];
				intersection = find_intersection(endpoints, 'left');

				clippedPath.push(intersection);
				clippedPath.push(path[i+1]);
			}
		}
	}
	clippedPath.push(clippedPath[0]);
	context.clearRect(0, 0, 500, 500);
	context.fillStyle = 'white';
	drawPolygon(path);
	context.fillStyle = 'lightgreen';
	drawPolygon(clippedPath);
}
//Clip the Top Edge
function clip_top(path)
{
	document.getElementById("print1").innerHTML = "Clipping from top";
	for(i=0; i<path.length-1; i++)
	{
		if(!isInside(path[i], 'top') && !isInside(path[i+1], 'top'))
		{
			//No points are added to the clipped polygon
		}	
		else if(isInside(path[i], 'top') && isInside(path[i+1], 'top'))
		{
			clippedPath.push(path[i]);
		}
		else if(isInside(path[i], 'top'))
		{
			if(!isInside(path[i+1], 'top'))
			{
				endpoints = [path[i], path[i+1]];
				intersection = find_intersection(endpoints, 'top');
		
				clippedPath.push(path[i]);
				clippedPath.push(intersection);
			}
		}
		else if(!isInside(path[i], 'top'))
		{
			if(isInside(path[i+1], 'top'))
			{
				endpoints = [path[i], path[i+1]];
				intersection = find_intersection(endpoints, 'top');

				clippedPath.push(intersection);
				clippedPath.push(path[i+1]);
			}
		}
	}

	clippedPath.push(clippedPath[0]);	
	context.clearRect(0, 0, 500, 500);
	context.fillStyle = 'white';
	drawPolygon(path);
	context.fillStyle = 'orange';
	drawPolygon(clippedPath);
		
}
//Clip the Right Edge
function clip_right(path)
{
	document.getElementById("print1").innerHTML = "Clipping from right";

	for(i=0; i<path.length-1; i++)
	{
		if(!isInside(path[i], 'right') && !isInside(path[i+1], 'right'))
		{
		}
		
		else if(isInside(path[i], 'right') && isInside(path[i+1], 'right'))
		{
			clippedPath.push(path[i]);
		}
		
		else if(isInside(path[i], 'right'))
		{
			if(!isInside(path[i+1], 'right'))
			{
				endpoints = [path[i], path[i+1]];
				intersection = find_intersection(endpoints, 'right');

				clippedPath.push(path[i]);
				clippedPath.push(intersection);
			}
		}
		else if(!isInside(path[i], 'right'))
		{
			if(isInside(path[i+1], 'right'))
			{
				endpoints = [path[i], path[i+1]];
				intersection = find_intersection(endpoints, 'right');

				clippedPath.push(intersection);
				clippedPath.push(path[i+1]);
			}
		}
	}
	clippedPath.push(clippedPath[0]);
	context.clearRect(0, 0, 500, 500);	
	context.fillStyle = 'white';
	drawPolygon(path);
	context.fillStyle = 'yellow';
	drawPolygon(clippedPath);
			
}
//Clip the Bottom Edge
function clip_down(path)
{
	document.getElementById("print1").innerHTML = "Clipping from down";
	for(i=0; i<path.length-1; i++)
	{
		if(!isInside(path[i], 'down') && !isInside(path[i+1], 'down'))
		{

		}
		else if(isInside(path[i], 'down') && isInside(path[i+1], 'down'))
		{
			clippedPath.push(path[i]);
		}
		else if(isInside(path[i], 'down'))
		{
			if(!isInside(path[i+1], 'down'))
			{
				endpoints = [path[i], path[i+1]];
				intersection = find_intersection(endpoints, 'down');

				clippedPath.push(path[i]);
				clippedPath.push(intersection);
			}
		}
		else if(!isInside(path[i], 'down'))
		{
			if(isInside(path[i+1], 'down'))
			{
				endpoints = [path[i], path[i+1]];
				intersection = find_intersection(endpoints, 'down');

				clippedPath.push(intersection);
				clippedPath.push(path[i+1]);
			}
		}

	}
	clippedPath.push(clippedPath[0]);
	context.clearRect(0, 0, 500, 500);	
	context.fillStyle = 'white';
	drawPolygon(path);
	context.fillStyle = 'blue';
	drawPolygon(clippedPath);
}
//find the Intersection
function find_intersection(endpoints, edge)
{
	//endpoints - the end points of an edge of the polygon
	//edge - the edge with which we want to calculate the intersection with

	intersection = [];

	//all lines are of the form y = mx + c
	//m = (y2-y1)/(x2-x1)

	start = endpoints[0];
	end = endpoints[1];

	x1 = start[0];
	y1 = start[1];
	x2 = end[0];
	y2 = end[1];

	m = (y2-y1)/(x2-x1);

	//find the constant c

	c = y1 - m*x1;

	//To find intersection with left edge
	if(edge == 'left')
	{
		intersection[0] = xmin;
		intersection[1] = m*xmin + c;
	}
	else if(edge == 'right')
	{
		intersection[0] = xmax;
		intersection[1] = m*xmax + c;
	}
	else if(edge == 'top')
	{
		intersection[0] = (ymin - c)/m;
		intersection[1] = ymin;
	}
	else if(edge == 'down')
	{
		intersection[0] = (ymax - c)/m;
		intersection[1] = ymax;
	}

	return intersection;
}	

//returns true if the point is inside with respect to a particular edge
function isInside(point, orientation)
{
	x = point[0];
	y = point[1];

	if(orientation == 'left')
	{
		if(x > xmin)
			return true;
		else
			return false;
	}

	else if(orientation == 'top')
	{
		if(y > ymin)
			return true;
		else
			return false;
	}

	else if(orientation == 'right')
	{
		if(x < xmax)
			return true;
		else
			return false;
	}

	else if(orientation == 'down')
	{
		if(y < ymax)
			return true;
		else
			return false;
	}
}
//Draws the Polygon
function drawPolygon(path)
{
	context.beginPath();
	
	context.moveTo(path[0][0], path[0][1]);
	for(i=1; i<path.length; i++)
	{
		context.lineTo(path[i][0], path[i][1]);
	}
	context.fill();
	square_draw();
	square_draw();

}