var idAB = 0;

$(document).ready(function () {
  cargarCursos();
  cargarBeneficios();
  let fecha = moment();
  let fechaActual = fecha.format("YYYY-MM-DD");
  document.getElementById("agregarFecha").value = fechaActual;
  $("#btnMostrar").attr("disabled", true);

  cargarBeneficiarios();
});

$("#modalCursos").change(function () {
  let selectAlumnos = document.getElementById("modalAlumnos");
  let idCurso = $("#modalCursos option:selected").val();
  $("#modalAlumnos").html("");
  let opcion = document.createElement("option");
  opcion.setAttribute("value", "0");
  opcion.innerHTML = "Seleccionar Alumno";
  selectAlumnos.appendChild(opcion);
  $.ajax({
    url: "Ajax/asistenciaA.php",
    type: "POST",
    data: { accion: "cargarAlumnos", curso: idCurso },
    dataType: "json",
    success: function (respuesta) {
      respuesta.forEach((alumno) => {
        let opcion = document.createElement("option");
        opcion.setAttribute("value", alumno.RUT);
        opcion.innerHTML =
          alumno.PRIMER_NOMBRE +
          " " +
          alumno.SEGUNDO_NOMBRE +
          " " +
          alumno.APELLIDO_PATERNO +
          " " +
          alumno.APELLIDO_MATERNO;
        selectAlumnos.appendChild(opcion);
      });
    },
  });
});

$("#btnAgregarBeneficiario").click(function () {
  let idCurso = $("#modalCursos option:selected").val();
  let rutAlumno = $("#modalAlumnos option:selected").val();
  let idBeneficio = $("#modalBeneficios option:selected").val();
  let fecha = $("#agregarFecha").val();
  let estadoBeneficio = $("#estadoBeneficio option:selected").text();
  let comentarios = $("#comentariosBeneficiosN").val();

  console.log(comentarios);
  $.ajax({
    url: "Ajax/beneficiosA.php",
    type: "POST",
    data: {
      accion: "agregarBeneficiario",
      curso: idCurso,
      rut: rutAlumno,
      beneficio: idBeneficio,
      fecha: fecha,
      estado: estadoBeneficio,
      comentarios: comentarios,
    },
    dataType: "json",
    success: function (respuesta) {
      $("#modalAgregarBeneficiario").modal("hide");
      let mensajeEstadistica = `<div class="alert alert-success alert-dismissible fade show w-100 mt-2" role="alert">
            <strong>Beneficiario agregado exitosamente!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
      $("#contenedorMensaje").append(mensajeEstadistica);
      cargarBeneficiarios();
      setTimeout(() => {
        $("#contenedorMensaje").empty();
      }, 3000);
    },
  });
});

$("#btnActualizar").click(function () {
  let idAlumnoBeneficio = $("#idAlumnoBeneficio").val();
  let estadoBeneficio = $("#sEstado option:selected").text();
  let comentarios = $("#observacionesBeneficio").val();
  $.ajax({
    url: "Ajax/beneficiosA.php",
    type: "POST",
    data: {
      accion: "actualizarBeneficiario",
      id: idAlumnoBeneficio,
      estado: estadoBeneficio,
      comentarios: comentarios,
    },
    dataType: "json",
    success: function (respuesta) {
      window.location.replace("");
    },
  });
});

$("#borrarBeneficiario").click(function () {
  let idAlumnoBeneficio = document.getElementById("oculto").value;
  $.ajax({
    url: "Ajax/beneficiosA.php",
    type: "POST",
    data: { accion: "borrarBeneficiario", id: idAlumnoBeneficio },
    dataType: "json",
    success: function (respuesta) {
      $("#modalEliminar").modal("hide");
      cargarBeneficiarios();
      let mensajeEstadistica = `<div class="alert alert-danger alert-dismissible fade show w-100 mt-2" role="alert">
            <strong>Beneficiario eliminado exitosamente!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
      $("#contenedorMensaje").append(mensajeEstadistica);

      setTimeout(() => {
        $("#contenedorMensaje").empty();
      }, 3000);
    },
  });
});

function obtenerDatos() {
  var table = document.getElementById("tablaBeneficiarios"),
    rIndex,
    cIndex;
  for (var i = 0; i < table.rows.length; i++) {
    for (var j = 0; j < table.rows[i].cells.length; j++) {
      table.rows[i].cells[j].onclick = function () {
        rIndex = this.parentElement.rowIndex;
        let idAlumnoBeneficio = table.rows[rIndex].cells[0].textContent;
        document.getElementById("idAlumnoBeneficio").value = idAlumnoBeneficio;
        let curso = table.rows[rIndex].cells[4].textContent;
        document.getElementById("selectEditarCurso").innerHTML = curso;
        let nombres = table.rows[rIndex].cells[2].textContent;
        let apellido = table.rows[rIndex].cells[3].textContent;
        document.getElementById("selectEditarAlumno").innerHTML =
          nombres + " " + apellido;
        let beneficio = table.rows[rIndex].cells[5].textContent;
        document.getElementById("selectEditarBeneficio").innerHTML = beneficio;
        let fecha = table.rows[rIndex].cells[7].textContent;
        document.getElementById("selectEditarFecha").value = fecha;
        let comen = table.rows[rIndex].cells[8].textContent;
        document.getElementById("observacionesBeneficio").value = comen;
      };
    }
  }
}

function obtenerID() {
  var table = document.getElementById("tablaBeneficiarios"),
    rIndex,
    cIndex;
  for (var i = 0; i < table.rows.length; i++) {
    for (var j = 0; j < table.rows[i].cells.length; j++) {
      table.rows[i].cells[j].onclick = function () {
        rIndex = this.parentElement.rowIndex;
        let idAlumnoBeneficio = table.rows[rIndex].cells[0].textContent;
        $("#oculto").val(idAlumnoBeneficio);
      };
    }
  }
}

function cargarCursos() {
  $.ajax({
    url: "Ajax/asistenciaA.php",
    type: "POST",
    data: { accion: "cargarCursos" },
    dataType: "json",
    success: function (respuesta) {
      respuesta.forEach((curso) => {
        let cursos = document.getElementById("modalCursos");
        let opcion = document.createElement("option");
        opcion.text = curso.NOMBRE_CURSO;
        opcion.value = curso.ID_CURSO;
        cursos.appendChild(opcion);
      });
    },
  });
}

function cargarBeneficios() {
  $.ajax({
    url: "Ajax/beneficiosA.php",
    type: "POST",
    data: { accion: "cargarBeneficios" },
    dataType: "json",
    success: function (respuesta) {
      respuesta.forEach((beneficio) => {
        let beneficios = document.getElementById("modalBeneficios");
        let opcion = document.createElement("option");
        opcion.text = beneficio.NOMBRE_BENEFICIO;
        opcion.value = beneficio.ID_BENEFICIO;
        beneficios.appendChild(opcion);
      });
    },
  });
}

function cargarBeneficiarios() {
  $.ajax({
    url: "Ajax/beneficiosA.php",
    type: "POST",
    data: { accion: "cargarAlumnosBeneficiados" },
    dataType: "json",
    success: function (respuesta) {
      $("#cuerpoTabla").html("");
      respuesta.forEach((beneficiario) => {
        var fila = `<tr>
                    <td>${beneficiario.ID_ALUMNO_BENEFICIO}</td>
                    <td>${beneficiario.RUT}-${beneficiario.DV}</td>
                    <td>${beneficiario.PRIMER_NOMBRE} ${beneficiario.SEGUNDO_NOMBRE}</td>
                    <td>${beneficiario.APELLIDO_PATERNO}</td>
                    <td>${beneficiario.NOMBRE_CURSO}</td>
                    <td>${beneficiario.NOMBRE_BENEFICIO}</td>
                    <td>${beneficiario.ESTADO}</td>
                    <td>${beneficiario.FECHA}</td>
                    <td>${beneficiario.COMENTARIOS}</td>
                    <td><button value="1" class="btn btn-success" data-toggle="modal" data-target="#modalEditarBeneficiario" onclick="obtenerDatos()">Editar</button></td>
                    <td><button onclick="obtenerID()" class="btn btn-danger" data-toggle="modal" data-target="#modalEliminar">Eliminar</button></td>
                    </tr>`;
        $("#tablaBeneficiarios").append(fila);
      });
    },
  });
}

//BUSQUEDA POR RUT
const btnBuscar = document.querySelector("#btnBuscar");
btnBuscar.addEventListener("click", () => {
  let rutBusqueda = document.querySelector("#rutBusqueda").value;

  let cambio = rutBusqueda.split("-");
  console.log(cambio);
  if (cambio.length == 1 || cambio.length > 2) {
    toastr.error("Error", "El rut no cumple el formato", {
      closeButton: true,
      progressBar: true,
      showDuration: "800",
      hideDuration: "1000",
    });
    return;
  }
  let rut = cambio[0];
  $("#btnMostrar").attr("disabled", false);

  $.ajax({
    url: "Ajax/beneficiosA.php",
    type: "POST",
    data: { accion: "buscarBeneficio", rut: rut },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      if (respuesta.length == 0) {
        toastr.info("No hay beneficios asociados a este rut", "", {
          closeButton: true,
          progressBar: true,
          showDuration: "800",
          hideDuration: "1000",
        });
      }

      $("#cuerpoTabla").html("");
      respuesta.forEach((beneficiario) => {
        var fila = `<tr>
                    <td>${beneficiario.ID_ALUMNO_BENEFICIO}</td>
                    <td>${beneficiario.RUT}-${beneficiario.DV}</td>
                    <td>${beneficiario.PRIMER_NOMBRE} ${beneficiario.SEGUNDO_NOMBRE}</td>
                    <td>${beneficiario.APELLIDO_PATERNO}</td>
                    <td>${beneficiario.NOMBRE_CURSO}</td>
                    <td>${beneficiario.NOMBRE_BENEFICIO}</td>
                    <td>${beneficiario.ESTADO}</td>
                    <td>${beneficiario.FECHA}</td>
                    <td>${beneficiario.COMENTARIOS}</td>
                    <td><button value="1" class="btn btn-success" data-toggle="modal" data-target="#modalEditarBeneficiario" onclick="obtenerDatos()">Editar</button></td>
                    <td><button onclick="obtenerID()" class="btn btn-danger" data-toggle="modal" data-target="#modalEliminar">Eliminar</button></td>
                    </tr>`;
        $("#tablaBeneficiarios").append(fila);
      });
    },
  });
});

//MOSTRAR TODO NUEVAMENTE

const mostrarTodo = document.querySelector("#btnMostrar");
mostrarTodo.addEventListener("click", () => {
  cargarBeneficiarios();
  $("#btnMostrar").attr("disabled", true);
});
