var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground, groundSprite, groundImg, bgImg, home, homeImg, homeImg2;
var person, person2, personImg, personImg2, pack;
var MOTION = 0;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
function preload()
{
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
	groundImg = loadImage("ground.jpg");
	bgImg = loadImage("bg.jpg");
	homeImg = loadImage("home.png");
	homeImg2 = loadImage("home2.png");
	personImg = loadImage("person.png");
	personImg2 = loadImage("person_reverse.png");

}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);

	
	person = createSprite(200,650);
	person.addImage(personImg);
	person.scale = 0.05;
	person.visible = false;

	
	 
	
	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale=0.1;

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale=0.6;

	groundSprite=createSprite(width/2, height, width,10);
	groundSprite.shapeColor=color(0);
	groundSprite.visible = false;



	
	home = createSprite(80,625);
	home.addImage(homeImg);
	home.scale = 0.5;
	


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 675, width, 10 , {isStatic:true} );
 	World.add(world, ground);


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  
  background(bgImg);
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 

  if(MOTION === 0)
  {
	  person.velocityX = 0;
  }
  

  if(packageSprite.y>500)
  {
	  MOTION = MOTION + 1;
	fill(255)
	  textSize(50);
	  text("THANK YOU!!",250,100);
	  textSize(25);
	  text("Mission Complete. Click F5 to refresh.",200,125);
	  home.destroy();
	  home2 = createSprite(80,625);
	  home2.addImage(homeImg2);
	  home2.scale = 0.5;  
	  person.visible = true

  } else 
  {
	 fill(255);
	 textSize(25); 
	text("Click DOWN arrow to supply emergency food to this house.",75,100);
  }

  if(MOTION === 1)
  {
      person.velocityX = 3; 
  }

 if(person.isTouching(packageSprite))
 {
	 person.destroy();
	 MOTION = MOTION + 1;
	 person2 = createSprite(packageSprite.x-5,650);
	 person2.addImage(personImg2);
	 person2.velocityX = -3;
	 person2.scale = 0.05;
	 packageSprite.visible = false;
	 pack = createSprite(person2.x, person2.y);
	 pack.addImage(packageIMG);
	 pack.scale = 0.1;
	 pack.velocityX = -3;


	 
 }

 

 
 
  drawSprites();
 
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
    Matter.Body.setStatic(packageBody,false);
    
  }
}



