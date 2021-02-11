//----------------------------------------------------------
//----------------------------------------------------------
//---------------CARGAR SELECT PROFESOR CREAR---------------
//----------------------------------------------------------
//----------------------------------------------------------

const btnCrearSeguimiento = document.getElementById("btnCrearSeguimiento");
btnCrearSeguimiento.addEventListener("click", cargarSelectProfesor);

function cargarSelectProfesor() {
  $.ajax({
    url: "Ajax/seguimientoA.php",
    type: "POST",
    data: { accion: "profesores" },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      limpiarSelectProfesorCrear();
      respuesta.forEach((profes) => {
        let selectProfesor = document.getElementById(
          "selectProfesorSeguimientoN"
        );
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

function limpiarSelectProfesorCrear() {
  $("#selectProfesorSeguimientoN").empty();
  let asignaturas = document.getElementById("selectProfesorSeguimientoN");
  let opcion = document.createElement("option");
  opcion.text = "Seleccione Profesor";
  opcion.value = "0";
  asignaturas.appendChild(opcion);
}

//----------------------------------------------------------
//----------------------------------------------------------
//---------------CARGAR SELECT CURSO PROFESOR --------------
//----------------------------------------------------------
//----------------------------------------------------------

const selectProfesorCrear = document.getElementById(
  "selectProfesorSeguimientoN"
);
selectProfesorCrear.addEventListener("change", cargarCursoProfesorCrear);
function cargarCursoProfesorCrear() {
  let rutProfesor = document.getElementById("selectProfesorSeguimientoN").value;
  console.log(rutProfesor);
  $.ajax({
    url: "Ajax/seguimientoA.php",
    type: "POST",
    data: { accion: "cargarCurso", rutProfesor: rutProfesor },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      limpiarSelectCursoProfesorCrear();
      respuesta.forEach((cursos) => {
        let SelectCurso = document.getElementById("selectCursoSeguimientoN");
        let opcion = document.createElement("option");
        opcion.text = cursos.NOMBRE_CURSO;
        opcion.value = cursos.ID_CURSO;
        SelectCurso.appendChild(opcion);
      });
    },
  });
}

function limpiarSelectCursoProfesorCrear() {
  $("#selectCursoSeguimientoN").empty();
  let asignaturas = document.getElementById("selectCursoSeguimientoN");
  let opcion = document.createElement("option");
  opcion.text = "Seleccione un Curso";
  opcion.value = "0";
  asignaturas.appendChild(opcion);
}

//----------------------------------------------------------
//----------------------------------------------------------
//---------------CARGAR SELECT ALUMNOS------- --------------
//----------------------------------------------------------
//----------------------------------------------------------

const SelectCursoCrear = document.getElementById("selectCursoSeguimientoN");
SelectCursoCrear.addEventListener("change", cargarAlumnosCrear);
function cargarAlumnosCrear() {
  let idCurso = document.getElementById("selectCursoSeguimientoN").value;
  console.log(idCurso);
  $.ajax({
    url: "Ajax/seguimientoA.php",
    type: "POST",
    data: { accion: "cargarAlumno", idCurso: idCurso },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      limpiarSelectAlumno();
      respuesta.forEach((alumnos) => {
        let selectAlumno = document.getElementById("selectAlumnoSeguimientoN");
        let opcion = document.createElement("option");
        opcion.text =
          alumnos.PRIMER_NOMBRE +
          " " +
          alumnos.SEGUNDO_NOMBRE +
          " " +
          alumnos.APELLIDO_PATERNO +
          " " +
          alumnos.APELLIDO_MATERNO;
        opcion.value = alumnos.RUT;
        selectAlumno.appendChild(opcion);
      });
    },
  });
}

function limpiarSelectAlumno() {
  $("#selectAlumnoSeguimientoN").empty();
  let selectAlumno = document.getElementById("selectAlumnoSeguimientoN");
  let opcion = document.createElement("option");
  opcion.text = "Seleccione un Alumno";
  opcion.value = "0";
  selectAlumno.appendChild(opcion);
}

//----------------------------------------------------------
//----------------------------------------------------------
//---------------INSERT EN BD-------------------------------
//----------------------------------------------------------
//----------------------------------------------------------

const formulario = document.getElementById("FormularioGuardarSeguimiento");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const formularioGuardar = document.forms["FormularioGuardarSeguimiento"];
  let realizado = formularioGuardar["seguimiento"].value;
  let rutProfe = formularioGuardar["selectProfesorSeguimientoN"].value;
  let idCurso = formularioGuardar["selectCursoSeguimientoN"].value;
  let rutAlumno = formularioGuardar["selectAlumnoSeguimientoN"].value;
  let fecha = formularioGuardar["fechaSeguimientoN"].value;
  let comentario = formularioGuardar["comentariosrecursosN"].value;

  console.log(fecha);
  console.log(typeof fecha);

  if (rutProfe == 0 || idCurso == 0 || fecha == "" || rutAlumno == 0) {
    toastr.error("Error", "Todos los campos son Obligatorios", {
      closeButton: true,
      progressBar: true,
      showDuration: "800",
      hideDuration: "1000",
      positionClass: "toast-top-full-width",
    });
  } else {
    let lista = [realizado, rutProfe, idCurso, rutAlumno, fecha, comentario];

    console.log(lista);

    $.ajax({
      url: "Ajax/seguimientoA.php",
      type: "POST",
      data: { accion: "GuardarDatos", lista: JSON.stringify(lista) },
      dataType: "json",
      success: function (respuesta) {
        console.log(respuesta);

        $("#crearSeguimiento").modal("hide");
        const formulario = document.getElementById(
          "FormularioGuardarSeguimiento"
        );
        formulario.reset();

        setTimeout(() => {
          toastr.success("Guardado con exito", "Registro", {
            closeButton: true,
            progressBar: true,
            showDuration: "800",
            hideDuration: "1000",
            positionClass: "toast-top-full-width",
          });
        }, 500);
      },
    });
  }
});

//----------------------------------------------------------
//----------------------------------------------------------
//------CARGAR SELECT PROFESOR BUSQUEDA---------------------
//----------------------------------------------------------
//----------------------------------------------------------

$(document).ready(function () {
  cargarSelectProfesorEditar(); //SELECT DEL EDITAR
  $.ajax({
    url: "Ajax/seguimientoA.php",
    type: "POST",
    data: { accion: "profesores" },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      limpiarSelectProfesorCrear();
      respuesta.forEach((profes) => {
        let selectProfesor = document.getElementById("selectProfesorBusqueda");
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
});

//----------------------------------------------------------
//----------------------------------------------------------
//--------------------BUSQUEDA DE DATOS---------------------
//----------------------------------------------------------
//----------------------------------------------------------

const btnBuscarSeguimiento = document.getElementById("btnBuscarSeguimiento");
btnBuscarSeguimiento.addEventListener("click", buscarSeguimiento);

function buscarSeguimiento() {
  let rutProfe = document.getElementById("selectProfesorBusqueda").value;
  let desde = document.getElementById("fechaSeguimientoDesde").value;
  let hasta = document.getElementById("fechaSeguimientoHasta").value;

  if (rutProfe == 0 || desde == "" || hasta == "") {
    toastr.error("Error", "Todos los campos son Obligatorios", {
      closeButton: true,
      progressBar: true,
      showDuration: "800",
      hideDuration: "1000",
      positionClass: "toast-top-full-width",
    });
  } else {
    let variables = [];
    let OBJvariables = {
      rutProfe: rutProfe,
      desde: desde,
      hasta: hasta,
    };

    variables.push(OBJvariables);

    console.log(variables);

    $.ajax({
      url: "Ajax/seguimientoA.php",
      type: "POST",
      data: { accion: "BuscarDatos", lista: JSON.stringify(variables) },
      dataType: "json",
      success: function (respuesta) {
        console.log(respuesta);

        if(respuesta.length == 0){
          toastr.info("No hay registros en ese rango de fechas", "", {
            closeButton: true,
            progressBar: true,
            showDuration: "800",
            hideDuration: "1000",
            positionClass: "toast-top-full-width",
          });
        }

        $("#tablaSeguieminto tbody tr").empty();
        respuesta.forEach((registro, i) => {
          if (registro.REALIZADO == null) {
            toastr.info("No hay registros en ese rango de fechas", "", {
              closeButton: true,
              progressBar: true,
              showDuration: "800",
              hideDuration: "1000",
              positionClass: "toast-top-full-width",
            });
          } else {
            let tabla = `<tr>
           <td>${i + 1}</td>
           <td>${registro.REALIZADO}</td>
           <td>${registro.NOMBRE_PROFESOR}</td>
           <td>${registro.NOMBRE_CURSO}</td>
           <td>${registro.NOMBRE_ALUMNO}</td>
           <td>${registro.FECHA}</td>
           <td>${registro.COMENTARIOS}</td>
           <td> <div class="btn-group">
      
           <button class="btn btn-success EditarSeguimiento" idSeguimiento="${registro.ID_REGISTRO_SEGUIMIENTO}" data-toggle="modal" data-target="#editarSeguimiento"><i class="fa fa-pencil-alt"></i></button>
           <button class="btn btn-danger BorrarSeguimiento" idSeguimiento="${registro.ID_REGISTRO_SEGUIMIENTO}"   > <i class="fa fa-times"></i></button>
           </div></td>
          
           </tr>
         `;
            $("#tablaSeguieminto").append(tabla);
          }
        });
      },
    });
  }
}

//----------------------------------------------------------
//----------------------------------------------------------
//---------------ELIMINAR EN BD-----------------------------
//----------------------------------------------------------
//----------------------------------------------------------
let Sid ;

$(".TB").on("click", ".BorrarSeguimiento", function () {
  $("#modalEliminarseguimiento").modal("show");

  Sid = $(this).attr("idSeguimiento");
  console.log(Sid);
  capturaIDSeguimiento(Sid);
});

  const btnborrarSeguimiento = document.getElementById("borrarSeguimiento");
  btnborrarSeguimiento.addEventListener("click", () => {
    console.log("El id es " + Sid);

    $.ajax({
      url: "Ajax/seguimientoA.php",
      type: "POST",
      data: { accion: "borrarSeguimiento", Sid: Sid },
      dataType: "json",
      success: function (respuesta) {
        console.log(respuesta);
        $("#modalEliminarseguimiento").modal("hide");
        toastr.success("Eliminado con éxito", "Registro", {
          closeButton: true,
          progressBar: true,
          showDuration: "800",
          hideDuration: "1000",
          preventDuplicates: true,
     
        });
        setTimeout(() => {
          buscarSeguimiento();
        }, 500);
      },
    });
  });


//----------------------------------------------------------
//----------------------------------------------------------
//-------SETEAR PARA Actualizar EN BD-----------------------
//----------------------------------------------------------
//----------------------------------------------------------
$(".TB").on("click", ".EditarSeguimiento", function () {
  let Sid = $(this).attr("idSeguimiento");
  console.log(Sid);
  capturaIDSeguimientoEditar(Sid);
  limpiarSelectAlumnoEditar();
  limpiarSelectCursoProfesorEditar();
});

function capturaIDSeguimientoEditar(Sid) {
  console.log("id editar es" + Sid);

  $.ajax({
    url: "Ajax/seguimientoA.php",
    type: "POST",
    data: { accion: "BuscarDatos", Sid: Sid },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);

      if (respuesta.REALIZADO == "SI") {document.getElementById("RBSeguimientoSIED").checked = true;
      } else {document.getElementById("RBSeguimientoNOED").checked = true;
      }
      document.getElementById("selectProfesorSeguimientoED").value = respuesta.RUT_PROFESOR;
      cargarCursoProfesorEditar(respuesta.RUT_PROFESOR);
      setTimeout(() => {
        document.getElementById("selectCursoSeguimientoED").value = respuesta.ID_CURSO;
      }, 500);
      cargarAlumnosEditar(respuesta.ID_CURSO);
      setTimeout(() => {
        document.getElementById("selectAlumnoSeguimientoED").value = respuesta.RUT_ALUMNO;
      }, 500);
      document.getElementById("fechaSeguimientoED").value = respuesta.FECHA;
      document.getElementById("idSeguimiento").value =
      respuesta.ID_REGISTRO_SEGUIMIENTO;
      $("#comentariosrecursosED").val(respuesta.COMENTARIOS);
    },
  });
}

function cargarSelectProfesorEditar() {
  $.ajax({
    url: "Ajax/seguimientoA.php",
    type: "POST",
    data: { accion: "profesores" },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      limpiarSelectProfesorEd();
      respuesta.forEach((profes) => {
        let selectProfesor = document.getElementById(
          "selectProfesorSeguimientoED"
        );
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

function limpiarSelectProfesorEd() {
  $("#selectProfesorSeguimientoED").empty();
  let asignaturas = document.getElementById("selectProfesorSeguimientoED");
  let opcion = document.createElement("option");
  opcion.text = "Seleccione Profesor";
  opcion.value = "0";
  asignaturas.appendChild(opcion);
}

//----------------------------------------------------------
//----------------------------------------------------------
//---------------CARGAR SELECT CURSO PROFESOR  SETEAR-------
//----------------------------------------------------------
//----------------------------------------------------------

const selectProfesorED = document.getElementById("selectProfesorSeguimientoED");
selectProfesorED.addEventListener("change", cargarCursoProfesor, true);

function cargarCursoProfesorEditar(rutProfesor) {
  console.log(rutProfesor);
  $.ajax({
    url: "Ajax/seguimientoA.php",
    type: "POST",
    data: { accion: "cargarCurso", rutProfesor: rutProfesor },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      limpiarSelectCursoProfesorCrear();
      respuesta.forEach((cursos) => {
        let SelectCurso = document.getElementById("selectCursoSeguimientoED");
        let opcion = document.createElement("option");
        opcion.text = cursos.NOMBRE_CURSO;
        opcion.value = cursos.ID_CURSO;
        SelectCurso.appendChild(opcion);
      });
    },
  });
}

function limpiarSelectCursoProfesorEditar() {
  $("#selectCursoSeguimientoED").empty();
  let asignaturas = document.getElementById("selectCursoSeguimientoED");
  let opcion = document.createElement("option");
  opcion.text = "Seleccione un Curso";
  opcion.value = "0";
  asignaturas.appendChild(opcion);
}

//----------------------------------------------------------
//----------------------------------------------------------
//---------------CARGAR SELECT ALUMNOS SETEAR --------------
//----------------------------------------------------------
//----------------------------------------------------------

function cargarAlumnosEditar(idCurso) {
  console.log(idCurso);
  $.ajax({
    url: "Ajax/seguimientoA.php",
    type: "POST",
    data: { accion: "cargarAlumno", idCurso: idCurso },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      limpiarSelectAlumno();
      respuesta.forEach((alumnos) => {
        let selectAlumno = document.getElementById("selectAlumnoSeguimientoED");
        let opcion = document.createElement("option");
        opcion.text =
          alumnos.PRIMER_NOMBRE +
          " " +
          alumnos.SEGUNDO_NOMBRE +
          " " +
          alumnos.APELLIDO_PATERNO +
          " " +
          alumnos.APELLIDO_MATERNO;
        opcion.value = alumnos.RUT;
        selectAlumno.appendChild(opcion);
      });
    },
  });
}

function limpiarSelectAlumnoEditar() {
  $("#selectAlumnoSeguimientoED").empty();
  let selectAlumno = document.getElementById("selectAlumnoSeguimientoED");
  let opcion = document.createElement("option");
  opcion.text = "Seleccione un Alumno";
  opcion.value = "0";
  selectAlumno.appendChild(opcion);
}

//----------------------------------------------------------
//----------------------------------------------------------
//---------------CARGAR SELECT CURSO PROFESOR update--------
//----------------------------------------------------------
//----------------------------------------------------------

const selectProfesorEd = document.getElementById("selectProfesorSeguimientoED");
selectProfesorEd.addEventListener("change", cargarCursoProfesor);
function cargarCursoProfesor() {
  let rutProfesor = document.getElementById("selectProfesorSeguimientoED")
    .value;
  console.log(rutProfesor);
  $.ajax({
    url: "Ajax/seguimientoA.php",
    type: "POST",
    data: { accion: "cargarCurso", rutProfesor: rutProfesor },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      limpiarSelectCursoProfesorUpdate();
      respuesta.forEach((cursos) => {
        let SelectCurso = document.getElementById("selectCursoSeguimientoED");
        let opcion = document.createElement("option");
        opcion.text = cursos.NOMBRE_CURSO;
        opcion.value = cursos.ID_CURSO;
        SelectCurso.appendChild(opcion);
      });
    },
  });
}

function limpiarSelectCursoProfesorUpdate() {
  $("#selectCursoSeguimientoED").empty();
  let asignaturas = document.getElementById("selectCursoSeguimientoED");
  let opcion = document.createElement("option");
  opcion.text = "Seleccione un Curso";
  opcion.value = "0";
  asignaturas.appendChild(opcion);
}

//----------------------------------------------------------
//----------------------------------------------------------
//---------------CARGAR SELECT ALUMNOS UPDATE---------------
//----------------------------------------------------------
//----------------------------------------------------------

const SelectCursoEd = document.getElementById("selectCursoSeguimientoED");
SelectCursoEd.addEventListener("change", cargarAlumnos);
function cargarAlumnos() {
  let idCurso = document.getElementById("selectCursoSeguimientoED").value;
  console.log(idCurso);
  $.ajax({
    url: "Ajax/seguimientoA.php",
    type: "POST",
    data: { accion: "cargarAlumno", idCurso: idCurso },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      limpiarSelectAlumnoUpdate();
      respuesta.forEach((alumnos) => {
        let selectAlumno = document.getElementById("selectAlumnoSeguimientoED");
        let opcion = document.createElement("option");
        opcion.text =
          alumnos.PRIMER_NOMBRE +
          " " +
          alumnos.SEGUNDO_NOMBRE +
          " " +
          alumnos.APELLIDO_PATERNO +
          " " +
          alumnos.APELLIDO_MATERNO;
        opcion.value = alumnos.RUT;
        selectAlumno.appendChild(opcion);
      });
    },
  });
}

function limpiarSelectAlumnoUpdate() {
  $("#selectAlumnoSeguimientoED").empty();
  let selectAlumno = document.getElementById("selectAlumnoSeguimientoED");
  let opcion = document.createElement("option");
  opcion.text = "Seleccione un Alumno";
  opcion.value = "0";
  selectAlumno.appendChild(opcion);
}

//----------------------------------------------------------
//----------------------------------------------------------
//---------------UPDATE EN BD-------------------------------
//----------------------------------------------------------
//----------------------------------------------------------

const formularioEd = document.getElementById("FormularioEditarSeguimiento");

formularioEd.addEventListener("submit", (e) => {
  e.preventDefault();

  const formularioGuardar = document.forms["FormularioEditarSeguimiento"];
  let realizado = formularioGuardar["seguimientoED"].value;
  let rutProfe = formularioGuardar["selectProfesorSeguimientoED"].value;
  let idCurso = formularioGuardar["selectCursoSeguimientoED"].value;
  let rutAlumno = formularioGuardar["selectAlumnoSeguimientoED"].value;
  let fecha = formularioGuardar["fechaSeguimientoED"].value;
  let comentario = formularioGuardar["comentariosrecursosED"].value;
  let Sid = formularioGuardar["idSeguimiento"].value;

  console.log(fecha);
  console.log(typeof fecha);

  if (rutProfe == 0 || idCurso == 0 || fecha == "" || rutAlumno == 0) {
    toastr.error("Error", "Todos los campos son Obligatorios", {
      closeButton: true,
      progressBar: true,
      showDuration: "800",
      hideDuration: "1000",
   
    });
  } else {
    let lista = [
      realizado,
      rutProfe,
      idCurso,
      rutAlumno,
      fecha,
      comentario,
      Sid,
    ];

    console.log(lista);

    $.ajax({
      url: "Ajax/seguimientoA.php",
      type: "POST",
      data: { accion: "GuardarDatos", lista: JSON.stringify(lista) },
      dataType: "json",
      success: function (respuesta) {
        console.log(respuesta);

        $("#editarSeguimiento").modal("hide");
        const formulario = document.getElementById(
          "FormularioEditarSeguimiento"
        );
        formulario.reset();
        buscarSeguimiento();
        setTimeout(() => {
          toastr.success("Guardado con exito", "Registro", {
            closeButton: true,
            progressBar: true,
            showDuration: "800",
            hideDuration: "1000",
        
          });
        }, 500);
      },
    });
  }
});
