//CARGAR SELECT PROFESOR JEFE
$(document).ready(function () {
    const selectPofesor = document.querySelector("#selectProfesorBuscar");
    cargarSelectProfesorJefe(selectPofesor);

});

//Funcion para cargar los select de profesor JEFE
function cargarSelectProfesorJefe(SelectProfesor) {
    let idElemento = $(SelectProfesor).attr("Id");

    $.ajax({
        url: "Ajax/claseA.php",
        type: "POST",
        data: { accion: "Consultas", tipo: "profesores" },
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
function limpiarSelectProfesor(idElemento) {
    $("#" + idElemento).empty();
    console.log(idElemento);
    let cursos = document.getElementById(idElemento);
    let opcion = document.createElement("option");
    opcion.text = "Seleccione un Profesor";
    opcion.value = "0";

    cursos.appendChild(opcion);
}


//CARGAR SELECT PROFESOR AL CREAR
//AL ABRIR EL MODAL PARA CREAR CARGAR SELECT PROFESOR y CURSOS

const abrirModal = document.querySelector("#btnCrear");
abrirModal.addEventListener("click", () => {



    const selectPofesorCrear = document.querySelector("#selectProfesorN");
    cargarSelectProfesorJefe(selectPofesorCrear);
    selectPofesorCrear.addEventListener("change", () => {
        let rutProfe = selectPofesorCrear.value;
        const selectCursoCrear = document.querySelector("#selectCursosN");
        cargarCursoDeProfesor(selectCursoCrear, rutProfe);

        const selectAsignaturasCrear = document.querySelector("#selectAsignaturaN");
        cargarAsignaturasCrear(selectAsignaturasCrear, rutProfe);


    });
});

//cargar curso EN SELECT CREAR
function cargarCursoDeProfesor(selectCursoCrear, rutProfe) {
    let idElemento = $(selectCursoCrear).attr("Id");
    console.log(idElemento);

    $.ajax({
        url: "Ajax/claseA.php",
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


//cargar ASignaturas

function cargarAsignaturasCrear(selectAsignatura, rutProfesor) {

    let idElemento = $(selectAsignatura).attr('id');

    $.ajax({
        url: "Ajax/claseA.php",
        type: "POST",
        data: { accion: "asignaturasProfesor", rutProfe: rutProfesor },
        dataType: "json",
        success: function (respuesta) {
            console.log(respuesta);

            limpiarSelectAsignaturas(idElemento);
            respuesta.forEach((curso) => {

                let cursos = document.getElementById(idElemento);
                let opcion = document.createElement("option");

                opcion.text = curso.NOMBRE_ASIGNATURA;
                opcion.value = curso.ID_ASIGNATURA;
                cursos.appendChild(opcion);
            });
        },

    });

}

function limpiarSelectAsignaturas(idElemento) {
    $("#" + idElemento).empty();
    let cursos = document.getElementById(idElemento);
    let opcion = document.createElement("option");
    opcion.text = "Seleccione una Asignatura";
    opcion.value = "0";
    console.log(idElemento);
    console.log(cursos);
    cursos.appendChild(opcion);
}


//Guardar

const btnGuardar = document.querySelector('#btnGuardar');
btnGuardar.addEventListener('click', () => {

    let fecha = $('#fechaN').val();
    let rutProfe = $('#selectProfesorN').val();
    let idCurso = $('#selectCursosN').val();
    let idAsignatura = $('#selectAsignaturaN').val();
    let hora = $('#selectHoraN').val();
    let tipoClase = $('#selectTipoClaseN').val();
    let objetivo = $('#selectObjetivoN').val();
    let actividad = $('#selecActividadN').val();


    if (fecha == "" || rutProfe == 0 || idCurso == 0 || idAsignatura == 0 || hora == 0 || tipoClase == 0 || objetivo == 0 || actividad == 0) {

        toastr.error("Error", "Todos los campos son Obligatorios", {
            closeButton: true,
            progressBar: true,
            showDuration: "800",
            hideDuration: "1000",
        });

        return;
    }

    let datos = [{
        fecha: fecha,
        rutProfe: rutProfe,
        idCurso: idCurso,
        idAsignatura: idAsignatura,
        hora: hora,
        tipoClase: tipoClase,
        objetivo: objetivo,
        actividad: actividad
    }]

    $.ajax({

        url: "Ajax/claseA.php",
        type: "POST",
        data: { accion: "Crear", lista: JSON.stringify(datos) },
        dataType: "json",
        success: function (respuesta) {

            limpiar();
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


//BUSCAR REGISTROS 

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
        url: "Ajax/claseA.php",
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
                        <td>${registro.PRIMER_NOMBRE} ${registro.SEGUNDO_NOMBRE} ${registro.APELLIDO_PATERNO} ${registro.APELLIDO_MATERNO}</td>
                        <td>${registro.FECHA}</td>
                        <td>${registro.NOMBRE_CURSO}</td>
                        <td>${registro.NOMBRE_ASIGNATURA}</td>
                        <td>${registro.HORA}</td>
                        <td>${registro.TIPO_CLASE}</td>
                        <td>${registro.OBJETIVO}</td>
                        <td>${registro.ACTIVIDAD}</td>
                        <td> <div class="btn-group">
          
                        <button class="btn btn-success EditarRegistro" idRegistro="${registro.ID_REGISTRO_CLASE}" data-toggle="modal" data-target="#modalEditar"><i class="fa fa-pencil-alt"></i></button>
                        <button class="btn btn-danger BorrarRegistro" idRegistro="${registro.ID_REGISTRO_CLASE}"  data-toggle="modal" data-target="#modalEliminar"><i class="fa fa-times"></i></button>
                        </div></td>
                       
                        </tr>
                      `;
                $("#tabla").append(tabla);
            });
        },
    });
}


let Fid;
///CAPTURAR ID
$(".TB").on("click", ".BorrarRegistro", function () {
    Fid = $(this).attr("idRegistro");
    console.log(Fid);
});

const btnBorrar = document.querySelector("#btnBorrar");
btnBorrar.addEventListener("click", () => {
    console.log(Fid);
    $.ajax({
        url: "Ajax/claseA.php",
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
    const selectProfesorED = document.querySelector('#selectProfesorED');
    cargarSelectProfesorJefe(selectProfesorED);
    Fid = $(this).attr("idRegistro");
    setearPorID(Fid);
});

function setearPorID(id) {


    $.ajax({
        url: "Ajax/claseA.php",
        type: "POST",
        data: { accion: "buscarSetear", Rid: id },
        dataType: "json",
        success: function (respuesta) {
            console.log(respuesta);

            const selectProfesorED = document.querySelector('#selectProfesorED');
            cargarSelectProfesorJefe(selectProfesorED);

            const selectCursoED = document.querySelector('#selectCursosED');
            cargarCursoDeProfesor(selectCursoED, respuesta.RUT_PROFESOR_FK);

            const selectAsignaturaED = document.querySelector('#selectAsignaturaED');
            cargarAsignaturasCrear(selectAsignaturaED, respuesta.RUT_PROFESOR_FK);


            setTimeout(() => {

                $('#selectProfesorED').val(respuesta.RUT_PROFESOR_FK);
                $('#selectCursosED').val(respuesta.ID_CURSO_FK);
                $('#selectAsignaturaED').val(respuesta.ID_ASIGNATURA_FK);
                $('#fechaED').val(respuesta.FECHA);
                $('#selectHoraED').val(respuesta.HORA);
                $('#selectTipoClaseED').val(respuesta.TIPO_CLASE);
                $('#selectObjetivoED').val(respuesta.OBJETIVO);
                $('#selecActividadED').val(respuesta.ACTIVIDAD);
                $('#idRegistro').val(respuesta.ID_REGISTRO_CLASE);

            }, 600);





        },
    });

}




//RECOLECTAR PARA EDITAR
const btnEditar = document.querySelector("#btnEditar");
btnEditar.addEventListener('click', () => {

    let id = $('#idRegistro').val();
    let rutProfe = $('#selectProfesorED').val();
    let idCurso = $('#selectCursosED').val();
    let idAsignatura = $('#selectAsignaturaED').val();
    let fecha = $('#fechaED').val();
    let hora = $('#selectHoraED').val();
    let tipoClase = $('#selectTipoClaseED').val();
    let objetivo = $('#selectObjetivoED').val();
    let actividad = $('#selecActividadED').val();




    if (fecha == "" || rutProfe == 0 || idCurso == 0 || idAsignatura == 0 || hora == 0 || tipoClase == 0 || objetivo == 0 || actividad == 0) {

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
            rutProfe: rutProfe,
            idCurso: idCurso,
            idAsignatura: idAsignatura,
            fecha: fecha,
            hora: hora,
            tipoClase: tipoClase,
            objetivo: objetivo,
            actividad: actividad
        },
    ];

    console.log(datos);

    $.ajax({
        url: "Ajax/claseA.php",
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


///CABIAR LOS SELECT DEPENDIENDO DEL PROFESOR EDITAR

const selectPofesorED = document.querySelector("#selectProfesorED");
cargarSelectProfesorJefe(selectPofesorED);
selectPofesorED.addEventListener("change", () => {
    let rutProfe = selectPofesorED.value;
    const selectCursoED = document.querySelector("#selectCursosED");
    cargarCursoDeProfesor(selectCursoED, rutProfe);

    const selectAsignaturasED = document.querySelector("#selectAsignaturaED");
    cargarAsignaturasCrear(selectAsignaturasED, rutProfe);


});


///LIMPIAR LOS SELECT AL CERRAR Y GUARDAR DATOS AL CREAR

const btnCerrarCrear = document.querySelector('#cerrarCrear');
btnCerrarCrear.addEventListener('click',limpiar);


function limpiar() {

    $('#fechaN').val("");
    $('#selectCursosN').val(0);
    $('#selectAsignaturaN').val(0);
    $('#selectHoraN').val(0);
    $('#selectTipoClaseN').val(0);
    $('#selectObjetivoN').val(0);
    $('#selecActividadN').val(0);
}



