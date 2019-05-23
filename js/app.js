class Enemy {
    constructor(x, y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
     }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    update(dt){
        // TODO: randomize between ~ -500 and -100, randomize speed
        if (this.x >= 500){
            this.x = -100;
        } else {
        this.x += dt*this.speed;
        }
    }


    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}



class Player {
    constructor(x, y) {
        this.sprite = 'images/char-horn-girl.png';
        this.x = x;
        this.y = y;
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
        if(pressed == "left" &&  this.x >= 102) {
            this.x -= 101;
        } else if(pressed == "right" && this.x <= 304){
            this.x += 101;
        } else if(pressed == "up" && this.y >= 51){
            this.y -= 83;
        } else if(pressed == "down" && this.y <= 300){
            this.y += 83;
        }
        console.log(this.x);
        console.log(this.y);

        console.log("Enemy1.speed: "+allEnemies[0].speed);

        if (this.y <=50){
            var myTimeout = setTimeout(function(){
                player.resetPlayer();
            }, 400);
        }
    }
}

// TODO: randomize intervals and speed for next enemy
// more than one enemy per lane?
const allEnemies = [
    new Enemy(-100, 60, 20), // x, y, speed
    new Enemy(-100, 143, 40),
    new Enemy(-100, 226, 80),


];

const player = new Player(203, 383);


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


function checkCollisions(){
    allEnemies.forEach(function(enemy) {
        if(player.y == enemy.y - 9
            && enemy.x > (player.x - 101)
            && enemy.x < (player.x + 101)){
                // stopEnemies();
                console.log('gotcha!');
                var myTimeout = setTimeout(function(){
                    player.resetPlayer();
                }, 200);

                // reduce lives

            }
    });
}


/*
// without for-loop
function checkCollisions(){
    // TODO: for loop...
    if(player.y == allEnemies[0].y - 9
        && allEnemies[0].x > (player.x - 101)
        && allEnemies[0].x < (player.x + 101)){
        stopEnemies();
            console.log('erwischt!');
            // console.log('allEnemies[0].x: '+allEnemies[0].x);
            // console.log('player.x - 101: '+(player.x - 101)); //Nan..?
            // console.log('player.x + 101: '+(player.x + 101)); // 203101 - Strings..?
        }
    }
*/


/*
Enemies possible y:  60, 143, 226,
Player possible y: (383, 300), 217, 134, 51, (32)
--> Offset: 9

Enemy[0]: 60 Player 51
Enemy[1]: 143 Player 134
Enemy[2] 226, Player 217
*/


// stop / start bugs for testing
// TODO: start again
function stopEnemies(){
    allEnemies.forEach(function(enemy) {
        // enemy1Speed = allEnemies[0].speed; // save value for starting again
        // enemy2Speed = allEnemies[1].speed;
        // enemy3Speed = allEnemies[2].speed;
        enemy.speed = 0;
    });
}



document.addEventListener('keyup', function(e){
    if (e.keyCode == 83) {
        stopEnemies()
    }
});