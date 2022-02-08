let spriteSheet, spriteSheetArray = [], spriteSheetName;
let NUM_OF_CHARACTERS;

let NUM_OF_PLAYERS = 4;
let playerArray = [];


let sx = 0;
let x = 100, y = 100;
let move = 0;
let facing = 1;

//Preloads all Sprite pages into an array.
//To add more Sprites, move Sprite png to folder and add the file name to array.
function preload() {
  spriteSheetName = ["SpelunkyGuy.png", "Green.png", "Van Helsing.png", "Yellow.png"];
  NUM_OF_CHARACTERS = spriteSheetName.length;

  for(var i = 0; i < NUM_OF_CHARACTERS; i++) {
    spriteSheetArray.push(loadImage(spriteSheetName[i]));
  }
}

//Sets up the canvas and loads the base character.
function setup() {
  createCanvas(1200, 600);
  imageMode(CENTER);
  
  for(var i = 0; i < NUM_OF_PLAYERS; i++) {
    playerArray.push(new Character(spriteSheetArray[Math.floor(Math.random() * NUM_OF_CHARACTERS)], Math.floor(Math.random() * 1200), Math.floor(Math.random() * 600)));
  }
}

//Draws the character and character selection.
function draw() {
  background(255);
  for(var i = 0; i < NUM_OF_PLAYERS; i++) {
    playerArray[i].draw();
  }
  //drawCharacterBox();
}

//Creates the area to select a new character.
function drawCharacterBox() {
  for(var i = 0; i < NUM_OF_CHARACTERS; i++) {
    rect(50 + (160 * i), 200, 160, 160);
    image(spriteSheetArray[i], 130 + (160 * i), 280, 200, 200, 0, 0, 80, 80);
  }
}

//Adds the function to select new character when mouse is pressed over the character box.
//function mousePressed() {
//  for(var i = 0; i < NUM_OF_CHARACTERS; i++) {
//    if((mouseX > (50 + (160 * i))) && (mouseX < (50 + (160 * (i + 1)))) && (mouseY > 200) && (mouseY < 360)) {
//      character.changeSprite(spriteSheetArray[i]);
//    }
//  }
//}

//Adds the function that whenever the left or right arrow keys are pressed, moves the sprite in that direction.
function keyPressed() {
  if(keyCode == RIGHT_ARROW) {
    for(var i = 0; i < NUM_OF_PLAYERS; i++) {
      playerArray[i].go(1);
    }
  }
  else if(keyCode == LEFT_ARROW) {
    for(var i = 0; i < NUM_OF_PLAYERS; i++) {
      playerArray[i].go(-1);
    }
  }
}

//Adds the function when the key is released, stops the movement of the sprite.
function keyReleased() {
  for(var i = 0; i < NUM_OF_PLAYERS; i++) {
    playerArray[i].stop();
  }
}

//Character Class
class Character {
  //Constructer function that sets the variables
  constructor(spriteSheet, x, y) {
    this.spriteSheet = spriteSheet;
    this.sx = 0;
    this.x = x;
    this.y = y;
    this.move = 0;
    this.facing = 1;
  }

  //Animates the sprite
  draw() {
    push();
    translate(this.x, this.y);
    scale(this.facing, 1);

    if (this.move == 0) {
      image(this.spriteSheet, 0, 0, 200, 200, 0, 0, 80, 80);
    }
    else {
      image(this.spriteSheet, 0, 0, 200, 200, (this.sx + 1) * 80, 0, 80, 80);
    }

    if (frameCount % 5 == 0) {
      this.sx = (this.sx + 1) % 8;
    }

    this.x += 2 * this.move;
    pop();
  }

  //Changes the sprite image
  changeSprite(newSpriteSheet) {
    this.spriteSheet = newSpriteSheet;
  }

  //Sets the direction and starts moving the character.
  go(direction) {
    this.move = direction;
    this.facing = direction;
    this.sx = 3;
  }

  //Set the movement to zero.
  stop() {
    this.move = 0;
  }
}