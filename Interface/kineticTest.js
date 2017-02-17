/* TODO:

- Black background
- Draw reticles
- Draggable, with limits
- Zoomscroll to mouse
- Hover for info
- Data on cursor
- Live data on mouse move
- Click for select


*/


  $(document).ready(function(){
    


var stage = new Kinetic.Stage({
  container: 'container',
  width: 578,
  height: 200
});


var draggableLayer = new Kinetic.Layer();
draggableLayer.setDraggable("draggable");

//a large transparent background to make everything draggable
var background = new Kinetic.Rect({
    x: -1000,
    y: -1000,
    width: 2000,
    height: 2000,
    fill: "#000000",
    opacity: 0
});

draggableLayer.add(background);


//don't mind this, just to create fake elements
var addCircle = function(x, y, r){
  draggableLayer.add(new Kinetic.Circle({
        x: x*700,
        y: y*700,
        radius: r*20,
        fill: "rgb("+ parseInt(255*r) +",0,0)"
    })
  );
}

var circles = 300
while (circles) {
  addCircle(Math.random(),Math.random(), Math.random())
  circles--;
}

var zoom = function(e) {
  var zoomAmount = e.wheelDeltaY*0.001;
  draggableLayer.setScale(draggableLayer.getScale().x+zoomAmount)
  draggableLayer.draw();
}

document.addEventListener("mousewheel", zoom, false)

stage.add(draggableLayer);







});


