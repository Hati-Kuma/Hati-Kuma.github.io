var bigStar = 20;
var smallStar = 5;
var radiusStar = 250;
var numStar = 16;

var maincvs = document.getElementById("stars");
var mainctx = maincvs.getContext("2d");

var wCanvas = maincvs.clientWidth;
var hCanvas = maincvs.clientHeight;

mainctx.canvas.width  = wCanvas;
mainctx.canvas.height = hCanvas;

var canvas_stack = new CanvasStack("stars");

var backcvs = canvas_stack.createLayer();
var backctx = document.getElementById(backcvs).getContext("2d");


var cvs = canvas_stack.createLayer();
var ctx = document.getElementById(cvs).getContext("2d");

ctx.translate(wCanvas/2-60, hCanvas/2-60);


function drawStar(x, y){
    ctx.beginPath();
    ctx.moveTo(x, y-bigStar);

    ctx.lineTo(x+smallStar, y-smallStar);
    ctx.lineTo(x+bigStar, y);

    ctx.lineTo(x+smallStar, y+smallStar);
    ctx.lineTo(x, y+bigStar);

    ctx.lineTo(x-smallStar, y+smallStar);
    ctx.lineTo(x-bigStar, y);

    ctx.lineTo(x-smallStar, y-smallStar);
    ctx.lineTo(x, y-bigStar);

    ctx.fillStyle = "White";
    ctx.fill();
}
var increaseX = radiusStar/100;

function yFind(xPosition){
    return Math.sqrt(Math.pow(radiusStar,2)-Math.pow(xPosition,2))
}

var starDistance = 4*radiusStar/numStar;
xlist = [];
ylist = [];
mrlist = [];

for(let X = 0; X<(numStar-1)/(numStar/2)*radiusStar; X += starDistance){
    xlist.push(X-radiusStar)
    ylist.push(yFind(X-radiusStar))
    mrlist.push(true)
}



function positionStars(){
    ctx.clearRect(-wCanvas/2, -hCanvas/2, wCanvas, hCanvas);
    for(let i = 0; i<=(numStar/2)-1; i++){
        drawStar(xlist[i], ylist[i])
        drawStar(-xlist[i], -ylist[i])
        if(xlist[i] >= radiusStar){
            mrlist[i] = false;
        }else if(xlist[i] <= -radiusStar){
            mrlist[i] = true;
        }
        if(mrlist[i]){
            xlist[i] += increaseX
            ylist[i] = -yFind(xlist[i])
        }else{
            xlist[i] -= increaseX
            ylist[i] = yFind(xlist[i])
        } 
    }
    
}

var backBigStar = 40;
var backSmallStar = 10;
function drawbackStar(x, y){
    backctx.clearRect(-wCanvas/2, -hCanvas/2, 2*wCanvas, 2*hCanvas);

    backctx.beginPath();
    backctx.moveTo(x, y-backBigStar);

    backctx.lineTo(x+backSmallStar, y-backSmallStar);
    backctx.lineTo(x+backBigStar, y);

    backctx.lineTo(x+backSmallStar, y+backSmallStar);
    backctx.lineTo(x, y+backBigStar);

    backctx.lineTo(x-backSmallStar, y+backSmallStar);
    backctx.lineTo(x-backBigStar, y);

    backctx.lineTo(x-backSmallStar, y-backSmallStar);
    backctx.lineTo(x, y-backBigStar);

    backctx.fillStyle = "#c3c3c3";
    backctx.fill();
}

document.querySelector(".container").addEventListener("mousemove", function(e){
    drawbackStar(e.x-200, e.y-70)
});

function onWindowResize(){
    window.location.reload()
}
window.addEventListener("resize", onWindowResize);

setInterval(positionStars, 50)
