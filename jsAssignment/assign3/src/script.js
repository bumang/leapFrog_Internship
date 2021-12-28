/* variables */
const PI = 3.14592;
const BOUNDARY_HEIGHT = 800;
const BOUNDARY_WIDTH = 900;
const FPS = 60;



/*DOM manipulation  */

var body = document.getElementsByTagName(`body`)[0];

var canvas = document.getElementById(`myCanvas`);
var ctx = canvas.getContext("2d");
canvas.style.width = `${BOUNDARY_WIDTH}px`;
canvas.style.height = `${BOUNDARY_HEIGHT}px`;
canvas.style.border = `1px solid black`;
canvas.style.margin = `50px auto`;
canvas.style.position = `relative`;
canvas.style.display = `block`;

body.appendChild(canvas);

/* creating class  ball collision  */

function Ball() {

    this.radius = getRandomInt(4, 15);;
    var that = this;
    this.perfectWidth = canvas.width - this.radius;
    this.perfectHeight = canvas.height - this.radius;
    this.x = getRandomInt(0, this.perfectWidth);
    this.y = getRandomInt(0, this.perfectHeight);
    this.dx = getDirection();
    this.dy = getDirection();
    this.speed = '1';



    this.color = generateRandomColor();

    this.createBall = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };

    this.moveBall = function() {

        setInterval(() => {
            that.x += that.dx * that.speed;
            that.y += that.dy * that.speed;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            that.createBall();
            that.checkWallCollision();
            that.checkBallCollision();
            that.setSpeed();

        }, 1000 / FPS);

    };

    this.checkWallCollision = function() {
        if (that.x + that.dx > that.perfectWidth || that.x + that.dx < that.radius) {
            that.dx = -that.dx;
        }
        if (that.y + that.dy > that.perfectHeight || that.y + that.dy < that.radius) {
            that.dy = -that.dy;
        }
    };
    this.checkBallCollision = function() {



        for (var i = 0; i < ballArray.length; i++) {
            for (var j = 1; j < ballArray.length - 1; j++) {
                var distance = getDistance(ballArray[i].x, ballArray[i].y, ballArray[j].x, ballArray.y);
                typeof(distance)
                if (distance < ballArray[i].radius + ballArray[j].radius) {

                    console.log("boom!");
                }

            }
        }
    };

    this.setSpeed = function() {
        switch (that.radius) {
            case 1:
                if (that.radius <= 6)
                    that.speed = 4;
                break;
            case 2:
                if (that.radius <= 9)
                    that.speed = 3;
                break;
            case 3:
                if (that.radius <= 12)
                    that.speed = 2;
                break;
            default:
                that.speed = 1;
                break;
        }

    }


};

/* button for ball addition */
const ballCount = 5;
const ballArray = [];

var addBall = document.createElement(`button`);
addBall.innerText = `ADD BALL`;
addBall.style.padding = `30px`;
addBall.style.fontFamily = `20px bold`;
addBall.style.textAlign = `center`;
addBall.style.margin = `0px 890px`;


body.appendChild(addBall);

addBall.onclick = function() {
    for (let i = 0; i < ballCount; i++) {
        var ball = new Ball();
        ballArray.push(ball);
        ball.moveBall();
        console.log(ballArray)

    }
}