"use strict";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let question = ["LED", "WAIT", "RUN", "LIST", "GOTO", "END", "IF", "THEN", "ELSE", "BTN", "NEW", "PRINT", "LC", "CLS", "RND", "SAVE", "LOAD", "FILES", "BEEP", "PLAY", "LET", "INPUT", "TICK", "CLT", "INKEY", "LEFT", "RIGHT", "UP", "DOWN", "SPACE", "CHR", "ASC", "SCROLL", "SCR", "AND", "OR", "NOT", "FOR", "TO", "STEP", "NEXT", "POS", "DRAW", "POINT", "OUT", "IN", "ANA", "PWM", "CLV", "CLEAR", "CLK", "ABS", "GOSUB", "RETURN", "HEX", "COS", "SIN", "STOP", "CONT", "SOUND", "FREE", "LRUN", "FILE", "SRND", "HELP", "PEEK", "POKE", "CLP", "STR", "LEN", "VIDEO", "RESET", "SLEEP", "UART", "BPS", "SWITCH"];
let keybord = ["led", "wait", "run", "list", "goto", "end", "if", "then", "else", "btn", "new", "print", "lc", "cls", "rnd", "save", "load", "files", "beep", "play", "let", "input", "tick", "clt", "inkey", "left", "right", "up", "down", "space", "chr", "asc", "scroll", "scr", "and", "or", "not", "for", "to", "step", "next", "pos", "draw", "point", "out", "in", "ana", "pwm", "clv", "clear", "clk", "abs", "gosub", "return", "hex", "cos", "sin", "stop", "cont", "sound", "free", "lrun", "file", "srnd", "help", "peek", "poke", "clp", "str", "len", "video", "reset", "sleep", "uart", "bps", "switch"];
let random = Math.floor(Math.random() * question.length);
let right = 0, score = 0;
let quesright = 0;
let bad = 0;
let hitsflag = false, hits = 0, point = 30;
let time = 345;
let plate = [0, 0, 0, 0, 0];
let pointflag = false, y, outflag = false;
let startflag = false;

if (startflag == false) {
    ctx.font = "28px Bold";
    ctx.fillText("タイピングゲーム Ichigojamコマンド", 15, 200);
    ctx.fillText("SPACEかENTERでスタート", 80, 300)
}

document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
    if (e.key == keybord[random][quesright]) {
        right++;
        quesright++;
        hitsflag = true;
    } else {
        bad++;
        hits = 0;
    }

    if (e.key == "Enter" || e.keyCode == 32) {
        startflag = true;
        time = 345;
    }
}

function timer() {
    time -= 1;
}

function loop() {
    if (startflag == true) {
        draw();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "22px Arial Narrow Bold";
    ctx.fillStyle = "#0066ff";
    ctx.fillText("TIME", 10, 26);
    ctx.fillRect(80, 12, time, 12);
    ctx.strokeStyle = "#0066ff";
    ctx.strokeRect(80, 12, 345, 12);

    ctx.fillStyle = "#00bf70";
    ctx.fillText("POINT", 3, 56);
    ctx.fillRect(80, 42, hits, 12);
    ctx.strokeStyle = "#00bf70";
    ctx.strokeRect(80, 42, 345, 12);
    ctx.fillText(point, 450, 56);

    ctx.font = "60px Arial Narrow Bold";
    ctx.fillStyle = "#000";
    let textWidth = ctx.measureText(question[random]).width;
    ctx.fillText(question[random], (500 - textWidth) / 2, 240);

    if (hitsflag) {
        hits += 15;
        hitsflag = false;
    }


    if (hits == 345) {
        hits = 0;
        score += point * 10;
        time += point / 10;
        if (time >= 345) {
            time = 345;
        }
        point += 30;
        pointflag = true;
    }

    if (pointflag) {
        y = 56;
        pointflag = false;
        outflag = true;
    }
    if (outflag) {
        ctx.font = "22px Arial Narrow Bold";
        ctx.fillStyle = "#00f";
        ctx.fillText("+" + (point - 30), 450, Math.floor(y));
        y -= 0.2;
        if (y == -20) {
            outflag = false;
        }
    }

    ctx.font = "40px Arial Narrow Bold";
    ctx.fillStyle = "#888";
    textWidth = ctx.measureText(question[random]).width;
    ctx.fillText(question[random], (500 - textWidth) / 2, 290);
    ctx.fillStyle = "#f00";
    if (quesright != 0) {
        let text = question[random].substr(0, quesright);
        ctx.fillText(text, (500 - textWidth) / 2, 290);
        let lineWidth = ctx.measureText(text).width;
        ctx.fillStyle = "#f00"
        ctx.fillRect((500 - textWidth) / 2, 299, lineWidth, 3);

    }

    if (question[random].length == quesright) {
        plate[question[random].length - 2]++;
        score += question[random].length * 30;
        random = Math.floor(Math.random() * question.length);
        quesright = 0;
    }

    if (time == 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = "30px Arial Narrow Bold";
        ctx.fillStyle = "#000";
        score -= bad * 10;
        ctx.fillText("SCORE：" + Math.floor(score), 180, 150);
        ctx.fillText("正タイプ数：" + right, 160, 200);
        ctx.fillText("ミスタイプ：" + bad, 160, 250);
        ctx.fillRect(0, 320, canvas.width, 2);
        ctx.font = "25px Arial Narrow Bold";
        ctx.fillText("２文字：" + plate[0], 20, 400);
        ctx.fillText("３文字：" + plate[1], 180, 400);
        ctx.fillText("４文字：" + plate[2], 340, 400);
        ctx.fillText("５文字：" + plate[3], 100, 450);
        ctx.fillText("６文字：" + plate[4], 260, 450);
        clearInterval(interval);
    }
}

let interval = setInterval(loop, 0);
let timeset = setInterval(timer, 222);