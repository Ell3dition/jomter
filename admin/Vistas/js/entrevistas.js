$(document).ready(function () {
  const selectProfesionalCrear = document.querySelector("#selectProfesorN");
  cargarSelectProfesorJefe(selectProfesionalCrear);

  const selectCursosAno = document.querySelector("#selectCursosN");
  cargarCursos(selectCursosAno);

  const selectProfeBuscar =  document.querySelector("#selectProfesorBuscar");
  cargarSelectProfesorJefe(selectProfeBuscar);
});

//CARGAR SELECT PROFESOR JEFE
function cargarSelectProfesorJefe(SelectProfesor) {
  let idElemento = $(SelectProfesor).attr("Id");

  $.ajax({
    url: "Ajax/entrevistasA.php",
    type: "POST",
    data: { accion: "Consultas", tipo: "profesores" },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      limpiarSelectS(idElemento);
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

function limpiarSelectS(idElemento) {
  $("#" + idElemento).empty();

  let msg = "";

  if (idElemento == "selectProfesorN" || idElemento == "selectProfesorED" || idElemento == "selectProfesorBuscar") {
    msg = "Seleccione Profesional";
  } else if (idElemento == "selectCursosN" || idElemento == "selectCursoED") {
    msg = "Seleccione Curso";
  } else if (
    idElemento == "selectAlumnoN" ||
    idElemento == "selectAlumnoED"
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

//CARGAR TODOS LOS CURSOS DE ACUERDO AL AÑO
function cargarCursos(selectCurso) {
  let idElemento = $(selectCurso).attr("Id");
  let ano = moment().format("YYYY");
  $.ajax({
    url: "Ajax/entrevistasA.php",
    type: "POST",
    data: { accion: "cargarCursos", ano: ano },
    dataType: "json",
    success: function (respuesta) {
      limpiarSelectS(idElemento);
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
  

  const selectCursoCrear = document.querySelector("#selectCursosN");
selectCursoCrear.addEventListener("change", () => {
  const selectAlumnoCrear = document.querySelector("#selectAlumnoN");
  let idCurso = selectCursoCrear.value;
  cargarAlumnosPorCursos(selectAlumnoCrear, idCurso);
});



//RECOLECTAR DATOS PARA GUARDAR
//RECOLECTAR DATOS PARA GUARDAR
const btnCrear = document.querySelector("#btnGuardar");
btnCrear.addEventListener("click", () => {
    let fecha = $("#fechaN").val();
    let rutProfe = $("#selectProfesorN").val();
    let idCurso = $("#selectCursosN").val();
    let rutAlumno = $("#selectAlumnoN").val();
    let estado = $("#selectEstadoN").val();
    let comentarios = $("#comentariosN").val();

    if (
        fecha == "" ||
        rutProfe == 0 ||
        idCurso == 0 ||
        rutAlumno == 0 ||
        estado == 0
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
            rutAlumno: rutAlumno,
            estado: estado,
            comentarios: comentarios,
        },
    ];

    console.log(datos);

    $.ajax({
        url: "Ajax/entrevistasA.php",
        type: "POST",
        data: { accion: "Crear", lista: JSON.stringify(datos) },
        dataType: "json",
        success: function (respuesta) {
            $("#crearFamilia").modal("hide");
            toastr.success("Guardado con exito", "Registro", {
                closeButton: true,
                progressBar: true,
                showDuration: "800",
                hideDuration: "1000",
            });
        },
    });
});


///BUSCAR DATOS

const btnBuscar = document.querySelector('#btnBuscar');
btnBuscar.addEventListener('click', buscarRegistros);

function buscarRegistros() {

    let rutProfe = document.querySelector('#selectProfesorBuscar').value;
    let desde = document.querySelector('#fechaDesde').value;
    let hasta = document.querySelector('#fechaHasta').value;


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
        url: "Ajax/entrevistasA.php",
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
            console.log(respuesta);
            $("#tabla tbody tr").empty();
            respuesta.forEach((registro, i) => {
                let tabla = `<tr>
                        <td>${i + 1}</td>
                        <td>${registro.NOMBRE_PROFESOR}</td>
                        <td>${registro.FECHA}</td>
                        <td>${registro.NOMBRE_CURSO}</td>
                        <td>${registro.NOMBRE_ALUMNO}</td>
                        <td>${registro.ESTADO}</td>
                        <td>${registro.COMENTARIOS}</td>
                        <td> <div class="btn-group">
          
                        <button class="btn btn-success EditarFamilia" idFamilia="${registro.ID_REGISTRO_ENTREVISTA}" data-toggle="modal" data-target="#EditarFamilia"><i class="fa fa-pencil-alt"></i></button>
                        <button class="btn btn-danger BorrarFamilia" idFamilia="${registro.ID_REGISTRO_ENTREVISTA}"  data-toggle="modal" data-target="#modalEliminar"><i class="fa fa-times"></i></button>
                        </div></td>
                       
                        </tr>
                      `;
                $("#tabla").append(tabla);
            });
        },
    });

}


//ELIMINAR DATOS


let Fid;
///CAPTURAR ID
$(".TB").on("click", ".BorrarFamilia", function () {
    Fid = $(this).attr("idFamilia");
    console.log(Fid);
});

const btnBorrar = document.querySelector("#btnBorrar");
btnBorrar.addEventListener("click", () => {
    console.log(Fid);
    $.ajax({
        url: "Ajax/entrevistasA.php",
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
            setTimeout(() => {
                buscarRegistros();
            }, 500);
        },
    });
});


//SETEAR

///CAPTURAR ID
$(".TB").on("click", ".EditarFamilia", function () {
  const selectProfesorED = document.querySelector('#selectProfesorED');
  cargarSelectProfesorJefe(selectProfesorED);

  const selectCursoED = document.querySelector('#selectCursoED');
  cargarCursos(selectCursoED);


  Fid = $(this).attr("idFamilia");
  console.log(Fid);
  setearPorID(Fid);
});

function setearPorID(id) {

  $.ajax({
      url: "Ajax/entrevistasA.php",
      type: "POST",
      data: { accion: "buscarSetear", Rid: id },
      dataType: "json",
      success: function (respuesta) {
          console.log(respuesta);


          const selectAlumnoED = document.querySelector('#selectAlumnoED');
          cargarAlumnosPorCursos(selectAlumnoED, respuesta.ID_CURSO_FK);
          setTimeout(() => {
            
            $('#selectProfesorED').val(respuesta.RUT_PROFESOR_FK);
            $('#selectCursoED').val(respuesta.ID_CURSO_FK);
            $('#selectAlumnoED').val(respuesta.RUT_ALUMNO_FK);
            $('#selectEstadoED').val(respuesta.ESTADO);
            $('#comentariosED').val(respuesta.COMENTARIOS);
            $('#idFamilia').val(respuesta.ID_REGISTRO_ENTREVISTA);
            $('#fechaED').val(respuesta.FECHA);
            

          }, 600);

          
      },
  });

}


//RECOLECTAR DATOS Y HACER EL UPDATE

const btnUpdate = document.querySelector('#btnUpdate');
btnUpdate.addEventListener('click', () => {

    let id = $('#idFamilia').val();
    let fecha = $("#fechaED").val();
    let rutProfe = $("#selectProfesorED").val();
    let idCurso = $("#selectCursoED").val();
    let rutAlumno = $("#selectAlumnoED").val();
    let estado = $("#selectEstadoED").val();
    let comentarios = $("#comentariosED").val();

    if (
        fecha == "" ||
        rutProfe == 0 ||
        idCurso == 0 ||
        rutAlumno == 0 ||
        estado == 0
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
            rutAlumno: rutAlumno,
            estado: estado,
            comentarios: comentarios,
        },
    ];

    console.log(datos);

    $.ajax({
        url: "Ajax/entrevistasA.php",
        type: "POST",
        data: { accion: "Actualizar", datos: JSON.stringify(datos) },
        dataType: "json",
        success: function (respuesta) {
            buscarRegistros() ;
            $("#EditarFamilia").modal("hide");

            toastr.success("Guardado con exito", "Registro", {
                closeButton: true,
                progressBar: true,
                showDuration: "800",
                hideDuration: "1000",
            });
        },
    });
});


const selectCursoED = document.querySelector("#selectCursoED");
selectCursoED.addEventListener("change", () => {
  const selectAlumnoED = document.querySelector("#selectAlumnoED");
  let idCurso = selectCursoED.value;
  cargarAlumnosPorCursos(selectAlumnoED, idCurso);
});


