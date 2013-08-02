/**
 * Created with JetBrains WebStorm.
 * User: gerardo
 * Date: 7/18/13
 * Time: 9:03 AM
 * To change this template use File | Settings | File Templates.
 */

$(document).ready(function() {


    var zi = 1;
    var CuadroVacio = 16;

    var diccionarioMedidas = {};


    $.fn.extend({ crear_puzzle:

        function(tamanio_cuadro) {

            var puzzleObjectElement = '#' + $(this).attr('id');

            var tamanioTablero = (tamanio_cuadro * 4) + 'px';

            $(puzzleObjectElement).html('<div id="tablero"></div>');

            $('#tablero').css({ position:'absolute', width: tamanioTablero, height: tamanioTablero, border: '1px solid gray' });

            for (var i = 0; i < 16; i++) {

                $('#tablero').append("<div id="+ i + " style='left: " + ((i % 4) * tamanio_cuadro) + "px; top: " + Math.floor(i / 4) * tamanio_cuadro + "px; width: " + tamanio_cuadro + "px; height: " + tamanio_cuadro + "px; background-position: " + (-(i % 4) * tamanio_cuadro) + "px " + -Math.floor(i / 4) * tamanio_cuadro + "px '></div>");

             diccionarioMedidas[i] = { left: (i % 4) * tamanio_cuadro, top: Math.floor(i / 4) * tamanio_cuadro };
//             diccionarioMedidas[i]['top'] = ;
            }

//            console.log(diccionarioMedidas);
//

            // CuadroVacio = 16
            $('#tablero').children("div:nth-child(" + CuadroVacio + ")").css({backgroundImage: "", background: "#ffffff"});
            //$('#'+ CuadroVacio).attr('id', '');

            $('#tablero').children('div').click(function() {
                Mover(this, tamanio_cuadro);
            });

            $("#tablero").children('div').mouseup(function() {
                Validar();
            });

            $('#btndesordenar').click(function() {
                Desordenar();
            });
            $('#btnordenar').click(function() {
                Ordenar();
            });


        }
    });


    function Mover(cuadro_seleccionado, tamanio_cuadro) {

        var movible = false;

        var oldx = $('#tablero').children("div:nth-child(" + CuadroVacio + ")").css('left');
        var oldy = $('#tablero').children("div:nth-child(" + CuadroVacio + ")").css('top');

        var newx = $(cuadro_seleccionado).css('left');
        var newy = $(cuadro_seleccionado).css('top');


        if (oldx == newx && newy == (parseInt(oldy) - tamanio_cuadro) + 'px')
            movible = true;

        if (oldx == newx && newy == (parseInt(oldy) + tamanio_cuadro) + 'px')
            movible = true;

        if ((parseInt(oldx) - tamanio_cuadro) + 'px' == newx && newy == oldy)
            movible = true;

        if ((parseInt(oldx) + tamanio_cuadro) + 'px' == newx && newy == oldy)
            movible = true;

        if (movible) {
             $(cuadro_seleccionado).css('z-index', zi++);

              $(cuadro_seleccionado).animate({ left: oldx, top: oldy }, 200, function() {

                $('#tablero').children("div:nth-child(" + CuadroVacio + ")").css('left', newx);
                $('#tablero').children("div:nth-child(" + CuadroVacio + ")").css('top', newy);
            });
        }

    }


    function Desordenar() {

        var tempo = {};

        for(i=0; i<5; i++){

         tempo[i] = diccionarioMedidas[15-i];
            console.log(i);
        }

        for(i=5; i<10; i++){
            tempo[i] = diccionarioMedidas[15-i];

        }

        for(i=10; i<16; i++){
            tempo[i] = diccionarioMedidas[15-i];

        }

        for(i=0;i<16;i++){
            $('#'+i).css('top', tempo[i]['top']);
            $('#'+i).css('left', tempo[i]['left']);
            $('#'+i).css('z-index', zi++);
        }


//      console.log(tempo[0]);
//        console.log(tempo[1]);
//        console.log(tempo[2]);
//        console.log(tempo[3]);
//        console.log(tempo[4]);
//        console.log(tempo[14]);
//        console.log(tempo[15]);
//        console.log(diccionarioMedidas[0]['left'])
//        console.log(diccionarioMedidas[0]['top'])


    }

    function Ordenar() {

        for(i=0;i<16;i++){
            $('#'+i).css('top', diccionarioMedidas[i]['top']);
            $('#'+i).css('left', diccionarioMedidas[i]['left']);
        }

    }


    function Validar() {


//        console.log($('#'+15).css('left'));
//        console.log(diccionarioMedidas[15]['left']);
//
//        if ($('#'+15).css('left') === diccionarioMedidas[15]['left'] + 'px' && $('#'+15).css('top') === diccionarioMedidas[15]['top'] + 'px')
//        {
//
//                window.alert("Haz ganado :)");
//
//
//        }

    }



    $('#puzzle_area').crear_puzzle(175);
});
