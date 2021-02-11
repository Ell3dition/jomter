/*Al iniciar el documento, automaticamente se capturan los cursos para cargarla mediante
la función cargarCursos, que recibe un arreglo*/
$(document).ready(function(){ 
   
    $.ajax({
        url: "Ajax/asistenciaA.php",
        type: "POST",
        data: {accion: "cargarCursos"},
        dataType: "json",
        success: function(respuesta){
            respuesta.forEach(curso => {
                let cursos = document.getElementById("selectCurso");
                let opcion = document.createElement("option");
                opcion.text = curso.NOMBRE_CURSO;
                opcion.value = curso.ID_CURSO;
                cursos.appendChild(opcion);
            });
        }
    })
})
 
/*Al cambiar la opción del select, se captura ese evento y se rescata el ID del 
curso seleccionado, para así cargar las asignaturas de ese curso*/
$('#selectCurso').change(function(){
    $('#mensajeEstadistico').remove();
    let idCurso = $("#selectCurso option:selected").val();
    $("#tablaAsistencia > tbody").html(""); //Ojo aquí
    $('#selectAsignatura').empty();
    let asignaturas = document.getElementById("selectAsignatura");
    let opcion = document.createElement("option");
    opcion.text = "Seleccionar Asignatura";
    opcion.value = 0;
    asignaturas.appendChild(opcion);
    cargarAlumnos();
    cargarAsignaturass();
})

/*
Esta función se ejecuta en el evento change del selectCurso, y llena automáticamente el select de las asignaturas
del curso seleccionado. 
*/
function cargarAsignaturass(){
    let idCurso = $("#selectCurso option:selected").val();
    $.ajax({
        url: "Ajax/asistenciaA.php",
        type: "POST",
        data: {accion: "cargarAsignaturas",curso: idCurso},
        dataType: "json",
        success: function(respuesta){
            respuesta.forEach((asignatura) =>{
                let asignaturas = document.getElementById("selectAsignatura");
                let opcion = document.createElement("option");
                opcion.text = asignatura.NOMBRE_ASIGNATURA;
                opcion.value = asignatura.ID_ASIGNATURA_FK;
                asignaturas.appendChild(opcion);
            })
        }
    })
}

function cargarAlumnos(){
    let idCurso = $("#selectCurso option:selected").val();
    $('#selectAlumno').empty();
    let opcionDefault = document.createElement("option");
    opcionDefault.text = "Seleccionar Alumno";
    opcionDefault.value = 0;
    let selectAlumnos = document.getElementById("selectAlumno");
    selectAlumnos.appendChild(opcionDefault);
    $.ajax({
        url: "Ajax/asistenciaA.php",
        type: "POST",
        data: {accion: "cargarAlumnos",curso: idCurso},
        dataType: "json",
        success: function(respuesta){
            respuesta.forEach((alumno) =>{
                let alumnos = document.getElementById("selectAlumno");
                let opcion = document.createElement("option");
                opcion.text = alumno.PRIMER_NOMBRE+" "+alumno.SEGUNDO_NOMBRE+" "+alumno.APELLIDO_PATERNO+" "+alumno.APELLIDO_MATERNO;
                opcion.value = alumno.RUT;
                alumnos.appendChild(opcion);
            })
        }
    })
}

/*Evento que captura el curso,la asignatura, la fecha y hace una consulta a la base de datos para posteriormente 
renderizar la información en la tabla.*/
$('#buscarAsistencia').click(function(){
    $('#mensajeEstadistico').remove();
    let idCurso = $("#selectCurso option:selected").val();
    let idAsignatura = $("#selectAsignatura option:selected").val();
    let rutAlumno = $("#selectAlumno option:selected").val();
    let fechaDesde = document.getElementById("fechaDesde").value;
    let fechaHasta = document.getElementById("fechaHasta").value;
    $("#tablaAsistencia > tbody").html("");
    let lista = [];
    let totalPresentes = 0;
    $.ajax({
        url: "Ajax/verAsistenciaA.php",
        type: "POST",
        data: {accion: "cargarAsistencia",curso: idCurso,alumno: rutAlumno,asignatura:idAsignatura, desde:fechaDesde,hasta:fechaHasta },
        dataType: "json",
        success: function(respuesta){

            console.log(respuesta);

            respuesta.forEach((alumno,i)=>{
                renderizarAlumnoEnTablaa(alumno,i);
            })
            obtenerEstadisticas(lista);
                lista.forEach((alumno)=>{
                    if(alumno.asistencia=="Presente"){
                        totalPresentes++;
                    };
                })       
                let porcentajePresentes = (totalPresentes*100)/lista.length;
                if(isNaN(porcentajePresentes)){
                    mensajeEstadistica = `<div id="mensajeEstadistico" class="alert alert-secondary w-50">No se han encontrado resultados</div>`
                }
                else if(porcentajePresentes<60){
                    mensajeEstadistica = `<div id="mensajeEstadistico" class="alert alert-danger w-50">El porcentaje de asistencia del alumno a la clase es de: ${porcentajePresentes}%</div>`
                }else{
                    mensajeEstadistica = `<div id="mensajeEstadistico" class="alert alert-success w-50">El porcentaje de asistencia del alumno a la clase es de: ${porcentajePresentes}%</div>`
                }   
                $('#boxbody').append(mensajeEstadistica);
                
        }
    })
})

/*Funcion que recoge los resultados y los muestra en la tabla asistencia */
function renderizarAlumnoEnTablaa(alumno,i){
    var fila =`<tr id="${alumno.RUT}">
    <td>${i+1}</td>
    <td>${alumno.PRIMER_NOMBRE} ${alumno.SEGUNDO_NOMBRE} ${alumno.APELLIDO_PATERNO} ${alumno.APELLIDO_MATERNO}</td>
    <td>${alumno.ASISTENCIA}</td>
    <td>${alumno.FECHA} </td>`
    $('#tablaAsistencia').append(fila); 
}

function obtenerEstadisticas(lista){
    $('#tablaAsistencia tbody tr').each(function(index,fila){
        let alumno = {};
        alumno["asistencia"] = fila.children[2].innerHTML;
        lista.push(alumno);
    })
}
