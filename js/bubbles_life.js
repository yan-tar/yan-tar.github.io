/*
7.3: Arrays of Objects - p5.js Tutorial
Code for https://youtu.be/fBqaA7zRO58
Array.push (12:00),
*/

var bubbles = [];
var bNames = ['JeanMarie', 'Dan', 'Mike', 'Albert', 'Fred', 'Lusy', 'Krok', 'Oleg', 'Anda', 'Volk', 'Michael', 'Tomeo', 'Timathy', 'Haruka', 'Mathilda', 'Jenja', 'Masha', 'Dusja', 'Angelina', 'Zinaida', 'Loka', 'Megan', 'River', 'David', 'Bartomean', 'Valera', 'Irina', 'Sicilia', 'Apluntia', 'Kok', 'Muk'];


function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 10; i++) {
    //let x = 20 + 100 * i;
    let x = random (width);
    let y = random (height);
    let r = random (5, 30)
    let n = floor(random(0, bNames.length));
    bubbles[i] = new Bubble (x, y, r);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].show();
  }
  noLoop();
}

function mouseDragged(){
  let r = random (5, 30);
  let b = new Bubble(mouseX, mouseY, r);
  bubbles.push(b);
}

function mousePressed(){
  for (let i = 0; i < bubbles.length; i++) {
    if(bubbles[i].r>=dist(mouseX, mouseY, bubbles[i].x, bubbles[i].y)) {bubbles[i].hello();}
  }
}

class Bubble {
  constructor(x, y, r, n){
    this.x = x;
    this.y = y;
    this.r = r;
    this.n = bNames[floor(random(0, bNames.length))];
    this.da = floor(random(1, 120)); // предолагаемая дата смерти
    this.lifespan = this.da*12;
    this.col = color(255, floor(map(this.da, 0, 255, 12, 1440)));
    print(this.n + ' was born! It will die at ' + this.da);
  }

  //no word function here!
  show(){
    stroke(255);
    strokeWeight(2);
    fill(this.col);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }

  update(){
    this.x = this.x + random(-floor(this.r/7), floor(this.r/7));
    this.y = this.y + random(-floor(this.r/7), floor(this.r/7));
    this.lifespan--;
  }

  hello(){
    print('Hello, my name is ' + this.n +'! lifespan' + this.lifespan + ', col ' + this.col);
  }

}
