var shape1, shape2,shape3,shape4, shape5, shape6;
var hurdle1,hurdle2,hurdle3,hurdle4,hurdle5;
var basket, basketimg;
var ground;

var hurdleGroup, shapeGroup;

var gameState = "Play";

var points = 0;
var lives = 3;

function preload()
{

basketimg = loadImage("PIC/basket.png");
hurdle1 = loadImage("PIC/O1.png");
hurdle2 = loadImage("PIC/O2.png");
hurdle3 = loadImage("PIC/O3.png");
hurdle4 = loadImage("PIC/O4.png");
hurdle5 = loadImage("PIC/O5.png");

shape1 = loadImage("PIC/S1.png");
shape2 = loadImage("PIC/S2.png");
shape3 = loadImage("PIC/S3.png");
shape4 = loadImage("PIC/S4.png");
shape5 = loadImage("PIC/S5.png");
shape6 = loadImage("PIC/S6.png");

}

function setup()
 {
  createCanvas(1400,650);
  
  ground = createSprite(700,650,1400,20);
  ground.shapeColor = "brown";

  basket = createSprite(400,580,90,70);
  basket.addImage("bask",basketimg);
  basket.scale = 0.3;
  basket.setCollider("rectangle",0,100,500,250);
  
  hurdleGroup = new Group();
  shapeGroup = new Group();
 
}


function draw() 
{
 background(255);

  if(gameState === "Play")
  {
    textSize(25);
    fill("Midnightblue");
    text("Points Collected : "+ points, 1000,100);
    text("Lives : "+ lives, 100,100);

    ground.depth = basket.depth;
      if (keyDown("left") && basket.x > 50) 
    {
    basket.x = basket.x -7;
    }
      
    if (keyDown("right") && basket.x < 1350) 
    {
    basket.x = basket.x + 7;
    }
    basket.collide(ground);

    if(basket.isTouching(shapeGroup))
    {
      points ++;
      shapeGroup.destroyEach();
    }

    if(shapeGroup.isTouching(ground))
    {
      lives--;
      shapeGroup.destroyEach();
    }
    if(basket.isTouching(hurdleGroup) || lives === 0)
    {
      gameState = "End";
    }

    if(points === 50)
    {
      gameState = "Win";
    }
    spawnShapes();
    spawnHurdles();
  }

  
  drawSprites();

  if(gameState === "End")
  {
    background("midnightblue");
    fill("white");
    textSize(35);
    text("WE SHALL TRY AGAIN", width/2-100, height/2);
    shapeGroup.destroyEach();
    hurdleGroup.destroyEach();
    
  }

  if(gameState === "Win")
  {
    background("cyan");
    fill("midnightblue");
    textSize(35);
    shapeGroup.destroyEach();
    hurdleGroup.destroyEach();
    basket.x = width/2;
    basket.scale = 0.6;
    text("WE DID IT - We got "+points +" shapes", width/2-100, height/2);
  }
 
}

function spawnShapes()
{
  if(frameCount % 300 === 0)  
  {
    var shape = createSprite(100,-100,20,20);
    shape.velocityY = 6;
    shape.x=Math.round(random(100,1300));
    var R = Math.round(random(1,6)) ;
    switch(R)
    {
      case 1 : shape.addImage("s1",shape1);
      shape.scale = 0.15;
      break;
      case 2 : shape.addImage("s2",shape2);
      shape.scale = 0.3;
      break;
      case 3 : shape.addImage("s3",shape3);
      shape.scale = 0.3;
      break;
      case 4 : shape.addImage("s4",shape4);
      shape.scale = 0.5;
      break;
      case 5 : shape.addImage("s5",shape5);
      shape.scale = 0.3;
      break;
      case 6 : shape.addImage("s6",shape6);
      shape.scale = 0.2;

      break;
      default : break;
    }

    shape.depth = basket.depth;
    basket.depth++;
    shape.lifetime = 1000;
    shapeGroup.add(shape);
  
  }
}

function spawnHurdles()
{
  if(frameCount % 500 === 0)  
  {
    var hurdle = createSprite(100,-100,20,20);
    hurdle.velocityY = 6;
    hurdle.x=Math.round(random(100,1300));
    var R = Math.round(random(1,5)) ;
    switch(R)
    {
      case 1 : hurdle.addImage("s1",hurdle1);
      hurdle.scale = 0.15;
      break;
      case 2 : hurdle.addImage("s2",hurdle2);
      hurdle.scale = 0.3;
      break;
      case 3 : hurdle.addImage("s3",hurdle3);
      hurdle.scale = 0.2;
      break;
      case 4 : hurdle.addImage("s4",hurdle4);
      hurdle.scale = 0.3;
      break;
      case 5 : hurdle.addImage("s5",hurdle5);
      hurdle.scale = 0.3;
      break;
      default : break;
    }

    hurdle.depth = basket.depth;
    basket.depth++;
    hurdle.lifetime = 1000;
    hurdleGroup.add(hurdle);
  
  }
}