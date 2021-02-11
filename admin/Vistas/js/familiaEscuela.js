//CARGAR SELECT PROFESOR JEFE
$(document).ready(function () {
    const selectPofesor = document.querySelector("#selectProfesorBuscar");
    cargarSelectProfesorJefe(selectPofesor);
});

//Funcion para cargar los select de profesor JEFE
function cargarSelectProfesorJefe(SelectProfesor) {
    let idElemento = $(SelectProfesor).attr("Id");

    $.ajax({
        url: "Ajax/familiaEscuelaA.php",
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
    });
});

//cargar curso EN SELECT CREAR
function cargarCursoDeProfesor(selectCursoCrear, rutProfe) {
    let idElemento = $(selectCursoCrear).attr("Id");
    console.log(idElemento);

    $.ajax({
        url: "Ajax/familiaEscuelaA.php",
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


//LISTAR ALUMNOS SEGUN CURSO

const selectCursoCrear = document.querySelector("#selectCursosN");
selectCursoCrear.addEventListener("change", function () {
    let idCurso = selectCursoCrear.value;
    const selectAlumno = document.querySelector('#selectAlumnoN');
    verTotalCurso(idCurso, selectAlumno);
});

function verTotalCurso(idCurso, selectAlumno) {

    let alumnosSelect = $(selectAlumno).attr('id');
    console.log(alumnosSelect);

    $.ajax({
        url: "Ajax/familiaEscuelaA.php",
        type: "POST",
        data: { accion: "buscarTotalAlumnos", idCurso: idCurso },
        dataType: "json",
        success: function (respuesta) {
            console.log(respuesta);
            limpiarSelectAlumno(selectAlumno);
            respuesta.forEach((alumnos) => {

                let selectAlumno = document.getElementById(alumnosSelect);
                let opcion = document.createElement("option");

                opcion.text = alumnos.PRIMER_NOMBRE + " " + alumnos.SEGUNDO_NOMBRE + " " + alumnos.APELLIDO_PATERNO + " " + alumnos.APELLIDO_MATERNO;
                opcion.value = alumnos.RUT;
                selectAlumno.appendChild(opcion);
            });
        },
    });
}



function limpiarSelectAlumno(selectAlumno) {
    let alumnosSelect = $(selectAlumno).attr('id');
    $('#' + alumnosSelect).empty();
    let selectAlumnos = document.getElementById(alumnosSelect);
    let opcion = document.createElement("option");
    opcion.text = "Seleccione un Alumno";
    opcion.value = "0";
    selectAlumnos.appendChild(opcion);
}


//CREAR LISTA CON OBJETO PARA HACRE INSERT

//RECOLECTAR DATOS PARA GUARDAR
const btnCrear = document.querySelector("#guardarFamilia");
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
        url: "Ajax/familiaEscuelaA.php",
        type: "POST",
        data: { accion: "Crear", datos: JSON.stringify(datos) },
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
        url: "Ajax/familiaEscuelaA.php",
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
          
                        <button class="btn btn-success EditarFamilia" idFamilia="${registro.ID_REGISTRO_FAMILIA_ESCUELA}" data-toggle="modal" data-target="#EditarFamilia"><i class="fa fa-pencil-alt"></i></button>
                        <button class="btn btn-danger BorrarFamilia" idFamilia="${registro.ID_REGISTRO_FAMILIA_ESCUELA}"  data-toggle="modal" data-target="#modalEliminar"><i class="fa fa-times"></i></button>
                        </div></td>
                       
                        </tr>
                      `;
                $("#tabla").append(tabla);
            });
        },
    });

}

//ELIMINAR 

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
        url: "Ajax/familiaEscuelaA.php",
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


//setear campos para editar
let FEid;
///CAPTURAR ID
$(".TB").on("click", ".EditarFamilia", function () {
    const selectProfesorED = document.querySelector('#selectProfesorED');
    cargarSelectProfesorJefe(selectProfesorED);
    FEid = $(this).attr("idFamilia");
    console.log(FEid);
    setearPorID(FEid);
});

function setearPorID(id) {

    $.ajax({
        url: "Ajax/familiaEscuelaA.php",
        type: "POST",
        data: { accion: "buscarSetear", Rid: id },
        dataType: "json",
        success: function (respuesta) {
            console.log(respuesta);

            const selectCursosED = document.querySelector('#selectCursoED');
            cargarCursoDeProfesor(selectCursosED, respuesta.RUT_PROFESOR_FK);

            const selectAlumnosED = document.querySelector('#selectAlumnoED');
            verTotalCurso(respuesta.ID_CURSO_FK, selectAlumnosED);

            $('#idFamilia').val(respuesta.ID_REGISTRO_FAMILIA_ESCUELA);
            $('#fechaED').val(respuesta.FECHA);
            setTimeout(() => {

                $('#selectProfesorED').val(respuesta.RUT_PROFESOR_FK);
                $('#selectCursoED').val(respuesta.ID_CURSO_FK);
                $('#selectAlumnoED').val(respuesta.RUT_ALUMNO_FK);


            }, 600);
            $('#selectEstadoED').val(respuesta.ESTADO);
            $('#comentariosED').val(respuesta.COMENTARIOS);

        },
    });

}

//SETAR AL CAMBIAR LOS SELECT MENU EDITAR

const selectPofesorEditar = document.querySelector("#selectProfesorED");
selectPofesorEditar.addEventListener("change", () => {
    let rutProfe = selectPofesorEditar.value;
    const selectCursoEditar = document.querySelector("#selectCursoED");
    cargarCursoDeProfesor(selectCursoEditar, rutProfe);
});

const selectCursoEditar = document.querySelector("#selectCursoED");
selectCursoEditar.addEventListener("change", function () {
    let idCurso = selectCursoEditar.value;
    const selectAlumno = document.querySelector('#selectAlumnoED');
    verTotalCurso(idCurso, selectAlumno);
});


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
        url: "Ajax/familiaEscuelaA.php",
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

