class cgIShape {
    constructor() {
        this.points = [];
        this.bary = [];
        this.indices = [];
    }

    addTriangle(x0, y0, z0, x1, y1, z1, x2, y2, z2) {
        var nverts = this.points.length / 4;

        // push first vertex
        this.points.push(x0); this.bary.push(1.0);
        this.points.push(y0); this.bary.push(0.0);
        this.points.push(z0); this.bary.push(0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;

        // push second vertex
        this.points.push(x1); this.bary.push(0.0);
        this.points.push(y1); this.bary.push(1.0);
        this.points.push(z1); this.bary.push(0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++

        // push third vertex
        this.points.push(x2); this.bary.push(0.0);
        this.points.push(y2); this.bary.push(0.0);
        this.points.push(z2); this.bary.push(1.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
    }
}

class Cube extends cgIShape {

    constructor(subdivisions) {
        super();
        this.makeCube(subdivisions);
    }

    makeCube(subdivisions) {
        var scalingFactor = 0.5
        //The cube face
        var vertexOne = [-1.0, -1.0,  0.5];
        var vertexTwo =  [1.0, -1.0,  0.5];
        var vertexThree = [1.0,  1.0,  0.5];
    
        for(var row = -subdivisions; row < subdivisions; row+=2){
            for(var col = -subdivisions; col < subdivisions; col+=2){
                        //Point a in the triangle
                        vertexOne[0] = scalingFactor * (row/subdivisions)
                        vertexOne[1] = scalingFactor * (col/subdivisions)
                        vertexOne[2] = scalingFactor
    
                        //Point b in the triangle
                        vertexTwo[0] = scalingFactor * ((row + 2)/subdivisions)
                        vertexTwo[1] = scalingFactor * (col/subdivisions)
                        vertexTwo[2] = scalingFactor
    
                        //Point c in the triangle
                        vertexThree[0] = scalingFactor * (row/subdivisions)
                        vertexThree[1] = scalingFactor * ((col + 2)/subdivisions) 
                        vertexThree[2] = scalingFactor
              
                        super.addTriangle(vertexOne[0],vertexOne[1],vertexOne[2],
                            vertexTwo[0],vertexTwo[1],vertexTwo[2],
                            vertexThree[0],vertexThree[1], vertexThree[2])
    
                        super.addTriangle(vertexThree[0],vertexThree[1], -vertexThree[2],
                            vertexTwo[0],vertexTwo[1], -vertexTwo[2],
                            vertexOne[0],vertexOne[1], -vertexOne[2])
                        
                        
                        vertexOne[0] = vertexTwo[0]
                        vertexOne[1] = vertexThree[1]
                        vertexOne[2] = scalingFactor
        
    
                        super.addTriangle(vertexOne[0],vertexOne[1],vertexOne[2],
                            vertexThree[0],vertexThree[1],vertexThree[2],
                            vertexTwo[0],vertexTwo[1], vertexTwo[2])
                        
                        super.addTriangle(vertexOne[0],vertexOne[1], -vertexOne[2],
                            vertexTwo[0],vertexTwo[1], -vertexTwo[2],
                            vertexThree[0],vertexThree[1], -vertexThree[2])
           }
        }
    
    
        for(var row = -subdivisions; row < subdivisions; row+=2){
            for(var col = -subdivisions; col < subdivisions; col+=2){
                        //Point a in the triangle
                        vertexOne[0] = scalingFactor * (col/subdivisions)
                        vertexOne[1] = scalingFactor 
                        vertexOne[2] = scalingFactor * (row/subdivisions)
    
                        //Point b in the triangle
                        vertexTwo[0] = scalingFactor * ((col)/subdivisions)
                        vertexTwo[1] = scalingFactor 
                        vertexTwo[2] = scalingFactor * ((row  + 2)/subdivisions)
    
                        //Point c in the triangle
                        vertexThree[0] = scalingFactor * ((col + 2)/subdivisions)
                        vertexThree[1] = scalingFactor 
                        vertexThree[2] = scalingFactor * (row/subdivisions) 
              
                        super.addTriangle(vertexOne[0],vertexOne[1],vertexOne[2],
                            vertexTwo[0],vertexTwo[1],vertexTwo[2],
                            vertexThree[0],vertexThree[1], vertexThree[2])
    
                            super.addTriangle(vertexThree[0], -vertexThree[1], vertexThree[2],
                            vertexTwo[0], -vertexTwo[1], vertexTwo[2],
                            vertexOne[0], -vertexOne[1], vertexOne[2])
                        
                        vertexOne[0] = vertexThree[0]
                        vertexOne[1] = scalingFactor
                        vertexOne[2] = vertexTwo[2]
        
    
                        super.addTriangle(vertexOne[0],vertexOne[1],vertexOne[2],
                            vertexThree[0],vertexThree[1],vertexThree[2],
                            vertexTwo[0],vertexTwo[1], vertexTwo[2])
                        
                        super.addTriangle(vertexOne[0], -vertexOne[1], vertexOne[2],
                            vertexTwo[0], -vertexTwo[1], vertexTwo[2],
                            vertexThree[0], -vertexThree[1], vertexThree[2])
           
           }
        }
    
        for(var row = -subdivisions; row < subdivisions; row+=2){
            for(var col = -subdivisions; col < subdivisions; col+=2){
                        //Point a in the triangle
                        vertexOne[0] = scalingFactor 
                        vertexOne[1] = scalingFactor * ((col) /subdivisions)
                        vertexOne[2] = scalingFactor * ((row + 2)/subdivisions)
    
                        //Point b in the triangle
                        vertexTwo[0] = scalingFactor
                        vertexTwo[1] = scalingFactor  * ((col)/subdivisions)
                        vertexTwo[2] = scalingFactor * ((row)/subdivisions)
    
                        //Point c in the triangle
                        vertexThree[0] = scalingFactor 
                        vertexThree[1] = scalingFactor * ((col + 2)/subdivisions)
                        vertexThree[2] = scalingFactor * ((row + 2)/subdivisions) 
              
                        super.addTriangle(vertexOne[0],vertexOne[1],vertexOne[2],
                            vertexTwo[0],vertexTwo[1],vertexTwo[2],
                            vertexThree[0],vertexThree[1], vertexThree[2])
    
                        super.addTriangle(-vertexThree[0], vertexThree[1], vertexThree[2],
                            -vertexTwo[0], vertexTwo[1], vertexTwo[2],
                            -vertexOne[0], vertexOne[1], vertexOne[2])
                        
                        vertexOne[0] = scalingFactor
                        vertexOne[1] = vertexThree[1]
                        vertexOne[2] = vertexTwo[2]
    
                        super.addTriangle(vertexOne[0],vertexOne[1],vertexOne[2],
                            vertexThree[0],vertexThree[1],vertexThree[2],
                            vertexTwo[0],vertexTwo[1], vertexTwo[2])
                        
                        super.addTriangle(-vertexOne[0], vertexOne[1], vertexOne[2],
                            -vertexTwo[0], vertexTwo[1], vertexTwo[2],
                            -vertexThree[0], vertexThree[1], vertexThree[2])
           }
        }
        
    }
}


class Cylinder extends cgIShape {

    constructor(radialdivision, heightdivision) {
        super();
        this.makeCylinder(radialdivision, heightdivision);
    }

    makeCylinder(radialdivision, heightdivision) {
        // fill in your cylinder code here
    }
}

class Cone extends cgIShape {

    constructor(radialdivision, heightdivision) {
        super();
        this.makeCone(radialdivision, heightdivision);
    }


    makeCone(radialdivision, heightdivision) {

        // Fill in your cone code here.
    }
}

class Sphere extends cgIShape {

    constructor(slices, stacks) {
        super();
        this.makeSphere(slices, stacks);
    }

    makeSphere(slices, stacks) {
        // fill in your sphere code here
    }

}


function radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

