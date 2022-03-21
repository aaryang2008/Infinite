var towerImg, tower;
var doorImg, door, doorsGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  doorImg = loadImage("meteoroid.png");
  ghostImg = loadImage("rocketship2.png");

}

function setup() {
  createCanvas(600, 600);
  ghost=createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.4;
  doorsGroup = new Group();
  invisibleBlockGroup = new Group();
  
  

  
}

function draw(){
  background(0);
  if (gameState === "play") {

    if(keyDown("LEFT_ARROW")){
      ghost.x = ghost.x - 3;
    }
    if(keyDown("RIGHT_ARROW")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("SPACE")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    spawnObstacles();
    if(doorsGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(doorsGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}
function spawnObstacles() {
  if (frameCount %240 ===0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    door.x = Math.round(random(120,400));
   
    invisibleBlock.x = door.x;
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
     ghost.depth = door.depth;
    ghost.depth +=1;
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}