//BORRAR USUARIOS

$(".TB").on("click",".BorrarU", function(){


    var Uid= $(this).attr("Uid");
    var Ufoto =$(this).attr("Ufoto");

    window.location ="index.php?url=usuarios&Uid="+Uid+"&Ufoto="+Ufoto;

});


//LLAMAR DATOS PARA EDITAR
    
    $(".TB").on("click",".EditarU", function(){

        var Uid= $(this).attr("Uid");
        var datos = new FormData();
    
        datos.append("Uid", Uid);
    
       $.ajax({
       
            url:"Ajax/usuariosA.php",
            method:"POST",
            data: datos,
            cache: false,
            contentType: false,
            processData: false,
            dataType:"json",
            success: function(respuesta){
               
                $("#Uid").val(respuesta["id"]);
                $("#usuarioE").val(respuesta["usuario"]);
                $("#claveE").val(respuesta["pass"]);
                $("#rolE").html(respuesta["rol"]);
                $("#rolE").val(respuesta["rol"]);
    
                $("#FotoActual").html(respuesta["foto"]);
    
                if(respuesta["foto"] != ""){
    
                    $("#rolE").html("src",respuesta["rol"]);
    
                }else{
    
                    $("#rolE").html("src","Vistas/img/usuarios/defecto.png");
    
                }

            }
    
        })
    
    
    });


    //quitar espacios en blanco en textarea

$('textarea').each(function(){

    $(this).val($(this).val().trim());





})
