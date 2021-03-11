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
      $("#cantidadxMayorEd").val(respuesta["CANTIDAD_POR_MAYOR"]);
      $("#precioxMayorEd").val(respuesta["PRECIO_POR_MAYOR"]);

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

let idP="";
$("#tablaRegistros").on("click", ".BorrarProducto", function () {
  $("#modalConfirmarpro").modal("show");
  idP =  $(this).attr("pId");
});

$(".confirmacion").on("click", ".btnDesactivar", desactivarProductos);
function desactivarProductos(){
  $.ajax({
    url:"Ajax/productosA.php",
    type: "POST",
    data:{accion: "desactivar", id: idP},
    dataType:"json",
    success: function(respuesta){

      $("#modalConfirmarpro").modal("hide");
      window.location.href = "productos";
      alert('Producto desactivado con éxito');
     
    }

  });

}

//ACTIVAR PRODUCTO

$("#tablaRegistros").on("click", ".ActivarProducto", function () {
  $("#modalActivarpro").modal("show");
  idP =  $(this).attr("pId");
});

$(".confirmacion").on("click", ".btnActivar", activarProductos);
function activarProductos(){
  $.ajax({
    url:"Ajax/productosA.php",
    type: "POST",
    data:{accion: "activar", id: idP},
    dataType:"json",
    success: function(respuesta){

      $("#modalActivarpro").modal("hide");
      window.location.href = "desactivados";
      alert('Producto activado con éxito');
     
    }

  });

}