$(function(){//codigo que se ejecuta cuando la pagiana ha cargado.

  $("#evaluar").click(function(){
    var x=$("input:checkbox");
    $(x).each(function(){
      var x=$(this).is(':checked',true);
      var y=$(this).attr('value');
      if(y=='V'){
        y=true;
      }else
      {
        y=false;
      }


      if(x && y){
        $(this).parent().css('background-color','lightGreen');
      }else if(x && y==false){
        $(this).parent().css('background-color','lightSalmon');
      }else if(x==false && y){
        $(this).parent().css('background-color','lightSalmon');
      }else{
        $(this).parent().css('background-color','lightGreen');
      }
    })
  });


    $("#reiniciar").click(function(){
    var x=$("input:checkbox");
    $(x).each(function(){
    $(this).parent().css('background-color','white');
    $(this).attr('checked',false);
    })
  });


  });