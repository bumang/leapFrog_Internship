/* variables declaration */
const BACK_CHOICE = {
    1: 'day',
    2: 'night'
};
const BIRD_CHOICE = ['yellow', 'blue', 'red'];
const GRAVITY = 9.81;
const TIME = 0.02;

/* getting the game wrapper */
var body = document.querySelector('#game-wrapper');
body.style.width = '60%';
body.style.height = '50rem';
body.style.margin = '50px auto';
body.style.border = '1px solid black';
body.style.position = 'relative';
body.style.background = '#e7e0d4';
body.setAttribute('class', 'clearfix');


class Game {
    constructor(divElement) {
        this.element = divElement;
        this.Start();
    }
    backResult = '';
    birdResult = '';

    Start() {
        this.gameOver = false;
        this.score = 0;
        this.startWrapper = document.createElement('div');
        this.element.appendChild(this.startWrapper);
        this.startWrapper.setAttribute('id', 'start-wrapper');
        this.startWrapper.style.background = '#9e826f';
        this.startWrapper.style.width = '60%';
        this.startWrapper.style.height = '100%';
        this.startWrapper.style.margin = '0px auto';
        this.startWrapper.style.borderRadius = '10px';

        this.startImage = document.createElement('div');
        this.startImage.setAttribute('id', 'start-image');
        this.startImage.style.padding = '80px';
        this.startImage.style.height = '80%'

        this.instruction = document.createElement('img');
        this.instruction.setAttribute('src', './img/message.png');
        this.instruction.style.width = '100%';
        this.instruction.style.height = '100%';
        this.startImage.appendChild(this.instruction);
        this.startWrapper.appendChild(this.startImage);

        this.startButton = document.createElement('div');
        this.startWrapper.appendChild(this.startButton);
        this.startButton.setAttribute('id', 'start-button');
        this.startButton.innerHTML = 'CLICK HERE TO START';
        this.startButton.style.textAlign = 'center';
        this.startButton.style.fontSize = '48px';
        this.startWrapper.style.fontWeight = '1000';
        this.startWrapper.style.color = 'white';
        this.startButton.style.padding = '50px';
        this.startButton.style.border = '3px solid #083a39';
        this.startButton.style.borderRadius = '10px'
        this.startButton.style.textShadow = '10px 2px 8px black';
        this.startButton.style.marginTop = '6px';

        this.startWrapper.addEventListener('mouseover', (e) => {
            this.startButton.style.background = '#083a39';
            setTimeout(function() {
                e.target.style.background = '';
            }, 1000);
        })

        this.startWrapper.addEventListener('click', (e) => {
            this.Choose();
        })


    }
    Choose() {
        this.element.removeChild(this.startWrapper);

        this.chooseWrapper = document.createElement('div');
        this.element.appendChild(this.chooseWrapper);
        this.chooseWrapper.setAttribute('id', 'choose-wrapper');
        this.chooseWrapper.style.background = '#9e826f';
        this.chooseWrapper.style.width = '60%';
        this.chooseWrapper.style.height = '100%';
        this.chooseWrapper.style.margin = '0px auto';
        this.chooseWrapper.style.borderRadius = '10px';

        this.chooseBackground = document.createElement('div');
        this.chooseWrapper.appendChild(this.chooseBackground);
        this.chooseBackground.setAttribute('id', 'choose-background');
        this.chooseBackground.style.width = '80%';
        this.chooseBackground.style.height = '40%';
        this.chooseBackground.style.margin = '0px auto';
        this.chooseBackground.style.padding = '50px';

        this.backHeading = document.createElement('div');
        this.chooseBackground.appendChild(this.backHeading);
        this.backHeading.setAttribute('id', 'back-heading');
        this.backHeading.innerHTML = 'CHOOSE BACKGROUND';
        this.backHeading.style.textAlign = 'center';
        this.backHeading.style.fontSize = '32px';
        this.backHeading.style.fontWeight = '1000';
        this.backHeading.style.color = 'white';
        this.backHeading.style.textShadow = '10px 2px 8px black';

        this.backChoiceWrapper = document.createElement('div')
        this.chooseBackground.appendChild(this.backChoiceWrapper);
        this.backChoiceWrapper.setAttribute('id', 'back-choice-wrap');
        this.backChoiceWrapper.style.height = '80%'
        this.backChoiceWrapper.style.display = 'grid';
        this.backChoiceWrapper.style.marginTop = '30px';
        this.backChoiceWrapper.style.gridTemplateColumns = '1fr 1fr';

        this.day = document.createElement('div');
        this.backChoiceWrapper.appendChild(this.day);
        this.day.setAttribute('id', 'day');
        this.day.style.backgroundImage = 'url(./img/background-day.png)';
        this.day.style.backgroundSize = 'contain';
        this.day.style.borderRadius = '5px';
        this.day.style.marginRight = '10px';
        this.day.style.boxShadow = '10px 10px 5px black';

        this.day.addEventListener('click', (e) => {
            e.target.style.opacity = '0.2';
            this.night.style.opacity = '1'
            this.backResult = BACK_CHOICE[1];

        });


        this.night = document.createElement('div');
        this.backChoiceWrapper.appendChild(this.night);
        this.night.setAttribute('id', 'night');
        this.night.style.backgroundImage = 'url(./img/background-night.png)';
        this.night.style.backgroundSize = 'contain';
        this.night.style.borderRadius = '5px';
        this.night.style.marginLeft = '10px';
        this.night.style.boxShadow = '10px 10px 5px black';

        this.night.addEventListener('click', (e) => {
            e.target.style.opacity = '0.2';
            this.day.style.opacity = '1'
            this.backResult = BACK_CHOICE[2];

        });

        this.chooseBird = document.createElement('div');
        this.chooseWrapper.appendChild(this.chooseBird);
        this.chooseBird.setAttribute('id', 'choose-bird');
        this.chooseBird.style.width = '80%';
        this.chooseBird.style.height = '40%';
        this.chooseBird.style.margin = '0px auto';
        this.chooseBird.style.padding = '50px';
        this.chooseBird.style.marginTop = '100px'

        this.birdHeading = document.createElement('div');
        this.chooseBird.appendChild(this.birdHeading);
        this.birdHeading.setAttribute('id', 'bird-heading');
        this.birdHeading.innerHTML = 'CHOOSE BIRD';
        this.birdHeading.style.textAlign = 'center';
        this.birdHeading.style.fontSize = '32px';
        this.birdHeading.style.fontWeight = '1000';
        this.birdHeading.style.color = 'white';
        this.birdHeading.style.textShadow = '10px 2px 8px black';



        this.birdChoiceWrapper = document.createElement('div');
        this.chooseBird.appendChild(this.birdChoiceWrapper);
        this.birdChoiceWrapper.setAttribute('id', 'bird-choice-wrap');
        this.birdChoiceWrapper.style.height = '40%'
        this.birdChoiceWrapper.style.display = 'grid';
        this.birdChoiceWrapper.style.marginTop = '80px';
        this.birdChoiceWrapper.style.gridTemplateColumns = '1fr 1fr 1fr';

        this.birdElements = [];

        for (let i = 0; i < BIRD_CHOICE.length; i++) {
            const birdId = `${BIRD_CHOICE[i]}-bird`;
            this.birdElements[i] = document.createElement('div');
            this.birdChoiceWrapper.appendChild(this.birdElements[i]);
            this.birdElements[i].setAttribute('id', birdId);
            this.birdElements[i].style.backgroundImage = `url(./img/${BIRD_CHOICE[i]}bird-downflap.png)`;
            this.birdElements[i].style.backgroundSize = '100% 100%';
            this.birdElements[i].style.backgroundRepeat = 'no-repeat';
            this.birdElements[i].style.borderRadius = '5px';
            this.birdElements[i].style.marginRight = '10px';
            this.birdElements[i].style.boxShadow = '10px 10px 5px black';
            this.birdElements[i].addEventListener('click', (e) => {
                this.birdElements.map((item) => {
                    item.style.opacity = 1;
                })
                e.target.style.opacity = '0.2';

                this.birdResult = new Bird(BIRD_CHOICE[i], birdId);
                this.startGame();
            });

        }

    }



    startGame() {
        this.element.removeChild(this.chooseWrapper);

        this.top = document.createElement('div');
        this.top.setAttribute('id', 'top-overflow');
        this.element.appendChild(this.top);
        this.top.style.height = '80%';
        this.top.style.background = `url(./img/background-${this.backResult}.png)`;
        this.top.style.backgroundSize = 'auto 100%';
        this.top.style.position = 'relative';
        this.birdResult.drawBird(this.top);
        let reqAnimationId;
        let backgroundX = 0;
        var that = this;

        this.obstacles = [];

        function smoothAnimation() {
            backgroundX += 5;
            that.top.style.backgroundPositionX = backgroundX + 'px';
            that.checkCollision();
            reqAnimationId = requestAnimationFrame(smoothAnimation)
        }
        // to start
        function start() {
            reqAnimationId = requestAnimationFrame(smoothAnimation)
        }
        // to end
        this.end = () => {
            cancelAnimationFrame(reqAnimationId)
        }

        start();

        this.bottom = document.createElement('div');
        this.element.appendChild(this.bottom);
        this.bottom.setAttribute('id', 'bottom-overflow');
        this.bottom.style.height = '20%';
        this.bottom.style.background = 'url(./img/base.png)';
        this.bottom.style.backgroundSize = 'auto 100%';





        setInterval(() => {
            this.obstacles.push(new Obstacle(that.top));

        }, 10000);


        setInterval(() => {
            // obstacles.push(new Obstacle(that.top));
            for (let i = 0; i < this.obstacles.length; i++) {
                this.obstacles[i].updateObstacle();
            }
            if (this.obstacles[0] && this.obstacles[0].x < 0) {
                this.obstacles[0].removeObstacle(this.top);
                this.obstacles = this.obstacles.slice(1, this.obstacles.length);
            }
        }, 700);

    }

    checkCollision() {
        const y = this.birdResult.y;
        if (y <= 0 || y >= 625) {
            if (!this.gameOver) {
                this.element.removeChild(this.top);
                this.element.removeChild(this.bottom);
                alert('game over');
                this.gameOver = true;
                this.Start();
            }
        }

        let countScore = 0;
        this.obstacles.map((obstacle) => {
            if (this.birdResult.x <= obstacle.x + 52 &&
                this.birdResult.x + this.birdResult.width >= obstacle.x) {
                countScore++;
                //everytime bird passes obstacle, the condition accepted 26 times
                if (countScore % 26 === 0) {
                    this.score++;
                }

                if (this.birdResult.y <= obstacle.y + obstacle.heightTop ||
                    this.birdResult.y + this.birdResult.height - 30 >= 640 - (obstacle.y + obstacle.heightBottom)) {
                    this.end();
                    if (!this.gameOver) {
                        this.element.removeChild(this.top);
                        this.element.removeChild(this.bottom);

                        alert('game over');
                        this.gameOver = true;
                        this.Start();
                    }

                }
            }
        });


    }


}

class Bird {
    constructor(color, id) {
        this.color = color;
        this.id = id;
        this.u = 0;
        this.width = 10;
        this.height = 24;
        this.Gravity();
        this.updateBird();
        this.x = 500;
        this.y = 200;

    }

    drawBird(top) {
        this.flappyBird = document.createElement('div');
        top.appendChild(this.flappyBird);
        this.flappyBird.style.position = 'absolute';
        this.flappyBirdImg = document.createElement('img');
        this.flappyBirdImg.setAttribute('src', `./img/${this.color}bird-downflap.png`)
        this.flappyBird.appendChild(this.flappyBirdImg);
        this.flappyBird.style.top = this.y + 'px';
        this.flappyBird.style.left = this.x + 'px';
    }

    updateBird() {
        document.addEventListener('keydown', update);
        var that = this;

        function update(e) {

            if (e.keyCode == 32) {

                that.u = 20;
                let s = that.u;
                that.flappyBirdImg.setAttribute('src', `./img/${that.color}bird-upflap.png`)
                let style = window.getComputedStyle(that.flappyBird);
                let top = style.getPropertyValue('top');
                top = +top.split('px')[0];
                that.y = top - s;
                that.flappyBird.style.top = `${that.y}px`;
                setTimeout(() => {
                    that.flappyBirdImg.setAttribute('src', `./img/${that.color}bird-midflap.png`)
                }, 200);


            }
        }


    }


    Gravity() {

        setInterval(() => {
            let s = this.u * TIME + 0.5 * GRAVITY * TIME * TIME;
            let style = window.getComputedStyle(this.flappyBird);
            let top = style.getPropertyValue('top');
            top = +top.split('px')[0];
            this.flappyBird.style.top = `${top + s}px`;
            this.y = top + s;
            this.u = this.u + GRAVITY * TIME;
        }, TIME * 1000);

    }




}

class Obstacle {
    constructor(top) {
        this.totalHeight = 640;
        this.gap = 120;
        this.minimumHeight = 20;
        this.maximumHeight = this.totalHeight - this.gap - this.minimumHeight;
        this.x = 1000;
        this.y = '';
        this.createObstacle(top);

    }


    createObstacle(top) {
        const obstacleTopHeight = getRandomInt(this.minimumHeight, this.maximumHeight);
        const obastacleBottomHeight = this.totalHeight - this.gap - obstacleTopHeight;

        this.obstacleTop = document.createElement('div');
        top.appendChild(this.obstacleTop);
        this.obstacleTop.style.left = `${this.x}px`;

        this.obstacleTop.style.position = 'absolute';
        this.obstacleTop.style.height = `${obstacleTopHeight}px`;
        this.obstacleTop.style.background = 'url(./img/pipe-red-reverse.png)';
        this.obstacleTop.style.width = '52px';
        this.obstacleTop.style.backgroundSize = '100% 100%';
        this.y = 0;
        this.heightTop = obstacleTopHeight;
        this.obstacleBottom = document.createElement('div');
        top.appendChild(this.obstacleBottom);
        this.obstacleBottom.style.left = '1000px';
        this.obstacleBottom.style.position = 'absolute';
        this.obstacleBottom.style.top = `${obstacleTopHeight+this.gap}px`;
        this.obstacleBottom.style.height = `${obastacleBottomHeight}px`;
        this.obstacleBottom.style.background = 'url(./img/pipe-red.png)';
        this.obstacleBottom.style.width = '52px';
        this.obstacleBottom.style.backgroundSize = '100% 100%';
        this.heightBottom = obastacleBottomHeight;



    }
    updateObstacle() {
        let style = window.getComputedStyle(this.obstacleTop);
        let left1 = style.getPropertyValue('left');
        left1 = +left1.split('px')[0];
        this.obstacleTop.style.left = `${left1 - 30}px`;
        this.x = left1 - 30;


        style = window.getComputedStyle(this.obstacleBottom);
        let left2 = style.getPropertyValue('left');
        left2 = +left2.split('px')[0];
        this.obstacleBottom.style.left = `${left2 - 30}px`;
    }
    removeObstacle(top) {
        top.removeChild(this.obstacleTop);
        top.removeChild(this.obstacleBottom);

    }
}


var game = new Game(body);