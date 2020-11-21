var play=1
var end=0
var gameState= play
var restart,restartImg
var dieSound;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var o1,o2,o3,o4,o5,o6;
var obstaclesGroup;
var score;
var overImage

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png","trex1.png","trex3.png","trex4.png","trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided-1.png");
  
  groundImage = loadImage("ground2.png");
  overImage=loadImage("gameOver.png")
  cloudImage = loadImage("cloud.png");
 o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png");
  o3=loadImage("obstacle3.png");
  o4=loadImage("obstacle4.png");
  o5=loadImage("obstacle5.png");
  o6=loadImage("obstacle6.png");
  jumpSound=loadSound("jump.mp3")
  dieSound=loadSound("die.mp3")
  checkPointSound=loadSound("checkPoint.mp3")
  restartImg= loadImage("restart.png")
}

function setup() {
  createCanvas(1200, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
   trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  trex.setCollider("rectangle",0,0,100,100)
  trex.debug=false
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  score=0;
  obstaclesGroup=new Group()
  cloudsGroup=new Group()
  message="Karan"
  
  gameover=createSprite(300,100);
  gameover.addImage(overImage);
  gameover.scale=0.5;
  gameover.visible=false;
  restart=createSprite(300,140);
  restart.addImage(restartImg)
  restart.scale=0.5
  restart.visible=false;
}

function draw() {
  background(250);
  console.log(message)
text("Score= "+score,100,50)  
  if(gameState===play){
   score=score+Math.round(getFrameRate()/60 );
    ground.velocityX=-6
  if(keyDown("space") && trex.y>=150) {
    trex.velocityY = -15;
   jumpSound.play() 
  }

  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if(score>0&&score%100===0){
    checkPointSound.play()
  }
  
  //spawn the clouds
  spawnClouds();
  spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
        dieSound.play();
      gameState=end
      trex.velocityY=0
      
     // trex.velocityY=-12
     // jumpSound.play()
    }}
  else if(gameState===end){
    gameover.visible=true;
  
    restart.visible=true;
    ground.velocityX=0
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
trex.changeAnimation("collided",trex_collided);
    if(mousePressedOver(restart)){
      reset()
    }
  }
    trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(1200,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
   cloud.lifetime= 401
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
    }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle=createSprite(600,169,10,40);
    obstacle.velocityX=-6;
    var R=Math.round(random(1,6));
    switch(R){
        case 1:obstacle.addImage(o1);
        break;
        case 2:obstacle.addImage(o2);
        break;
        case 3:obstacle.addImage(o3);
        break;
        case 4:obstacle.addImage(o4);
        break;
        case 5:obstacle.addImage(o5);
        break;
        case 6:obstacle.addImage(o6);
        break;}
    obstacle.scale=0.5;
    obstacle.lifetime=400
    obstaclesGroup.add(obstacle)
    
  }}
function reset(){
  gameState=play
  gameover.visible=false
  restart.visible=false
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score=0
  trex.changeAnimation("running",trex_running)
  
}