var dinossauro, dinossauroImg;
var chao, chaoImg;
var fakechao;
var nuvem;
var nuvemImg;
var cactos;
var PLAY = 1;
var END = 2;
var gamestate = PLAY;
var cactosG;
var ceu;
var F;
var pontuadcao = 0;
var somM;
var somP;
var somC;
var GameOver
var Over
var Restart
var Reset
function preload() {
  //pré carrega imagens, animações, sons etc
  somM = loadSound("die.mp3");
  somP = loadSound("jump.mp3");
  somC = loadSound("checkPoint.mp3");
  dinossauroImg = loadAnimation("trex3.png", "trex4.png");
  chaoImg = loadImage("ground2.png");
  nuvemImg = loadImage("cloud.png");
  cacto1 = loadImage("obstacle1.png");
  cacto2 = loadImage("obstacle2.png");
  cacto3 = loadImage("obstacle3.png");
  cacto4 = loadImage("obstacle4.png");
  cacto5 = loadImage("obstacle5.png");
  cacto6 = loadImage("obstacle6.png");
  F = loadImage("trex_collided.png");
 Over = loadImage ("gameOver.png")
 Reset = loadImage ("restart.png")
}

function setup() {
  //função de configuração
  createCanvas(windowWidth, windowHeight);
  chao = createSprite(width/2,height, 600, 10);
  chao.addImage(chaoImg);
  dinossauro = createSprite(50,height -100, 10, 10);
  dinossauro.debug = false;
  dinossauro.setCollider("circle", 0, 0, 30);
  dinossauro.addAnimation("correndinho", dinossauroImg);
  dinossauro.addImage("F", F);
  dinossauro.scale = 0.5;

  fakechao = createSprite(width/2,height,width, 10);
  fakechao.visible = false;

  //muda o tamanho da tela               
  cactosG = new Group();
  ceu = new Group();
 GameOver = createSprite(width/2,height/2);
 GameOver.addImage(Over)
 Restart = createSprite(width/2,height/2+50);
 Restart.addImage(Reset)
}

function draw() {
  background("white");
  text("pontos:" + pontuadcao, 50, 50);
  if (gamestate === PLAY) {
    if (pontuadcao > 0 && pontuadcao % 100 === 0) {
      somC.play();
    }
    pontuadcao = pontuadcao + Math.round(frameRate() / 60);
    dinossauro.velocityY = dinossauro.velocityY + 1;
    dinossauro.collide(fakechao);
    if (touches.length>0 && dinossauro.isTouching(chao)) {
      dinossauro.velocityY = -16;
      somP.play();
      touches = [];
    }
    if (chao.x < 0) {
      chao.x = chao.width / 2;
    }
    chao.velocityX = -5;
    geradordenuvem();
    geradordecacto();
    if (dinossauro.isTouching(cactosG)) {
      gamestate = END;
      somM.play();
    }
    GameOver.visible = false
    Restart.visible = false
  } else if (gamestate === END) {
    cactosG.setLifetimeEach(-1);
    cactosG.setVelocityXEach(0);
    ceu.setLifetimeEach(-1);
    ceu.setVelocityXEach(0);
    chao.velocityX = 0;
    dinossauro.changeImage("F");
    dinossauro.velocityY = 0;
    if (touches.length<0) {
    reset()
    }
    GameOver.visible = true
    Restart.visible = true
  }

  drawSprites();
}
function geradordenuvem() {
  if (frameCount % 60 === 0) {
    nuvem = createSprite(width+10, random(10, height-50), 20, 20);
    nuvem.velocityX = -3;
    nuvem.addImage(nuvemImg);
    nuvem.scale = 0.7;
    nuvem.lifetime = width;
    ceu.add(nuvem);
  }
}
function geradordecacto() {
  if (frameCount % 60 === 0) {
    cactos = createSprite(width+10, height-20, 10, 10);
    cactos.velocityX = -3;

    cactos.scale = 0.4;
    cactos.lifetime = width;

    var numero = Math.round(random(1, 6));
    switch (numero) {
      case 1:
        cactos.addImage(cacto1);
        break;
      case 2:
        cactos.addImage(cacto2);
        break;
      case 3:
        cactos.addImage(cacto3);
        break;

      case 4:
        cactos.addImage(cacto4);
        break;
      case 5:
        cactos.addImage(cacto5);
        break;
      case 6:
        cactos.addImage(cacto6);
        break;

      default:
        break;
    }
    cactosG.add(cactos);
  }
}
function reset(){
  gamestate = PLAY
  cactosG.destroyEach()
  ceu.destroyEach()
  dinossauro.changeImage("correndinho");
  pontuadcao = 0
}