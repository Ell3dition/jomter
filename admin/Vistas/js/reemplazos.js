const btnCrear = document.querySelector("#btnCrear");
btnCrear.addEventListener("click", () => {
  const selectProfesionalAusneteCrear = document.querySelector(
    "#selectAusenteN"
  );
  cargarSelectProfesorJefe(selectProfesionalAusneteCrear);

  const selectProfesionalReemplazoCrear = document.querySelector(
    "#selectReemplazoN"
  );
  cargarSelectProfesorJefe(selectProfesionalReemplazoCrear);

  const SelectCursosCrear = document.querySelector("#selectCursoN");
  cargarCursos(SelectCursosCrear);

  const SelctAsignaturasCrear = document.querySelector("#selectAsignaturaN");
  cargarAsignaturas(SelctAsignaturasCrear);
});

//CARGAR SELECT PROFESOR JEFE
function cargarSelectProfesorJefe(SelectProfesor) {
  let idElemento = $(SelectProfesor).attr("Id");

  $.ajax({
    url: "Ajax/reemplazosA.php",
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

  if (idElemento == "selectAusenteN" || idElemento=="selectAusenteED") {
    msg = "Seleccione Profesional Ausente";
  } else if (idElemento == "selectReemplazoN" || idElemento=="selectReemplazoED") {
    msg = "Seleccione Profesional de Reemplazo";
  } else if (idElemento == "selectCursoN"|| idElemento=="selectCursoED" ) {
    msg = "Seleccione un Curso";
  } else if (idElemento == "selectAsignaturaN" || idElemento=="selectAsignaturaED") {
    msg = "Seleccione una Asignatura";
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
    url: "Ajax/reemplazosA.php",
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

//cargar todas las asignaturas

function cargarAsignaturas(selectAsignatura) {
  let idElemento = $(selectAsignatura).attr("Id");

 
  $.ajax({
    url: "Ajax/reemplazosA.php",
    type: "POST",
    data: { accion: "Consultas", tipo: "asignaturas" },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      limpiarSelectS(idElemento);
      respuesta.forEach((profes) => {
        let selectProfesor = document.getElementById(idElemento);
        let opcion = document.createElement("option");
        opcion.text = profes.NOMBRE_ASIGNATURA;
        opcion.value = profes.ID_ASIGNATURA;
        selectProfesor.appendChild(opcion);
      });
    },
  });
}

//RECOLECTAR DATOS PARA GUARDAR

//Guardar

const btnGuardar = document.querySelector("#btnGuardar");
btnGuardar.addEventListener("click", () => {
  let fecha = $("#fechaN").val();
  let rutAusente = $("#selectAusenteN").val();
  let rutReemplazo = $("#selectReemplazoN").val();
  let motivo = $("#selectMotivoN").val();
  let idCurso = $("#selectCursoN").val();
  let idAsignatura = $("#selectAsignaturaN").val();
  let horario = $("#selectHoraN").val();

  if (
    fecha == "" ||
    rutAusente == 0 ||
    rutReemplazo == 0 ||
    motivo == 0 ||
    idCurso == 0 ||
    idAsignatura == 0 ||
    horario == 0
  ) {
    toastr.error("Error", "Todos los campos son Obligatorios", {
      closeButton: true,
      progressBar: true,
      showDuration: "800",
      hideDuration: "1000",
    });

    return;
  }

  if(rutAusente == rutReemplazo){

    toastr.error("Error", "El Profesional reemplazante no puede ser el mismo que el Profesional Ausente por favor verifique", {
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
      rutAusente: rutAusente,
      rutReemplazo: rutReemplazo,
      motivo: motivo,
      idCurso: idCurso,
      idAsignatura: idAsignatura,
      horario: horario,
    },
  ];

  $.ajax({
    url: "Ajax/reemplazosA.php",
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


//BUSCAR Y CREAR TABLA
const btnBuscar = document.querySelector('#btnBuscar');
btnBuscar.addEventListener('click', buscarRegistros);

function buscarRegistros() {

    let desde = document.querySelector('#fechaDesde').value;
    let hasta = document.querySelector('#fechaHasta').value;



    if (desde == "" || hasta == "") {
        toastr.error("Error", "Todos los campos son Obligatorios", {
            closeButton: true,
            progressBar: true,
            showDuration: "800",
            hideDuration: "1000",
        });
        return;
    }

    $.ajax({
        url: "Ajax/reemplazosA.php",
        type: "POST",
        data: { accion: "buscar", desde: desde, hasta: hasta },
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
                        <td>${registro.NOMBRE_AUSENTE}</td>
                        <td>${registro.NOMBRE_REEMPLAZO}</td>
                        <td>${registro.FECHA}</td>
                        <td>${registro.MOTIVO}</td>
                        <td>${registro.NOMBRE_CURSO}</td>
                        <td>${registro.NOMBRE_ASIGNATURA}</td>
                        <td>${registro.HORARIO}</td>
                        <td> <div class="btn-group">
          
                        <button class="btn btn-success EditarRegistro" idRegistro="${registro.ID_REGISTRO_REEMPLAZO}" data-toggle="modal" data-target="#modalEditar"><i class="fa fa-pencil-alt"></i></button>
                        <button class="btn btn-danger BorrarRegistro" idRegistro="${registro.ID_REGISTRO_REEMPLAZO}"  data-toggle="modal" data-target="#modalEliminar"><i class="fa fa-times"></i></button>
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
        url: "Ajax/reemplazosA.php",
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



//CAPTURAR ID PARA SETEAR


//SETEAR PARA MODIFICAR

///CAPTURAR ID
$(".TB").on("click", ".EditarRegistro", function () {
    const selectProfesionalAusneteED = document.querySelector("#selectAusenteED");
    cargarSelectProfesorJefe(selectProfesionalAusneteED);
  
    const selectProfesionalReemplazoED = document.querySelector("#selectReemplazoED");
    cargarSelectProfesorJefe(selectProfesionalReemplazoED);
  
    const SelectCursosED = document.querySelector("#selectCursoED");
    cargarCursos(SelectCursosED);
  
    const SelctAsignaturasED = document.querySelector("#selectAsignaturaED");
    cargarAsignaturas(SelctAsignaturasED);
    Fid = $(this).attr("idRegistro");
    setearPorID(Fid);
});

function setearPorID(id) {


    $.ajax({
        url: "Ajax/reemplazosA.php",
        type: "POST",
        data: { accion: "buscarSetear", Rid: id },
        dataType: "json",
        success: function (respuesta) {
            console.log(respuesta);

          setTimeout(() => {

            $('#fechaED').val(respuesta.FECHA);
                $('#selectAusenteED').val(respuesta.RUT_AUSENTE_FK);
                $('#selectReemplazoED').val(respuesta.RUT_REEMPLAZO_FK);
                $('#selectMotivoED').val(respuesta.MOTIVO);
                $('#selectCursoED').val(respuesta.ID_CURSO_FK);
                $('#selectAsignaturaED').val(respuesta.ID_ASIGNATURA_FK);
                $('#selectHoraED').val(respuesta.HORARIO);
                $('#idRegistro').val(respuesta.ID_REGISTRO_REEMPLAZO);
              
            }, 600);


        },
    });

}



//RECOLECTAR PARA EDITAR
const btnEditar = document.querySelector("#btnEditar");
btnEditar.addEventListener('click', () => {

    let fecha = $("#fechaED").val();
    let rutAusente = $("#selectAusenteED").val();
    let rutReemplazo = $("#selectReemplazoED").val();
    let motivo = $("#selectMotivoED").val();
    let idCurso = $("#selectCursoED").val();
    let idAsignatura = $("#selectAsignaturaED").val();
    let horario = $("#selectHoraED").val();
    let id = $("#idRegistro").val();
  
    


    if (
      fecha == "" ||
      rutAusente == 0 ||
      rutReemplazo == 0 ||
      motivo == 0 ||
      idCurso == 0 ||
      idAsignatura == 0 ||
      horario == 0
    ) {
      toastr.error("Error", "Todos los campos son Obligatorios", {
        closeButton: true,
        progressBar: true,
        showDuration: "800",
        hideDuration: "1000",
      });
  
      return;
    }
  
    if(rutAusente == rutReemplazo){

      toastr.error("Error", "El Profesional reemplazante no puede ser el mismo que el Profesional Ausente por favor verifique", {
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
        rutAusente: rutAusente,
        rutReemplazo: rutReemplazo,
        motivo: motivo,
        idCurso: idCurso,
        idAsignatura: idAsignatura,
        horario: horario,
      },
    ];
  

    $.ajax({
        url: "Ajax/reemplazosA.php",
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

