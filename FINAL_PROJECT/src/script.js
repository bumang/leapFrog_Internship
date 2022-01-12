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
        this.life = 3;
        this.score = 0;
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
                this.character.throwArrow('space');
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
                this.levelIndicator();
                this.lifeIndicator();
                this.drawScore();

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
            let conditionX;
            const conditionY = this.ball.position.y + this.ball.ballYellow.dH - 24 >= PLAYER.y;
            if (this.ball.position.x > this.character.x + PLAYER_WIDTH) {
                conditionX = (this.ball.position.x + this.ball.ballYellow.dW > this.character.x) && (this.ball.position.x < this.character.x + PLAYER_WIDTH);
            } else {
                conditionX = (this.ball.position.x + this.ball.ballYellow.dW - 24 > this.character.x) && (this.ball.position.x < this.character.x + PLAYER_WIDTH);

            }
            if (conditionX && conditionY) {
                alert('collision detected');
                this.life = this.life - 1;



            }
        }

        this.levelIndicator = () => {
            this.ctx.font = "bolder 52px Comic Sans MS";
            this.ctx.fillStyle = "red";
            this.ctx.textAlign = "center";
            this.ctx.fillText(this.ball.level, this.background.box.levelLeft + 30, this.background.box.levelTop + 43);
        }

        this.lifeIndicator = () => {
            let indicator = {
                SH: 19,
                SW: PLAYER.width,
                DH: 30,
                DW: 40,
                dTop: this.background.box.lifeTop + 5,
                dLeft: this.background.box.lifeLeft + 5
            }
            for (let i = this.life; i > 0; i--) {
                this.ctx.drawImage(playerSprite, 0, 0, indicator.SW, indicator.SH, indicator.dLeft, indicator.dTop, indicator.DW, indicator.DH);
                indicator.dLeft += 40;
            }
        }

        this.drawScore = () => {
            this.ctx.font = "bolder 32px Comic Sans MS";
            this.ctx.fillStyle = "red";
            this.ctx.textAlign = "center";
            this.ctx.fillText(this.score, this.background.box.scoreLeft + this.background.box.scoreW - 100, this.background.box.scoreTop + 30);
        }


    }
    gameOver() {
        this.ball.velocity.x = 0;
        this.ball.velocity.y = 0;
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
            error: 3,
            shoot: '',
            top: '',
            left: '',
            dW: 9,
            dH: BOUNDARIES.bottom - SPIKE_HEIGHT,
            try: 5,
            startPoint: ''
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

        /* drawing arrow */
        this.arrow.left = this.x + (PLAYER_WIDTH / 2) - this.arrow.error;
        this.arrow.top = BOUNDARIES.bottom;
        if (this.arrow.shoot == 'space') {
            this.ctx.drawImage(arrow, 0, 0, this.arrow.x, this.arrow.y, this.arrow.left, this.arrow.top, this.arrow.dW, this.arrow.try);
            this.arrow.try -= 30;
            this.arrow.compare = Math.abs(-this.arrow.try);
            if (this.arrow.compare >= this.arrow.dH) {
                this.arrow.shoot = '';
                this.arrow.try = 5;

            }

        }

        /* drawing sprite */
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

    throwArrow(shoot) {
        this.arrow.shoot = shoot;
    }
}



class Background {
    constructor(ctx) {
        this.ctx = ctx;
        this.ctx.imageSmoothingQuality = 'high';
        this.torch = {
            sW: 18,
            sH: 53,
            dW: 30,
            dH: 90,
            top: HEIGHT - 120,
            left1: WIDTH / 2 + 150,
            left2: WIDTH / 2 - 150
        }
        this.levelIndicator = {
            sW: 78,
            sH: 25,
            dW: 150,
            dH: 40,
            top: HEIGHT - 120,
            left: WIDTH / 2 - 60
        }
        this.playerBox = {
            sW: 101,
            sH: 25,
            dW: 150,
            dH: 40,
            top: HEIGHT - 50,
            left: SIDE_BAR_WIDTH + 10
        }
        this.box = {
            sW: 60,
            sH: 20,
            nameW: 200,
            nameH: 40,
            nameTop: HEIGHT - 50,
            nameLeft: SIDE_BAR_WIDTH + 170,
            scoreW: 200,
            scoreH: 40,
            scoreTop: HEIGHT - 100,
            scoreLeft: SIDE_BAR_WIDTH + 10,
            lifeW: 250,
            lifeH: 40,
            lifeTop: HEIGHT - 120,
            lifeLeft: PLAYGROUND_WIDTH - SIDE_BAR_WIDTH - MARGIN_OF_ERROR,
            levelW: 60,
            levelH: 50,
            levelTop: HEIGHT - 70,
            levelLeft: WIDTH / 2 - 15,
        }
        this.clock = {
            time: PLAYGROUND_WIDTH - MARGIN_OF_ERROR,
            top: BOUNDARIES.bottom + 13,
            left: SIDE_BAR_WIDTH + 5,
            height: 30,
            boxLeft: SIDE_BAR_WIDTH,
            boxTop: BOUNDARIES.bottom + 8,
            boxW: PLAYGROUND_WIDTH,
            boxH: 40,
            timeUp: 2,
            timeSpeed: 5
        }

    }
    level1() {
        this.ctx.drawImage(level1Img, SIDE_BAR_WIDTH, 0, PLAYGROUND_WIDTH, PLAYGROUND_HEIGHT);
        this.ctx.drawImage(backLeftImg, 0, 0, SIDE_BAR_WIDTH, HEIGHT);
        this.ctx.drawImage(backRightImg, WIDTH - SIDE_BAR_WIDTH, 0, SIDE_BAR_WIDTH, HEIGHT);
        this.ctx.drawImage(backBottomImg, SIDE_BAR_WIDTH, PLAYGROUND_HEIGHT, PLAYGROUND_WIDTH, BOTTOM_BAR_HEIGHT);
        this.drawSpikes = () => {
            this.spikes = this.ctx.createPattern(spike, 'repeat-x');
            this.ctx.fillStyle = this.spikes;
            this.ctx.fillRect(SIDE_BAR_WIDTH, 0, PLAYGROUND_WIDTH, SPIKE_HEIGHT);
        }
        this.ctx.drawImage(torch, 0, 0, this.torch.sW, this.torch.sH, this.torch.left1, this.torch.top, this.torch.dW, this.torch.dH);
        this.ctx.drawImage(torch, 0, 0, this.torch.sW, this.torch.sH, this.torch.left2, this.torch.top, this.torch.dW, this.torch.dH);
        this.ctx.drawImage(level, 0, 0, this.levelIndicator.sW, this.levelIndicator.sH, this.levelIndicator.left, this.levelIndicator.top, this.levelIndicator.dW, this.levelIndicator.dH);
        this.ctx.drawImage(emptyBox, 0, 0, this.box.sW, this.box.sH, this.box.levelLeft, this.box.levelTop, this.box.levelW, this.box.levelH);
        this.ctx.drawImage(playerB, 0, 0, this.playerBox.sW, this.playerBox.sH, this.playerBox.left, this.playerBox.top, this.playerBox.dW, this.playerBox.dH);
        this.ctx.drawImage(emptyBox, 0, 0, this.box.sW, this.box.sH, this.box.nameLeft, this.box.nameTop, this.box.nameW, this.box.nameH);
        this.ctx.drawImage(emptyBox, 0, 0, this.box.sW, this.box.sH, this.box.scoreLeft, this.box.scoreTop, this.box.scoreW, this.box.scoreH);
        this.ctx.drawImage(emptyBox, 0, 0, this.box.sW, this.box.sH, this.box.lifeLeft, this.box.lifeTop, this.box.lifeW, this.box.lifeH);
        this.timer = () => {
            this.ctx.fillStyle = '#656565';
            this.ctx.fillRect(this.clock.boxLeft, this.clock.boxTop, this.clock.boxW, this.clock.boxH);
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(this.clock.left, this.clock.top, this.clock.time, this.clock.height);
            if (this.clock.time <= 5) {
                this.clock.time = this.clock.timeUp;
            }
            this.clock.time -= this.clock.timeSpeed;
        }
        this.timer();
        this.scoreHeader = () => {
            this.ctx.font = "bolder 32px Comic Sans MS";
            this.ctx.fillStyle = "red";
            this.ctx.textAlign = "center";
            this.ctx.fillText("SCORE :", this.box.scoreLeft + 65, this.box.scoreTop - 5);
        }
        this.scoreHeader();
        this.lifeHeader = () => {
            this.ctx.font = "bolder 32px Comic Sans MS";
            this.ctx.fillStyle = "red";
            this.ctx.textAlign = "center";
            this.ctx.fillText("LIFE :", this.box.lifeLeft - 60, this.box.lifeTop + 30);
        }
        this.lifeHeader();
        this.drawSpikes();

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
            y: 18
        }
        this.gravity = 2;

        this.level = 1;
    }

    level1Ball() {
        this.position.y = this.position.y + this.velocity.y;
        if (this.position.y >= BOUNDARIES.bottom - this.ballYellow.dH || this.position.y < BOUNDARIES.top) {
            this.velocity.y = -this.velocity.y;
        } else {
            this.velocity.y += this.gravity;
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