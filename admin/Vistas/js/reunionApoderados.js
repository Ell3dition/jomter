//CARGAR SELECT PROFESOR JEFE
$(document).ready(function () {
  const selectPofesor = document.querySelector("#selectProfesorBuscar");
  cargarSelectProfesorJefe(selectPofesor);
});

//Funcion para cargar los select de profesor JEFE
function cargarSelectProfesorJefe(SelectProfesor) {
  let idElemento = $(SelectProfesor).attr("Id");

  $.ajax({
    url: "Ajax/reunionApoderadosA.php",
    type: "POST",
    data: { accion: "profesores" },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      limpiarSelectProfesor(idElemento);
      respuesta.forEach((profes) => {
        let selectProfesor = document.getElementById(idElemento);
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
        selectProfesor.appendChild(opcion);
      });
    },
  });
}

//AL ABRIR EL MODAL PARA CREAR CARGAR SELECT PROFESOR y CURSOS

const abrirModal = document.querySelector("#btnCrearReunion");
abrirModal.addEventListener("click", () => {
  const selectPofesorCrear = document.querySelector("#selectProfesorReunionN");
  cargarSelectProfesorJefe(selectPofesorCrear);
  selectPofesorCrear.addEventListener("change", () => {
    let rutProfe = selectPofesorCrear.value;
    const selectCursoCrear = document.querySelector("#selectCursoReunionN");
    cargarCursoDeProfesor(selectCursoCrear, rutProfe);
  });
});

//cargar curso EN SELECT CREAR
function cargarCursoDeProfesor(selectCursoCrear, rutProfe) {
  let idElemento = $(selectCursoCrear).attr("Id");
  console.log(idElemento);

  $.ajax({
    url: "Ajax/reunionApoderadosA.php",
    type: "POST",
    data: { accion: "cursos", rutProfe: rutProfe },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);

      limpiarSelectCurso(idElemento);
      respuesta.forEach((curso) => {
        console.log(curso["NOMBRE_CURSO"]);

        let cursos = document.getElementById(idElemento);
        let opcion = document.createElement("option");

        opcion.text = curso.NOMBRE_CURSO;
        opcion.value = curso.ID_CURSO;
        cursos.appendChild(opcion);
      });
    },
  });
}

function limpiarSelectCurso(idElemento) {
  $("#" + idElemento).empty();
  let cursos = document.getElementById(idElemento);
  let opcion = document.createElement("option");
  opcion.text = "Seleccione un Curso";
  opcion.value = "0";
  console.log(idElemento);
  console.log(cursos);
  cursos.appendChild(opcion);
}

function limpiarSelectProfesor(idElemento) {
  $("#" + idElemento).empty();
  console.log(idElemento);
  let cursos = document.getElementById(idElemento);
  let opcion = document.createElement("option");
  opcion.text = "Seleccione un Profesor";
  opcion.value = "0";

  cursos.appendChild(opcion);
}

//TRAER LISTA DE ALUMNOS POR CURSO PARA VER EL TOTAL
const selectCursoCrear = document.querySelector("#selectCursoReunionN");
const inputTotal = document.querySelector("#totalCursoN");
selectCursoCrear.addEventListener("change", function () {
  verTotalCurso(selectCursoCrear, inputTotal);
});

function verTotalCurso(selectCurso, campoTotal) {
  let total = $(campoTotal).attr("Id");
  let idCurso = selectCurso.value;
  console.log(idCurso);

  $.ajax({
    url: "Ajax/reunionApoderadosA.php",
    type: "POST",
    data: { accion: "buscarTotalAlumnos", idCurso: idCurso },
    dataType: "json",
    success: function (respuesta) {
      let totalAlumnos = respuesta.length;
      $("#" + total).val(totalAlumnos);
    },
  });
}

const asistenciaN = document.querySelector("#asistenciaN");
asistenciaN.addEventListener("blur", () => {
  //paso el input entero
  let resultado = calcularPorcentaje(asistenciaN);
  $("#asistenciaPorcentajeN").val(resultado);
});

const inasistenciaN = document.querySelector("#inasistenciaN");
inasistenciaN.addEventListener("blur", () => {
  //paso el input entero
  let resultado = calcularPorcentaje(inasistenciaN);
  $("#inasistenciaPorcentajeN").val(resultado);
});

//CALCULAR % ASISTENCIA E INASISTENCIA

function calcularPorcentaje(asistenciaN) {
  let idElemento = $(asistenciaN).attr("Id");
  let cantidad = document.querySelector("#" + idElemento).value;
  let totalCuro = document.querySelector("#totalCursoN").value;
  let totalPorcentaje = (cantidad * 100) / totalCuro;
  return (Math.round(totalPorcentaje * 100) / 100).toString();
}

//RECOLECTAR DATOS PARA GUARDAR
const btnCrear = document.querySelector("#guardarReunion");
btnCrear.addEventListener("click", () => {
  let fecha = $("#fechaN").val();
  let rutProfe = $("#selectProfesorReunionN").val();
  let idCurso = $("#selectCursoReunionN").val();
  let asistencia = $("#asistenciaN").val();
  let porcentajeAsistencia = $("#asistenciaPorcentajeN").val();
  let inasistencia = $("#inasistenciaN").val();
  let porcentajeInasistencia = $("#inasistenciaPorcentajeN").val();
  let comentarios = $("#comentariosN").val();

  if (
    fecha == "" ||
    rutProfe == 0 ||
    idCurso == 0 ||
    asistencia == "" ||
    inasistencia == ""
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
      rutProfe: rutProfe,
      idCurso: idCurso,
      asistencia: asistencia,
      porcentajeAsistencia: porcentajeAsistencia,
      inasistencia: inasistencia,
      porcentajeInasistencia: porcentajeInasistencia,
      comentarios: comentarios,
    },
  ];

  $.ajax({
    url: "Ajax/reunionApoderadosA.php",
    type: "POST",
    data: { accion: "CrearReunion", datos: JSON.stringify(datos) },
    dataType: "json",
    success: function (respuesta) {
      limpiarCrear();
      $("#crearReunion").modal("hide");
      toastr.success("Guardado con exito", "Registro", {
        closeButton: true,
        progressBar: true,
        showDuration: "800",
        hideDuration: "1000",
      });
    },
  });
});

///BUSCAR REGISTROS
const btnBuscar = document.querySelector("#btnBuscar");
btnBuscar.addEventListener("click", buscarReunion);

function buscarReunion() {
  let rutProfe = $("#selectProfesorBuscar").val();
  let desde = $("#fechaDesde").val();
  let hasta = $("#fechaHasta").val();

  if (rutProfe == 0 || desde == "" || hasta == "") {
    toastr.error("Error", "Todos los campos son Obligatorios", {
      closeButton: true,
      progressBar: true,
      showDuration: "800",
      hideDuration: "1000",
    });
    return;
  }

  $.ajax({
    url: "Ajax/reunionApoderadosA.php",
    type: "POST",
    data: { accion: "buscar", rutProfe: rutProfe, desde: desde, hasta: hasta },
    dataType: "json",
    success: function (respuesta) {
      if (respuesta.length == 0) {
        toastr.info("No hay registros en ese rango de fechas", "", {
          closeButton: true,
          progressBar: true,
          showDuration: "800",
          hideDuration: "1000",
        });
      }

      $("#tablaReuniones tbody tr").empty();
      respuesta.forEach((registro, i) => {
        let tabla = `<tr>
                    <td>${i + 1}</td>
                    <td>${
                      registro.PRIMER_NOMBRE +
                      " " +
                      registro.SEGUNDO_NOMBRE +
                      " " +
                      registro.APELLIDO_PATERNO +
                      " " +
                      registro.APELLIDO_MATERNO
                    }</td>
                    <td>${registro.FECHA}</td>
                    <td>${registro.NOMBRE_CURSO}</td>
                    <td>${registro.ASISTENCIA}</td>
                    <td>${registro.PORCENTAJE_ASISTENCIA}</td>
                    <td>${registro.INASISTENCIA}</td>
                    <td>${registro.PORCENTAJE_INASISTENCIA}</td>
                    <td>${registro.COMENTARIOS}</td>
                    <td> <div class="btn-group">
      
                    <button class="btn btn-success EditarReunion" idReunion="${
                      registro.ID_REGISTRO_REUNIONES_CURSO
                    }" data-toggle="modal" data-target="#EditarReunion"><i class="fa fa-pencil-alt"></i></button>
                    <button class="btn btn-danger BorrarSeguimiento" idReunion="${
                      registro.ID_REGISTRO_REUNIONES_CURSO
                    }"  data-toggle="modal" data-target="#modalEliminar"><i class="fa fa-times"></i></button>
                    </div></td>
                   
                    </tr>
                  `;
        $("#tablaReuniones").append(tabla);
      });
    },
  });
}

//ELIMINAR DE BD

let Rid;
///CAPTURAR ID
$(".TB").on("click", ".BorrarSeguimiento", function () {
  Rid = $(this).attr("idReunion");
  console.log(Rid);
});

const btnBorrar = document.querySelector("#btnBorrar");
btnBorrar.addEventListener("click", () => {
  console.log(Rid);
  $.ajax({
    url: "Ajax/reunionApoderadosA.php",
    type: "POST",
    data: { accion: "borrar", Rid: Rid },
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
      setTimeout(() => {
        buscarReunion();
      }, 500);
    },
  });
});

//SETEAR PARA AL APRETAR EDITAR

let RidEdit;
///CAPTURAR ID
$(".TB").on("click", ".EditarReunion", function () {
  const SelectProfesorEditar = document.querySelector(
    "#selectProfesorReunionED"
  );
  cargarSelectProfesorJefe(SelectProfesorEditar); //FUNCION DE LINEA 8
  RidEdit = $(this).attr("idReunion");
  console.log(RidEdit);

  setearPorID(RidEdit);
});

function setearPorID(ID) {
  $.ajax({
    url: "Ajax/reunionApoderadosA.php",
    type: "POST",
    data: { accion: "buscarSetear", Rid: ID },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);

      $("#fechaED").val(respuesta.FECHA);
      $("#idReunion").val(respuesta.ID_REGISTRO_REUNIONES_CURSO);

      const selectCursoED = document.querySelector("#selectCursoReunionED");
      console.log(selectCursoED);
      cargarCursoDeProfesor(selectCursoED, respuesta.RUT_PROFESOR_FK); //FUNCION LINEA 51

      setTimeout(() => {
        $("#selectCursoReunionED").val(respuesta.ID_CURSO_FK);
        $("#selectProfesorReunionED").val(respuesta.RUT_PROFESOR_FK);
      }, 1000);

      //SETEAR CON EL ID QUE TIENE GUARDADO
      verTotalCursoSetear(respuesta.ID_CURSO_FK);

      //SETEAR AL CAMBIAR EL CURSO
      const selectCursoCrear = document.querySelector("#selectCursoReunionED");
      const inputTotal = document.querySelector("#totalCursoED");
      selectCursoCrear.addEventListener("change", function () {
        verTotalCurso(selectCursoCrear, inputTotal);
      });

      $("#asistenciaED").val(respuesta.ASISTENCIA);
      $("#asistenciaPorcentajeED").val(respuesta.PORCENTAJE_ASISTENCIA);
      $("#inasistenciaEd").val(respuesta.INASISTENCIA);
      $("#inasistenciaPorcentajeED").val(respuesta.PORCENTAJE_INASISTENCIA);
      $("#comentariosED").val(respuesta.COMENTARIOS);
    },
  });
}

//TRAER TOTAL AL SETEAR

function verTotalCursoSetear(id) {
  $.ajax({
    url: "Ajax/reunionApoderadosA.php",
    type: "POST",
    data: { accion: "buscarTotalAlumnos", idCurso: id },
    dataType: "json",
    success: function (respuesta) {
      let totalAlumnos = respuesta.length;
      $("#totalCursoED").val(totalAlumnos);
    },
  });
}

const asistenciaED = document.querySelector("#asistenciaED");
asistenciaED.addEventListener("blur", () => {
  //paso el input entero
  let resultado = calcularPorcentajeEditar(asistenciaED);
  $("#asistenciaPorcentajeED").val(resultado);
});

const inasistenciaED = document.querySelector("#inasistenciaEd");
inasistenciaED.addEventListener("blur", () => {
  //paso el input entero
  let resultado = calcularPorcentajeEditar(inasistenciaED);
  $("#inasistenciaPorcentajeED").val(resultado);
});

function calcularPorcentajeEditar(asistenciaN) {
  let idElemento = $(asistenciaN).attr("Id");
  let cantidad = document.querySelector("#" + idElemento).value;
  let totalCuro = document.querySelector("#totalCursoED").value;
  let totalPorcentaje = (cantidad * 100) / totalCuro;
  return (Math.round(totalPorcentaje * 100) / 100).toString();
}

//RECORRER LOS DATOS CREAT OBJ ENVIARLO AL BACKEND Y HACER EL INSERT
const btnModificar = document.querySelector("#btnEditarReunion");
btnModificar.addEventListener("click", () => {
  let id = $("#idReunion").val();
  let fecha = $("#fechaED").val();
  let rutProfe = $("#selectProfesorReunionED").val();
  let idCurso = $("#selectCursoReunionED").val();
  let asistencia = $("#asistenciaED").val();
  let porcentajeAsistencia = $("#asistenciaPorcentajeED").val();
  let inasistencia = $("#inasistenciaEd").val();
  let porcentajeInasistencia = $("#inasistenciaPorcentajeED").val();
  let comentarios = $("#comentariosED").val();

  if (
    fecha == "" ||
    rutProfe == 0 ||
    idCurso == 0 ||
    asistencia == "" ||
    inasistencia == ""
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
      id: id,
      fecha: fecha,
      rutProfe: rutProfe,
      idCurso: idCurso,
      asistencia: asistencia,
      porcentajeAsistencia: porcentajeAsistencia,
      inasistencia: inasistencia,
      porcentajeInasistencia: porcentajeInasistencia,
      comentarios: comentarios,
    },
  ];
  console.log(datos);

  $.ajax({
    url: "Ajax/reunionApoderadosA.php",
    type: "POST",
    data: { accion: "Actualizar", datos: JSON.stringify(datos) },
    dataType: "json",
    success: function (respuesta) {
      buscarReunion();
      $("#EditarReunion").modal("hide");
      toastr.success("Guardado con exito", "Registro", {
        closeButton: true,
        progressBar: true,
        showDuration: "800",
        hideDuration: "1000",
      });
    },
  });
});

//LIMPIAR FORMULARIO DESPUES DE CREAR
const btnCerrar = document.querySelector('#cerrarCrear');
btnCerrar.addEventListener("click", () => {
  limpiarCrear();
});

function limpiarCrear() {
  $("#fechaN").val("");
  $("#selectProfesorReunionN").val(0);
  $("#selectCursoReunionN").val(0);
  $("#asistenciaN").val("");
  $("#asistenciaPorcentajeN").val("");
  $("#inasistenciaN").val("");
  $("#inasistenciaPorcentajeN").val("");
  $("#comentariosN").val("");
  $("#totalCursoN").val("");
}
