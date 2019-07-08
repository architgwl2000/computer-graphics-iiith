//Getting the Canvas Element
var c = document.getElementById("myCanvas"); 
var context = c.getContext("2d");

//Google "html5 compositing"
context.globalCompositeOperation = 'source-over';

//Getting All the Inputs Given by the User 
var x1s,x2s,y1s,y2s,polyco,polyside,polyco_length;
var coordinates=[[50,200],[200,50],[350,200],[200,350],[360,150],[320,290],[250,380],[200,420],[150,250],[100,210]];

//Coordinates of the Rectangle
var ax,ay,bx,by,cx,cy,dx,dy;

//Min and Max Coordinates Of the rectangle
var xmin,xmax,ymax,ymin;

//Array Of Saving the Coordinates Of the Polygon All, Current And Clipped
var allPath=[];
var polygonPath=[];
var clippedPath=[];
//Used In Clip Fuction as SwtichVariable for Clipping Squencially left-top-right-bottom
var clipEdge=1;

//Used For Every Iteration of the Polygon Clipping  a single side 
var l=0;

//For Printing The Values
var p1=document.getElementById("print1");
var p2=document.getElementById("print2");
var p3=document.getElementById("print3");
var p4=document.getElementById("print4");
var p5=document.getElementById("print5");
var p6=document.getElementById("print6");
var p7=document.getElementById("print7");
var p8=document.getElementById("print8");
var p9=document.getElementById("print9");
var p0=document.getElementById("print0");

//Checking If there Are Any Wrong Inputs
var wrong_inputs = 0;

//Function To Update The Default values And Overwrite the Polygon values
function update() 
{
	//Updating wrong Inputs
	wrong_inputs = 0;

  	//Getting All the Inputs Given by the User 
	x1s=document.getElementById("x1s").value;
	x2s=document.getElementById("x2s").value;
	y1s=document.getElementById("y1s").value;
	y2s=document.getElementById("y2s").value;
	polyco = document.getElementById("polyco").value;
	polyside=document.getElementById("polyside").value;
	polyco_length=polyco.length;

	//Updatation of all the values Required for the Experiment
	ax = x1s;
	ay = y1s;
	bx = x2s;
	by = y1s;
	cx = x2s;
	cy = y2s;
	dx = x1s;
	dy = y2s;
	xmin = ax;
	xmax = cx;
	ymin = ay;
	ymax = cy;
	allPath=[];
	polygonPath=[];
	clippedPath=[];
	clipEdge=1;
	l=0;

	//Clearing canvas
	context.clearRect(0,0,500,550);

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
	var already_checked=1;

	if(polyside<=2)
	{
		p1.innerHTML="";
		p2.innerHTML="";
		alert("Minimum No. of Polygon Sides is 3\nRe-enter the Values and Update");
		already_checked=0;
		wrong_inputs=1;
	}
	else if(polyside>=11)
	{
		p1.innerHTML="";
		p2.innerHTML="";
		alert("Maximum Sides of polygon that can be entered is 10\nRe-enter the Values and Update ");
		already_checked=0;
		wrong_inputs=1;
	}
	var comma_count =0;
	var space_count =0;
	for (var i = 0; i < polyco_length; i++) 
	{
		if(polyco[i] == "," && comma_count<polyside )
			comma_count++;
		if(polyco[i] == " " && comma_count<polyside)
			space_count++;
		if(isNaN(polyco[i]) && (polyco[i]!=" ") && (polyco[i]!=","))
		{
			p1.innerHTML="";
			p2.innerHTML="";
			alert("Polygon Coordinates Entered Wrong\nEnter the Coordinates in format - x1 y1,x2 y2,x3 y3,\nRe-enter the Values and Update");
			wrong_inputs=1;
			already_checked=0;
			break;
		}	
	}
	if(already_checked)	
	{
		if(comma_count<polyside)
		{
			p1.innerHTML="";
			p2.innerHTML="";
			alert("Enter the Remaining Coordinates and Update");
			wrong_inputs=1;
		}
		else if(space_count!=polyside)
		{
			p1.innerHTML="";
			p2.innerHTML="";
			alert("Remove The Extra Spaces\nEnter the Coordinates in format - x1 y1,x2 y2,x3 y3,\nRe-enter the Values and Update");
			wrong_inputs=1;
		}
	}
	already_checked=1;
	var p=0;
	for(var q=0;q<polyco_length;q++)
	{
		if(polyco[q]== " " || polyco[q]== ",")
		{
			var t = Number(polyco.substring(p,q));
			p=q+1;
			if(t>500 || t<0)
			{
				p1.innerHTML="";
				p2.innerHTML="";
				alert("For Both Rectangle and Polygon \nMin. value of coordinates (0,0)\nMax. value of coordinates (500,500)\nRe-enter the Values and Update");
				wrong_inputs=1;
				already_checked = 0;
				break;

			}
		}
	}
	if(already_checked)
	{
		if(x1s>500 || x2s>500 || y1s>500 || y2s>500 || x1s<0 || x2s<0 || y1s<0 || y2s<0)
		{  
			p1.innerHTML="";
			p2.innerHTML="";
			alert("For Both Rectangle and Polygon \nMin. value of coordinates (0,0)\nMax. value of coordinates (500,500)\nRe-enter the Values and Update");
			wrong_inputs=1;
		}
	}
}  

//Function For Converting the polygon text coordinates to the coordinates stored in array	
function initial()
{

	update();
	if (wrong_inputs) 
	{
		wrong_inputs=0;
	}
	else
	{
		p1.innerHTML="";
		p2.innerHTML="";
		var x=0,y=0;
		var j=0,i=0;
		for(i=0;i<polyco_length;i++)
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
		allPath.push(polygonPath);
		drawPolygon(polygonPath);
	}
}


//Function Clipping executes On Clicking Clip Everytime
function next_iteration()
{
	clip();
	l++;
}
//Previous Iteration
function prev_iteration()
{
	p1.innerHTML="";
	p2.innerHTML="";
	p3.innerHTML="";
	p4.innerHTML="";
	p5.innerHTML="";
	p6.innerHTML="";
	p7.innerHTML="";
	p8.innerHTML="";
	p9.innerHTML="";
	p0.innerHTML="";
	l=0;
	clippedPath=[];
	if(clipEdge == 1)
	{
		polygonPath= allPath[0].slice();
	}
	else if(clipEdge == 2)
	{
		polygonPath= allPath[0].slice();
		clipEdge = 1;
		allPath.splice(1);
	}
	else if(clipEdge == 3)
	{
		polygonPath= allPath[1].slice();
		clipEdge = 2;
		allPath.splice(2)
	}
	else if(clipEdge == 4)
	{
		polygonPath= allPath[2].slice();
		clipEdge = 3;
		allPath.splice(3);
	}
	else if(clipEdge == 5)
	{
		polygonPath = allPath[3].slice();
		clipEdge = 4;
		allPath.splice(4);
	}
	else
	{
		clipEdge--;
	}
	drawPolygon(polygonPath);
}
//Function To clip the edge It gets called by clipping() function and it clips the respective edge
function clip()
{
	switch(clipEdge)
	{
		case 1: //Clearing the Printing Area
				p1.innerHTML="";
				p2.innerHTML="";
				p3.innerHTML="";
				p4.innerHTML="";
				p5.innerHTML="";
				p6.innerHTML="";
				p7.innerHTML="";
				p8.innerHTML="";
				p9.innerHTML="";
				p0.innerHTML="";
				clip_left(polygonPath,l);
				break;
		
		case 2: //Clearing the Printing Area
				p1.innerHTML="";
				p2.innerHTML="";
				p3.innerHTML="";
				p4.innerHTML="";
				p5.innerHTML="";
				p6.innerHTML="";
				p7.innerHTML="";
				p8.innerHTML="";
				p9.innerHTML="";
				p0.innerHTML="";
				clip_top(polygonPath,l);
				break;

		case 3: //Clearing the Printing Area
				p1.innerHTML="";
				p2.innerHTML="";
				p3.innerHTML="";
				p4.innerHTML="";
				p5.innerHTML="";
				p6.innerHTML="";
				p7.innerHTML="";
				p8.innerHTML="";
				p9.innerHTML="";
				p0.innerHTML="";
				clip_right(polygonPath,l);
				break;

		case 4: //Clearing the Printing Area
				p1.innerHTML="";
				p2.innerHTML="";
				p3.innerHTML="";
				p4.innerHTML="";
				p5.innerHTML="";
				p6.innerHTML="";
				p7.innerHTML="";
				p8.innerHTML="";
				p9.innerHTML="";
				p0.innerHTML="";
				clip_down(polygonPath,l);
				break;
		
		case 5: //Clearing the Printing Area
				p1.innerHTML="";
				p2.innerHTML="";
				p3.innerHTML="";
				p4.innerHTML="";
				p5.innerHTML="";
				p6.innerHTML="";
				p7.innerHTML="";
				p8.innerHTML="";
				p9.innerHTML="";
				p0.innerHTML="";
				if(polygonPath.length!=0)
				{
					p1.innerHTML = "Experiment Ends Here";
					p2.innerHTML = "New Sides - " + (polygonPath.length);
					p3.innerHTML = "New Coordinates Of New Polygon Are";
					
        			var printer="";//For Storing The Coordinates In Printable Form 
        			for(var i=0;i<polygonPath.length;i++)
        			{	
               				printer=printer+"("+polygonPath[i][0]+","+polygonPath[i][1]+") ";
                	}
                	p7.innerHTML=printer;
			  
					drawPolygon(polygonPath);
				}
				else
				{
					context.clearRect(0,0,500,500);
					drawSquare();
					p1.innerHTML = "Polygon Lies Totally Outside the Clipping Window ";
					p2.innerHTML = "Therefore Clipping the whole polygon";
					p3.innerHTML = "";
					p4.innerHTML = "Experiment Ends Here";
					p5.innerHTML = "";
					p6.innerHTML = "";

				}
				break;
	}
}

//Clip the Left Edge
function clip_left(path,i)
{
	p2.innerHTML = "Against Left Side";
	
	if(i>=0 && i<path.length-1)
	{
		p1.innerHTML = "Clipping  line joining ("+ path[i] + ") & (" + path[i+1] + ")";
		drawLine(path[i],path[i+1],'left');
		if(!isInside(path[i], 'left') && !isInside(path[i+1], 'left'))
		{//No point Inside
			p3.innerHTML = path[i] + " is Outside & " + path[i+1] +" is Outside";
			p4.innerHTML = "Therefore Adding No Points";
		}
		
		else if(isInside(path[i], 'left') && isInside(path[i+1], 'left'))
		{//Both Inside 
			p3.innerHTML = path[i] + " is Inside & " + path[i+1] +" is Inside";
			p4.innerHTML = "Therefore Adding Second Point - "+ path[i+1] ;
			clippedPath.push(path[i+1]);
		}
		
		else if(isInside(path[i], 'left') && !isInside(path[i+1], 'left'))
		{//First In second out
			p3.innerHTML = path[i] + " is Inside & " + path[i+1] +" is Outside";
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'left');
			p4.innerHTML = "Therefore Adding Intersection Point - "+ intersection;
			clippedPath.push(intersection);
		}
		
		else if(!isInside(path[i], 'left') && isInside(path[i+1], 'left'))
		{//First Out Second In 
			p3.innerHTML = path[i] + " is Outside & " + path[i+1] +" is Inside";
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'left');
			p4.innerHTML = "Therefore Adding Intersection Point - "+ intersection +" & Second Point - " + path[i+1];
			clippedPath.push(intersection);
			clippedPath.push(path[i+1]);
		}
	}
	else if(i == path.length-1)
	{
		p1.innerHTML = "Clipping  line joining ("+ path[path.length-1] + ") & (" + path[0] + ")";
		//For Adding Last Point And First Point
		drawLine(path[path.length-1],path[0],'left');
		if(!isInside(path[path.length-1], 'left') && !isInside(path[0], 'left'))
		{//No point Inside
			p3.innerHTML = path[path.length-1] + " is Outside & " + path[0] +" is Outside";
			p4.innerHTML = "Therefore Adding No Points";
		}
		
		else if(isInside(path[path.length-1], 'left') && isInside(path[0], 'left'))
		{//Both Inside 
			p3.innerHTML = path[path.length-1] + " is Inside & " + path[0] +" is Inside";
			p4.innerHTML = "Therefore Adding Second Point - "+ path[0] ;
			clippedPath.push(path[0]);
		}
		
		else if(isInside(path[path.length-1], 'left') && !isInside(path[0], 'left'))
		{//First In second out
			p3.innerHTML = path[path.length-1] + " is Inside & " + path[0] +" is Inside";
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'left');
			p4.innerHTML = "Therefore Adding Intersection Point - "+ intersection ;
			clippedPath.push(intersection);
		}
		
		else if(!isInside(path[path.length-1], 'left') && isInside(path[0], 'left'))
		{//First Out Second In 
			p3.innerHTML = path[path.length-1] + " is Outside & " + path[0] +" is Inside";
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'left');
			p4.innerHTML = "Therefore Adding Intersection Point - "+ intersection +" & Second Point - " + path[0];
			clippedPath.push(intersection);
			clippedPath.push(path[0]);
		}	
	}
	else if(i == path.length)
	{
		p1.innerHTML = "Clipped Polygon w.r.t. left side";
		p2.innerHTML = " ";
		p3.innerHTML = " ";
		p4.innerHTML = " ";
		allPath.push(clippedPath);
		polygonPath=clippedPath.slice();
		clippedPath = [];
		clipEdge++;
		l=-1;
		if(polygonPath.length==0)
		{
			clipEdge=5;
		}
		else
		{
			p2.innerHTML="Current Coordinates of the Polygon are";
			var printer="";//For Storing The Coordinates In Printable Form 
			for(var i=0;i<polygonPath.length;i++)
        	{	
            	printer=printer+"("+polygonPath[i][0]+","+polygonPath[i][1]+") ";
            }
            p7.innerHTML=printer;
			drawPolygon(polygonPath);
		}
	}
}

//Clip the Top Edge
function clip_top(path,i)
{
	p2.innerHTML = "Against Top Side";
	
	if(i<path.length-1)
	{
		p1.innerHTML = "Clipping  line joining ("+ path[i] + ") & (" + path[i+1] + ")";
		drawLine(path[i],path[i+1],'top');
		if(!isInside(path[i], 'top') && !isInside(path[i+1], 'top'))
		{//No point Inside
		p3.innerHTML = path[i] + " is Outside & " + path[i+1] +" is Outside";
		p4.innerHTML = "Therefore Adding No Points";
		}
		
		else if(isInside(path[i], 'top') && isInside(path[i+1], 'top'))
		{//Both Inside 
			p3.innerHTML = path[i] + " is Inside & " + path[i+1] +" is Inside";
			p4.innerHTML = "Therefore Adding Second Point - "+ path[i+1] ;
			clippedPath.push(path[i+1]);
		}
		
		else if(isInside(path[i], 'top') && !isInside(path[i+1], 'top'))
		{//First In second out
			p3.innerHTML = path[i] + " is Inside & " + path[i+1] +" is Outside";
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'top');
			p4.innerHTML = "Therefore Adding Intersection Point - "+ intersection;
			clippedPath.push(intersection);
		}
		
		else if(!isInside(path[i], 'top') && isInside(path[i+1], 'top'))
		{//First Out Second In 
			p3.innerHTML = path[i] + " is Outside & " + path[i+1] +" is Inside";
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'top');
			p4.innerHTML = "Therefore Adding Intersection Point - "+ intersection +" & Second Point - " + path[i+1];
			clippedPath.push(intersection);
			clippedPath.push(path[i+1]);
		}
	}
	else if(i == path.length-1)
	{
		p1.innerHTML = "Clipping  line joining ("+ path[path.length-1] + ") & (" + path[0] + ")";
		//For Adding Last Point And First Point
		drawLine(path[path.length-1],path[0],'top');
		if(!isInside(path[path.length-1], 'top') && !isInside(path[0], 'top'))
		{//No point Inside
			p3.innerHTML = path[path.length-1] + " is Outside & " + path[0] +" is Outside";
			p4.innerHTML = "Therefore Adding No Points";
		}
		
		else if(isInside(path[path.length-1], 'top') && isInside(path[0], 'top'))
		{//Both Inside 
			p3.innerHTML = path[path.length-1] + " is Inside & " + path[0] +" is Inside";
			p4.innerHTML = "Therefore Adding Second Point - "+ path[0] ;
			clippedPath.push(path[0]);
		}
		
		else if(isInside(path[path.length-1], 'top') && !isInside(path[0], 'top'))
		{//First In second out
			p3.innerHTML = path[path.length-1] + " is Inside & " + path[0] +" is Outside";
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'top');
			p4.innerHTML = "Therefore Adding Intersection Point - "+ intersection ;
			clippedPath.push(intersection);
		}
		
		else if(!isInside(path[path.length-1], 'top') && isInside(path[0], 'top'))
		{//First Out Second In 
			p3.innerHTML = path[path.length-1] + " is Outside & " + path[0] +" is Inside";
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'top');
			p4.innerHTML = "Therefore Adding Intersection Point - "+ intersection +" & Second Point - " + path[0];
			clippedPath.push(intersection);
			clippedPath.push(path[0]);
		}	
	}
	else if(i == path.length)
	{
		p1.innerHTML = "Clipped Polygon w.r.t. Top Side";
		p2.innerHTML = " ";
		p3.innerHTML = " ";
		p4.innerHTML = " ";
		allPath.push(clippedPath);
		context.clearRect(0, 0, 500, 500);
		clipEdge++;
		polygonPath=clippedPath.slice();
		clippedPath = [];
		l=-1;
		if(polygonPath.length==0)
		{
			clipEdge=5;
		}
		else
		{
			p2.innerHTML="Current Coordinates of the Polygon are";
			var printer="";//For Storing The Coordinates In Printable Form 
			for(var i=0;i<polygonPath.length;i++)
        	{	
            	printer=printer+"("+polygonPath[i][0]+","+polygonPath[i][1]+") ";
            }
            p7.innerHTML=printer;
			drawPolygon(polygonPath);
		}
	}	
}

//Clip the Right Edge
function clip_right(path,i)
{
	p2.innerHTML = "Against Right Side";
	
	if(i<path.length-1)
	{
		p1.innerHTML = "Clipping  line joining ("+ path[i] + ") & (" + path[i+1] + ")";
		drawLine(path[i],path[i+1],'right');
		if(!isInside(path[i], 'right') && !isInside(path[i+1], 'right'))
		{//No point Inside
		p3.innerHTML = path[i] + " is Outside & " + path[i+1] +" is Outside";
		p4.innerHTML = "Therefore Adding No Points";
		}
		
		else if(isInside(path[i], 'right') && isInside(path[i+1], 'right'))
		{//Both Inside 
			p3.innerHTML = path[i] + " is Inside & " + path[i+1] +" is Inside";
			p4.innerHTML = "Therefore Adding Second Point - "+ path[i+1] ;
			clippedPath.push(path[i+1]);
		}
		
		else if(isInside(path[i], 'right') && !isInside(path[i+1], 'right'))
		{//First In second out
			p3.innerHTML = path[i] + " is Inside & " + path[i+1] +" is Outside";
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'right');
			p4.innerHTML = "Therefore Adding Intersection Point - "+ intersection;
			clippedPath.push(intersection);
		}
		
		else if(!isInside(path[i], 'right') && isInside(path[i+1], 'right'))
		{//First Out Second In 
			p3.innerHTML = path[i] + " is Outside & " + path[i+1] +" is Inside";
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'right');
			p4.innerHTML = "Therefore Adding Intersection Point - "+ intersection +" & Second Point - " + path[i+1];
			clippedPath.push(intersection);
			clippedPath.push(path[i+1]);
		}
	}
	else if(i == path.length-1)
	{
		p1.innerHTML = "Clipping  line joining ("+ path[path.length-1] + ") & (" + path[0] + ")";
		//For Adding Last Point And First Point
		drawLine(path[path.length-1],path[0],'right');
		if(!isInside(path[path.length-1], 'right') && !isInside(path[0], 'right'))
		{//No point Inside
			p3.innerHTML = path[path.length-1] + " is Outside & " + path[0] +" is Outside";
			p4.innerHTML = "Therefore Adding No Points";
		}
		
		else if(isInside(path[path.length-1], 'right') && isInside(path[0], 'right'))
		{//Both Inside 
			p3.innerHTML = path[path.length-1] + " is Inside & " + path[0] +" is Inside";
			p4.innerHTML = "Therefore Adding Second Point - "+ path[0] ;
			clippedPath.push(path[0]);
		}
		
		else if(isInside(path[path.length-1], 'right') && !isInside(path[0], 'right'))
		{//First In second out
			p3.innerHTML = path[path.length-1] + " is Inside & " + path[0] +" is Outside";
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'right');
			p4.innerHTML = "Therefore Adding Intersection Point - "+ intersection ;
			clippedPath.push(intersection);
		}
		
		else if(!isInside(path[path.length-1], 'right') && isInside(path[0], 'right'))
		{//First Out Second In 
			p3.innerHTML = path[path.length-1] + " is Outside & " + path[0] +" is Inside";
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'right');
			p4.innerHTML = "Therefore Adding Intersection Point - "+ intersection +" & Second Point - " + path[0];
			clippedPath.push(intersection);
			clippedPath.push(path[0]);
		}	
	}
	else if(i == path.length)
	{
		p1.innerHTML = "Clipped Polygon w.r.t. Right Side";
		p2.innerHTML = " ";
		p3.innerHTML = " ";
		p4.innerHTML = " ";
		allPath.push(clippedPath);
		clipEdge++;
		polygonPath=clippedPath.slice();
		clippedPath = [];
		l=-1;
		if(polygonPath.length==0)
		{
			clipEdge=5;
		}
		else
		{
			p2.innerHTML="Current Coordinates of the Polygon are";
			var printer="";//For Storing The Coordinates In Printable Form 
			for(var i=0;i<polygonPath.length;i++)
        	{	
            	printer=printer+"("+polygonPath[i][0]+","+polygonPath[i][1]+") ";
            }
            p7.innerHTML=printer;
			drawPolygon(polygonPath);
		}
	}		
}

//Clip the Bottom Edge
function clip_down(path,i)
{
	p2.innerHTML = "Against Bottom Side";
	
	if(i<path.length-1)
	{
		p1.innerHTML = "Clipping  line joining ("+ path[i] + ") & (" + path[i+1] + ")";
		drawLine(path[i],path[i+1],'down');
		if(!isInside(path[i], 'down') && !isInside(path[i+1], 'down'))
		{//No point Inside
		p3.innerHTML = path[i] + " is Outside & " + path[i+1] +" is Outside";
		p4.innerHTML = "Therefore Adding No Points";
		}
		
		else if(isInside(path[i], 'down') && isInside(path[i+1], 'down'))
		{//Both Inside 
			p3.innerHTML = path[i] + " is Inside & " + path[i+1] +" is Inside";
			p4.innerHTML = "Therefore Adding Second Point - "+ path[i+1] ;
			clippedPath.push(path[i+1]);
		}
		
		else if(isInside(path[i], 'down') && !isInside(path[i+1], 'down'))
		{//First In second out
			p3.innerHTML = path[i] + " is Inside & " + path[i+1] +" is Outside";
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'down');
			p4.innerHTML = "Therefore Adding Intersection Point - "+ intersection;
			clippedPath.push(intersection);
		}
		
		else if(!isInside(path[i], 'down') && isInside(path[i+1], 'down'))
		{//First Out Second In 
			p3.innerHTML = path[i] + " is Outside & " + path[i+1] +" is Inside";
			endpoints = [path[i], path[i+1]];
			intersection = find_intersection(endpoints, 'down');
			p4.innerHTML = "Therefore Adding Intersection Point - "+ intersection +" & Second Point - " + path[i+1];
			clippedPath.push(intersection);
			clippedPath.push(path[i+1]);
		}
	}
	else if(i == path.length-1)
	{
		p1.innerHTML = "Clipping  line joining ("+ path[path.length-1] + ") & (" + path[0] + ")";
		//For Adding Last Point And First Point
		drawLine(path[path.length-1],path[0],'down');
		if(!isInside(path[path.length-1], 'down') && !isInside(path[0], 'down'))
		{//No point Inside
			p3.innerHTML = path[path.length-1] + " is Outside & " + path[0] +" is Outside";
			p4.innerHTML = "Therefore Adding No Points";
		}
		
		else if(isInside(path[path.length-1], 'down') && isInside(path[0], 'down'))
		{//Both Inside 
			p3.innerHTML = path[path.length-1] + " is Inside & " + path[0] +" is Inside";
			p4.innerHTML = "Therefore Adding Second Point - "+ path[0] ;
			clippedPath.push(path[0]);
		}
		
		else if(isInside(path[path.length-1], 'down') && !isInside(path[0], 'down'))
		{//First In second out
			p3.innerHTML = path[path.length-1] + " is Inside & " + path[0] +" is Outside";
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'down');
			p4.innerHTML = "Therefore Adding Intersection Point - "+ intersection ;
			clippedPath.push(intersection);
		}
		
		else if(!isInside(path[path.length-1], 'down') && isInside(path[0], 'down'))
		{//First Out Second In 
			p3.innerHTML = path[path.length-1] + " is Outside & " + path[0] +" is Inside";
			endpoints = [path[path.length-1], path[0]];
			intersection = find_intersection(endpoints, 'down');
			p4.innerHTML = "Therefore Adding Intersection Point - "+ intersection +" & Second Point - " + path[0];
			clippedPath.push(intersection);
			clippedPath.push(path[0]);
		}	
	}
	else if(i == path.length)
	{
		p1.innerHTML = "Clipped Polygon w.r.t. Bottom Side";
		p2.innerHTML = " ";
		p3.innerHTML = " ";
		p4.innerHTML = " ";
		allPath.push(clippedPath);
		clipEdge++;
		polygonPath=clippedPath.slice();
		clippedPath = [];
		l=-1;
		if(polygonPath.length==0)
		{
			clipEdge=5;
		}
		else
		{
			p2.innerHTML="Current Coordinates of the Polygon are";
			var printer="";//For Storing The Coordinates In Printable Form 
			for(var i=0;i<polygonPath.length;i++)
        	{	
            	printer=printer+"("+polygonPath[i][0]+","+polygonPath[i][1]+") ";
            }
            p7.innerHTML=printer;
			drawPolygon(polygonPath);
		}
	}
}

//find the Intersection
function find_intersection(endpoints, edge)
{
	//endpoints - the end points of an edge of the polygon
	//edge - the edge with which we want to calculate the intersection with
	intersection = [];

	//all lines are of the form y = mx + c
	start = endpoints[0];
	end = endpoints[1];
	x1 = start[0];
	y1 = start[1];
	x2 = end[0];
	y2 = end[1];

	//finding the slope 
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
		if(x1 == x2)
		{
			intersection[0]=x1;
		}
	}
	else if(edge == 'down')
	{
		intersection[0] = (ymax - c)/m;
		intersection[1] = ymax;
		if(x1 == x2)
		{
			intersection[0]=x1;
		}
	}
	intersection[0]=Math.round(intersection[0]);
	intersection[1]=Math.round(intersection[1]);
	return intersection;
}	

//returns true if the point is inside Clipping  a particular edge else false
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
	context.clearRect(0,0,500,550);
	drawSquare();
	context.beginPath();
	context.moveTo(path[0][0], path[0][1]);
	context.font="15px Arial";
	context.fillText("Clipping Rectangle Coordinates - ["+ax+","+ay+"] ["+bx+","+by+"] ["+cx+","+cy+"] ["+dx+","+dy+"]",10,520);
	context.fillText("",10,540);
	context.fillText("("+path[0][0]+","+path[0][1]+")",path[0][0]+2,path[0][1]+2);
	for(i=1; i<path.length; i++)
	{
		context.lineTo(path[i][0], path[i][1]);
		context.fillText("("+path[i][0]+","+path[i][1]+")",path[i][0]+2,path[i][1]+2);
	}
	context.lineTo(path[0][0], path[0][1]);
	context.lineWidth = 3;
	context.strokeStyle = 'black';
	if(clipEdge >=5)
		context.strokeStyle= 'green';
	context.stroke();
}
//Draws the Square
function drawSquare()  
{
	context.strokeStyle = 'black' ;
	context.lineWidth = 2;
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
//Draws Line For Each Iteration
function drawLine(point1,point2,orientation)
{
	context.beginPath();
	if(orientation == 'left')
	{
		context.moveTo(ax,ay);
		context.lineTo(dx,dy);
	}
	else if(orientation == 'top')
	{
		context.moveTo(ax,ay);
		context.lineTo(bx,by);
	}
	else if(orientation == 'right')
	{
		context.moveTo(bx,by);
		context.lineTo(cx,cy);
	}
	else if(orientation == 'down')
	{
		context.moveTo(cx,cy);
		context.lineTo(dx,dy);
	}
	context.lineWidth = 2;
	context.strokeStyle = 'red';
	context.stroke();

	context.beginPath();
	context.moveTo(point1[0],point1[1]);
	context.lineTo(point2[0],point2[1]);
	context.lineWidth = 2;
	context.strokeStyle = 'yellow';
	context.stroke();
}