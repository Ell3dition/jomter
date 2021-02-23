//VER IMAGENES EN MODAL AL HACER CLICK EN LA IMAGEN UNO
$("#tablaRegistros").on("click", ".imagenUno", function () {
  $("#imagenUno").modal("show"); //ABRIR MODAL

  //RESCATAR VALOR DE ATRIBUTOS
  const imgUno = $(this).attr("imgUno");
  const imgDos = $(this).attr("imgDos");
  const imgTres = $(this).attr("imgTres");
  const imgCuatro = $(this).attr("imgCuatro");

  //SETEAR ATRIBUTO EN IMAGENES DEL MODAL
  $(".Uno").attr("src", imgUno);
  $(".Dos").attr("src", imgDos);
  $(".Tres").attr("src", imgTres);
  $(".Cuatro").attr("src", imgCuatro);
});

//SETEAR PRODUCTOS PARA PODER ACTUALIZAR

$("#tablaRegistros").on("click", ".EditarProducto", function () {
  const idProducto = $(this).attr("pId");

  $.ajax({
    url: "Ajax/productosA.php",
    type: "POST",
    data: { accion: "productos", idProducto: idProducto },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      $("#idProductoEd").val(respuesta["id"]);

      $("#nombreProductoEd").val(respuesta["NOMBRE_PRO"]);
      $("#precioProductoEd").val(respuesta["PRECIO_PRO"]);
      $("#stockProductoEd").val(respuesta["STOCK_PRO"]);
      $("#categoriaProductoEd").val(respuesta["CATEGORIA_PRO"]);
      $("#tallaProductoEd").val(respuesta["TALLA"]);
      $("#desEd").val(respuesta["DESCRIPCION"]);

      $("#imagenUnoActual").val(respuesta["IMG_UNO"]);
      $("#imagenDosActual").val(respuesta["IMG_DOS"]);
      $("#imagenTresActual").val(respuesta["IMG_TRES"]);
      $("#imagenCuatroActual").val(respuesta["IMG_CUATRO"]);

      $(".UnoEd").attr("src", respuesta["IMG_UNO"]);
      $(".DosEd").attr("src", respuesta["IMG_DOS"]);
      $(".TresEd").attr("src", respuesta["IMG_TRES"]);
      $(".CuatroEd").attr("src", respuesta["IMG_CUATRO"]);
    },
  });
});



//Borrar Producto

$("#tablaRegistros").on("click", ".BorrarProducto", function(){

  var res = confirm("Desea borrar el Registro?");

  if(res== true){
    var idProducto = $(this).attr("pId");
    var imgUno = $(this).attr("imgUno");
    var imgDos = $(this).attr("imgDos");
    var imgTres = $(this).attr("imgTres");
    var imgCuatro = $(this).attr("imgCuatro");

    window.location = "index.php?url=productos&Pid="+idProducto+"&imgUno="+imgUno+"&imgDos="+imgDos+"&imgTres="+imgTres+"&imgCuatro="+imgCuatro;

  }
 


 

});

