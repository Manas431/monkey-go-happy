var cloudgo,gameove,g2,o1,o2,o3,o4,o5,o6,rset,tr,tc;
var trex,ground,invisibleground,hifi,hyper,playerscore,gamestate,gameover,reset;
var highsky,obstacle,select
playerscore=0;
  gamestate="play"
function preload(){
cloudgo=loadImage( "banana.png"); 
gameove=loadImage( "gameOver.png");
g2=loadImage( "ground2.png");
o1=loadImage("obstacle.png");
rset=loadImage( "restart.png");
tr=loadAnimation("monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
tc=loadAnimation("monkey_0.png");
}
function setup(){
createCanvas(windowWidth,windowHeight);
trex = createSprite(50,height-400,20,50);
trex.addAnimation("running",tr);
trex.addAnimation("colliding",tc);
  trex.scale=0.5;
 ground = createSprite(width/2,height-400,width,2);
ground.addImage(g2);

 invisibleground = createSprite(width/2,height-330,width,125);
invisibleground.visible=false


//trex.debug=true
//trex.setCollider("circle",0,0,40)

 hifi = createGroup();
 hyper = createGroup();
 

 gameover = createSprite(width/2,height/2-50)
gameover.addImage(gameove);
 reset = createSprite(width/2,height/2)
reset.addImage(rset);
gameover.visible=false;
reset.visible=false;
}
  
function draw() {
background("white");
text(playerscore,330,40);
if (gamestate=="play") {
ground.velocityX=-(6+playerscore/100);

playerscore=playerscore+Math.round(frameCount/100);
if (playerscore%100==0&& playerscore>0) {
//playSound("sound://category_points/vibrant_game_collect_jewel_1_down.mp3");
    
}

if (touches.length>0||keyDown("space") && trex.y>=240) {
 trex.velocityY=-10
//playSound("sound://category_explosion/puzzle_game_break_magic_02.mp3");
touches=[]
}
if (ground.x<0) {
ground.x=ground.width/2 
}
cloud();
cactus();

if (trex.isTouching(hyper)) {
//playSound("sound://category_male_voiceover/game_over_male.mp3");
trex.changeAnimation("colliding",tc);
gamestate="end";


  }
}
  else if (gamestate=="end"){
  ground.velocityX=0
hyper.destroyEach()
hifi.destroyEach()
hyper.setVelocityXEach(0);
hifi.setVelocityXEach(0);
 hyper.setLifetimeEach(-1);
hifi.setLifetimeEach(-1);
 //trex. velocitX=0;
//trex.velocityY=0;
 
 gameover.visible=true;
 reset.visible=true;
if (mousePressedOver(reset)|| touches.length>0) {
gamestate="play"; 
 trex.changeAnimation("running",tr); 
 reset.visible=false;
  gameover.visible=false;  
playerscore=0
touches=[];
}
 }
  trex.velocityY=trex.velocityY+0.5
 
  trex.collide(invisibleground);
  drawSprites();
  

 
  
}
function cloud(){
if (frameCount%60==0) {
  

 highsky=createSprite(width+20,height-300,10,10);
highsky.y=Math.round(random(100,300))
  
highsky.addImage(cloudgo);
highsky.velocityX=-(6+playerscore/100);
highsky.lifetime=210
hifi.add(highsky);
    
}
}
function cactus(){
if (frameCount%120==0) {
 obstacle = createSprite(600,height-420,10,10);
obstacle.scale=0.4;
 
obstacle.addImage(o1);


obstacle.velocityX=-(4+playerscore/100);
obstacle.depth=trex.depth
trex.depth=trex.depth+1
obstacle.lifetime=210
hyper.add(obstacle);
    
}  
}