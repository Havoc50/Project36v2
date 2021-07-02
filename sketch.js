//Create variables here
var dog;
var database;
var foodS;
var foodStock;
var dogImage, happyDogImage;

function preload(){

  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyImage = loadImage("images/dogImg1.png");

}
 
function setup() {

  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250, 350, 50, 40);
  dog.addImage(dogImage);
  dog.scale = 0.3;
  
  

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

}


function draw() {  

  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyImage);
  }

  drawSprites();
  //add styles here

  textSize(18);
  fill("white");
  stroke("black")
  strokeWeight(3);
  text("Note: Press the UP Arrow Key to feed Pup some treats!", 30, 50);

  textSize(20);
  fill("white");
  strokeWeight(3);
  text("Food Remaining: " + foodS, 150, 200);

}

function readStock(data){

  foodS = data.val();

}

function writeStock(x){

  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  });

}       