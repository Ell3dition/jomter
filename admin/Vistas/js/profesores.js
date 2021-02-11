//CARGAR ASIGNATURA DE PORFESOR
const selectProfe = document.getElementById("selectProfesorJefe");

selectProfe.addEventListener("change", cargarSelectAsignatura);

function cargarSelectAsignatura() {
  let rutProfe = document.getElementById("selectProfesorJefe").value;

  console.log(rutProfe);
  $.ajax({
    url: "Ajax/profesoresA.php",
    type: "POST",
    data: { accion: "cargarAsignaturas", rutProfe: rutProfe },
    dataType: "json",
    success: function (respuesta) {
      limpiarSelectAsignatura();

      respuesta.forEach((asignatura) => {
        console.log(asignatura["NOMBRE_ASIGNATURA"]);

        let asignaturas = document.getElementById("selectAsignaturaN");
        let opcion = document.createElement("option");

        opcion.text = asignatura.NOMBRE_ASIGNATURA;
        opcion.value = asignatura.ID_ASIGNATURA;
        asignaturas.appendChild(opcion);
      });
    },
  });
}

function limpiarSelectAsignatura() {
  $("#selectAsignaturaN").empty();
  let asignaturas = document.getElementById("selectAsignaturaN");
  let opcion = document.createElement("option");
  opcion.text = "Seleccione una Opcion";
  opcion.value = "0";
  asignaturas.appendChild(opcion);
}

//CARGAR CURSO DE PROFESOR EN SELECT

selectProfe.addEventListener("change", cargarSelectCursos);

function cargarSelectCursos() {
  let rutProfe = document.getElementById("selectProfesorJefe").value;

  console.log(rutProfe);
  $.ajax({
    url: "Ajax/profesoresA.php",
    type: "POST",
    data: { accion: "cargarCursos", rutProfe: rutProfe },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);

      limpiarSelectCurso();
      respuesta.forEach((curso) => {
        console.log(curso["NOMBRE_CURSO"]);

        let cursos = document.getElementById("selectCursoN");
        let opcion = document.createElement("option");

        opcion.text = curso.NOMBRE_CURSO;
        opcion.value = curso.ID_CURSO;
        cursos.appendChild(opcion);
      });
    },
  });
}

function limpiarSelectCurso() {
  $("#selectCursoN").empty();
  let cursos = document.getElementById("selectCursoN");
  let opcion = document.createElement("option");
  opcion.text = "Seleccione una Opcion";
  opcion.value = "0";
  cursos.appendChild(opcion);
}

//INSERT DE DATOS EN BASE DE DATOS

const btn_guardar = document.getElementById("formulario");

btn_guardar.addEventListener("submit", guardarDatos);

function guardarDatos(e) {
  e.preventDefault();

  const formulario = document.forms["formulario"];
  let rutProfe = formulario["selectProfesorJefe"].value;
  let familia = formulario["familia"].value;
  let fecha = formulario["fechaReporte"].value;
  let descripcion = formulario["descripcion"].value;
  let asistencia = formulario["asistenciaN"].value;
  let inasistencia = formulario["inasistenciaN"].value;
  let justificadas = formulario["justificadaN"].value;
  let webClas = formulario["webclas"].value;
  let idCurso = formulario["selectCursoN"].value;
  let idAsignatura = formulario["selectAsignaturaN"].value;

  if (
    rutProfe == 0 ||
    familia == "" ||
    fecha == "" ||
    descripcion == "" ||
    idCurso == 0 ||
    idAsignatura == 0
  ) {
    toastr.error("Error", "Todos los campos son Obligatorios", {
      closeButton: true,
      progressBar: true,
      showDuration: "800",
      hideDuration: "1000",
      positionClass: "toast-top-full-width",
    });
  } else {
    let lista = [
      rutProfe,
      familia,
      fecha,
      descripcion,
      asistencia,
      inasistencia,
      justificadas,
      webClas,
      idCurso,
      idAsignatura,
    ];

    console.log(lista);

    $.ajax({
      url: "Ajax/profesoresA.php",
      type: "POST",
      data: { accion: "GuardarDatos", lista: JSON.stringify(lista) },
      dataType: "json",
      success: function (respuesta) {
        console.log(respuesta);

        toastr.success("Guardado con exito", "Registro", {
          closeButton: true,
          progressBar: true,
          showDuration: "800",
          hideDuration: "1000",
          positionClass: "toast-top-full-width",
        });

        setTimeout(() => {
          const formulario = document.getElementById("formulario");

          formulario.reset();
        }, 1000);
      },
    });
  }
}
