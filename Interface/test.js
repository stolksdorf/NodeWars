


$(document).ready(function(){

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    setupJunk();

    

    redraw();

});


function redraw(){
    clearCanvas();
    drawBot(500,550);


}


function setupJunk(){



    var lastX=canvas.width/2, lastY=canvas.height/2;
    var dragStart,dragged;
    canvas.addEventListener('mousedown',function(evt){
        document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragStart = ctx.transformedPoint(lastX,lastY);
        dragged = false;
    },false);
    canvas.addEventListener('mousemove',function(evt){
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragged = true;
        if (dragStart){
            var pt = ctx.transformedPoint(lastX,lastY);
            ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
            redraw();
        }
    },false);
    canvas.addEventListener('mouseup',function(evt){
        dragStart = null;
        if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
    },false);

    var scaleFactor = 1.1;
    var zoom = function(clicks){
        var pt = ctx.transformedPoint(lastX,lastY);
        ctx.translate(pt.x,pt.y);
        var factor = Math.pow(scaleFactor,clicks);
        ctx.scale(factor,factor);
        ctx.translate(-pt.x,-pt.y);
        redraw();
    }

    var handleScroll = function(evt){
        var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
        if (delta) zoom(delta);
        return evt.preventDefault() && false;
    };
    canvas.addEventListener('DOMMouseScroll',handleScroll,false);
    canvas.addEventListener('mousewheel',handleScroll,false);


    var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    var xform = svg.createSVGMatrix();
    var pt  = svg.createSVGPoint();
    ctx.transformedPoint = function(x,y){
        pt.x=x; pt.y=y;
        return pt.matrixTransform(xform.inverse());
    }







}








function clearCanvas(){
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    reticleDist = 100;

    //Draw the reticles
    for(var ix = 0; ix <= canvas.width; ix+=reticleDist){
        for(var iy = 0; iy <= canvas.height; iy+=reticleDist){
            drawReticle(ix,iy);
        }
    }
}

function drawReticle(x,y){
    var reticleWidth = 1;
    var reticleSize = 10;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = reticleWidth;
    ctx.beginPath();
    ctx.moveTo(x - reticleSize/2 ,y);
    ctx.lineTo(x + reticleSize/2 ,y);
    ctx.stroke()

    ctx.beginPath();
    ctx.moveTo(x,y - reticleSize/2);
    ctx.lineTo(x,y + reticleSize/2);
    ctx.stroke()
}


function drawBot(x,y){




    botSize = 30;

    ctx.beginPath();
    ctx.fillStyle = 'rgba(50, 50, 50, .1)';
    ctx.strokeStyle = 'rgba(50, 50, 50, 1.0)';
    ctx.rect(x-botSize/2, y-botSize/2, botSize, botSize);
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();



    drawScan(x,y, 2.7, 500);
    drawShield(x,y, 50);





}

function drawShield(x,y,radius){


       ctx.shadowBlur = 10;   
       ctx.shadowColor = "rgba(0, 0, 0, 1)";  

    ctx.beginPath();
    ctx.arc(x,y,radius,0, 2*Math.PI);



    ctx.lineWidth = 1;
    ctx.fillStyle = "rgba(0, 0, 255, .1)";
    ctx.strokeStyle = "rgba(0, 0, 255, .8)";
    ctx.stroke();
}

function drawScan(x,y,angle, length){

    percent = 50/(length*5);

    var temp = Math.PI *2;

    angle *= temp;

    var startAngle = (angle - (temp*percent/2));
    var endAngle = (angle + (temp*percent/2));

    ctx.moveTo(x,y);


    ctx.beginPath();
    ctx.arc(x,y,length, 
        startAngle, 
        endAngle
    );



    ctx.lineTo(x,y);
    ctx.closePath();

    ctx.lineWidth = 1;
    ctx.fillStyle = "rgba(225, 225, 50, .1)";
    ctx.strokeStyle = "rgba(225, 225, 50, .8)";
    ctx.fill();
    ctx.stroke();

}