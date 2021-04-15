
var bigStar = 20;
var smallStar = 5;
var numStar = 14;

var maincvs = document.getElementById("stars");
var mainctx = maincvs.getContext("2d");

var wCanvas = maincvs.clientWidth;
var hCanvas = maincvs.clientHeight;
mainctx.canvas.width  = wCanvas;
mainctx.canvas.height = hCanvas;

var radiusStar = hCanvas/3;

var canvas_stack = new CanvasStack("stars");

var backcvs = canvas_stack.createLayer();
var backctx = document.getElementById(backcvs).getContext("2d");


var cvs = canvas_stack.createLayer();
var ctx = document.getElementById(cvs).getContext("2d");

ctx.translate(wCanvas/2, hCanvas/2);


function drawStar(env, x, y, color, bStar, sStar){
    env.beginPath();
    env.moveTo(x, y-bStar);

    env.lineTo(x+sStar, y-sStar);
    env.lineTo(x+bStar, y);

    env.lineTo(x+sStar, y+sStar);
    env.lineTo(x, y+bStar);

    env.lineTo(x-sStar, y+sStar);
    env.lineTo(x-bStar, y);

    env.lineTo(x-sStar, y-sStar);
    env.lineTo(x, y-bStar);

    env.fillStyle = color;
    env.fill();
}

var increaseX = radiusStar/100;

function yFind(xPosition){
    return Math.sqrt(Math.pow(radiusStar,2)-Math.pow(xPosition,2));
}

var starDistance = 4*radiusStar/numStar;
xlist = [];
ylist = [];
mrlist = [];

for(let X = 0; X<(numStar-1)/(numStar/2)*radiusStar; X += starDistance){
    xlist.push(X-radiusStar);
    ylist.push(yFind(X-radiusStar));
    mrlist.push(true);
}

function positionStars(){
    ctx.clearRect(-wCanvas/2, -hCanvas/2, wCanvas, hCanvas);
    for(let i = 0; i<=(numStar/2)-1; i++){
        drawStar(ctx, xlist[i], ylist[i], "white", bigStar, smallStar);
        drawStar(ctx, -xlist[i], -ylist[i], "white", bigStar, smallStar);
        if(xlist[i] >= radiusStar){
            mrlist[i] = false;
        }else if(xlist[i] <= -radiusStar){
            mrlist[i] = true;
        }
        if(mrlist[i]){
            xlist[i] += increaseX;
            ylist[i] = -yFind(xlist[i]);
        }else{
            xlist[i] -= increaseX;
            ylist[i] = yFind(xlist[i]);
        } 
    }
    
}

let backSmallStar;
let backBigStar;
var numBackStar = 0;
let radiusLight;
let gdr;

function drawbackStar(x, y){
    if(numBackStar==150){
        backSStar = Math.random()*3;
        backBStar = backSStar*7;

        backGSStar = backSStar*3;
        backGBStar = backBStar*3;

        gdr = backctx.createRadialGradient(x, y, backBStar*0.75, x, y, backBStar*7);
        gdr.addColorStop(0, "white");
        gdr.addColorStop(1, "transparent");

        drawStar(backctx, x, y, gdr, backGBStar, backGSStar);
        drawStar(backctx, x, y, "#c3c3c3", backBStar, backSStar);
        numBackStar=0;
    }else{
        numBackStar += 1;
    }

    
}

document.querySelector(".container").addEventListener("mousemove", function(e){
    drawbackStar(e.x-200, e.y-70);
});
function onWindowResize(){
    window.location.reload();
}
window.addEventListener("resize", onWindowResize);

setInterval(positionStars, 50);
