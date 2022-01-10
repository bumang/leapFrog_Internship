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
    bottom: HEIGHT - BOTTOM_BAR_HEIGHT
};

const KEYS = [];
const PLAYER = {
    x: DEFAULT_POS_LEFT,
    y: DEFAULT_POS_TOP,
    height: 48,
    width: 32,
    frameX: 0,
    frameY: 3,
    speed: 5,
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

        /* arrow key listeners */
        document.addEventListener("keydown", (e) => {
            keyDownHandler(e);
            if (rightPressed == true) {
                this.character.moveCharacter('right');
                this.character.animateCharacter();
                PLAYER.moving = true;
            } else if (leftPressed == true) {
                this.character.moveCharacter('left');
                this.character.animateCharacter();
                PLAYER.moving = true;
            } else if (spacePressed == true) {
                this.character.throwArrow(e.key);
                PLAYER.moving = true;
            }
        }, false);

        document.addEventListener("keyup", (e) => {
            keyUpHandler(e);
            PLAYER.moving = false;
            PLAYER.frameY = 3;
            PLAYER.frameX = 0;
        }, false);

        /* adding animation */
        this.smoothAnimation = () => {
            requestAnimationFrame(this.smoothAnimation);
            now = Date.now();
            elapsed = now - previous;
            if (elapsed > fpsInterval) {
                previous = now - (elapsed % fpsInterval)
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.background.level1();
                this.character.drawCharacter();
                now = Date.now();
                elapsed = now - previous;
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
    }

}

class Character {
    constructor(ctx) {
        this.ctx = ctx;
        this.ctx.imageSmoothingQuality = 'high';
        this.arrow = {
            x: 9,
            y: 2,
            frameY: 2,
            speed: 5,
        }
    }

    drawCharacter() {
        this.ctx.drawImage(playerSprite, PLAYER.width * PLAYER.frameX, PLAYER.height * PLAYER.frameY, PLAYER.width, PLAYER.height, PLAYER.x, PLAYER.y, PLAYER_WIDTH, PLAYER_HEIGHT);

    }

    moveCharacter(direction) {
        if (direction == 'right') {
            if (PLAYER.x >= BOUNDARIES.right - PLAYER_WIDTH + MARGIN_OF_ERROR) {
                PLAYER.x = PLAYER.x;
            } else {
                PLAYER.frameY = 2;
                PLAYER.x += PLAYER.speed;

            }
        } else if (direction == 'left') {
            if (PLAYER.x <= BOUNDARIES.left - MARGIN_OF_ERROR) {
                PLAYER.x = PLAYER.x;
            } else {
                PLAYER.x -= PLAYER.speed;
                PLAYER.frameY = 1;
            }
        }
    }
    animateCharacter() {
        if (PLAYER.frameX < 3 && PLAYER.moving) {
            PLAYER.frameX++;
        } else {
            PLAYER.frameX = 0;
        }
    }

    throwArrow(key) {
        if (key == ' ') {
            this.ctx.drawImage(arrow, PLAYER.x, PLAYER.y, this.arrow.x, this.arrow.y);
        }
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
    }

    level1Ball() {

    }
}