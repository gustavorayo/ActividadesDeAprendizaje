$(function(){

  // var objetos= {
  //   objetosA:[{"id":1,"url":"http://smartuml.sourceforge.net/pics/UseCaseDiagram.jpg","ref":2},{"id":2,"url":null,"ref":1},{"id":3,"url":null,"ref":2},{"id":4,"url":null,"ref":1},{"id":5,"url":null,"ref":2},{"id":6,"url":null,"ref":1}],
  //   objetosB:[{"id":1,"url":null,"ref":2},{"id":1,"url":null,"ref":1},{"id":1,"url":null,"ref":2},{"id":1,"url":null,"ref":1},{"id":1,"url":null,"ref":2},{"id":1,"url":null,"ref":1}]
  // };

    var objetos= {
    objetosA:[{"id":1,"url":"http://smartuml.sourceforge.net/pics/UseCaseDiagram.jpg","ref":2},{"id":2,"url":null,"ref":1}],
    objetosB:[{"id":1,"url":null,"ref":2},{"id":1,"url":null,"ref":1}]
  };

//draw(objetos);

    loadImages(objetos, function(images) {
      draw(objetos);
    });

}
);


function drawline(start, end){
      var redLine = new Kinetic.Line({
        points: [start.x, start.y, end.x,end.y],
        //points: [0, 0, 80,80],
        stroke: 'red',
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round'
      })
      return redLine;
}


function draw(objetos){
  var formas={};
  var width=400;
  var height=400;
  var isMouseDown=false;
  var pStart={};
  var pEnd={};
  var line={};
  var isFirstLine=true;

  var stage=new Kinetic.Stage({
    container:'canvas',
    width:width,
    height:height
  })
   var layer = new Kinetic.Layer();

      var rect = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: width,
        height: height,
        fill: 'gray',
        stroke: 'white',
        strokeWidth: 1,
        opacity:0.9
      });

    //   rect.on('mousedown', function() {
    //     var mousePos = stage.getMousePosition();
    //     var x = mousePos.x ;
    //     var y = mousePos.y ;
    //     isMouseDown=true;
    //     pStart=mousePos;
    // });

    rect.on('mousemove', function() { 
      var mousePos = stage.getMousePosition();
      var x = mousePos.x;
      var y = mousePos.y;
      pEnd=mousePos;
      if(isMouseDown){
        $('#mensaje').text(' x1: ' + pStart.x + ', y1: ' + pStart.y +' x2: ' + pEnd.x + ', y2: ' +pEnd.y);
        if(!isFirstLine){
          line.remove();
        }
        line=drawline(pStart,pEnd);
        isFirstLine=false;
        layer.add(line);
        layer.draw();
      }
    });
    
    layer.add(rect);

  size=height/(objetos.objetosB.length+1);//divide el canvas en la cantidad de objetos mas uno.
  margen=10;

  for (var i=0;i<objetos.objetosA.length;i++)
    { 
      var x=margen;
      var y=(i*size)+ (margen*i);



      var rect = new Kinetic.Rect({
        x:x ,
        y:y ,
        width: size,
        height: size,
       // fill: 'red',
        stroke: 'black',
        strokeWidth: 1,
        fillPatternImage:objetos.objetosA[0].url,
        myid:objetos.objetosA[i].id,
        refid:objetos.objetosA[i].ref
      });

      rect.on('mousedown', function() {
          var mousePos = stage.getMousePosition();
          var x = mousePos.x ;
          var y = mousePos.y ;
          isMouseDown=true;
          pStart=mousePos;
      });

      rect.on('mouseup', function() {
        isMouseDown=false;
        isFirstLine=true;
      });      

      layer.add(rect);
      //$.extend(formas,rect);
    }



    for (var i=0;i<objetos.objetosB.length;i++)
    { 
      var rect = new Kinetic.Rect({
        x: width-(margen+size),
        y:(i*size)+(margen*i) ,
        width: size,
        height: size,
        //fill: 'red',
        stroke: 'black',
        strokeWidth: 1,
        fillPatternImage:objetos.objetosA[0].url,
        myid:objetos.objetosA[i].id,
        refid:objetos.objetosA[i].ref
      });

        rect.on('mousedown', function() {
          var mousePos = stage.getMousePosition();
          var x = mousePos.x ;
          var y = mousePos.y ;
          isMouseDown=true;
          pStart=mousePos;
      });

      rect.on('mouseup', function() {
        isMouseDown=false;
        isFirstLine=true;
      });

      layer.add(rect);
     // $.extend(formas,rect);
    }
    stage.add(layer);

}


function loadImages(sources, callback) {
        var imageObj = new Image();
        imageObj.src =sources.objetosA[0].url;
        sources.objetosA[0].url=imageObj;
        imageObj.onload = function() {
          callback(sources);
        }
      }