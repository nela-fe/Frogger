/*-------------
     ENEMY
---------------*/

class Enemy {
    constructor(lane) {
        this.sprite = 'images/enemy-bug_dark.png';
        this.x = getRandomInt(-500, -100);
        this.y = lane;
        this.speed = getRandomInt(40, 120);
     }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    update(dt){
        // when bug has vanished to the right,
        // it reappears from the left with a random distance and speed
        if (this.x >= 505) {
            // how can I get rid of this duplicate code...
            // delete Enemy and make new one with constructor?
            this.x = getRandomInt(-500, -100);
            this.speed = getRandomInt(40, 120);
            // for (i = 0; i < allEnemies.length; i++){
            //     console.log("Speed: "+allEnemies[i].speed);
            // }
        } else {
        this.x += dt*this.speed;
        }
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// TODO: more than one enemy per lane, prevent collisions between them
const allEnemies = [
    // new Enemy(60),
    // new Enemy(143),
    // new Enemy(226),
    new Enemy(60),
    new Enemy(143),
    new Enemy(226)
];

// for (i = 0; i < allEnemies.length; i++){
//     console.log("Speed: "+allEnemies[i].speed);
// }

// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }



/*-------------
     PLAYER
---------------*/



class Player {
    constructor(x, y) {
        this.sprite = 'images/char-horn-girl.png';
        this.x = x;
        this.y = y;
        this.stars = 0;
        this.maxStars = 5; // 5
        this.maxHearts = 5; // 5
        this.hearts = this.maxHearts;
        this.arrivedAtWater = false;
    }

    update(dt){
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    resetPlayer(){
        this.y = 383;
    }

    handleInput(pressed){
        // console.log(player.y);
        if (player.y >= 51) { // disable moving while at water to prevent "walking on water" :D
            if (pressed == "left" &&  this.x >= 102) {
                this.x -= 101;
            } else if (pressed == "right" && this.x <= 304) {
                this.x += 101;
            } else if (pressed == "up" && this.y >= 51) {
                this.y -= 83;
            } else if (pressed == "down" && this.y <= 300) {
                this.y += 83;
            }
        }

// another possibility would be to remove the eventListener for that time

        if (this.y <=50) { // player has arrived at water
            // console.log(this.arrivedAtWater);
            if (this.arrivedAtWater == false) {   // prevent multiple key presses during timeOut resulting in multiple stars
                this.arrivedAtWater = true;
                // console.log(this.arrivedAtWater);
                this.addStars()
                var myTimeout = setTimeout(function() {
                    player.resetPlayer();
                    player.arrivedAtWater = false;
                }, 400);
            }
        }
    }

    addStars(){
        if (this.stars < this.maxStars) {
        // console.log("player has "+this.stars +" stars.");
        this.stars++;
        // console.log("player has "+this.stars +" stars.");
        }
        if (this.stars == this.maxStars) {
            // console.log('you win!!');
            gameOver('won');
        }
    }

    reduceHearts(){
        if (this.hearts > 0) {
            // console.log('you lost one life');
            this.hearts--;
        }
        if (this.hearts == 0) {
            // console.log('you lost the game');
            gameOver('lost');
        }
    }
}


const player = new Player(203, 383);



/*----------------
     Control
-----------------*/

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


/*------------------------
     Collision Detection
-------------------------*/
// loop over the enemies and check for each one whether enemy and player occupy the same space
// condition is met when enemy x is larger than player x minus width of enemy (101)
// and enemy x is smaller than player x plus player width (image 66, margin 17,5)

// TODO: move this into enemy? or into enemy prototype..?

function checkCollisions() {
    allEnemies.forEach(function(enemy) {
        if (player.y == enemy.y - 9
            && enemy.x > (player.x - 83)
            && enemy.x < (player.x + 66)) { // works better than 83

                // console.log('gotcha!');
                player.reduceHearts();
                player.resetPlayer();
                // Vehicle-player collision resets the game?

                // if I use timeOut, I need another variable (like with arrivedAtWater)
                // to check if this is the first time the collision was noticed,
                // to prevent the code from being executed multiple times

                /*
                var myTimeout = setTimeout(function(){
                    player.resetPlayer();

                }, 400);
                */
            }
    });
}

/*
NOTES: Possible y-values:
-----------------
Player  Enemy
383     -
300     -
217     226
134     143
51      60
32      -
--> Offset: 9
*/





/*---------------------
     Start / Stop
----------------------*/


//TODO: put this into Enemy Class (?)

// Start and stop enemies

let stop = false;
let enemySpeeds = [] // to store the enemies' speed values while they are stopped

function stopEnemies() {
        allEnemies.forEach(function(enemy) {
            enemySpeeds.push(enemy.speed);
            enemy.speed = 0;
        });
    }

function startEnemies() {
        for (i = 0; i < allEnemies.length; i++) {
            allEnemies[i].speed = enemySpeeds[i];
        }
        enemySpeeds = [];
    }

// use "s" key to toggle between stopping / starting the bugs (for testing)
document.addEventListener('keyup', function(e) {
    if (e.keyCode == 83) { // 's'
        if (stop == false) {
            stopEnemies();
            stop = true;
        } else {
            startEnemies();
            stop = false;
        }
    }
});


/*------------------
     Game Over
-------------------*/


function gameOver(condition) {
    // console.log('GAME OVER! You ' + condition + ' the game');
    stopEnemies();
    showModal(condition);

    // TODO: remove event Listener
    // TODO: Reset game


    /*
    // I can still move... also: put this into a function/variable cause DRY

    document.removeEventListener('keyup', function(e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    });
*/
}



/*-------------
     MODAL
---------------*/

function showModal(winOrLose) {

    let wonOrLost = winOrLose;
    // console.log('condition: ' + wonOrLost);

    let modal = document.querySelector('.popup-background');
    modal.classList.remove('hide');

    let messageLine = document.querySelector('.message');
    // console.log(messageLine);
    messageLine.insertAdjacentHTML('afterbegin', 'You ' + wonOrLost + ' the game');

    // TODO: make buttons clickable
    // let buttonPlayAgain = document.querySelector('#playAgain');
    // console.log(buttonPlayAgain);

    // let buttonNoThanks = document.querySelector('#noThanks');
    // console.log(buttonNoThanks);
}