class Bubble {
  constructor(x, y){
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
    this.strokeOp = 150;
    print(this.n + ' was born!');
    this.age = this.circles;
    this.status = 'I am a child';
    this.meet = [];
    this.children = [];
    this.parents = [];
    this.friends = [];
    this.showStatus = false;
    updateDemografy();
  }


  show(){
    stroke(this.strokeCol, this.strokeOp);
    if(this.lifespan<20) {
        this.strokeOp = 0; 
        this.status = 'I will die soon.';
      }
    fill(this.red, this.green, this.blue, this.lifespan*2/lifecircle);
    ellipse(this.x, this.y, this.r*2, this.r*2);
    
    fill(255, 200);
    if(this.status == 'I will die soon.' || this.showStatus == true)
      text(this.n +': ' + this.status, this.x-this.r, this.y+this.r+5);
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
    if(this.actuallife/lifecircle > 80) {this.status = 'I am an old bubble.';}
    else if(this.actuallife/lifecircle > 20) {this.status = 'I am an adult.';}
    else if(this.actuallife/lifecircle > 13) {this.status = 'I am a teenager.';}
  }

  hello(){
    createP('Hello, my name is ' + this.n +'! I am ' + floor(this.actuallife/lifecircle) +' circles old. ' + this.status).parent('relations');
  }

  bye(){
    this.status = 'I am dead';
    let lastMsg = this.n + ' [' +this.id+'] died at the age of ' + floor(this.actuallife/lifecircle) + ' circles. ';
    if(this.children.length > 0) {
      lastMsg += 'It had ' + this.children.length + ' children['+ this.children + ']: ' ;
       for (let f = 0; f<this.children.length; f++){
         let bub = getBubble(this.children[f]);
         lastMsg += bub.n + ', ';
       }
      lastMsg = lastMsg.substring(0, lastMsg.length-2) + ". "
    }
    if(this.friends.length > 0) {
      lastMsg += this.n + '\'s friends ';
      for (let f = 0; f<this.friends.length; f++){
        let bub = getBubble(this.friends[f]);
        print("getBubble(" + this.friends[f]+ ")");
        lastMsg += bub.n + ', ';
      }
      lastMsg = lastMsg.substring(0, lastMsg.length-2) + " are crying about this loss. ";
    }

    lastMsg += 'RIP';
    createP(lastMsg).parent('news');
    deadBubbles.push(this);
    updateDemografy();
  }

  intersects(o){
    if(dist(this.x, this.y, o.x, o.y) < this.r) {
      return true;
    }
    else {
      return false;
    }
  }

  met(o){
    // if(this.isFirstMeet(o.id)) { 
    //   createP( o.n + '(' + o.id + ')'+' meets ' +this.n + '(' + this.id + ')').parent('relations'); 
    // }
    this.isFirstMeet(o.id);
    this.meet.push(o.id);  
    o.meet.push(this.id);

    //count meet consequenses
    let meets = this.meet.filter(aMeet => aMeet == o.id);
    if (meets.length > 5 && (this.actuallife/lifecircle < 15 || o.actuallife/lifecircle < 15)) {
      this.makeFriend(o);
    }
    //для взрослых нужно больше встреч, чтобы подружиться
    else if(meets.length > 8 && this.actuallife/lifecircle > 15 &&  o.actuallife/lifecircle > 15){
      if(random(0,10) < 2) {
          //2 шанса из 10
          this.bornBaby(o);
          //стереть все встречи :(
          this.deleteOldMeets(o.id);
          o.deleteOldMeets(this.id);
      }        
      else 
          this.makeFriend(o);
      
    }
      
    
    this.changeLifespan(1);
    o.changeLifespan(1);
  }

  changeLifespan(x){
    this.lifespan += x;
    bubbleStat.moreLife += x;
  }

  bornBaby(o){
    let newBubble = new Bubble(this.x + this.r, this.y + this.y);
    bubbles.push(newBubble);
    this.children.push(newBubble.id);
    o.children.push(newBubble.id);
    createP(this.n + ' and ' + o.n + ' now have a baby ' + newBubble.n + '!').parent('news');
    newBubble.parents.push(this.id);
    newBubble.parents.push(o.id);
    updateDemografy();
  }

  deleteOldMeets(id) {
    for (let i = this.meet.length-1; i >=0; i--) {
      if (this.meet[i] == id) this.meet.splice(i, 1);
    }
  }

  makeFriend(o){
    if(this.friends.indexOf(o.id)== -1) {
      this.friends.push(o.id);
      o.friends.push(this.id);
    }
  }

  isFirstMeet (id) {
    if(this.meet.includes(id)) {
      return false;
    }
    else {
      bubbleStat.firstMeetings++;
      return true;
    }
  }

  saveLife(x){
    this.changeLifespan(this.lifespan+x);
    if(x>10) {
      this.status = 'I will live a little longer!';
      this.showStatus=true;
    }
    stats.saveLife++;
  }

}
