/*
    Flappy Bus
    Authors - Alastair and Jonah
    Date - 20/07/2015
*/
// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };



// Character objects


function Player(playerNum, score, lives, sprite) {
    this.playerNum = playerNum;
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
var people1=[];
var people2 = [];


var reloadTimeP1 = 101; //Doesn't matter what it is as long it is bigger than 100
var reloadTimeP2 = 101;
var game;

var scoreDisplay;

var scoreDisplay2;

var nyanHorn;

var fadeIn;

$.get("/score", function(scores){
    scores.sort(function (scoreA, scoreB){
        var difference = scoreB.score - scoreA.score;
        return difference;
    });
    for (var i = 0; i < scores.length; i++) {
        $("#scoreBoard").append(
            "<li>" +
            scores[i].name + ": " + scores[i].score +
            "</li>");
    }
});

/*
 * Loads all resources for the game and gives them names.
 */

function startGame(){
    game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
}

function preload() {

    jQuery("#greeting-form").on("submit", function(event_details) {
        //var greeting = "Hello ";
        var name = jQuery("#fullName").val();
        //var greeting_message = greeting + name;
        //alert(greeting_message);
        //location.reload();
        $("#submitscore").fadeTo(400,0,function(){
            $("#submitscore").hide();
            $("#gamecontainer").animate({'marginTop': '100%'},{ duration: 1000, queue: false, complete: function(){
                location.reload();
            }});
            $("#gamebackground").fadeTo({ duration: 600, queue: false },0);
        });
        //event_details.preventDefault();
    });


    //game.load.audio("nyan", "../assets/nyanhorn.wav");
    //test.volume = 0.1;
    game.load.audio("horn11", "../assets/horn11.wav");
    game.load.audio("horn21", "../assets/horn21.wav");
    game.load.audio("horn31", "../assets/horn31.wav");
    game.load.audio("horn12", "../assets/horn12.wav");
    game.load.audio("horn22", "../assets/horn22.wav");
    game.load.audio("horn32", "../assets/horn32.wav");
    game.load.image("busImgOne", "../assets/flappy-bus.png");
    game.load.image("busImgTwo", "../assets/flappy-bus2.png");
    game.load.image("road", "../assets/roadBackground.jpg");
    game.load.image("pipe", "../assets/pipe2-body.png");
    game.load.image("pipeend", "../assets/pipe2-end.png");
    game.load.image("person", "../assets/people.png");
    game.load.image("person2","../assets/people2.png")
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    $("#gamebackground").show();
    game.paused = true;
    $("#gamecontainer").animate({'marginTop': '5%'},{ duration: 1000, queue: false, complete: function(){
        game.paused = false;
    }});
    $("#gamebackground").fadeTo({ duration: 600, queue: false },1);
    var lives = 5;//prompt("How many lives", "5");

    // set the background colour of the scene
    var background = game.add.image(0, 0, "road");
    background.width = 790;
    background.height = 400;

    player = new Player(1,0,lives,game.add.sprite( 40,200, "busImgOne"));

    player2 = new Player(2,0,lives,game.add.sprite( 120,200, "busImgTwo"));

    //scoreDisplay1 = game.add.text(620, 20, "Score = " + player.score.toString());
    //scoreDisplay2 = game.add.text(620, 50, "Score = " + player2.score.toString());

    scoreDisplay1 = game.add.text(510, 20, "Score = " + player.score.toString());

    //player.sprite.scale.setTo(5, 5);

    scoreDisplay2 = game.add.text(510, 50, "Score = " + player2.score.toString());

    //player.sprite.scale.setTo(5, 5);
    //nyanHorn =  game.add.audio("nyan2");
    nyanHorn.play();
    nyanHorn.volume = 0;
    fadeIn = true;

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
    player.sprite.body.gravity.y = 240;
    player2.sprite.body.gravity.y = 240;

    pipeInterval = 1.75;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
    newPipe);

    /**player2.alive = false;
    player2.sprite.destroy();
    reloadTimeP2=101;*/
    //game.add.image(0,0,"person");
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {


    if(reloadTimeP1 >= 101){updateRotation(player)};
    if(reloadTimeP2 >= 101)updateRotation(player2);


    if(reloadTimeP1 >= 250){game.physics.arcade
        .overlap(player.sprite,
    pipes,
    respawnP1);
        player.sprite.alpha = 1;
        //player2.sprite.scale.setTo(1, 1);}
    }
    else{
        player.sprite.alpha = 0.65 + Math.cos((250 - reloadTimeP1)  / 4) / 4;
    }

    if(reloadTimeP2 >= 250) {
        game.physics.arcade
            .overlap(player2.sprite,
            pipes,
            respawnP2);
        player2.sprite.alpha = 1;
        //player2.sprite.scale.setTo(1, 1);}
    }
    else{
        player2.sprite.alpha = 0.65 + Math.cos((250 - reloadTimeP2)  / 4) / 4;
        //player2.sprite.scale.setTo(0.75 + Math.cos((250 - reloadTimeP2)  / 4) / 4, 0.75 + Math.cos((250 - reloadTimeP2)  / 4) / 4);
    }
    reloadTimeP1++;
    reloadTimeP2++;

    if(player.sprite.y > 400){
        respawnP1();
        player.sprite.y = 399;
        player.sprite.body.velocity.y = 0;
    }
    if(player.sprite.y < 0){
        respawnP1();
    }

    if(player2.sprite.y > 400){
        player2.sprite.y = 399;
        player2.sprite.body.velocity.y = 0;
    }



    if(reloadTimeP1 == 100){
        player.sprite = game.add.sprite( 40,200, "busImgOne");
        game.physics.arcade.enable(player.sprite);
        player.sprite.body.velocity.y = 0;
        player.sprite.body.gravity.y = 240;
        player.sprite.anchor.setTo(0.5, 0.5);
        player.alive = true;
    }
    if(reloadTimeP2 == 100){
        player2.sprite = game.add.sprite( 120,200, "busImgTwo");
        game.physics.arcade.enable(player2.sprite);
        player2.sprite.body.velocity.y = 0;
        player2.sprite.body.gravity.y = 240;
        player2.sprite.anchor.setTo(0.5, 0.5);
        player2.alive = true;
    }

    scoreDisplay1.setText("Player 1 Score = " + player.score);
    scoreDisplay2.setText("Player 2 Score = " + player2.score);

    if (nyanHorn.volume > 0 && !fadeIn) {
        nyanHorn.volume -= 0.03;
    }
    else if (!fadeIn){
        nyanHorn.pause();
        game.paused = true;
    }

    if (nyanHorn.volume < 1 && fadeIn) {
        nyanHorn.volume += 0.03;
        if (nyanHorn.paused){
            nyanHorn.resume();
            game.paused = false;
        }
    }
    else if (fadeIn && !nyanHorn.isPaused){
        nyanHorn.volume = 1;
    }

    game.physics.arcade
        .overlap(player2.sprite,
        people2,
        pickUp2);
    game.physics.arcade
        .overlap(player.sprite,
        people1,
        pickUp);
    player2.sprite.alpha = 1;
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
    game.sound.play("horn" + Math.floor(Math.random() * 2 + 1.5) + player.playerNum);
}

function newPipe(){
    var gap = game.rnd.integerInRange(3 ,5);
    for (var count = 0; count < 8; count++) {
        if (count != gap && count != gap+1) {
            if(count > gap){
                addPipeBlock(750, count * 50, 0);
            }
            else{
                addPipeBlock(750, count * 50 - 20, 0);
            }

        }
    }

    addPipeBlock(747.5, (gap+2) * 50, 1);
    addPipeBlock(747.5, (gap) * 50 - 20, 1);

    if(reloadTimeP1 >= 250){player.score++;}
    if(reloadTimeP2 >= 250){player2.score++}

    var rand = Math.floor((Math.random() * 5));
    if(rand == 4 ){
        generatePerson(720,gap * 50 + 10);
    }
}

function addPipeBlock(x, y, id) {
    if(id == 0) {
        var pipeBlock = game.add.sprite(x,y,"pipe");
    }
    else if(id == 1) {
        var pipeBlock = game.add.sprite(x,y,"pipeend");
    }
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -200;
}

function respawnP1(){
    player.alive = false;
    player.sprite.destroy();
    reloadTimeP1=0;
    // code to test highscore
    //game.paused = true;
    //game.destroy();
    //gameOver();
    //if(player.score > 0){
    //$("#submitscore").show();
    //$("#submitscore").fadeTo(400,1);
    //}



}
function respawnP2(){
    player2.alive = false;
    player2.sprite.destroy();
    reloadTimeP2=0;

}

function gameOver(){
    $("#score").val(JSON.stringify(player.score));

    game.destroy();
    //location.reload();
}

function generatePerson(x,y){
    var person = game.add.sprite(x, y, "person");
    var person2 = game.add.sprite(x + 60, y - 10, "person2");
    game.physics.arcade.enable(person);
    person.width = 50;
    person.height = 50;
    person.body.velocity.x = -200;

    game.physics.arcade.enable(person2);
    person2.width = 70;
    person2.height = 70;
    person2.body.velocity.x = -200;
    people1.push(person);
    people2.push(person2);
}

function pickUp(){
    player.sprite.body.gravity.y *= 1.5;
    player.score += 10;
    people1.splice(0,1)[0].kill();
}

function pickUp2(){
    player2.sprite.body.gravity.y *= 1.5;
    player2.score += 10;
    people2.splice(0,1)[0].kill();
}

