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
var coordinates=[[50,200],[200,50],[350,200],[200,350],[360,150],[320,290],[250,380],[200,420],[150,250],[100,210]];

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
var clipEdge=1;

//Used For Every Iteration of the Polygon with respect to a single side 
var l=0;

//Function for Drawing the Square
function square_draw()  
{
	context.strokeStyle = 'black' ;
	//drawing line 1
	context.beginPath();
	context.moveTo(ax, ay);
	context.lineTo(bx, by);
	context.stroke();	

	//drawing line 2
	context.beginPath();
	context.moveTo(bx, by);
	context.lineTo(cx,cy);
	context.stroke();

	//drawing line 3
	context.beginPath();
	context.moveTo(cx, cy);
	context.lineTo(dx, dy);
	context.stroke();

	//drawing line 4
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
	clip();
	l++;
}

//Function To clip the edge It gets called by clipping() function and it clips the respective edge
function clip()
{
	switch(clipEdge)
	{
		case 1: 
				clip_left(polygonPath,l);
				break;
		
		case 2: 
				clip_top(polygonPath,l);
				break;

		case 3: 
				clip_right(polygonPath,l);
				break;

		case 4: 
				clip_down(polygonPath,l);
				break;
		
		case 5: 
				context.clearRect(0, 0, 500, 500);
				context.fillStyle = 'red';
				drawPolygon(polygonPath);
				document.getElementById("print1").innerHTML = "Coordinates Of New Polygon Are";
				document.getElementById("print2").innerHTML = polygonPath;
				document.getElementById("print3").innerHTML = "New Sides - " + (polygonPath.length-1);
				document.getElementById("print4").innerHTML = "Experiment Ends Here";
				document.getElementById("print5").innerHTML = "To Perform Experiment Again ";
				document.getElementById("print6").innerHTML = "Please Close the Current Window and Reopen the page";
				break;
	}
}

//Clip the Left Edge
function clip_left(path,i)
{
	document.getElementById("print1").innerHTML = "Clipping Left Edge";
	
	if(i>=0 && i<path.length-1)
	{
		document.getElementById("print2").innerHTML = "With respect to line "+ (i+1);
		drawLine(path[i],path[i+1]);
		if(!isInside(path[i], 'left') && !isInside(path[i+1], 'left'))
		{//No point Inside
		document.getElementById("print3").innerHTML = path[i] + " is Outside & " + path[i+1] +" is Outside";
		document.getElementById("print4").innerHTML = "Therefore Adding No Points";
		}
		
		else if(isInside(path[i], 'left') && isInside(path[i+1], 'left'))
		{//Both Inside 
			document.getElementById("print3").innerHTML = path[i] + " is Inside & " + path[i+1] +" is Inside";
			document.getElementById("print4").innerHTML = "Therefore Adding Second Point - "+ path[i+1] ;
			clippedPath.push(path[i+1]);
		}
		
		else if(isInside(path[i], 'left') && !isInside(path[i+1], 'left'))
		{//First In second out
			document.getElementById("print3").innerHTML = path[i] + " is Inside & " + path[i+1] +" is Outside";
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'left');
			document.getElementById("print4").innerHTML = "Therefore Adding Intersection Point - "+ intersection;
			clippedPath.push(intersection);
		}
		
		else if(!isInside(path[i], 'left') && isInside(path[i+1], 'left'))
		{//First Out Second In 
			document.getElementById("print3").innerHTML = path[i] + " is Outside & " + path[i+1] +" is Inside";
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'left');
			document.getElementById("print4").innerHTML = "Therefore Adding Intersection Point - "+ intersection +" & Second Point - " + path[i+1];
			clippedPath.push(intersection);
			clippedPath.push(path[i+1]);
		}
	}
	else if(i == path.length-1)
	{
		document.getElementById("print2").innerHTML = "With respect to line "+ (i+1);
		//For Adding Last Point And First Point
		drawLine(path[path.length-1],path[0]);
		if(!isInside(path[path.length-1], 'left') && !isInside(path[0], 'left'))
		{//No point Inside
			document.getElementById("print3").innerHTML = path[path.length-1] + " is Outside & " + path[0] +" is Outside";
			document.getElementById("print4").innerHTML = "Therefore Adding No Points";
		}
		
		else if(isInside(path[path.length-1], 'left') && isInside(path[0], 'left'))
		{//Both Inside 
			document.getElementById("print3").innerHTML = path[path.length-1] + " is Inside & " + path[0] +" is Inside";
			document.getElementById("print4").innerHTML = "Therefore Adding Second Point - "+ path[0] ;
		}
		
		else if(isInside(path[path.length-1], 'left') && !isInside(path[0], 'left'))
		{//First In second out
			document.getElementById("print3").innerHTML = path[path.length-1] + " is Inside & " + path[0] +" is Inside";
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'left');
			document.getElementById("print4").innerHTML = "Therefore Adding Intersection Point - "+ intersection ;
			clippedPath.push(intersection);
		}
		
		else if(!isInside(path[path.length-1], 'left') && isInside(path[0], 'left'))
		{//First Out Second In 
			document.getElementById("print3").innerHTML = path[path.length-1] + " is Outside & " + path[0] +" is Inside";
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'left');
			document.getElementById("print4").innerHTML = "Therefore Adding Intersection Point - "+ intersection +" & Second Point - " + path[0];
			clippedPath.push(intersection);
			clippedPath.push(path[0]);
		}	
	}
	else if(i == path.length)
	{
		document.getElementById("print1").innerHTML = "Clipped All Sides With respect to left Edge";
		document.getElementById("print2").innerHTML = " ";
		document.getElementById("print3").innerHTMl = " ";
		document.getElementById("print4").innerHTML = " ";
		clippedPath.push(clippedPath[0]);
		context.clearRect(0, 0, 500, 500);
		context.fillStyle = 'white';
		drawPolygon(path);
		context.fillStyle = 'lightgreen';
		drawPolygon(clippedPath);
		document.getElementById("print1").innerHTML = "Clipped All Sides With respect to left Edge";
		document.getElementById("print2").innerHTML = " ";
		document.getElementById("print3").innerHTMl = " ";
		document.getElementById("print4").innerHTML = " ";
		polygonPath=clippedPath.slice();
		clippedPath = [];
		clipEdge++;
		l=-1;
	}
}

//Clip the Top Edge
function clip_top(path,i)
{
	document.getElementById("print1").innerHTML = "Clipping Top Edge";
	
	if(i<path.length-1)
	{
		document.getElementById("print2").innerHTML = "With respect to line "+ (i+1);
		drawLine(path[i],path[i+1]);
		if(!isInside(path[i], 'top') && !isInside(path[i+1], 'top'))
		{//No point Inside
		document.getElementById("print3").innerHTML = path[i] + " is Outside & " + path[i+1] +" is Outside";
		document.getElementById("print4").innerHTML = "Therefore Adding No Points";
		}
		
		else if(isInside(path[i], 'top') && isInside(path[i+1], 'top'))
		{//Both Inside 
			document.getElementById("print3").innerHTML = path[i] + " is Inside & " + path[i+1] +" is Inside";
			document.getElementById("print4").innerHTML = "Therefore Adding Second Point - "+ path[i+1] ;
			clippedPath.push(path[i+1]);
		}
		
		else if(isInside(path[i], 'top') && !isInside(path[i+1], 'top'))
		{//First In second out
			document.getElementById("print3").innerHTML = path[i] + " is Inside & " + path[i+1] +" is Outside";
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'top');
			document.getElementById("print4").innerHTML = "Therefore Adding Intersection Point - "+ intersection;
			clippedPath.push(intersection);
		}
		
		else if(!isInside(path[i], 'top') && isInside(path[i+1], 'top'))
		{//First Out Second In 
			document.getElementById("print3").innerHTML = path[i] + " is Outside & " + path[i+1] +" is Inside";
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'top');
			document.getElementById("print4").innerHTML = "Therefore Adding Intersection Point - "+ intersection +" & Second Point - " + path[i+1];
			clippedPath.push(intersection);
			clippedPath.push(path[i+1]);
		}
	}
	else if(i == path.length-1)
	{
		document.getElementById("print2").innerHTML = "With respect to line "+ (i+1);
		//For Adding Last Point And First Point
		drawLine(path[path.length-1],path[0]);
		if(!isInside(path[path.length-1], 'top') && !isInside(path[0], 'top'))
		{//No point Inside
			document.getElementById("print3").innerHTML = path[path.length-1] + " is Outside & " + path[0] +" is Outside";
			document.getElementById("print4").innerHTML = "Therefore Adding No Points";
		}
		
		else if(isInside(path[path.length-1], 'top') && isInside(path[0], 'top'))
		{//Both Inside 
			document.getElementById("print3").innerHTML = path[path.length-1] + " is Inside & " + path[0] +" is Inside";
			document.getElementById("print4").innerHTML = "Therefore Adding Second Point - "+ path[0] ;
		}
		
		else if(isInside(path[path.length-1], 'top') && !isInside(path[0], 'top'))
		{//First In second out
			document.getElementById("print3").innerHTML = path[path.length-1] + " is Inside & " + path[0] +" is Inside";
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'top');
			document.getElementById("print4").innerHTML = "Therefore Adding Intersection Point - "+ intersection ;
			clippedPath.push(intersection);
		}
		
		else if(!isInside(path[path.length-1], 'top') && isInside(path[0], 'top'))
		{//First Out Second In 
			document.getElementById("print3").innerHTML = path[path.length-1] + " is Outside & " + path[0] +" is Inside";
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'top');
			document.getElementById("print4").innerHTML = "Therefore Adding Intersection Point - "+ intersection +" & Second Point - " + path[0];
			clippedPath.push(intersection);
			clippedPath.push(path[0]);
		}	
	}
	else if(i == path.length)
	{
		document.getElementById("print1").innerHTML = "Clipped All Sides With respect to Top Edge";
		document.getElementById("print2").innerHTML = " ";
		document.getElementById("print3").innerHTMl = " ";
		document.getElementById("print4").innerHTML = " ";
		clippedPath.push(clippedPath[0]);
		context.clearRect(0, 0, 500, 500);
		context.fillStyle = 'white';
		drawPolygon(path);
		context.fillStyle = 'yellow';
		drawPolygon(clippedPath);
		document.getElementById("print1").innerHTML = "Clipped All Sides With respect to Top Edge";
		document.getElementById("print2").innerHTML = " ";
		document.getElementById("print3").innerHTMl = " ";
		document.getElementById("print4").innerHTML = " ";
		clipEdge++;
		polygonPath=clippedPath.slice();
		clippedPath = [];
		l=-1;
	}	
}

//Clip the Right Edge
function clip_right(path,i)
{
	document.getElementById("print1").innerHTML = "Clipping Right Edge";
	
	if(i<path.length-1)
	{
		document.getElementById("print2").innerHTML = "With respect to line "+ (i+1);
		drawLine(path[i],path[i+1]);
		if(!isInside(path[i], 'right') && !isInside(path[i+1], 'right'))
		{//No point Inside
		document.getElementById("print3").innerHTML = path[i] + " is Outside & " + path[i+1] +" is Outside";
		document.getElementById("print4").innerHTML = "Therefore Adding No Points";
		}
		
		else if(isInside(path[i], 'right') && isInside(path[i+1], 'right'))
		{//Both Inside 
			document.getElementById("print3").innerHTML = path[i] + " is Inside & " + path[i+1] +" is Inside";
			document.getElementById("print4").innerHTML = "Therefore Adding Second Point - "+ path[i+1] ;
			clippedPath.push(path[i+1]);
		}
		
		else if(isInside(path[i], 'right') && !isInside(path[i+1], 'right'))
		{//First In second out
			document.getElementById("print3").innerHTML = path[i] + " is Inside & " + path[i+1] +" is Outside";
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'right');
			document.getElementById("print4").innerHTML = "Therefore Adding Intersection Point - "+ intersection;
			clippedPath.push(intersection);
		}
		
		else if(!isInside(path[i], 'right') && isInside(path[i+1], 'right'))
		{//First Out Second In 
			document.getElementById("print3").innerHTML = path[i] + " is Outside & " + path[i+1] +" is Inside";
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'right');
			document.getElementById("print4").innerHTML = "Therefore Adding Intersection Point - "+ intersection +" & Second Point - " + path[i+1];
			clippedPath.push(intersection);
			clippedPath.push(path[i+1]);
		}
	}
	else if(i == path.length-1)
	{
		document.getElementById("print2").innerHTML = "With respect to line "+ (i+1);
		//For Adding Last Point And First Point
		drawLine(path[path.length-1],path[0]);
		if(!isInside(path[path.length-1], 'right') && !isInside(path[0], 'right'))
		{//No point Inside
			document.getElementById("print3").innerHTML = path[path.length-1] + " is Outside & " + path[0] +" is Outside";
			document.getElementById("print4").innerHTML = "Therefore Adding No Points";
		}
		
		else if(isInside(path[path.length-1], 'right') && isInside(path[0], 'right'))
		{//Both Inside 
			document.getElementById("print3").innerHTML = path[path.length-1] + " is Inside & " + path[0] +" is Inside";
			document.getElementById("print4").innerHTML = "Therefore Adding Second Point - "+ path[0] ;
		}
		
		else if(isInside(path[path.length-1], 'right') && !isInside(path[0], 'right'))
		{//First In second out
			document.getElementById("print3").innerHTML = path[path.length-1] + " is Inside & " + path[0] +" is Inside";
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'left');
			document.getElementById("print4").innerHTML = "Therefore Adding Intersection Point - "+ intersection ;
			clippedPath.push(intersection);
		}
		
		else if(!isInside(path[path.length-1], 'right') && isInside(path[0], 'right'))
		{//First Out Second In 
			document.getElementById("print3").innerHTML = path[path.length-1] + " is Outside & " + path[0] +" is Inside";
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'right');
			document.getElementById("print4").innerHTML = "Therefore Adding Intersection Point - "+ intersection +" & Second Point - " + path[0];
			clippedPath.push(intersection);
			clippedPath.push(path[0]);
		}	
	}
	else if(i == path.length)
	{
		document.getElementById("print1").innerHTML = "Clipped All Sides With respect to Right Edge";
		document.getElementById("print2").innerHTML = " ";
		document.getElementById("print3").innerHTMl = " ";
		document.getElementById("print4").innerHTML = " ";
		clippedPath.push(clippedPath[0]);
		context.clearRect(0, 0, 500, 500);
		context.fillStyle = 'white';
		drawPolygon(path);
		context.fillStyle = 'green';
		drawPolygon(clippedPath);
		clipEdge++;
		polygonPath=clippedPath.slice();
		clippedPath = [];
		l=-1;
	}		
}

//Clip the Bottom Edge
function clip_down(path,i)
{
	document.getElementById("print1").innerHTML = "Clipping Down Edge";
	
	if(i<path.length-1)
	{
		document.getElementById("print2").innerHTML = "With respect to line "+ (i+1);
		drawLine(path[i],path[i+1]);
		if(!isInside(path[i], 'down') && !isInside(path[i+1], 'down'))
		{//No point Inside
		document.getElementById("print3").innerHTML = path[i] + " is Outside & " + path[i+1] +" is Outside";
		document.getElementById("print4").innerHTML = "Therefore Adding No Points";
		}
		
		else if(isInside(path[i], 'down') && isInside(path[i+1], 'down'))
		{//Both Inside 
			document.getElementById("print3").innerHTML = path[i] + " is Inside & " + path[i+1] +" is Inside";
			document.getElementById("print4").innerHTML = "Therefore Adding Second Point - "+ path[i+1] ;
			clippedPath.push(path[i+1]);
		}
		
		else if(isInside(path[i], 'down') && !isInside(path[i+1], 'down'))
		{//First In second out
			document.getElementById("print3").innerHTML = path[i] + " is Inside & " + path[i+1] +" is Outside";
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'down');
			document.getElementById("print4").innerHTML = "Therefore Adding Intersection Point - "+ intersection;
			clippedPath.push(intersection);
		}
		
		else if(!isInside(path[i], 'down') && isInside(path[i+1], 'down'))
		{//First Out Second In 
			document.getElementById("print3").innerHTML = path[i] + " is Outside & " + path[i+1] +" is Inside";
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'down');
			document.getElementById("print4").innerHTML = "Therefore Adding Intersection Point - "+ intersection +" & Second Point - " + path[i+1];
			clippedPath.push(intersection);
			clippedPath.push(path[i+1]);
		}
	}
	else if(i == path.length-1)
	{
		document.getElementById("print2").innerHTML = "With respect to line "+ (i+1);
		//For Adding Last Point And First Point
		drawLine(path[path.length-1],path[0]);
		if(!isInside(path[path.length-1], 'down') && !isInside(path[0], 'down'))
		{//No point Inside
			document.getElementById("print3").innerHTML = path[path.length-1] + " is Outside & " + path[0] +" is Outside";
			document.getElementById("print4").innerHTML = "Therefore Adding No Points";
		}
		
		else if(isInside(path[path.length-1], 'down') && isInside(path[0], 'down'))
		{//Both Inside 
			document.getElementById("print3").innerHTML = path[path.length-1] + " is Inside & " + path[0] +" is Inside";
			document.getElementById("print4").innerHTML = "Therefore Adding Second Point - "+ path[0] ;
		}
		
		else if(isInside(path[path.length-1], 'down') && !isInside(path[0], 'down'))
		{//First In second out
			document.getElementById("print3").innerHTML = path[path.length-1] + " is Inside & " + path[0] +" is Inside";
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'down');
			document.getElementById("print4").innerHTML = "Therefore Adding Intersection Point - "+ intersection ;
			clippedPath.push(intersection);
		}
		
		else if(!isInside(path[path.length-1], 'down') && isInside(path[0], 'down'))
		{//First Out Second In 
			document.getElementById("print3").innerHTML = path[path.length-1] + " is Outside & " + path[0] +" is Inside";
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'down');
			document.getElementById("print4").innerHTML = "Therefore Adding Intersection Point - "+ intersection +" & Second Point - " + path[0];
			clippedPath.push(intersection);
			clippedPath.push(path[0]);
		}	
	}
	else if(i == path.length)
	{
		document.getElementById("print1").innerHTML = "Clipped All Sides With respect to Right Edge";
		document.getElementById("print2").innerHTML = " ";
		document.getElementById("print3").innerHTMl = " ";
		document.getElementById("print4").innerHTML = " ";
		clippedPath.push(clippedPath[0]);
		context.clearRect(0, 0, 500, 500);
		context.fillStyle = 'white';
		drawPolygon(path);
		context.fillStyle = 'blue';
		drawPolygon(clippedPath);
		clipEdge++;
		polygonPath=clippedPath.slice();
		clippedPath = [];
		l=-1;
	}
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
	intersection[0]=Math.round(intersection[0]);
	intersection[1]=Math.round(intersection[1]);
	return intersection;
}	

//returns true if the point is inside with respect to a particular edge else false
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
	context.clearRect(0,0,500,500);
	square_draw();
	context.beginPath();
	
	context.moveTo(path[0][0], path[0][1]);
	for(i=1; i<path.length; i++)
	{
		context.lineTo(path[i][0], path[i][1]);
	}
	context.fill();
}
//Draws Line For Each Iteration
function drawLine(point1,point2)
{
	/*var gradient = context.createLinearGradient(0, 0, 170, 0);
	gradient.addColorStop("0", "magenta");
	gradient.addColorStop("0.5", "blue");
	gradient.addColorStop("1.0", "red");
	*/
	
	context.beginPath();
	context.moveTo(point1[0],point1[1]);
	context.lineTo(point2[0],point2[1]);
	context.strokeStyle = 'blue';
	context.lineWidth = 2;
	context.stroke();
}