let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";

var flyAudio = new Audio();
var scoreAudio = new Audio();

flyAudio.src  = "audio/fly.mp3"
scoreAudio.src = "audio/score.mp3"


var gap = 90;


document.addEventListener("keydown", moveUp)
document.addEventListener("touchstart", moveUp)

function moveUp(){
    yPos -= 30;
    flyAudio.play();
}


var pipe = [];

pipe[0] = {
    x : cvs.width,
    y: 0
}


var xPos = 10;
var yPos = 150;
var grav = 1.5;


var score = 0;


function draw(){
    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x --;

        if(pipe[i].x == 80){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }

        if(xPos + bird.width >= pipe[i].x 
            && xPos <= pipe[i].x + pipeUp.width 
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) 
            || yPos + bird.height >= cvs.height - fg.height){
                alert("Игра окончена. \nВаш счет: " + score)
                location.reload()
                bird = 0;
            }


        if(pipe[i].x == 10){
            scoreAudio.play(); 
            score++;
            
        }
    }


    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = '#000';
    ctx.font = '24px Verdana';
    ctx.fillText("Счет: " + score, 10, cvs.height - 20)

    requestAnimationFrame(draw)
}

window.onload = draw();

