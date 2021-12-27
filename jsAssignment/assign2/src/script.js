var liItems;
var liImages;
var imageWidth;
var transition;
var imageNumber;

var value = 0;
var counter = 0;
var opacity = 0;
var toggle = true;



var ul = document.getElementById('bannerSlider');


var bannerBtnLeft = document.getElementById('bannerBtnLeft');
var bannerBtnRight = document.getElementById('bannerBtnRight');

var sliderLeft = bannerBtnLeft.getElementsByTagName('a');
var sliderRight = bannerBtnRight.getElementsByTagName('a');

bannerBtnLeft.style.display = 'none';






//main slider
sliderLeft[0].onclick = function() {

    if (toggle) {

        var goingLeft = true;

        toggle = false;

        slider(counter, goingLeft);

        if (counter >= 0)
            counter--;

        activeSelection(counter);

        if (counter === 1)
            bannerBtnRight.style.display = 'block';

        else if (counter <= 0)
            bannerBtnLeft.style.display = 'none';
    }
    return false;
};

sliderRight[0].onclick = function() {

    if (toggle) {
        toggle = false;

        if (counter < imageHolder.length - 1)
            counter++;

        var goingLeft = false;
        activeSelection(counter);


        slider(counter, goingLeft);

        if (counter >= 2) {
            bannerBtnRight.style.display = 'none';

        } else if (counter === 1)
            bannerBtnLeft.style.display = 'block';
    }

    return false;
};

projectRight.onclick = function() {

    let temp = []; //temporary anrray
    opacity = 0;


    for (var i = 0; i < PROJECT_ROWS; i++) {

        if (projectCounter) {

            boxSet.children[i + projectCounter - 4].style.display = 'none';
        }

        if ((i + projectCounter) >= boxSet.children.length) {
            canSlide = false;
            break;
        } else
            canSlide = true;

        let value = i + projectCounter;
        temp.push(value);

    }

    loop = setInterval(function() {

        for (i = 0; i < temp.length; i++) {
            let value = temp[i];

            boxSet.children[value].style.opacity = opacity;
            boxSet.children[value].style.display = 'list-item';
        }

        opacity += 0.01;

        if (opacity >= 1) {
            clearInterval(loop);
        }

    }, 20);

    if (canSlide)
        projectCounter += PROJECT_ROWS;


    return false;
};

projectLeft.onclick = function() {

    let temp = []; //tempoorary anrray
    opacity = 0;

    for (var i = 0; i < PROJECT_ROWS; i++) {

        let value = i + projectCounter - 4;
        temp.push(value);


        if (projectCounter && (i + projectCounter) < boxSet.children.length) {

            boxSet.children[i + projectCounter].style.display = 'none';
        }

        if (projectCounter <= 0) {
            projectCounter = 4;
            canSlide = false;
            break;
        } else
            canSlide = true;
    }

    loop = setInterval(function() {

        for (i = 0; i < temp.length; i++) {
            let value = temp[i];

            boxSet.children[value].style.opacity = opacity;
            boxSet.children[value].style.display = 'list-item';

        }

        opacity += 0.01;

        if (opacity >= 1) {
            clearInterval(loop);
        }

    }, 20);


    if (canSlide)
        projectCounter -= PROJECT_ROWS;
    else
        projectCounter = 0;

    return false;
};