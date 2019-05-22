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
        this.sprite = 'images/char-cat-girl.png';
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

        if (this.y <=50){
            var myTimeout = setTimeout(function(){
                player.resetPlayer();
            }, 400);
        }
    }
}


const allEnemies = [
    // passing x and y coordinates and speed
    // TODO: random speed, random intervals
    new Enemy(-100, 60, 20),
    new Enemy(-100, 143, 40),
    new Enemy(-100, 226, 80)
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


document.addEventListener('keyup', function(e){
    if (e.keyCode == "s") {
        console.log("s taste wurde gedrückt")
        speed = 0;
    }

});