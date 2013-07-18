$(function(){//codigo que se ejecuta cuando la pagiana ha cargado.
    var isSelected=false;
    var startPosition=0;
    var endPosition=0;

    var palabras=["GUSTAVO","ENRIQUE","RAYO","HERNANDEZ","ESTUDIA","INGENIERIA","SISTEMAS","TECNOLOGIAS","INFORMACION","AJEDREZ","PROGRAMACION","LENGUAJES","PAGINAS"];

    for(i=0;i<palabras.length;i++){
      $("#palabras").append('<div>'+ palabras[i]+'<div>');
    }
    $("#reiniciar").click(function(){
      rellenar(palabras);
    });

    rellenar(palabras);

    $(".letter").bind('click',function(){
      if(isSelected==false){
      $('div').removeClass('selected');
      $(this).addClass('selected')
      startPosition=$(this).attr('id');
      isSelected=true;
    }else{
      endPosition=$(this).attr('id');
      $(this).addClass('selected')
      var d=direccion(startPosition,endPosition);
      if(d==1){

        if(startPosition>endPosition)
        {
          var tmp=startPosition;
          endPosition=startPosition;
          startPosition=tmp;
        }

        for(i=startPosition;i<=endPosition;i++){
            var id='#'+i;
            $(id).addClass('found');
        }
      }else if(d==2){
        alert("vertical");
      }else{
        alert("any");
      }
      isSelected=false;
    }
      
    });
  });


function rellenar(palabras){
  var horizontal=20;
  var vertical=20;
  var MAX=26;
  var MIN=1;
  var cont=0;

  $(".letter").remove();
  for(i=0;i<horizontal;i++){
    for(j=0;j<vertical;j++){
      cont++;
      var numero=obtenerNumero(MIN,MAX);
      $("#sopa").append('<div class="letter" id="'+cont+'">'+String.fromCharCode(numero+64)+'</div>');
    }
  }
  
  for(i=0;i<palabras.length;i++){
    
    var direccion=obtenerNumero(1,4);//determina la direccion 1..8;

    switch(direccion){
      case 1:dirEste(palabras[i]);
             break;
      case  2:dirOeste(palabras[i])
            break;
      case  3:dirNorte(palabras[i])
            break;
      case  4:dirSur(palabras[i])
            break;
    }


  }
}//fin funcion


function obtenerNumero(minimo,maximo){
  return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}

function dirEste(palabra){
    var vertical=20;
    var foundposition=false;
    var id=null;

    while(foundposition==false ){
      foundposition =true;
      var nLinea=obtenerNumero(1,20);
      var pal=palabra;
      var nCol=obtenerNumero(1,20-pal.length);
      var posicion=(nLinea*vertical)-(vertical-nCol);//determina la posicion inicial de la palabra
          for(j=0;j<pal.length;j++){
             id='#'+(posicion+j);
            var r=$(id).hasClass('busy');
            if(r){
                foundposition=false;
            }
          }
    }

    for(j=0;j<pal.length;j++){
      var id='#'+(posicion+j);
      if($(id).hasClass('busy')==true){
        alert("Error");
      }
      var caracter=pal[j];
      //$(id).css('background-color','green');
      $(id).addClass('busy');
      $(id).text(caracter);
    }
}

function dirOeste(palabra){
    var vertical=20;
    var id=null;

        var foundposition=false;
    while(foundposition==false ){
      foundposition =true;
      var nLinea=obtenerNumero(1,20);
      var pal=palabra;
      var nCol=obtenerNumero(pal.length,20);
      var posicion=(nLinea*vertical)-(vertical-nCol);//determina la posicion inicial de la palabra
          for(j=0;j<pal.length;j++){
             id='#'+(posicion-j);
            var r=$(id).hasClass('busy');
            if(r){
                foundposition=false;
            }
          }
    }
    
    for(j=0;j<pal.length;j++){
      var id='#'+(posicion-j);
      var caracter=pal[j];
      //$(id).css('background-color','red');
      $(id).addClass('busy');
      $(id).text(caracter);
    }
}

function dirNorte(palabra){
    var id=null;
      var foundposition=false;
      while(foundposition==false ){
      foundposition =true;
          var pal=palabra;
          var y=obtenerNumero(pal.length,20);//obtiene la line de inicio Entre la longitud de la palabra y 20;
          var x=obtenerNumero(1,20); //la palabra puede estar en cualquier columna.
          var longitud=20;
          var posicion=(y*longitud)-(longitud-x);//determina la posicion inicial de la palabra
          var pal=palabra;
          var tp=posicion;
          for(j=0;j<pal.length;j++){
             id='#'+(tp);
             tp=tp-20;
            var r=$(id).hasClass('busy');
            if(r){
                foundposition=false;
            }
          }
    }
  
    for(j=0;j<pal.length;j++){
      var id='#'+(posicion);
      posicion=posicion-20;
      var caracter=pal[j];
      //$(id).css('background-color','blue');
      $(id).addClass('busy');
      $(id).text(caracter);
    }
}

function dirSur(palabra){
      var id=null;
      var foundposition=false;

      while(foundposition==false ){
      foundposition =true;
        var pal=palabra;
        var y=obtenerNumero(1,20-pal.length);//obtiene la line de inicio Entre la longitud de la palabra y 20;
        var x=obtenerNumero(1,20); //la palabra puede estar en cualquier columna.
        var longitud=20;
        var posicion=(y*longitud)-(longitud-x);//determina la posicion inicial de la palabra
        var tempPosition=posicion;
        var pal=palabra;
            for(j=0;j<pal.length;j++){
               id='#'+(tempPosition);
               tempPosition=tempPosition+20;
              var r=$(id).hasClass('busy');
              if(r){
                  foundposition=false;
              }
            }
    }
    
  
    for(j=0;j<pal.length;j++){
      var id='#'+(posicion);
      if($(id).hasClass('busy')==true){
        alert("Error");
      }
      posicion=posicion+20;
      var caracter=pal[j];
      //$(id).css('background-color','yellow');
      $(id).addClass('busy');
      $(id).text(caracter);
    }
}

function direccion(id1, id2){

  if(id1>id2){
    var mayor=id1;
    var menor=id2;
  }else{
    var mayor=id2
    var menor=id1
  }
  var lid1=Math.floor(id1/20);
  var lid2=Math.floor(id2/20);
  var lastChcar1=id1[id1.length-1];
  var lastChcar2=id2[id2.length-1];
  if(lid1==lid2){
    return 1;
  }else if(lastChcar1==lastChcar2){
    return 2;
  }else{
    return 3;
  }
}
