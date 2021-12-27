var body = document.getElementsByTagName(`body`)[0];

var frame = document.createElement(`div`);
frame.style.width = `600px`;
frame.style.height = `800px`;
frame.style.backgroundColor = `orange`;
frame.style.position = `relative`;
frame.style.border = `2px solid black`;
frame.style.margin = `50px auto`;
frame.setAttribute(`class`, `block`);


body.appendChild(frame);

for (let i = 0; i < 100; i++) {
    var child = document.createElement(`div`);
    child.style.height = `20px`;
    child.style.width = `20px`;
    child.style.position = `absolute`;
    child.style.backgroundColor = `#1b9778`;
    child.style.top = `${Math.random() *700}px`;
    child.style.left = `${Math.random() *550}px`;
    frame.appendChild(child);


    child.addEventListener("click", changeStruc);



    function changeStruc(e) {
        e.target.style.backgroundColor = `red`;
        e.target.style.borderRadius = `50%`;
    }



}