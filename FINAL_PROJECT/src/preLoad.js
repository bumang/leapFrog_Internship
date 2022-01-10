/* global declarations */
let totalImage = 8;

/* Image declaration and sourcing */
let level1Img = new Image();
level1Img.src = './img/level-1.png';
level1Img.id = 'level-1';

let backLeftImg = new Image();
backLeftImg.src = './img/side-bar.jpg';
backLeftImg.id = 'background-left';

let backRightImg = new Image();
backRightImg.src = './img/side-bar.jpg';
backRightImg.id = 'background-right';

let backBottomImg = new Image();
backBottomImg.src = './img/bottom-bar.jpg';
backBottomImg.id = 'background-bottom';

let playerSprite = new Image();
playerSprite.src = './img/darth-vader.png';
playerSprite.id = 'player-sprite';

let spike = new Image();
spike.src = './img/spikes.png';
spike.id = 'spikes';

let arrow = new Image();
arrow.src = './img/arrow.png';
arrow.id = 'arrow';

let ball1 = new Image();
ball1.src = './img/level-1-ball.png';
ball1.id = 'ball-1';


class Preloader {
    constructor() {
        this.imageCount = 0;
        this.preLoader = document.querySelector('#pre-loader');

    }

    loadImg() {
        level1Img.onload = () => {
            this.imageCount += 1;
        }
        backLeftImg.onload = () => {
            this.imageCount += 1;
        }
        backRightImg.onload = () => {
            this.imageCount += 1;
        }
        backBottomImg.onload = () => {
            this.imageCount += 1;
        }
        playerSprite.onload = () => {
            this.imageCount += 1;
        }
        spike.onload = () => {
            this.imageCount += 1;
        }
        arrow.onload = () => {
            this.imageCount += 1;
        }
        ball1.onload = () => {
            this.imageCount += 1;
        }
        this.checkLoader();
    }

    checkLoader() {
        let checker = setInterval(() => {
            if (this.imageCount == totalImage) {
                clearInterval(checker);
                var game = new Game();
                game.Play();
            }

        }, 100);

    }

}


var preloader = new Preloader();
preloader.loadImg();