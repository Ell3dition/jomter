//BORRAR USUARIOS

$("#tablaRegistros").on("click", ".BorrarU", function () {
  var res = confirm("Desea borrar el Usuario?");


  if (res == true) {
    var Uid = $(this).attr("Uid");
    var Ufoto = $(this).attr("Ufoto");

    window.location = "index.php?url=usuarios&Uid=" + Uid + "&Ufoto=" + Ufoto;
  }
});

//LLAMAR DATOS PARA EDITAR

$("#tablaRegistros").on("click", ".EditarU", function () {
  var Uid = $(this).attr("Uid");
  var datos = new FormData();

  datos.append("Uid", Uid);

  console.log("estoy aqui");

  $.ajax({
    url: "Ajax/usuariosA.php",
    method: "POST",
    data: datos,
    cache: false,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function (respuesta) {
      document.getElementById("idUsarioEd").value = respuesta["id"];
      document.getElementById("nombreUsuarioEd").value = respuesta["nombre_usuario"];
      document.getElementById("passUsuarioEd").value = respuesta["pass"];
      document.getElementById("imgActualEd").value = respuesta["foto"];
      document.getElementById("rolUsuarioEd").value = respuesta["rol"];

      if (respuesta["foto"] != "") {
        $(".visor").attr("src", respuesta["foto"]);
      } else {
        $(".visor").attr("src", "Vistas/img/defecto.png");
      }
    },
  });
});

//quitar espacios en blanco en textarea

$("textarea").each(function () {
  $(this).val($(this).val().trim());
});
