$(function(){//codigo que se ejecuta cuando la pagiana ha cargado.
    $('#btnEvaluar').click(function(){
      var x=$(".premisa");
      $("img.icono",x).remove();
      var right='<img class="icono" src="imagenes/right.gif"/>';
      var wrong='<img class="icono" src="imagenes/wrong.jpg"/>';
      
      $(x).each(function(){
        $('.preguntasvf',this).removeClass('vferror');
        var rs=$('.preguntasvf',this).attr('resultado');
        //var xrs=$(rs).attr('resultado');
        var sltedrs=$('.active',this).text();
        
        if(rs!=sltedrs.toLowerCase() || sltedrs==""){
          $('.preguntasvf',this).addClass('vferror');
          $('.explicacion', this).removeClass('oculta');
          $('.resultado',this).append(wrong);
        }else{
          $('.resultado',this).append(right);
        }
      });
    });

    $("#btnReiniciar").click(function(){
      var x=$(".premisa");
      $("img.icono",x).remove();
      $('.explicacion', x).addClass('oculta');
      $('.preguntasvf',x).removeClass('vferror');
    })

  });

