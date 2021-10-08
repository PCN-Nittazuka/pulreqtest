'use strict';

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let aitemflag = false, aitemX = 0, aitemY = -30, sokud = 0.2;
let tuibiflag = false, tuibiX = 0, tuibiY = -30, tuibisokud = 0.4, tuibi = false, tuibitime = 0;;
let balllength = 1;

let kaihuku = 0;

let mx = 400, my = canvas.height - 100, mw = 50, mh = 50, myangle = 0, ailenscore = 12, $ailenscore = 18, ballX = 0;
let ax = 400, ay = 60, aw = 40, ah = 40, ailenflag = false;
let $ax = 400, $ay = 60, $aw = 40, $ah = 40, $ailenflag = false;

let bossX, bossY, bossW, bossH, bossflag, bossscore, bossballX = 0;
let bossentry = false;

let rightPressed = false;
let leftPressed = false;

let pressflag = false;
let timesflag = true;
let times = 0;
let game = "GAME OVER";
let endcolor = "#ff4afd";

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
        leftPressed = true;
    }
    else if (e.keyCode == 32) {
        pressflag = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
        leftPressed = false;
    }
    else if (e.keyCode == 32) {
        pressflag = false;
    }
}

class Ball {
    constructor(x, y, w, h, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }
}

let ball = [];
let tuibiball = [];
let ailenball = [];
let $ailenball = [];
let bossball = [];

function ballAdd() {
    let b_x = ballX;
    let b_y = my;
    let b_w = 5;
    let b_h = 5;
    let b_dx = myangle;
    let b_dy = -20;
    let b = new Ball(b_x, b_y, b_w, b_h, b_dx, b_dy);
    ball.push(b);
}

function tuibiballAdd() {
    let b_x = ballX;
    let b_y = my;
    let b_w = 5;
    let b_h = 5;
    let b_dx = 0;
    let b_dy = -15;
    let b = new Ball(b_x, b_y, b_w, b_h, b_dx, b_dy);
    tuibiball.push(b);
}

function ailenballAdd() {
    let b_x = ax + (aw / 2);
    let b_y = 100;
    let b_w = 5;
    let b_h = 5;
    let b_dx = 0;
    let b_dy = 20;
    let a = new Ball(b_x, b_y, b_w, b_h, b_dx, b_dy);
    ailenball.push(a);
}

function $ailenballAdd() {
    let b_x = $ax + ($aw / 2);
    let b_y = 100;
    let b_w = 5;
    let b_h = 5;
    let b_dx = 0;
    let b_dy = 10;
    let a = new Ball(b_x, b_y, b_w, b_h, b_dx, b_dy);
    $ailenball.push(a);
}

function bossballAdd() {
    let b_x = bossX + bossballX;
    let b_y = bossY + 40;
    let b_w = 5;
    let b_h = 5;
    let b_dx = 0;
    let b_dy = 20;
    let a = new Ball(b_x, b_y, b_w, b_h, b_dx, b_dy);
    bossball.push(a);
}

function drawMy() {
    context.drawImage(machine, mx, my, mw, mh);

    if (rightPressed && mx < canvas.width - 60) {
        mx += 40;
    } else if (leftPressed && mx > 0) {
        mx -= 40;
    }
}

function drawAilen() {
    context.drawImage(ailenmachine, ax, ay, aw, ah);

    if (!Math.floor(Math.random() * 11) && ax < canvas.width - 100) {
        ax += 40;
    } else if (!Math.floor(Math.random() * 10) && ax > 0) {
        ax -= 40;
    }
}

function draw$Ailen() {
    context.drawImage($ailenmachine, $ax, $ay, $aw, $ah);

    if (!Math.floor(Math.random() * 11) && $ax < canvas.width - 100) {
        $ax += 40;
    } else if (!Math.floor(Math.random() * 10) && $ax > 0) {
        $ax -= 40;
    }
}

function drawBall() {
    for (let j = 0; j < ball.length; j++) {
        context.fillStyle = "#ff11aa";
        context.fillRect(ball[j].x, ball[j].y, ball[j].w, ball[j].h);

        ball[j].x += ball[j].dx;
        ball[j].y += ball[j].dy;

        if (ball[j].y < 0) {
            ball.shift();
        }

        if (ball[j].x < ($ax + $aw) && ball[j].x > ($ax - ball[j].w)) {
            if (ball[j].y == 100) {
                if ($ailenscore != 0) {
                    $ailenscore--;
                }
            }
        }

        if (ball[j].x < (ax + aw) && ball[j].x > (ax - ball[j].w)) {
            if (ball[j].y == 100) {

                if (ailenscore != 0) {
                    ailenscore--;
                }
            }
        }

        if (ball[j].x < (bossX + bossW) && ball[j].x > (bossX - ball[j].w)) {
            if (ball[j].y == 100) {

                if (bossscore != 0) {
                    bossscore--;
                }
            }
        }

    }
}

function drawtuibiBall() {
    for (let j = 0; j < tuibiball.length; j++) {
        context.fillStyle = "#ff5500";
        context.fillRect(tuibiball[j].x, tuibiball[j].y, tuibiball[j].w, tuibiball[j].h);

        tuibiball[j].y += tuibiball[j].dy;

        if (tuibiball[j].x < bossX + 30) {
            tuibiball[j].x += 45;
        } else if (tuibiball[j].x > bossX + 30) {
            tuibiball[j].x += -45;
        }

        if (tuibiball[j].x < (bossX + bossW) && tuibiball[j].x > (bossX - tuibiball[j].w)) {
            if (tuibiball[j].y == 100) {

                if (bossscore != 0) {
                    bossscore--;
                }
            }
        }
    }

}

function drawAilenBall() {
    for (let i = 0; i < ailenball.length; i++) {
        context.fillStyle = "#ff8800";
        context.fillRect(ailenball[i].x, ailenball[i].y, ailenball[i].w, ailenball[i].h);
        ailenball[i].y += ailenball[i].dy;

        if (ailenball[i].x < mx + mw && ailenball[i].x > mx - ailenball[i].w) {
            if (ailenball[i].y == canvas.height - 100) {
                ailenflag = true;
                times = 80;
                timesflag = false;
            }
        }
    }
}

function draw$AilenBall() {
    for (let i = 0; i < $ailenball.length; i++) {
        context.fillStyle = "aqua";
        context.fillRect($ailenball[i].x, $ailenball[i].y, $ailenball[i].w, $ailenball[i].h);
        $ailenball[i].y += $ailenball[i].dy;

        if ($ailenball[i].x < mx + mw && $ailenball[i].x > mx - $ailenball[i].w) {
            if ($ailenball[i].y == canvas.height - 100) {
                $ailenflag = true;
                times = 80;
                timesflag = false;
            }
        }
    }
}

function drawaitem() {
    aitemY += sokud;

    context.fillStyle = "pink";
    context.fillRect(aitemX, aitemY, 20, 20);

    if (aitemY + 20 > my && aitemY < my + mh) {
        if (aitemX + 20 > mx && aitemX < mx + mw) {
            aitemflag = false;
            aitemY = -30;

            times = 4;

            if (balllength < 6) {
                balllength++;
            }
        }
    }
    if (aitemY > canvas.height) {
        aitemflag = false;
        aitemY = -30;
    }
}

function drawtuibi() {
    tuibiY += tuibisokud;

    context.fillStyle = "#0ff";
    context.fillRect(tuibiX, tuibiY, 20, 20);

    if (tuibiY + 20 > my && tuibiY < my + mh) {
        if (tuibiX + 20 > mx && tuibiX < mx + mw) {
            tuibiflag = false;
            tuibiY = -30;

            tuibi = true;
            times = 4;
        }
    }
    if (tuibiY > canvas.height) {
        tuibiflag = false;
        tuibiY = -30;
    }
}

function tuibitimer() {
    tuibitime++;

    if (tuibitime > 5) {
        tuibi = false;
        tuibitime = 0;
    }
}

function gameend() {
    context.font = "100px italic";
    context.fillStyle = endcolor;
    context.fillText(game, 300, canvas.height / 2);
    clearInterval(interval);

    document.addEventListener("keydown", e => {
        if (e.key == "Enter") {
            document.location.reload();
        }
    });
}


//===========================================================
//                          MAIN LOOP
//===========================================================


function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (pressflag && timesflag && !tuibi) {
        let a = 0;

        for (let i = 0; i < balllength; i++) {
            ballX = mx + a;

            if (balllength > 2) {
                if (i == 1 || i == 4) {
                    myangle = -15;
                } else if (i == 2 || i == 5) {
                    myangle = 15;
                } else { myangle = 0; }
            } else { myangle = 0; }

            ballAdd();
            a += 10;
        }

        times += 2;
    } else if (!timesflag) {
        times -= 1;
    }
    if (times > 100) {
        timesflag = false;
    }

    if (times < 0) {
        timesflag = true;
    }

    if (timesflag) {
        context.fillStyle = "white";
    } else {
        context.fillStyle = "orange";
    }
    context.fillRect(15, canvas.height - 20, times * 2, 15);
    context.strokeStyle = "white";
    context.strokeRect(15, canvas.height - 20, 200, 15);


    if (!Math.floor(Math.random() * 100) && aitemflag == false) {
        aitemflag = true;
        aitemX = Math.floor(Math.random() * canvas.width);
        sokud = 0.2;
    }

    if (aitemflag == true) {
        sokud += 0.2;
        drawaitem();
    }

    if (ailenscore == 0 && $ailenscore == 0) {
        bossentry = true;
        ailenscore = -99;
        $ailenscore = -99;
        bossX = 750, bossY = 100, bossW = 60, bossH = 60, bossflag = false, bossscore = 60;
    }



    if (bossentry == true) {
        if (!Math.floor(Math.random() * 5)) {
            bossballX = 20;
            bossballAdd();
            bossballX = 40;
            bossballAdd();
            bossballX = 60;
            bossballAdd();
        }


        if (bossscore < 50) {
            kaihuku++;
            if (kaihuku > 150) {
                bossscore += Math.floor(Math.random() * 30);
                if (bossscore > 60) {
                    bossscore = 60;
                }
                kaihuku = 0;
            }
        }

        context.fillStyle = "#4D85B6";
        context.font = "20px bold";
        context.fillText("ボス", 630, 30);
        context.fillStyle = "rgba(255,0,0)";
        context.fillRect(350, 50, bossscore * 10, 10);
        context.strokeStyle = "white";
        context.strokeRect(350, 50, 600, 10);


        if (!Math.floor(Math.random() * 100) && tuibiflag == false) {
            tuibiflag = true;
            tuibiX = Math.floor(Math.random() * canvas.width);
            tuibisokud = 0.4;
        }

        if (tuibiflag == true) {
            tuibisokud += 0.4;
            drawtuibi();
        }

        if (pressflag && timesflag && tuibi) {
            let a = 0;

            times += 10;

            for (let i = 0; i < balllength / 2; i++) {
                ballX = mx + a;

                tuibiballAdd();
                a += 15;
            }
        }

        drawbossball();
        drawboss();
    }



    if (bossscore == 0) {
        game = "GAME CLEAR";
        endcolor = "yellow";
        gameend();
    }

    if (ailenflag) {
        balllength--;
        if (ailenscore < 12) {
            ailenscore++;
        }
        ailenflag = false;
    }

    if ($ailenflag) {
        balllength--;
        if ($ailenscore < 16) {
            $ailenscore++;
        }
        $ailenflag = false;
    }

    if (bossflag) {
        balllength--;
        bossflag = false;
    }

    context.fillStyle = "red";
    context.fillRect(mx - 20, my + mh + 20, balllength * 15, 10);
    context.strokeStyle = "white";
    context.strokeRect(mx - 20, my + mh + 20, 90, 10);

    if (balllength == 0) {
        gameend();
    }

    if (ailenscore > 0) {
        if (!Math.floor(Math.random() * 9)) {
            ailenballAdd();
        }

        context.fillStyle = "red";
        context.fillRect(ax - 20, ay - 20, ailenscore * 7.5, 10);
        context.strokeStyle = "white";
        context.strokeRect(ax - 20, ay - 20, 90, 10);

        drawAilen();
    }

    if ($ailenscore > 0) {
        if (!Math.floor(Math.random() * 7)) {
            $ailenballAdd();
        }

        context.fillStyle = "red";
        context.fillRect($ax - 20, $ay - 20, $ailenscore * 10 / 2, 10);
        context.strokeStyle = "white";
        context.strokeRect($ax - 20, $ay - 20, 90, 10);

        draw$Ailen();
    }

    drawMy();

    if (tuibiball.length > 1) {
        drawtuibiBall();
    }
    drawBall();
    drawAilenBall();
    draw$AilenBall();
}



function drawbossball() {
    for (let i = 0; i < bossball.length; i++) {
        context.fillStyle = "#AF3";
        context.fillRect(bossball[i].x, bossball[i].y, bossball[i].w, bossball[i].h);
        bossball[i].y += bossball[i].dy;

        if (bossball[i].x < mx + mw && bossball[i].x > mx - bossball[i].w) {
            if (bossball[i].y == canvas.height - 80) {
                bossflag = true;
            }
        }
    }
}

function drawboss() {
    context.drawImage(bossmachine, bossX, bossY, bossW, bossH);

    if (!Math.floor(Math.random() * 8) && bossX < canvas.width - 100) {
        bossX += 40;
    } else if (!Math.floor(Math.random() * 7) && bossX > 0) {
        bossX -= 40;
    }
}

let interval = setInterval(draw, 40);
let timer = setInterval(tuibitimer, 300);