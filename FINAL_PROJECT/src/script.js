/* GLOBAL DECLARATION */
const HEIGHT = 800;
const WIDTH = 1500;
const PLAYER_HEIGHT = 130;
const PLAYER_WIDTH = 70;
const BOTTOM_BAR_HEIGHT = 180;
const SIDE_BAR_WIDTH = 120;
const SPIKE_HEIGHT = 47;
const MARGIN_OF_ERROR = 10;
const PLAYGROUND_WIDTH = WIDTH - (SIDE_BAR_WIDTH * 2);
const PLAYGROUND_HEIGHT = HEIGHT - BOTTOM_BAR_HEIGHT;
const DEFAULT_POS_LEFT = (WIDTH / 2) - (PLAYER_WIDTH / 2);
const DEFAULT_POS_TOP = HEIGHT - BOTTOM_BAR_HEIGHT - PLAYER_HEIGHT + 5;

const BOUNDARIES = {
    left: SIDE_BAR_WIDTH,
    right: PLAYGROUND_WIDTH + SIDE_BAR_WIDTH,
    top: SPIKE_HEIGHT,
    bottom: PLAYGROUND_HEIGHT
};

const KEYS = [];
const PLAYER = {
    x: DEFAULT_POS_LEFT,
    y: DEFAULT_POS_TOP,
    height: 48,
    width: 32,
    frameX: 0,
    frameY: 3,
    speed: 8,
    moving: false
}
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;
let fps, fpsInterval, startTime, previous, now, elapsed;

class Game {
    constructor() {
        this.body = document.getElementById('game-wrapper');
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingQuality = 'high';
    }

    Play() {
        /* adding background of level 1 */
        this.background = new Background(this.ctx);

        /* adding character */
        this.character = new Character(this.ctx);

        /* adding ball */
        this.ball = new Ball(this.ctx);

        /* arrow key listeners */
        document.addEventListener("keydown", (e) => {
            keyDownHandler(e);
            if (rightPressed == true) {
                this.character.moveCharacter('right');
                this.character.moving = true;
            } else if (leftPressed == true) {
                this.character.moveCharacter('left');
                this.character.moving = true;
            } else if (spacePressed == true) {
                this.character.moving = true;
            }
        }, false);

        document.addEventListener("keyup", (e) => {
            keyUpHandler(e);
            this.character.frameY = 3;
            this.character.frameX = 0;
            if (rightPressed == false && leftPressed == false) {
                this.character.moveCharacter('');
                this.character.moving = false;
            }
        }, false);

        /* adding animation */
        this.smoothAnimation = () => {
            requestAnimationFrame(this.smoothAnimation);
            now = Date.now();
            elapsed = now - previous;
            if (elapsed > fpsInterval) {
                previous = now - (elapsed % fpsInterval)
                now = Date.now();
                elapsed = now - previous;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.background.level1();
                this.character.drawCharacter();
                this.ball.level1Ball();
                this.detectCollision();

            }

        }
        this.start = (fps) => {
            fpsInterval = 1000 / fps;
            previous = Date.now();
            startTime = previous;
            requestAnimationFrame(this.smoothAnimation);
        }
        this.end = () => {
            cancelAnimationFrame(this.reqAnimationId)
        }
        this.start(12);
        // this.ball.position.x + this.ball.ballYellow.dW == this.character.x + PLAYER_WIDTH 
        /* collision detection */
        this.detectCollision = () => {
            const conditionY = this.ball.position.y >= PLAYER.y;
            const conditionX = this.ball.position.x > this.character.x && this.ball.position.x < this.character.x + PLAYER_WIDTH;
            if (conditionY && conditionX) {
                alert('collision detected');
            }
        }



    }
    gameOver() {
        this.end();
    }

}

class Character {
    constructor(ctx) {
        this.direction = '';
        this.ctx = ctx;
        this.moving = false;
        this.x = PLAYER.x;
        this.frameY = PLAYER.frameY;
        this.frameX = PLAYER.frameX;
        this.ctx.imageSmoothingQuality = 'high';
        this.arrow = {
            x: 9,
            y: 690,
            speed: 5,
            error: 3
        }
    }

    drawCharacter() {
        if (this.direction == 'right') {
            if (this.x >= BOUNDARIES.right - PLAYER_WIDTH + MARGIN_OF_ERROR) {
                this.x = this.x;
            } else {
                this.frameY = 2;
                this.x += PLAYER.speed;

            }
        } else if (this.direction == 'left') {
            if (this.x <= BOUNDARIES.left - MARGIN_OF_ERROR) {
                this.x = this.x;
            } else {
                this.x -= PLAYER.speed;
                this.frameY = 1;
            }
        }
        if (!this.direction == '') {
            this.animateCharacter();
        }
        this.throwArrow();
        this.ctx.drawImage(playerSprite, PLAYER.width * this.frameX, PLAYER.height * this.frameY, PLAYER.width, PLAYER.height, this.x, PLAYER.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    }

    moveCharacter(direction) {
        this.direction = direction;

    }
    animateCharacter() {
            if (this.frameX < 3 && this.moving) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        }
        // this.x + (PLAYER_WIDTH / 2) - this.arrow.error
    throwArrow() {
        this.ctx.drawImage(arrow, 0, 0, this.arrow.x, this.arrow.y, this.x + (PLAYER_WIDTH / 2) - this.arrow.error, BOUNDARIES.top, this.arrow.x, BOUNDARIES.bottom - SPIKE_HEIGHT);
    }
}



class Background {
    constructor(ctx) {
        this.ctx = ctx;
        this.ctx.imageSmoothingQuality = 'high';

    }


    level1() {
        this.ctx.drawImage(level1Img, SIDE_BAR_WIDTH, 0, PLAYGROUND_WIDTH, PLAYGROUND_HEIGHT);
        this.ctx.drawImage(backLeftImg, 0, 0, SIDE_BAR_WIDTH, HEIGHT);
        this.ctx.drawImage(backRightImg, WIDTH - SIDE_BAR_WIDTH, 0, SIDE_BAR_WIDTH, HEIGHT);
        this.ctx.drawImage(backBottomImg, SIDE_BAR_WIDTH, PLAYGROUND_HEIGHT, PLAYGROUND_WIDTH, BOTTOM_BAR_HEIGHT);
        this.spikes = this.ctx.createPattern(spike, 'repeat-x');
        this.ctx.rect(SIDE_BAR_WIDTH, 0, PLAYGROUND_WIDTH, SPIKE_HEIGHT);
        this.ctx.fillStyle = this.spikes;
        this.ctx.fill();
    }
}

class Ball {
    constructor(ctx) {
        this.ctx = ctx;
        this.ballYellow = {
            orgiWidth: 74,
            orgiHeight: 74,
            dW: 50,
            dH: 50,
            top: 300,
            left: SIDE_BAR_WIDTH
        }
        this.position = {
            x: SIDE_BAR_WIDTH,
            y: 300
        }
        this.velocity = {
            x: 5,
            y: 15
        }
        this.gravity = 0.5;
    }

    level1Ball() {
        // this.position.y += this.gravity;
        this.position.y = this.position.y + this.velocity.y;
        if (this.position.y + this.ballYellow.dH >= BOUNDARIES.bottom) {
            this.velocity.y = -this.velocity.y;
        } else if (this.position.y <= this.ballYellow.top) {
            this.velocity.y = -this.velocity.y;
        }

        this.position.x = this.position.x + this.velocity.x;
        if (this.position.x + this.ballYellow.dW >= BOUNDARIES.right) {
            this.velocity.x = -this.velocity.x;

        } else if (this.position.x <= this.ballYellow.left) {
            this.velocity.x = -this.velocity.x;
        }
        this.ctx.drawImage(ball1, 0, 0, this.ballYellow.orgiWidth, this.ballYellow.orgiHeight, this.position.x, this.position.y, this.ballYellow.dW, this.ballYellow.dH);

    }

}