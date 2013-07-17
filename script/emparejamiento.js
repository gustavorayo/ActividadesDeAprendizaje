$(function(){

  // var objetos= {
  //   objetosA:[{"id":1,"url":"http://smartuml.sourceforge.net/pics/UseCaseDiagram.jpg","ref":2},{"id":2,"url":null,"ref":1},{"id":3,"url":null,"ref":2},{"id":4,"url":null,"ref":1},{"id":5,"url":null,"ref":2},{"id":6,"url":null,"ref":1}],
  //   objetosB:[{"id":1,"url":null,"ref":2},{"id":1,"url":null,"ref":1},{"id":1,"url":null,"ref":2},{"id":1,"url":null,"ref":1},{"id":1,"url":null,"ref":2},{"id":1,"url":null,"ref":1}]
  // };

  var objetos=[ {"id":1,"texto":"Caso de Uso","url":"imagenes/componente.png","id1":3},
                {"id":2,"texto":"Actor","url":"imagenes/caso_uso.png","id1":1},
                {"id":3,"texto":"Componente","url":"imagenes/clase.png","id1":5},
                {"id":4,"texto":"Paquete","url":"imagenes/actor.png","id1":2},
                {"id":5,"texto":"Clase","url":"imagenes/agregacion.png","id1":6},
                {"id":6,"texto":"Agregación","url":"imagenes/paquete.png","id1":4}
              ]

    $("#reiniciar").click(function(){
      draw(setShapes(objetos));
    });

    loadImages(objetos, function(objetosWithImages) {
      objetos=setShapes(objetosWithImages);//Establece las formas. 2 por objeto
      draw(objetos);//dibuja en el canvas las formas.
    });
  }
);


function drawline(start, end){
      var line = new Kinetic.Line({
        points: [start.x, start.y, end.x,end.y],
        stroke: 'green',
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round'
      })
      return line;
}


function draw(objetos){
  var resultado=[];
  var width=400;
  var height=400;
  var isMouseDown=false;
  var isFirstLine=true;
  var isShapeSelected=false;
  var pStart={};
  var pEnd={};
  var line={};

  var tempObject={};

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
    fill: 'white',
    stroke: 'green',
    strokeWidth: 1,
    opacity:0.3
  });

    // rect.on('mousemove', function() { 
    //     var mousePos = stage.getMousePosition();
    //     var x = mousePos.x;
    //     var y = mousePos.y;
    //     pEnd=mousePos;
    //     $('#mensaje').text(' x1: ' + pStart.x + ', y1: ' + pStart.y +' x2: ' + pEnd.x + ', y2: ' +pEnd.y);
    //     if(isShapeSelected==true){
    //       if(isFirstLine==false){ //si existe una linea
    //         line.remove();//eliminarla
    //       }
    //       line=drawline(pStart,pEnd);
    //       isFirstLine=false;
    //       layer.add(line);
    //       layer.draw();
    //     }
    //   }); 
    layer.add(rect);

  for (var i=0;i<objetos.length;i++)
    { 

      objetos[i].formaTexto.on('mousedown', function() {
            var mousePos = stage.getMousePosition();
            var x = mousePos.x ;
            var y = mousePos.y ;
            if(isShapeSelected==true){
              tempObject.attrs.fill='black';
              isShapeSelected=false;
              isFirstLine=true;
              if(isFirstLine==false){
                line.remove();
                line={};
              }
            }else{
              pStart=mousePos;
              tempObject=this;
              this.attrs.fill='yellow';
              isShapeSelected=true;
              isFirstLine=true;
            }
            layer.draw();
      });
      objetos[i].rectImage.on('mousedown', function() {
        if(isShapeSelected==true){
          $('#selected').text('tempObject:'+tempObject.attrs.id);
          if(tempObject.attrs.id==this.attrs.id){
            var r={"id":tempObject.attrs.id,"resultado":true};
          }else
          {
            var r={"id":tempObject.attrs.id,"resultado":false};
          }
          //$.extend(resultado,r);
          resultado.push(r);
          var mousePos = stage.getMousePosition();
          var x = mousePos.x;
          var y = mousePos.y;
          pEnd=mousePos;
          line=drawline(pStart,pEnd);
          layer.add(line);
          //resultado.push(r);
          tempObject.off('mousedown');
          this.off('mousedown');
          this.attrs.stroke='blue';
          tempObject.attrs.fill='blue';
          isShapeSelected=false;
          isFirstLine=true;
          line={};
          layer.draw();

          if(resultado.length==objetos.length){
            for(i=0;i<resultado.length;i++){
              //objetos[i].formaTexto.attrs
              var rs=resultado[i];
              if(rs.resultado==true){
                objetos[rs.id-1].formaTexto.attrs.fill='green';
              }
              else{
               objetos[rs.id-1].formaTexto.attrs.fill='red'; 
              }
            }
            layer.draw();

          }
        }
      });     

      // objetos[i].rectImage.on('mousemove', function() { 
      //   var mousePos = stage.getMousePosition();
      //   var x = mousePos.x;
      //   var y = mousePos.y;
      //   pEnd=mousePos;
      //   $('#mensaje').text(' x1: ' + pStart.x + ', y1: ' + pStart.y +' x2: ' + pEnd.x + ', y2: ' +pEnd.y);
      //   if(isShapeSelected){
      //     if(isFirstLine==false){ //si existe una linea
      //       line.remove();//eliminarla
      //     }
      //     line=drawline(pStart,pEnd);
      //     isFirstLine=false;
      //     layer.add(line);
      //     layer.draw();
      //   }
      // }); 

      layer.add(objetos[i].rectImage);
      layer.add(objetos[i].formaTexto);

    }//end For
    stage.add(layer);
}


function loadImages(objetos, callback) {
        var loadedImages=0;
        for(i=0;i<objetos.length;i++){
          var imageObj=new Image();
          objetos[i].img=imageObj;
          imageObj.src=objetos[i].url;
          imageObj.onload=function(){
            loadedImages=loadedImages+1;
            if(loadedImages==objetos.length){
              callback(objetos);
            }
          }
        }
      }

function setShapes(objetos){
  var width=400;
  var height=400;

    size=height/(objetos.length+1);//divide el canvas en la cantidad de objetos mas uno.
    margen=10;

  for (var i=0;i<objetos.length;i++)
    { 

        var rightx=margen;
        var righty=(i*size)+ (margen*i);

        var leftx= width-(margen+size);
        var lefty=(i*size)+(margen*i) ;

        var formaTexto = new Kinetic.Text({
        x: rightx+(size/4),
        y: righty+(size/2),
        text: objetos[i].texto,
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: 'black',
        height:size,
        width:size,
        id:objetos[i].id
      });

        var rectImage = new Kinetic.Image({
          x: leftx,
          y: lefty,
          image: objetos[i].img,
          width: size,
          height: size,
          id:objetos[i].id1
        });

      // var rectImage = new Kinetic.Rect({
      //   x:leftx ,
      //   y:lefty ,
      //   width: size,
      //   height: size,
      //   stroke: 'black',
      //   strokeWidth: 0,
      //   fillPatternImage:objetos[i].img,
      //   fillPatternRepeat: 'no-repeat',
      //   fillPatternScale: [size/objetos[i].img.width, size/objetos[i].img.height],
      //   id:objetos[i].id1
      // });
      objetos[i].formaTexto=formaTexto;
      objetos[i].rectImage=rectImage;
    }
    return objetos;
}