'use strict';

// Global variables that are set and used
// across the application
let gl;

// The programs
let sphereGlobeProgram;
let cubeGlobeProgram;
let program;

// Global declarations of objects that you will be drawing
var mySphere = null;
var myCube = null;
var myCylinder = null;
var myCone = null;

// the textures
let groundTexture;
let cabinTexture;
let treeTopTexture;


var anglesReset = [30.0, 30.0, 0.0];
var cube_angles = [30.0, 30.0, 0.0];
var sphere_angles = [180.0, 180.0, 0.0];
var angles = sphere_angles;
var angleInc = 5.0;

//
// A function that creates shapes to be drawn and creates a VAO for each
//
// We start you out with an example for the teapot.
//
function createShapes() {
	myCube = new Cube(20);
	myCube.VAO = bindVAO(myCube);

	mySphere = new Sphere(100, 100);
	mySphere.VAO = bindVAO(mySphere);

	myCylinder = new Cylinder(40, 100);
	myCylinder.VAO = bindVAO(myCylinder);

	myCone = new Cone(40, 100);
	myCone.VAO = bindVAO(myCone);
}

function setUpTextures() {
	// get some texture space from the gpu
	groundTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, groundTexture);

	// load the actual image
	var myImage = document.getElementById('world-texture');
	myImage.crossOrigin = '';

	// bind the texture so we can perform operations on it
	gl.bindTexture(gl.TEXTURE_2D, groundTexture);

	// load the texture data
	gl.texImage2D(
		gl.TEXTURE_2D,
		0,
		gl.RGBA,
		myImage.width,
		myImage.height,
		0,
		gl.RGBA,
		gl.UNSIGNED_BYTE,
		myImage
	);

	// set texturing parameters
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

	//------------------------------------------------------------------------
	cabinTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, cabinTexture);

	// load the actual image
	var myCabinImage = document.getElementById('tree-trunk-texture');
	myCabinImage.crossOrigin = '';

	// bind the texture so we can perform operations on it
	gl.bindTexture(gl.TEXTURE_2D, cabinTexture);

	// load the texture data
	gl.texImage2D(
		gl.TEXTURE_2D,
		0,
		gl.RGBA,
		myCabinImage.width,
		myCabinImage.height,
		0,
		gl.RGBA,
		gl.UNSIGNED_BYTE,
		myCabinImage
	);

	// set texturing parameters
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	//------------------------------------------------------------------------
	treeTopTexture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, treeTopTexture);

	// load the actual image
	var treeTopImage = document.getElementById('tree-top-texture');
	treeTopImage.crossOrigin = '';

	// bind the texture so we can perform operations on it
	gl.bindTexture(gl.TEXTURE_2D, treeTopTexture);

	// load the texture data
	gl.texImage2D(
		gl.TEXTURE_2D,
		0,
		gl.RGBA,
		treeTopImage.width,
		treeTopImage.height,
		0,
		gl.RGBA,
		gl.UNSIGNED_BYTE,
		treeTopImage
	);

	// set texturing parameters
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

}

//
// Set up your camera and your projection matrices
//
function setUpCamera() {
	// set up your projection
	// defualt is orthographic projection
	let projMatrix = glMatrix.mat4.create();
	glMatrix.mat4.ortho(projMatrix, -5, 5, -5, 5, 1.0, 300.0);
	gl.uniformMatrix4fv(sphereGlobeProgram.uProjT, false, projMatrix);

	// set up your view
	// defaut is at (0,0,-5) looking at the origin
	let viewMatrix = glMatrix.mat4.create();
	// glMatrix.mat4.lookAt(viewMatrix, [0, 0, -5], [0, 0, 5], [0, 1, 0]);
	// glMatrix.mat4.lookAt(viewMatrix, [2,4,4], [-1,0,-2], [0, 1, 0]);
	glMatrix.mat4.lookAt(viewMatrix, [0.5, 3, 6], [0, 0, 0], [0, 1, 0]);

	gl.uniformMatrix4fv(sphereGlobeProgram.uViewT, false, viewMatrix);
}

//
// Use this function to draw all of your shapes.
// Recall that VAOs should have been set up the call to createShapes()
// You'll have to provide a Model Matrix for each shape to be drawn that
// places the object in the world.
// An example is shown for placing the teapot
function drawShapes() {
	drawGround(1, -5);
	drawSphere(0, -3);
	drawCube(-2, -3);
	drawCone(-2, -2);

	drawTree(2, 2);
	drawTree(4, 1);
	drawTree(-1, 2);
	drawTree(-4, 0);
}

// This function will allow creating pedastals in a manner that is reusable.
// The only difference with other pedastals is the x direction aka x distance.
// There are three parts to the pedastal, the first is the top, the middle and then
// the bottom which is the top just shifted down.

function drawGround(xTranslation, yTranslation) {
	let modelTop = glMatrix.mat4.create();
	glMatrix.mat4.translate(modelTop, modelTop, [xTranslation, yTranslation, 0]);
	glMatrix.mat4.scale(modelTop, modelTop, [14, 2, 10]);

	
	var object = myCube;
	// which program are we using
	var program = sphereGlobeProgram;
	
	// set up your uniform variables for drawing
	gl.useProgram(program);

	// set up texture uniform & other uniforms that you might
	// have added to the shader
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, groundTexture);
	gl.uniform1i(program.uMyImageTexture, 0);

	// set up rotation uniform
	gl.uniform3fv(program.uTheta, new Float32Array(angles));

	//Bind the VAO and draw
	gl.bindVertexArray(object.VAO);

	drawObject(sphereGlobeProgram, modelTop, myCube);
}

// This function will create the diamond cube on top of the pedastal, which will resemble the
// six platonic objects. I used some transalation and some rotation to achieve this.
function drawCube(xTranslation, yTranslation) {
	let modelMatrixCube = glMatrix.mat4.create();
	glMatrix.mat4.translate(modelMatrixCube, modelMatrixCube, [xTranslation, yTranslation, 0]);
	// glMatrix.mat4.rotateX(modelMatrixCube, modelMatrixCube, radians(30.0));
	glMatrix.mat4.rotateY(modelMatrixCube, modelMatrixCube, radians(60.0));

	// which program are we using
	var program = sphereGlobeProgram;

	// set up your uniform variables for drawing
	gl.useProgram(program);

	// set up texture uniform & other uniforms that you might
	// have added to the shader
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, cabinTexture);
	gl.uniform1i(program.uMyCabinTexture, 0);

	// set up rotation uniform
	gl.uniform3fv(program.uTheta, new Float32Array(angles));

	drawObject(sphereGlobeProgram, modelMatrixCube, myCube);
}

function drawSphere(xTranslation, yTranslation) {
	let modelMatrixSphere = glMatrix.mat4.create();
	glMatrix.mat4.translate(modelMatrixSphere, modelMatrixSphere, [xTranslation, yTranslation, 0]);
	glMatrix.mat4.rotateX(modelMatrixSphere, modelMatrixSphere, radians(30.0));
	glMatrix.mat4.rotateY(modelMatrixSphere, modelMatrixSphere, radians(60.0));

	// which program are we using
	var program = sphereGlobeProgram;

	// set up your uniform variables for drawing
	gl.useProgram(program);

	// set up texture uniform & other uniforms that you might
	// have added to the shader
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, cabinTexture);
	gl.uniform1i(program.uTreeTopTexture, 0);

	// set up rotation uniform
	gl.uniform3fv(program.uTheta, new Float32Array(angles));

	//Bind the VAO and draw
	// gl.bindVertexArray(object.VAO);
	// gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);
	drawObject(sphereGlobeProgram, modelMatrixSphere, mySphere);
}

function drawCylinder(xTranslation, yTranslation) {
	let modelCylinder = glMatrix.mat4.create();
	glMatrix.mat4.translate(modelCylinder, modelCylinder, [xTranslation, yTranslation, 0]);

	var object = myCylinder;
	// which program are we using
	var program = sphereGlobeProgram;

	// set up your uniform variables for drawing
	gl.useProgram(program);

	// set up texture uniform & other uniforms that you might
	// have added to the shader
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, treeTopTexture);
	gl.uniform1i(program.uTreeTopTexture, 0);

	// set up rotation uniform
	gl.uniform3fv(program.uTheta, new Float32Array(angles));

	//Bind the VAO and draw
	gl.bindVertexArray(object.VAO);
	gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);
	drawObject(sphereGlobeProgram, modelCylinder, myCylinder);
}

function drawCone(xTranslation, yTranslation) {
	let modelCone = glMatrix.mat4.create();
	glMatrix.mat4.translate(modelCone, modelCone, [xTranslation, yTranslation, 0]);
	var object = mySphere;
	// which program are we using
	var program = sphereGlobeProgram;

	// set up your uniform variables for drawing
	gl.useProgram(program);

	// set up texture uniform & other uniforms that you might
	// have added to the shader
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, groundTexture);
	gl.uniform1i(program.uMyCabinTexture, 0);

	// set up rotation uniform
	gl.uniform3fv(program.uTheta, new Float32Array(angles));

	//Bind the VAO and draw
	gl.bindVertexArray(object.VAO);
	// gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);
	
	drawObject(sphereGlobeProgram, modelCone, myCone);
}

function drawTree(xTranslation, yTranslation) {
	let modelMatrixCube = glMatrix.mat4.create();
	glMatrix.mat4.translate(modelMatrixCube, modelMatrixCube, [xTranslation, yTranslation - 4, 0]);
	glMatrix.mat4.scale(modelMatrixCube, modelMatrixCube, [0.5, 1, 0]);
	var object = myCylinder;
	// which program are we using
	var program = sphereGlobeProgram;

	// set up your uniform variables for drawing
	gl.useProgram(program);

	// set up texture uniform & other uniforms that you might
	// have added to the shader
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, cabinTexture);
	gl.uniform1i(program.uTreeTopTexture, 0);

	// set up rotation uniform
	gl.uniform3fv(program.uTheta, new Float32Array(angles));

	//Bind the VAO and draw
	// gl.bindVertexArray(object.VAO);
	// gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);
	drawObject(sphereGlobeProgram, modelMatrixCube, myCube);

	let modelCone = glMatrix.mat4.create();
	glMatrix.mat4.translate(modelCone, modelCone, [xTranslation, yTranslation - 1, 0]);
	glMatrix.mat4.scale(modelCone, modelCone, [2, 5, 0]);

	var object = myCone;
	// which program are we using
	var program = sphereGlobeProgram;

	// set up your uniform variables for drawing
	gl.useProgram(program);

	// set up texture uniform & other uniforms that you might
	// have added to the shader
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, treeTopTexture);
	gl.uniform1i(program.uTreeTopTexture, 0);

	// set up rotation uniform
	gl.uniform3fv(program.uTheta, new Float32Array(angles));

	//Bind the VAO and draw
	// gl.bindVertexArray(object.VAO);
	// gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);
	drawObject(sphereGlobeProgram, modelCone, object);

}

//A helper function that will draw an object given it's model matrix
// every object has an corresponding model matrix.
function drawObject(program, model, obj) {
	gl.useProgram(program);
	gl.uniformMatrix4fv(program.uModelT, false, model);
	gl.bindVertexArray(obj.VAO);
	gl.drawElements(gl.TRIANGLES, obj.indices.length, gl.UNSIGNED_SHORT, 0);
}

///////////////////////////////////////////////////////////////////
//
//   You shouldn't have to edit below this line
//
///////////////////////////////////////////////////////////////////

// Given an id, extract the content's of a shader script
// from the DOM and return the compiled shader
function getShader(id) {
	const script = document.getElementById(id);
	const shaderString = script.text.trim();

	// Assign shader depending on the type of shader
	let shader;
	if (script.type === 'x-shader/x-vertex') {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else if (script.type === 'x-shader/x-fragment') {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else {
		return null;
	}

	// Compile the shader using the supplied shader code
	gl.shaderSource(shader, shaderString);
	gl.compileShader(shader);

	// Ensure the shader is valid
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error(gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
}

// Create a program with the appropriate vertex and fragment shaders
function initProgram(vertexID, fragmentID) {
	const vertexShader = getShader(vertexID);
	const fragmentShader = getShader(fragmentID);

	// Create a program
	sphereGlobeProgram = gl.createProgram();
	// Attach the shaders to this program
	gl.attachShader(sphereGlobeProgram, vertexShader);
	gl.attachShader(sphereGlobeProgram, fragmentShader);
	gl.linkProgram(sphereGlobeProgram);

	if (!gl.getProgramParameter(sphereGlobeProgram, gl.LINK_STATUS)) {
		console.error('Could not initialize shaders');
	}

	// Use this program instance
	gl.useProgram(sphereGlobeProgram);

	// We attach the location of these shader values to the program instance
	// for easy access later in the code
	sphereGlobeProgram.aVertexPosition = gl.getAttribLocation(sphereGlobeProgram, 'aVertexPosition');
	sphereGlobeProgram.aBary = gl.getAttribLocation(sphereGlobeProgram, 'bary');
	sphereGlobeProgram.uModelT = gl.getUniformLocation(sphereGlobeProgram, 'modelT');
	sphereGlobeProgram.uViewT = gl.getUniformLocation(sphereGlobeProgram, 'viewT');
	sphereGlobeProgram.uProjT = gl.getUniformLocation(sphereGlobeProgram, 'projT');

	sphereGlobeProgram.aUV = gl.getAttribLocation(sphereGlobeProgram, 'aUV');
	sphereGlobeProgram.uMyImageTexture = gl.getUniformLocation(sphereGlobeProgram, 'MyImageTexture');
	sphereGlobeProgram.uMyCabinTexture = gl.getUniformLocation(sphereGlobeProgram, 'MyCabinTexture');
	sphereGlobeProgram.uTreeTopTexture = gl.getUniformLocation(sphereGlobeProgram, 'TreeTopTexture');
	sphereGlobeProgram.uTheta = gl.getUniformLocation(sphereGlobeProgram, 'theta');

    sphereGlobeProgram.aNormal = gl.getAttribLocation(sphereGlobeProgram, 'aNormal');
    sphereGlobeProgram.ambientLight = gl.getUniformLocation (sphereGlobeProgram, 'ambientLight');
    sphereGlobeProgram.lightPosition = gl.getUniformLocation (sphereGlobeProgram, 'lightPosition');
    sphereGlobeProgram.lightColor = gl.getUniformLocation (sphereGlobeProgram, 'lightColor');
    sphereGlobeProgram.baseColor = gl.getUniformLocation (sphereGlobeProgram, 'baseColor');
    sphereGlobeProgram.specHighlightColor = gl.getUniformLocation (sphereGlobeProgram, 'specHighlightColor');
    sphereGlobeProgram.ka = gl.getUniformLocation (sphereGlobeProgram, 'ka');
    sphereGlobeProgram.kd = gl.getUniformLocation (sphereGlobeProgram, 'kd');
    sphereGlobeProgram.ks = gl.getUniformLocation (sphereGlobeProgram, 'ks');
    sphereGlobeProgram.ke = gl.getUniformLocation (sphereGlobeProgram, 'ke');

	return sphereGlobeProgram;
}

function setUpPhong(program) {
    
    // Recall that you must set the program to be current using
    // the gl useProgram function
    gl.useProgram(program);

    // set values for all your uniform variables
    // including the model transform
    // but not your view and projection transforms as
    // they are set in setUpCamera()
    //
    //Set these variables to be used later after retrieval of the uniform locations
    var lightPos = [-3.0, 0.0, -5];
    var lightColor = [1.0, 1.0, 1.0];
    var ambientLight = [0.5, 0.0, 0.0];
    var baseColor = [1.0, 0.0, 0.0];
    var specularColor = [1.0, 1.0, 1.0];
    var kaVal = 1.0;
    var kdVal = 1.0;
    var ksVal = 0.75;
    var keVal = 25.0;

    gl.uniform1f(program.ka, kaVal);
    gl.uniform1f(program.kd, kdVal);
    gl.uniform1f(program.ks, ksVal);
    gl.uniform1f(program.ke, keVal);
    gl.uniform3fv(program.lightPosition, lightPos);
    gl.uniform3fv(program.lightColor, lightColor);
    gl.uniform3fv(program.ambientLight, ambientLight);
    gl.uniform3fv(program.baseColor, baseColor);
    gl.uniform3fv(program.specHighlightColor, specularColor);

    let modelMatrix = glMatrix.mat4.create();
    // glMatrix.mat4.scale(modelMatrix, modelMatrix, [5,5,1]);
    gl.uniformMatrix4fv (program.uModelT, false, modelMatrix);
}


// creates a VAO and returns its ID
function bindVAO(shape) {
	//create and bind VAO
	let theVAO = gl.createVertexArray();
	gl.bindVertexArray(theVAO);

	// create and bind vertex buffer
	let myVertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
	gl.enableVertexAttribArray(sphereGlobeProgram.aVertexPosition);
	gl.vertexAttribPointer(sphereGlobeProgram.aVertexPosition, 4, gl.FLOAT, false, 0, 0);

	// create and bind bary buffer
	let myBaryBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, myBaryBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.bary), gl.STATIC_DRAW);
	gl.enableVertexAttribArray(sphereGlobeProgram.aBary);
	gl.vertexAttribPointer(sphereGlobeProgram.aBary, 3, gl.FLOAT, false, 0, 0);

	// // create, bind, and fill buffer for uv's
	// // uvs can be obtained from the uv member of the
	// // shape object.  2 floating point values (u,v) per vertex are
	// // stored in this array.
	let uvBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.uv), gl.STATIC_DRAW);
	gl.enableVertexAttribArray(sphereGlobeProgram.aUV);
	gl.vertexAttribPointer(sphereGlobeProgram.aUV, 2, gl.FLOAT, false, 0, 0);

	// Setting up the IBO
	let myIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, myIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);

	// Clean
	gl.bindVertexArray(null);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	return theVAO;
}

// We call draw to render to our canvas
function draw() {
	// Clear the scene
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	// draw your shapes
	drawShapes();

	// Clean
	gl.bindVertexArray(null);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

// Entry point to our application
function init() {
	// Retrieve the canvas
	const canvas = document.getElementById('webgl-canvas');
	if (!canvas) {
		console.error(`There is no canvas with id ${'webgl-canvas'} on this page.`);
		return null;
	}

	// Retrieve a WebGL context
	gl = canvas.getContext('webgl2');
	if (!gl) {
		console.error(`There is no WebGL 2.0 context`);
		return null;
	}

	// Set the clear color to be black
	gl.clearColor(0, 0, 0, 1);

	// some GL initialization
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.cullFace(gl.BACK);
	gl.frontFace(gl.CCW);
	gl.clearColor(0.2, 0.4, 0.2, 1.0);
	gl.depthFunc(gl.LEQUAL);
	gl.clearDepth(1.0);

	// Read, compile, and link your shaders
	sphereGlobeProgram = initProgram('vertex-shader', 'fragment-shader');
	// cubeGlobeProgram = initProgramShading('vertex-shader', 'fragment-shader-shading');

	// create and bind your current object
	createShapes();

	// set up your textures
	setUpTextures();

	// set up your camera
	setUpCamera();

    // // set up Phong parameters, could not do this, destroys my stuff
	// setUpPhong(sphereGlobeProgram);

	// do a draw
	draw();
}
