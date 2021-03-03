const btnEditar = document.querySelector("#EdicionNosotros");
btnEditar.addEventListener("click", confirmacionGuardar);

function confirmacionGuardar() {
  $("#modalConfirmar").modal("show");

  $(".confirmacion").on("click", ".guardarNosotros", guardarNosotros);
}

function guardarNosotros() {
  $("#modalConfirmar").modal("hide");
  let contenido = quill.container.firstElementChild.innerHTML;
  $.ajax({
    url: "Ajax/nosotrosA.php",
    type: "POST",
    data: { accion: "GuardarNosotros", contenido: contenido },
    dataType: "json",
    success: function (respuesta) {
      if (respuesta) {
        toastr.success("Registro actualizado exitosamente", "Nosotros", {
          closeButton: true,
          progressBar: true,
          showDuration: "800",
          hideDuration: "1000",
        });
      } else {
        toastr.error("Hubo un error al actualizar", "Nosotros", {
          closeButton: true,
          progressBar: true,
          showDuration: "800",
          hideDuration: "1000",
        });
      }
    },
  });
}

MostrarNosotros();

function MostrarNosotros() {
  $.ajax({
    url: "Ajax/nosotrosA.php",
    type: "POST",
    data: { accion: "MostrarNosotros" },
    dataType: "json",
    success: function (respuesta) {
      quill.container.firstElementChild.innerHTML =
        respuesta.CONTENIDO_NOSOTROS;
    },
  });
}
