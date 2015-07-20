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

var score = 0;

function preload() {
    game.load.audio("nyan", "../assets/nyan.wav");
    game.load.image("busImg", "../assets/bus.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#FF0000");

    game.input
    game.sound.play("nyan");
    var bus= game.add.sprite(10, 270, "busImg");


}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.add.text(620, 20 , "Score = " + score.toString())
}