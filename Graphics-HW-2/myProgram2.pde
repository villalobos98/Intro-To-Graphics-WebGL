void myLine (int x1, int y1, int x2, int y2)
{
  // insert your code here to draw a line from (x1, y1) to (x2, y2) 
  // using only calls to point().
  
  // your code should implement the Midpoint algorithm
   //Calculate the deltas of y and x
  
    int dx = x2 - x1; 
    int dy = y2 - y1; 
    
    //Special Case for the vertical line
    if (dx == 0){
       for(int x = x1, y = y1; y <= y2; y++){
         point(x, y);
       }
   }
   
   //Special case where dy < 0 and dx > 0, a diagonal 
   //line that is going from bottom-left to top-right
   if (dy < 0 && dx > 0){
     int incrN = 2 * dx;
     int incrNE = 2 * ( dx - dy);
     int d = dy - (dx/2); 
     
     //A loop that will go from x to x2
     //Plotting points in the N direction 
     //or NE direction
     for(int x = x1, y = y1; x <= x2; x++){
         point(x, y);
         if( d < 0 ){   //Choose E
            d += incrN; 
         }else{         //Choose NE
            d += incrNE;
            y--;
         }     
     }
   }
   else{
   
      //Calculate increment 
     int incrE = 2 * dy;
     int incrNE = 2 * ( dy - dx );
     int d = dy - (dx/2); 
     
     //A loop that will go from x to x2
     //This is moving column to column
     //and choosing a pixel in either NE or E direction
    for(int x = x1, y = y1; x <= x2; x++){
         point(x, y);
         if( d <= 0 ){   //Choose E
            d += incrE; 
         }else{         //Choose NE
            d += incrNE;
            y++;
         }     
     }
     
   }
   
  
}



void myTriangle (int x0, int y0, int x1, int y1, int x2, int y2)
{
  // insert your code here to draw a triangle with vertices (x0, y0), (x1, y1) and (x2, y2) 
  // using only calls to point().
  
  // your code should implement the the algorithm presented in the video
  
  //This will locate the two points that
  //show me the bounding box of the triangle
  int minX = min(x0, x1, x2);
  int minY = min(y0, y1, y2);
  int maxX = max(x0, x1, x2);
  int maxY = max(y0, y1, y2); //ahhhhhhsaldfja;sdkfaj;sdf
  
  
  for(int y = minY; y <= maxY; y++){
    for(int x = minX; x <= maxX; x++){
        //Compare the first point and the third point
        //Compare Vector vs Vector2
        boolean inside1 = edgeFunction(x0, y0, x1, y1, x, y);
        
        //Compare the second point and third point
        //Compare Vector2 vs Vector1
        boolean inside2 = edgeFunction(x1, y1, x2, y2, x, y);
        
        //Compare the first point and second point
        //Compare Vector0 vs Vector1
        boolean inside3 = edgeFunction(x2, y2, x0, y0, x, y);
       
        if(inside1 && inside2 && inside3){
           point(x,y);
        }

    }
  }
}

boolean edgeFunction(int x0, int y0, int x1, int y1, int x2, int y2){
  return ((x2 - x0) * (y1 - y0) - (y2 - y0) * (x1 - x0) >= 0);
}
// --------------------------------------------------------------------------------------------
//
//  Do not edit below this lne
//
// --------------------------------------------------------------------------------------------

boolean doMine = true;
int scene = 1;
color backgroundColor = color (150, 150, 150);

void setup () 
{
  size (500, 500);
  background (backgroundColor);
}

void draw ()
{
  fill (0,0,0);
    if (doMine) text ("my solution", 20, 475);
    else text ("reference", 20, 475);
    
  if (scene == 1) doLines();
  if (scene == 2) doHouse();
  
}

void doHouse()
{
  if (!doMine) {
    fill (255, 0, 0);
    stroke (255,0,0);
    triangle (200, 300, 300, 200, 200, 200);
    triangle (300, 300, 300, 200, 200, 300);
    fill (0, 0, 255);
    stroke (0,0,255);
    triangle (200,200, 300, 200, 250, 150);
    stroke (0,255,0);
    fill (0,255,0);
    triangle (250, 300, 275, 300, 250, 250);
    triangle (275, 300, 275, 250, 250, 250);
  }
  else {
    fill (128, 0, 0);
    stroke (128,0,0);
    myTriangle (200, 300, 300, 200, 200, 200);
    myTriangle (300, 300, 300, 200, 200, 300);
    fill (0, 0, 128);
    stroke (0,0,128);
    myTriangle (200,200, 300, 200, 250, 150);
    stroke (0,128,0);
    fill (0,128,0);
    myTriangle (250, 300, 275, 300, 250, 250);
    myTriangle (275, 300, 275, 250, 250, 250);
  }
}

void doLines()
{
  if  (!doMine) {
    stroke (255, 255, 255);
    line (50, 250, 450, 250);
    line (250, 50, 250, 450);
    line (50, 450, 450, 50);
    line (50, 50, 450, 450);
  }
  else {
    stroke (0, 0, 0);
    myLine (50, 250, 450, 250);
    myLine (250, 50, 250, 450);
    myLine (50, 450, 450, 50); // dy <0 and dx > 0
    myLine (50, 50, 450, 450);
  }
}

void keyPressed()
{
  if (key == '1') 
  {
    background (backgroundColor);
    scene = 1;
  }
  
  if (key == '2') 
  {
    background (backgroundColor);
    scene = 2;
  }
  
  if (key == 'm') 
  {
    background (backgroundColor);
    doMine = !doMine;
  }
  
  if (key == 'q') exit();
}
