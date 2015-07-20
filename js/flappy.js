/*
    Flappy Bus
    Authors - Alastair and Jonah
    Date - 20/07/2015
*/
// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };



// Character objects


function Player(score, lives, sprite) {
    this.score = score;
    this.lives = lives;
    this.sprite = sprite;
    this.rotateSpeed = 0;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.alive = true;
}

var player;
var player2 = player;
var pipes = [];

var reloadTimeP1 = 101; //Doesn't matter what it is as long it is bigger than 100
var reloadTimeP2 = 101;
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */

function preload() {

    game.load.audio("nyan", "../assets/nyan.wav");
    game.load.image("busImgOne", "../assets/flappy-bus.png");
    game.load.image("busImgTwo", "../assets/flappy-bus2.png");
    game.load.image("road", "../assets/roadBackground.jpg");
    game.load.image("pipe", "../assets/pipe2-body.png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    var lives = 5;

    // set the background colour of the scene
    var background = game.add.image(0, 0, "road");
    background.width = 790;
    background.height = 400;

    player = new Player(0,lives,game.add.sprite( 40,200, "busImgOne"));

    player2 = new Player(0,lives,game.add.sprite( 120,200, "busImgTwo"));

    scoreDisplay1 = game.add.text(510, 20, "Score = " + player.score.toString());


    scoreDisplay2 = game.add.text(510, 50, "Score = " + player2.score.toString());

    //player.sprite.scale.setTo(5, 5);

    game.sound.play("nyan");
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(handlerP1);
    game.input
        .keyboard.addKey(Phaser.Keyboard.ENTER)
        .onDown.add(handlerP2);


    //player.sprite = game.add.sprite(10, 200, "busImgOne");
    //player2.sprite = game.add.sprite( 40,200, "busImgTwo");
    game.physics.arcade.enable(player.sprite);
    game.physics.arcade.enable(player2.sprite);
    player.sprite.body.gravity.y = 180;
    player2.sprite.body.gravity.y = 180;

    pipeInterval = 1.75;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
    newPipe);
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {


    if(reloadTimeP1 >= 101){updateRotation(player)};
    if(reloadTimeP2 >= 101)updateRotation(player2);


    if(reloadTimeP1 > 250){game.physics.arcade
        .overlap(player.sprite,
    pipes,
    respawnP1);}

    if(reloadTimeP2 > 250) {
        game.physics.arcade
            .overlap(player2.sprite,
            pipes,
            respawnP2);
    }
    reloadTimeP1++;
    reloadTimeP2++;


    if(reloadTimeP1 == 100){
        player.sprite = game.add.sprite( 120,200, "busImgOne");
        game.physics.arcade.enable(player.sprite);
        player.sprite.body.velocity.y = 0;
        player.sprite.body.gravity.y = 180;
        player.sprite.anchor.setTo(0.5, 0.5);
        player.alive = true;
    }
    if(reloadTimeP2 == 100){
        player2.sprite = game.add.sprite( 120,200, "busImgTwo");
        game.physics.arcade.enable(player2.sprite);
        player2.sprite.body.velocity.y = 0;
        player2.sprite.body.gravity.y = 180;
        player2.sprite.anchor.setTo(0.5, 0.5);
        player2.alive = true;
    }

    scoreDisplay1.setText("Player 1 Score = " + player.score);
    scoreDisplay2.setText("Player 2 Score = " + player2.score)
}

function updateRotation(player){
    if(player.sprite.angle < 45 && player.sprite.body.velocity.y >= -20){
        player.sprite.angle += player.rotateSpeed;
        player.rotateSpeed += 0.2;
    }
    if(player.sprite.angle > -45 && player.sprite.body.velocity.y <= -20){
        player.sprite.angle -= 7;
    }
    //sprite.body.velocity.y
}

function handlerP1(event) {
    handler(event, player);
}

function handlerP2(event) {
    handler(event, player2);
}

function handler(event, player) {
    player.sprite.body.velocity.y = -180;
    //player.sprite.angle = -45;
    player.rotateSpeed = 0;
}

function newPipe(){
    var gap = game.rnd.integerInRange(3 ,5);
    for (var count = 0; count < 8; count++) {
        if (count != gap && count != gap+1) {
            addPipeBlock(750, count * 50);
        }
    }

    if(player.alive){player.score++;}
    if(player2.alive){player2.score++}
}

function addPipeBlock(x, y) {
    var pipeBlock = game.add.sprite(x,y,"pipe");
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -200;
}

function respawnP1(){
    player.alive = false;
    player.sprite.destroy();
    reloadTimeP1=0;

}
function respawnP2(){
    player.alive = false;
    player2.sprite.destroy();
    reloadTimeP2=0;

}


