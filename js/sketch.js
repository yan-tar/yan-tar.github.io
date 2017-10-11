function setup(){
	createCanvas(500,400);
}

function draw(){
	background(220);
	fill(255);
	for (var i=0;i<3;i++){
		for (var j = 0;j<3;j++){
			sq3(i,j);
		}
	}
	noLoop();
}

function sq3(hor,vert){
	var i=hor*3;
	var j = vert*3;
	console.log(i,j);
	for (i; i<hor*3+3; i++){
		for (j; j<vert*3+3; j++){
			rect((25*i)+25,25*j+25,25, 25);
			console.log("inside for",i,j)
		}
	}
}