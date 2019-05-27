
var max_points =20;//Max point for a ploygon is 20
var poly_points;//Polygon Points 
var poly_size;

//To Return the x_intersection point between two lines 
function x_intersect(x1,y1,x2,y2,x3,y3,x4,y4)
{
	var num =((x1*y2 - y1*x2) * (x3-x4))- (x1-x2)*(x3*y4 - y3*x4);
	var den = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4);
	var ans = Math.round(num/den);
	return(ans);
}
//To Return y_intersection point between two lines
function y_intersect(x1,y1,x2,y2,x3,y3,x4,y4)
{
	var num =((x1*y2 - y1*x2) * (y3-y4))- (y1-y2)*(x3*y4 - y3*x4);
	var den = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4);
	var ans = Math.round(num/den);
	return(ans);
}
//This function Will Clip all the edges w.r.t one clip
//Gives Edge Of Clippig Area
function clip (x1,y1,x2,y2)
{
	//i and k form a line in polygon
	var new_points,new_poly_size=0;
	var k= (i+1)%poly_size;
	var ix = poly_points[i][0], iy = poly_points[i][1];
	var kx = poly_points[k][0], ky = poly_points[k][1]; 
	//Cal. 1st point position w.r.t. clipper line 
	var i_pos = (x2-x1) * (iy-y1) - (y2-y1) * (ix-x1);
	//Cal. 2nd point position w.r.t. clipper line 
	var	k_pos = (x2-x1) * (ky-y1) - (y2-y1) * (kx-x1);

	// Case 1 : When both points are inside 
	if (i_pos < 0 && k_pos < 0) 
	{ 
		//Only second point is added 
		new_points[new_poly_size][0] = kx; 
		new_points[new_poly_size][1] = ky; 
		new_poly_size++; 
	} 

	// Case 2: When only first point is outside 
	else if (i_pos >= 0 && k_pos < 0) 
	{ 
		// Point of intersection with edge 
		// and the second point is added 
		new_points[new_poly_size][0] = x_intersect(x1,y1, x2, y2, ix, iy, kx, ky); 
		new_points[new_poly_size][1] = y_intersect(x1,y1, x2, y2, ix, iy, kx, ky); 
		new_poly_size++; 

		new_points[new_poly_size][0] = kx; 
		new_points[new_poly_size][1] = ky; 
		new_poly_size++; 
	} 

	// Case 3: When only second point is outside 
	else if (i_pos < 0 && k_pos >= 0) 
	{ 
		//Only point of intersection with edge is added 
		new_points[new_poly_size][0] = x_intersect(x1,y1, x2, y2, ix, iy, kx, ky); 
		new_points[new_poly_size][1] = y_intersect(x1,y1, x2, y2, ix, iy, kx, ky); 
		new_poly_size++; 
	} 

	// Case 4: When both points are outside 
	else
	{ 
		//No points are added 
	} 

	poly_size = new_poly_size; 
	for (var i = 0; i < poly_size; i++) 
	{ 
		poly_points[i][0] = new_points[i][0]; 
		poly_points[i][1] = new_points[i][1]; 
	} 

}
//This The Final Function to implement the Clipping polygon
function suthHodgClip(,poly_size,clipper_points,clipper_size)
{
	for(var i=0;i<clipper_size;i++)
	{
		var k=(i+1)%clipper_size;

		clip(poly_points,poly_size,clipper_points[i][0],clipper_points[i][1],clipper_points[k][0],clipper_points[k][1])
	}
	//printing
}


