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
}

var player;
var player2 = player;


// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */

function preload() {
     var lives = prompt("How many lives", "5");


    game.load.audio("nyan", "../assets/nyan.wav");
    game.load.image("busImgOne", "../assets/flappy-bus.png");
    game.load.image("busImgTwo", "../assets/flappy-bus2.png");

    player = new Player(0,lives,game.add.sprite( 40,200, "busImgOne"));

    player2 = new Player(0,lives,game.add.sprite( 40,200, "busImgTwo"));


}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene

    game.sound.play("nyan");
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(handler);


    //player.sprite = game.add.sprite(10, 200, "busImgOne");
    //player2.sprite = game.add.sprite( 40,200, "busImgTwo");
    game.physics.arcade.enable(player.sprite);
    game.physics.arcade.enable(player2.sprite);
    player.sprite.body.gravity.y = 20;
    player2.sprite.body.gravity.y = 20;
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.add.text(620, 20 , "Score = " + player.score.toString());
    game.add.text(620, 50 , "Score = " + player2.score.toString());

}

function handler(event, sprite){
    sprite.sprite.velocityX -= 100;
}

