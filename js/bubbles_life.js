/*
The Bubbles' Life
Based on p5.js and tutorials by Daniel Shiffman

*/
/*config*/
var rad = 6;//начальный радиус
var lifecircle = 20; //сколько месяцев в году
var love = 5; //вероятность влюбиться (из 10)
var baseSpeed = 8;
var bgR = bgG = bgB = 0;
/*end of config*/

var bubbles = []; var deadBubbles = []; var bubbleId = 0;
var bNames = ['JeanMarie', 'Gerthruda', 'Majkinka', 'Dan', 'Mike', 'Pokemon',
'Blisseyka', 'Lusynie', 'Krok', 'Shlapal', 'Oleg', 'Andanesie', 'Volkirg', 'Michaelis', 'Tomeo',
'Haruka', 'Mathilda', 'Jenja', 'Masakyr', 'Ulenkunia', 'Junosha', 'Silok', 'Angelina', 'Zinaida', 'Loka-Moka',
'Megan', 'Riverrus', 'Ogrimiron', 'Bartomean', 'Vanok', 'Sikalik', 'Sicilia', 'Apluntia', 'Kok',
 'Shkvarka', 'Samovarun', 'Muk', 'Trokk', 'Palachinka', 'Velikanucik', 'Zikmund', 'Kles', 'Braft', 'Stivland',
 'Paguran', 'Nofelet', 'Tvokil', 'Pelmeshka'];
var bubbleCircle = 0, bubbleMiniCircle = 0;
var myBubble, slider, canvas;
var bubbleStat = {firstMeetings: 0, moreLife: 0, saveLife: 0};
let smiles = new Array(7);

function preload(){
  for (let i=1; i < smiles.length; i++){
  //let i=2;
  console.log('/img/smile' + i + '_18.png');
    smiles[i] = loadImage('/img/smile' + i + '_18.png');
  }
}

function setup() {
  frameRate(baseSpeed);
  canvas = createCanvas(600, 400);
  canvas.parent('canvas_holder');
  for (let i = 0; i < 10; i++) {
    let x = random (width);
    let y = random (height);
    bubbles[i] = new Bubble (x, y);
  }
  updateDemografy();
  slider = createSlider(1, 30, baseSpeed).parent('slider_holder').mouseReleased(changeRate);
  sliderR = createSlider(0, 255, bgR).parent('red').mouseReleased(changeBg);
  sliderG = createSlider(0, 255, bgG).parent('green').mouseReleased(changeBg);
  sliderB = createSlider(0, 255, bgB).parent('blue').mouseReleased(changeBg);
}

function draw() {
  background(bgR, bgG, bgB);
  for (let i = bubbles.length-1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].show();
    //проверяем на пересечение
    for (let j = i-1; j >= 0; j--){
      if(bubbles[i].intersects(bubbles[j])){
        bubbles[i].met(bubbles[j]);
      }
    }
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



function mouseDragged(){
  // if(mouseX<width && mouseY < height) {
  //   let r = random (6, 30);
  //   let b = new Bubble(mouseX, mouseY, r);
  //   bubbles.push(b);
  // }
}

function mousePressed(){
  for (let i = 0; i < bubbles.length; i++) {
    if(bubbles[i].r >= dist(mouseX, mouseY, bubbles[i].x, bubbles[i].y)) {
      bubbles[i].strokeOp=250;
      bubbles[i].hello();
      myBubble = bubbles[i];
      myBubble.saveLife(lifecircle*2);
    }
    else {
      bubbles[i].strokeOp=50;
      bubbles[i].showStatus = false;
    }
  }
}

function getDeadBubble(id) {
  for (let i = 0; i < deadBubbles.length; i++){
    if (deadBubbles[i].id == id) {
      return deadBubbles[i];
    }
  }
  return false;
}

function getAliveBubble(id) {
  for (let i = 0; i < bubbles.length; i++){
    if (bubbles[i].id == id) {
      return bubbles[i];
    }
  }
  return false;
}

function getBubble(id) {
  let aBubble;
  //aBubble = getDeadBubble(id) ?  getDeadBubble(id) : getAliveBubble(id) ? getAliveBubble(id) : false;
  if(getDeadBubble(id)) {
    aBubble = getDeadBubble(id);
  }
  else if (getAliveBubble(id)) {
    aBubble = getAliveBubble(id);
  }
  if(aBubble) {
    return aBubble;
  }
  else {
    print('Cannot find this Bubble.');
  }
}

function updateDemografy(){
  document.getElementById('stats').innerHTML = 'Demografy: ' + (bubbles.length-1) + '. Died: ' + deadBubbles.length;
  //updateScroll('news');
  let out = document.getElementById('news');
    if(out.scrollHeight - out.clientHeight <= out.scrollTop + 1){
      out.scrollTop = out.scrollHeight - out.clientHeight;
    }
}
