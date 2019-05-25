//////////////
//  ENEMY   //
//////////////

class Enemy {
    constructor(x, y, speed) {
        this.sprite = 'images/enemy-bug_dark.png';
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
        // when bug has vanished to the right, it reappears from the left
        // TODO: randomize between ~ -500 and -100
        if (this.x >= 500){
            this.x = -100;
        } else {
        // TODO: randomize speed
        this.x += dt*this.speed;
        }
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//////////////
//  PLAYER  //
//////////////

class Player {
    constructor(x, y) {
        this.sprite = 'images/char-horn-girl.png';
        this.x = x;
        this.y = y;
        this.stars = 0;
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
        // console.log(this.x);
        // console.log(this.y);

        // console.log("Enemy1.speed: "+allEnemies[0].speed);

        if (this.y <=50){
            var myTimeout = setTimeout(function(){
                player.resetPlayer();
                player.addStars()
            }, 400);
        }
    }

    addStars(){

        if(this.stars < 3) {
        // console.log("player has "+this.stars +" stars.");
        this.stars++;
        // console.log("player has "+this.stars +" stars.");
        }

        if(this.stars == 3){

            console.log('you win!!');
        }

    }

}



// TODO: randomize intervals and speed for next enemy
// more than one enemy per lane?
const allEnemies = [
    new Enemy(-400, 60, 65), // x, y, speed
    new Enemy(-200, 143, 45),
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


// TODO: put this in either player or enemy?

// loop over the enemies and check for each one whether enemy and player occupy the same space
// condition is met when enemy x is larger than player x minus width of enemy (101)
// and enemy x is smaller than player x plus player width (image 66, margin 17,5)
function checkCollisions(){
    allEnemies.forEach(function(enemy) {
        if(player.y == enemy.y - 9
            && enemy.x > (player.x - 83)
            && enemy.x < (player.x + 66)){ // works better than 83
                // stopStartEnemies(); // doesn't do anything

                // console.log('gotcha!');
                var myTimeout = setTimeout(function(){
                    player.resetPlayer();
                }, 200);

                // TODO: reduce lives

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



//TODO: put this into Enemy Class (?)


// Start and stop enemies for testing

let stop = false;
let enemySpeeds = []


function stopStartEnemies(){
    if (stop == false) {
        allEnemies.forEach(function(enemy){
            enemySpeeds.push(enemy.speed);
            enemy.speed = 0;
        })
        stop = true;

    } else {
        for (i = 0; i < allEnemies.length; i++){
            allEnemies[i].speed = enemySpeeds[i];
        }
        enemySpeeds = [];
        stop = false;
    }
}

document.addEventListener('keyup', function(e){
    if (e.keyCode == 83) { // 's'
        stopStartEnemies()
    }
});