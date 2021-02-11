//BUSCAR REGISTRO POR RUT DE PROFESOR

const buscar = document.getElementById("buscarRegistroProfeJefe");

buscar.addEventListener("click", buscarRegistro);

function buscarRegistro() {
  let rutProfe = document.getElementById("selectProfesor").value;
  let desde = document.getElementById("fechaDesde").value;
  let hasta = document.getElementById("fechaHasta").value;

  if (rutProfe == 0 || desde == "" || hasta == "") {

    toastr.error("Error", "Todos los campos son Obligatorios", {
      closeButton: true,
      progressBar: true,
      showDuration: "800",
      hideDuration: "1000",
      positionClass: "toast-top-full-width",
    });


  } else {
    let lista = [rutProfe, desde, hasta];

    console.log(lista);

    $.ajax({
      url: "Ajax/profesoresA.php",
      type: "POST",
      data: { accion: "verRegistros", lista: JSON.stringify(lista) },
      dataType: "json",
      success: function (respuesta) {
        console.log(respuesta);

        if (respuesta.length == 0) {
          toastr.info("No hay registros en ese rango de fechas", "", {
            closeButton: true,
            progressBar: true,
            showDuration: "800",
            hideDuration: "1000",
            positionClass: "toast-top-full-width",
          });
        }

        $("#tablaRegistrosProfesor tbody tr").empty();
        respuesta.forEach((registro, i) => {
          let tabla = `<tr  >
            <td>${i + 1}</td>
            <td>${registro.FECHA}</td>
            <td id='celda'><text id='contenido'>${
              registro.FAMILIA_ESCUELA
            }</text></td>
            <td>${registro.DESCRIPCCION}</td>
            <td>${registro.ASISTENCIA}</td>
            <td>${registro.INASISTENCIA}</td>
            <td>${registro.JUSTIFICADAS}</td>
            <td>${registro.WEBCLAS}</td>
            <td>${registro.NOMBRE_CURSO}</td>
            <td>${registro.NOMBRE_ASIGNATURA}</td>
            </tr>
          `;
          $("#tablaRegistrosProfesor").append(tabla);

          let x = document.getElementById("contenido").textContent;
          console.log(x);
          if (x == "NO") {
            $("#celda").addClass("table-danger");
          }
        });
      },
    });
  }
}

//CARGAR SELECT PROFESOR

var URLactual = window.location.href;

console.log(URLactual);
console.log(URLactual.split("/"));
let ArrayURL = URLactual.split("/");
ArrayURL.forEach((element) => {
  console.log(element);
  if (element == "RegistroProfesorJefe") {
    cargarSelectProfesor();
  }
});

function cargarSelectProfesor() {
  $.ajax({
    url: "Ajax/profesoresA.php",
    type: "POST",
    data: { accion: "CargarProfes" },
    dataType: "json",
    success: function (respuesta) {
      respuesta.forEach((profes) => {
        let SelectProfe = document.getElementById("selectProfesor");
        let opcion = document.createElement("option");
        opcion.text =
          profes.PRIMER_NOMBRE +
          " " +
          profes.SEGUNDO_NOMBRE +
          " " +
          profes.APELLIDO_PATERNO +
          " " +
          profes.APELLIDO_MATERNO;
        opcion.value = profes.RUT;
        SelectProfe.appendChild(opcion);
      });
    },
  });
}
