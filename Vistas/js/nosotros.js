function cargarNosotros() {
  $.ajax({
    url: "admin/Ajax/nosotrosA.php",
    type: "POST",
    data: { accion: "MostrarNosotros" },
    dataType: "json",
    success: function (respuesta) {
      const cuerpoNosotros = document.querySelector('.cuerpoNosotros');
      cuerpoNosotros.innerHTML = respuesta.CONTENIDO_NOSOTROS;
    },
  });
}




