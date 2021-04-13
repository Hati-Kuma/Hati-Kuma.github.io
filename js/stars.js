var bigStar = 20;
var smallStar = 5;
var radiusStar = 200;
var numStar = 20;

var cvs = document.getElementById("stars");
var ctx = cvs.getContext("2d");

var wCanvas = cvs.clientWidth;
var hCanvas = cvs.clientHeight;

ctx.canvas.width  = wCanvas;
ctx.canvas.height = hCanvas;

ctx.translate(wCanvas/2, hCanvas/2);


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

//positionStars()
setInterval(positionStars, 50)
