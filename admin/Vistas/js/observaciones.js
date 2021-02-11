//CARGAR CURSOS DEPENDIENDO DEL AÑO

$(document).ready(function () {
  const selectCursoBusqueda = document.querySelector("#selectBusquedaCurso");
  let ano = moment().format("YYYY");
  cargarCursos(selectCursoBusqueda, ano);

  $("#selectBusquedaAlumno").attr("disabled", true);
  $("#selectBusquedaCurso").attr("disabled", true);
});

const btnCrear = document.querySelector("#btnCrear");
btnCrear.addEventListener("click", () => {
  console.log(typeof moment().format("YYYY"));
  let ano = moment().format("YYYY");
  const selectCursoCrear = document.querySelector("#selectCursosN");
  cargarCursos(selectCursoCrear, ano);
});

const selectCursoCrear = document.querySelector("#selectCursosN");
selectCursoCrear.addEventListener("change", () => {
  const selectAlumnoCrear = document.querySelector("#selectAlumnoN");
  let idCurso = selectCursoCrear.value;
  cargarAlumnosPorCursos(selectAlumnoCrear, idCurso);
});

function cargarCursos(selectCurso, ano) {
  let idElemento = $(selectCurso).attr("Id");

  $.ajax({
    url: "Ajax/observacionesA.php",
    type: "POST",
    data: { accion: "cargarCursos", ano: ano },
    dataType: "json",
    success: function (respuesta) {
      respuesta.forEach((curso) => {
        let cursos = document.getElementById(idElemento);
        let opcion = document.createElement("option");
        opcion.text = curso.NOMBRE_CURSO;
        opcion.value = curso.ID_CURSO;
        cursos.appendChild(opcion);
      });
    },
  });
}

function cargarAlumnosPorCursos(selectAlumno, idCurso) {
  let idElemento = $(selectAlumno).attr("Id");

  $.ajax({
    url: "Ajax/observacionesA.php",
    type: "POST",
    data: { accion: "cargarAlumnos", idCurso: idCurso },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      limpiarSelectS(idElemento);
      respuesta.forEach((curso) => {
        let cursos = document.getElementById(idElemento);
        let opcion = document.createElement("option");
        opcion.text =
          curso.PRIMER_NOMBRE +
          " " +
          curso.SEGUNDO_NOMBRE +
          " " +
          curso.APELLIDO_PATERNO +
          " " +
          curso.APELLIDO_MATERNO;
        opcion.value = curso.RUT;
        cursos.appendChild(opcion);
      });
    },
  });
}

function limpiarSelectS(idElemento) {
  $("#" + idElemento).empty();

  let msg = "";

  if (idElemento == "selectCursosN" || idElemento == "selectCursosED") {
    msg = "Seleccione Curso";
  } else if (
    idElemento == "selectAlumnoN" ||
    idElemento == "selectAlumnoED" ||
    idElemento == "selectBusquedaAlumno"
  ) {
    msg = "Seleccione Alumno";
  }
  console.log(idElemento);
  let cursos = document.getElementById(idElemento);
  let opcion = document.createElement("option");
  opcion.text = msg;
  opcion.value = "0";

  cursos.appendChild(opcion);
}

//RECOLECTAR DATOS PARA GUARDAR
const btnGuardar = document.querySelector("#btnGuardar");
btnGuardar.addEventListener("click", () => {
  let fecha = $("#fechaN").val();
  let idCurso = $("#selectCursosN").val();
  let rutAlumno = $("#selectAlumnoN").val();
  let observacion = $("#observacionN").val();
  let comentarios = $("#comentariosN").val();

  if (
    fecha == "" ||
    rutAlumno == 0 ||
    idCurso == 0 ||
    observacion == 0 ||
    comentarios == ""
  ) {
    toastr.error("Error", "Todos los campos son Obligatorios", {
      closeButton: true,
      progressBar: true,
      showDuration: "800",
      hideDuration: "1000",
    });

    return;
  }

  let datos = [
    {
      fecha: fecha,
      idCurso: idCurso,
      rutAlumno: rutAlumno,
      observacion: observacion,
      comentarios: comentarios,
    },
  ];

  $.ajax({
    url: "Ajax/observacionesA.php",
    type: "POST",
    data: { accion: "Crear", lista: JSON.stringify(datos) },
    dataType: "json",
    success: function (respuesta) {
      $("#crear").modal("hide");

      toastr.success("Guardado con exito", "Registro", {
        closeButton: true,
        progressBar: true,
        showDuration: "800",
        hideDuration: "1000",
      });
    },
  });
});

//HABILITACION DE BUSQUEDA DE REGISTROS
const buscarPor = document.querySelector("#selectBusquedaPor");
buscarPor.addEventListener("change", () => {
  let metodo = document.querySelector("#selectBusquedaPor").value;

  if (metodo == "Curso") {
    $("#selectBusquedaCurso").attr("disabled", false);
    $("#selectBusquedaAlumno").attr("disabled", true);
    $("#selectBusquedaAlumno").val(0);
    return;
  } else if (metodo == "Alumno") {
    $("#selectBusquedaCurso").attr("disabled", false);
    $("#selectBusquedaAlumno").attr("disabled", false);
    return;
  } else if (metodo == 0) {
    $("#selectBusquedaCurso").attr("disabled", true);
    $("#selectBusquedaAlumno").attr("disabled", true);
    return;
  }
});

const selectCursoBusqueda = document.querySelector("#selectBusquedaCurso");
selectCursoBusqueda.addEventListener("change", () => {
  const selectAlumnoBusqueda = document.querySelector("#selectBusquedaAlumno");
  let idCurso = selectCursoBusqueda.value;
  cargarAlumnosPorCursos(selectAlumnoBusqueda, idCurso);
});

//BUSQUEDA
const btnBuscar = document.querySelector("#btnBuscar");
btnBuscar.addEventListener("click", buscarRegistros);

function buscarRegistros() {
  let metodoBusqueda = document.querySelector("#selectBusquedaPor").value;
  let idCurso = document.querySelector("#selectBusquedaCurso").value;
  let rutAlumno = document.querySelector("#selectBusquedaAlumno").value;
  let parametroBusqueda = "";
  let desde = document.querySelector("#fechaDesde").value;
  let hasta = document.querySelector("#fechaHasta").value;

  if (metodoBusqueda == 0) {
    toastr.error("Error", "Debe elegir al menos un metodo de búsqueda", {
      closeButton: true,
      progressBar: true,
      showDuration: "800",
      hideDuration: "1000",
    });

    return;
  } else if (idCurso == 0) {
    toastr.error("Error", "Debe elegir al menos un curso", {
      closeButton: true,
      progressBar: true,
      showDuration: "800",
      hideDuration: "1000",
    });

    return;
  } else if (metodoBusqueda == "Alumno" && rutAlumno == 0) {
    toastr.error("Error", "Debe elegir al menos un Alumno", {
      closeButton: true,
      progressBar: true,
      showDuration: "800",
      hideDuration: "1000",
    });

    return;
  } else if (desde == "" || hasta == "") {
    toastr.error("Error", "Debe elegir un rango de fechas", {
      closeButton: true,
      progressBar: true,
      showDuration: "800",
      hideDuration: "1000",
    });

    return;
  } else if (metodoBusqueda == "Alumno") {
    parametroBusqueda = rutAlumno;
  } else if (metodoBusqueda == "Curso") {
    parametroBusqueda = idCurso;
  }

  let datos = [parametroBusqueda, metodoBusqueda, desde, hasta];

  console.log(datos);

  $.ajax({
    url: "Ajax/observacionesA.php",
    type: "POST",
    data: { accion: "buscar", lista: JSON.stringify(datos) },
    dataType: "json",
    success: function (respuesta) {
      if (respuesta.length == 0) {
        toastr.info("No se encontraron registros", "", {
          closeButton: true,
          progressBar: true,
          showDuration: "800",
          hideDuration: "1000",
        });
      }
      console.log(respuesta);
      $("#tabla tbody tr").empty();
      respuesta.forEach((registro, i) => {
        let tabla = `<tr>
                    <td>${i + 1}</td>
                    <td>${registro.FECHA}</td>
                    <td>${registro.NOMBRE_CURSO}</td>
                    <td>${registro.PRIMER_NOMBRE} ${registro.SEGUNDO_NOMBRE} ${
          registro.APELLIDO_PATERNO
        } ${registro.APELLIDO_MATERNO}</td>
                    <td>${registro.TIPO}</td>
                    <td>${registro.COMENTARIOS}</td>
                    <td> <div class="btn-group">
      
                    <button class="btn btn-success EditarRegistro" idRegistro="${
                      registro.ID_REGISTRO_OBSERVACION
                    }" data-toggle="modal" data-target="#modalEditar"><i class="fa fa-pencil-alt"></i></button>
                    <button class="btn btn-danger BorrarRegistro" idRegistro="${
                      registro.ID_REGISTRO_OBSERVACION
                    }"  data-toggle="modal" data-target="#modalEliminar"><i class="fa fa-times"></i></button>
                    </div></td>
                   
                    </tr>
                  `;
        $("#tabla").append(tabla);
      });
    },
  });
}

//CAPTURAR ID PARA BORRAR

let Fid; //VARIABLE gLOBAL
///CAPTURAR ID
$(".TB").on("click", ".BorrarRegistro", function () {
  Fid = $(this).attr("idRegistro");
  console.log(Fid);
});

const btnBorrar = document.querySelector("#btnBorrar");
btnBorrar.addEventListener("click", () => {
  console.log(Fid);
  $.ajax({
    url: "Ajax/observacionesA.php",
    type: "POST",
    data: { accion: "borrar", Fid: Fid },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);

      $("#modalEliminar").modal("hide");
      toastr.success("Eliminado con éxito", "Registro", {
        closeButton: true,
        progressBar: true,
        showDuration: "800",
        hideDuration: "1000",
        preventDuplicates: true,
      });

      buscarRegistros();
    },
  });
});

//SETEAR PARA MODIFICAR

///CAPTURAR ID
$(".TB").on("click", ".EditarRegistro", function () {
  const selectCursoED = document.querySelector("#selectCursosED");
  let ano = moment().format("YYYY");
  cargarCursos(selectCursoED, ano);

  Fid = $(this).attr("idRegistro");
  setearPorID(Fid);
});

function setearPorID(id) {
  $.ajax({
    url: "Ajax/observacionesA.php",
    type: "POST",
    data: { accion: "buscarSetear", Rid: id },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);

      const selectAlumnoED = document.querySelector("#selectAlumnoED");
      cargarAlumnosPorCursos(selectAlumnoED, respuesta.ID_CURSO_FK);

      setTimeout(() => {
        $("#fechaED").val(respuesta.FECHA);
        $("#idRegistro").val(respuesta.ID_REGISTRO_OBSERVACION);
        $("#selectCursosED").val(respuesta.ID_CURSO_FK);
        $("#selectAlumnoED").val(respuesta.RUT_ALUMNO_FK);
        $("#comentariosED").val(respuesta.COMENTARIOS);
        $("#observacionED").val(respuesta.TIPO);
      }, 600);
    },
  });
}

//RECOLECTAR PARA EDITAR
const btnEditar = document.querySelector("#btnEditar");
btnEditar.addEventListener("click", () => {
  let id = $("#idRegistro").val();
  let fecha = $("#fechaED").val();
  let idCurso = $("#selectCursosED").val();
  let rutAlumno = $("#selectAlumnoED").val();
  let observacion = $("#observacionED").val();
  let comentarios = $("#comentariosED").val();

  if (
    fecha == "" ||
    rutAlumno == 0 ||
    idCurso == 0 ||
    observacion == 0 ||
    comentarios == ""
  ) {
    toastr.error("Error", "Todos los campos son Obligatorios", {
      closeButton: true,
      progressBar: true,
      showDuration: "800",
      hideDuration: "1000",
    });

    return;
  }

  let datos = [
    {
        id:id,
      fecha: fecha,
      idCurso: idCurso,
      rutAlumno: rutAlumno,
      observacion: observacion,
      comentarios: comentarios,
    },
  ];

  $.ajax({
    url: "Ajax/observacionesA.php",
    type: "POST",
    data: { accion: "Actualizar", datos: JSON.stringify(datos) },
    dataType: "json",
    success: function (respuesta) {
      $("#modalEditar").modal("hide");
      buscarRegistros();
      toastr.success("Guardado con exito", "Registro", {
        closeButton: true,
        progressBar: true,
        showDuration: "800",
        hideDuration: "1000",
      });
    },
  });
});


//CAMBIAR SELECT AL EDITAR
const selectCursoED = document.querySelector("#selectCursosED");
selectCursoED.addEventListener("change", () => {
  const selectAlumnoED = document.querySelector("#selectAlumnoED");
  let idCurso = selectCursoED.value;
  cargarAlumnosPorCursos(selectAlumnoED, idCurso);
});


