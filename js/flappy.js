/*
    Flappy Bus
    Authors - Alastair and Jonah
    Date - 20/07/2015
*/
// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

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

var livesPlayerOne;
var livesPlayerTwo;
var scoreOne = 0;
var scoreTwo = 0;

var busOne;
var busTwo;

function preload() {
    livesPlayerOne = prompt("How many lives", "5");
    livesPlayerTwo = livesPlayerOne;

    game.load.audio("nyan", "../assets/nyan.wav");
    game.load.image("busImgOne", "../assets/flappyBus.png");
    game.load.image("busImgTwo", "../assets/flappyBusTwo.png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#FF0000");

    game.input.keyboard.SPACEBAR.add(playerOneHandler);
    game.sound.play("nyan");

    busOne = game.add.sprite(10, 200, "busImgOne");
    busTwo = game.add.sprite( 40,200, "busImgTwo");
    busOne.body.gravity.y = 20;
    busTwo.body.gravity.y = 20;
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.add.text(620, 20 , "Score = " + scoreOne.toString());
    game.add.text(620, 50 , "Score = " + scoreTwo.toString());

}

function playerOneHandler(event){
    aler("hi");
}

