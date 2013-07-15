$(function(){//codigo que se ejecuta cuando la pagiana ha cargado.
    
    var palabras=["GUSTAVO","ENRIQUE","RAYO","HERNANDEZ"];
    $("#reiniciar").click(function(){
      rellenar(palabras);
    });

    rellenar(palabras);

    
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
    var nLinea=obtenerNumero(1,20);
    var pal=palabra;
    var nCol=obtenerNumero(1,20-pal.length);
    var posicion=(nLinea*vertical)-(vertical-nCol);//determina la posicion inicial de la palabra

    for(j=0;j<pal.length;j++){
      var id='#'+(posicion+j);
      var caracter=pal[j];
      $(id).css('background-color','red');
      $(id).text(caracter);
    }
}

function dirOeste(palabra){
    var vertical=20;
    var nLinea=obtenerNumero(1,20);
    var pal=palabra;
    var nCol=obtenerNumero(pal.length,20);
    var posicion=(nLinea*vertical)-(vertical-nCol);//determina la posicion inicial de la palabra
    
    for(j=0;j<pal.length;j++){
      var id='#'+(posicion);
      posicion=posicion-1;
      var caracter=pal[j];
      $(id).css('background-color','red');
      $(id).text(caracter);
    }
}

function dirNorte(palabra){
    var pal=palabra;
    var y=obtenerNumero(pal.length,20);//obtiene la line de inicio Entre la longitud de la palabra y 20;
    var x=obtenerNumero(1,20); //la palabra puede estar en cualquier columna.
    var longitud=20;
    var posicion=(y*longitud)-(longitud-x);//determina la posicion inicial de la palabra
    var pal=palabra;
  
    for(j=0;j<pal.length;j++){
      var id='#'+(posicion);
      posicion=posicion-20;
      var caracter=pal[j];
      $(id).css('background-color','red');
      $(id).text(caracter);
    }
}

function dirSur(palabra){
    var pal=palabra;
    var y=obtenerNumero(1,20-pal.length);//obtiene la line de inicio Entre la longitud de la palabra y 20;
    var x=obtenerNumero(1,20); //la palabra puede estar en cualquier columna.
    var longitud=20;
    var posicion=(y*longitud)-(longitud-x);//determina la posicion inicial de la palabra
    var pal=palabra;
  
    for(j=0;j<pal.length;j++){
      var id='#'+(posicion);
      posicion=posicion+20;
      var caracter=pal[j];
      $(id).css('background-color','red');
      $(id).text(caracter);
    }
}