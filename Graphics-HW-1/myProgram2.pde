
void drawNameWithLines ()
{
  // insert your code here to draw the letters of your name 
  // using only lines()
  line (100, 100, 100, 200);
  line (100, 200, 200, 200);
  line (200, 200, 0, 200);
  line (0, 200, 100, 200);
  line (100, 200, 100, 20);
  line (200, 20, 100, 20);
  line (100, 20, 0, 20);
  line (200, 20, 300, 200); 
  line (300, 200, 400, 20);
}

void drawNameWithTriangles ()
{
  // insert your code here to draw the letters of your name 
  // using only ltriangles()
  triangle (0, 10, 100, 10, 50, 10);
  triangle (50, 10, 50, 100, 50, 100);
  triangle (0, 100, 50, 100, 50, 100);
  triangle (0, 100, 50, 100, 50, 100);
  triangle (0, 100, 100, 100, 100, 100);
  triangle (100, 10, 150, 100, 150, 100);
  triangle (150, 100, 200, 10, 200, 10); 
}

// --------------------------------------------------------------------------------------------
//
//  Do not edit below this lne
//
// --------------------------------------------------------------------------------------------

boolean doLine = false;
boolean doTri = false;
color backgroundColor = color (150, 150, 150);
color lineColor = color (0, 0, 0);
color fillColor = color (255, 0, 0);

void setup () 
{
  size (500, 500);
  background (backgroundColor);
}

void draw ()
{
  if (doLine) stroke(lineColor); else stroke (backgroundColor);
  drawNameWithLines();
  
  if (doTri) {
     fill(fillColor);
     stroke(fillColor);
  }
  else {
    fill(backgroundColor);
    stroke(backgroundColor);
  }
  drawNameWithTriangles();
}

void keyPressed()
{
  if (key == 'l') doLine = !doLine;
  if (key == 't') doTri = !doTri;
  if (key == 'q') exit();
}
