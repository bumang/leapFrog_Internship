var body = document.getElementsByTagName(`body`)[0];

var frame = document.createElement(`div`);
frame.style.width = `600px`;
frame.style.height = `700px`;
frame.style.position = `relative`;
frame.style.border = `2px solid black`;
frame.style.margin = `100px auto`;
frame.setAttribute(`class`, `block`);

body.appendChild(frame);

var ball = document.createElement('div');
ball.style.height = `100px`;
ball.style.width = `100px`;
ball.style.position = `absolute`;
ball.style.backgroundColor = `#c77d41`;
ball.style.borderRadius = `50%`;
ball.style.left = `15.625rem`;

frame.appendChild(ball);

let getUp = 600;
let getDown = 0;
let movement = `down`;


setInterval(() => {
    switch (movement) {
        case `down`:
            getDown += 5;
            ball.style.top = `${getDown}px`;
            if (getDown >= 600) {
                movement = `up`;
                getDown = 0;
            }
            break;
        default:
            getUp -= 5;
            ball.style.top = `${getUp}px`;
            if (getUp <= 0) {
                movement = `down`;
                getUp = 600;
            }
            break;
    }


}, 10)