/*
The Bubbles' Life
Based on p5.js and tutorials by Daniel Shiffman

*/
/*config*/
var rad = 6;//начальный радиус
var lifecircle = 20; //сколько месяцев в году
var love = 5; //вероятность влюбиться (из 10)
var baseSpeed = 8;
/*end of config*/

var bubbles = []; var deadBubbles = []; var bubbleId = 0;
var bNames = ['JeanMarie', 'Gerthruda', 'Majkinka', 'Dan', 'Mike', 'Pokemon',
'Blisseyka', 'Lusynie', 'Krok', 'Shlapal', 'Oleg', 'Andanesie', 'Volkirg', 'Michaelis', 'Tomeo',
'Haruka', 'Mathilda', 'Jenja', 'Masakyr', 'Ulenkunia', 'Junosha', 'Silok', 'Angelina', 'Zinaida', 'Loka-Moka',
'Megan', 'Riverrus', 'Ogrimiron', 'Bartomean', 'Vanok', 'Sikalik', 'Sicilia', 'Apluntia', 'Kok',
 'Shkvarka', 'Samovarun', 'Muk', 'Trokk', 'Palachinka', 'Velikanucik', 'Zikmund', 'Kles', 'Braft', 'Stivland',
 'Paguran', 'Nofelet', 'Tvokil'];
var bubbleCircle = 0, bubbleMiniCircle = 0;
var myBubble, slider, canvas;

function setup() {
  frameRate(baseSpeed);
  canvas = createCanvas(600, 400);
  canvas.parent('canvas_holder');
  for (let i = 0; i < 10; i++) {
    //let x = 20 + 100 * i;
    let x = random (width);
    let y = random (height);
    let r = random (6, 30)
    let n = floor(random(0, bNames.length));
    bubbles[i] = new Bubble (x, y, r);
  }
  slider = createSlider(1, 30, 8);
  slider.parent('settings_holder');
  slider.mouseReleased(changeRate);
}

function draw() {
  background(0);
  for (let i = bubbles.length-1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].show();
    if(bubbles[i].lifespan < 0){
      bubbles[i].bye();
      bubbles.splice(i, 1);
    }
  }
  bubbleMiniCircle ++;
  if(bubbleMiniCircle%lifecircle == 0){
    bubbleCircle = bubbleCircle+1;
    bubbleMiniCircle = 0;
    //print(bubbleCircle);
  }
  if(bubbles.length <= 0) {
    print('It\'s a ' + bubbleCircle + ' circle from the Begining. Let\'s remember all our beloved Bubbles.')
    for(j = 0; j < deadBubbles.length; j++){
      print(deadBubbles[j].n +', '+ floor(deadBubbles[j].actuallife/lifecircle) + ' (sup. ' + deadBubbles[j].circles + ')')
    }
    noLoop();
  }
}

function changeRate(){
  frameRate(slider.value());
  document.getElementById("slider_value").innerHTML = "Speed: " + slider.value();
}

function mouseDragged(){
  if(mouseX<width && mouseY < height) {
    let r = random (6, 30);
    let b = new Bubble(mouseX, mouseY, r);
    bubbles.push(b);
  }
}

function mousePressed(){
  for (let i = 0; i < bubbles.length; i++) {
    if(bubbles[i].r >= dist(mouseX, mouseY, bubbles[i].x, bubbles[i].y)) {
      bubbles[i].strokeOp=250;
      bubbles[i].hello();
      myBubble = bubbles[i];
    }
    else {
      bubbles[i].strokeOp=50;
    }
  }
}

class Bubble {
  constructor(x, y, r){
    this.id = bubbleId;
    bubbleId++;
    this.x = x;
    this.y = y;
    this.r = rad;
    this.red = floor(random(0,255));
    this.green = floor(random(0,255));
    this.blue = floor(random(0,255));
    this.n = bNames[floor(random(0, bNames.length))];
    this.circles = floor(random(1, 120));
    this.lifespan = this.circles*lifecircle; // предолагаемая дата смерти
    //this.col = this.red + ', 0, ' + this.blue;
    //this.color = color(this.col +', '+this.circles*2);
    this.actuallife = 0;
    this.strokeCol = 255;
    this.strokeOp = 50;
    print(this.n + ' was born!');
    this.age = this.circles;
  }


  show(){
    stroke(this.strokeCol, this.strokeOp);
    if(this.lifespan<10) {noStroke();}
    fill(this.red, this.green, this.blue, this.lifespan*2/lifecircle);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }

  update(){
    //out of borders
    this.x = this.x + random(-floor(random(10, 25)), floor(random(10, 25)));
    if(this.x < (0-this.r*1.5)) { this.x = width-this.r;}
    if(this.x > (width+this.r*1.5)) { this.x = 0-this.r;}
    this.y = this.y + random(-floor(random(5, 15)), floor(random(3, 12)));
    if(this.y < (0-this.r)) { this.y = height+this.r;}

    //growing up and getting older
    this.lifespan--;
    this.actuallife++;
    if(this.actuallife%lifecircle == 0 && this.r < rad*3) {this.r++;}
  }

  hello(){
    print('Hello, my name is ' + this.n +'! I am ' + floor(this.actuallife/lifecircle) +' circles old.');
    createP('Hello, my name is ' + this.n +'! I am ' + floor(this.actuallife/lifecircle) +' circles old.').parent('relations');
  }

  bye(){
    print(this.n + ' died at the age of ' + floor(this.actuallife/lifecircle) + ' circles. RIP');
    deadBubbles.push(this);
    print('Demografy: ' + (bubbles.length-1) + '. Died: ' + deadBubbles.length);
    createP('Demografy: ' + (bubbles.length-1) + '. Died: ' + deadBubbles.length).parent('news');
  }

}
