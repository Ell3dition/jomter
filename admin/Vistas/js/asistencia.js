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
                let cursos = document.getElementById("cursos");
                let opcion = document.createElement("option");
                opcion.text = curso.NOMBRE_CURSO;
                opcion.value = curso.ID_CURSO;
                cursos.appendChild(opcion);
            });
        }
    })
})

/*Al cambiar la opción del select, se captura ese evento y se rescata el ID del 
curso seleccionado*/
$('#cursos').change(function(){
    let idCurso = $("#cursos option:selected").val();
    $("#tablaAlumnos > tbody").html(""); 
    $.ajax({
        url: "Ajax/asistenciaA.php",
        type: "POST",
        data: {accion: "cargarAlumnos",curso: idCurso},
        dataType: "json",
        success: function(respuesta){
            respuesta.forEach((alumno,i) =>{
                renderizarAlumnoEnTabla(alumno,i); 
            })
        }
    })
    $('#asignaturas').empty();
    let asignaturas = document.getElementById("asignaturas");
    let opcion = document.createElement("option");
    opcion.text = "Elija una Asignatura";
    opcion.value = 0;
    asignaturas.appendChild(opcion);
    cargarAsignaturas();
})

/*Funcion que permite tomar el objeto alumno y renderizarlo en una tabla,
alumno es el objeto que viene de AJAX, i es el iterador de la funcion forEach,
para que así en el número, siempre vayamos teniendo de 1 a X y no por el 
número de ID del alumno, que puede venir desordenado.*/ 
function renderizarAlumnoEnTabla(alumno,i){
    var fila =`<tr id="${alumno.RUT}">
    <td>${i+1}</td>
    <td>${alumno.PRIMER_NOMBRE} ${alumno.SEGUNDO_NOMBRE} ${alumno.APELLIDO_PATERNO} ${alumno.APELLIDO_MATERNO}</td>
    <td> 
    <input id="checkAsistencia" type="checkbox">
    </td>`
    $('#tablaAlumnos').append(fila); 
}


/*Funnción que recorre la tabla de alumnos y va recolectando datos que ingresa en un JSON
para posteriormente llevarlo al backend*/
function recorrerTabla(lista){
    $('#tablaAlumnos tbody tr').each(function(index,fila){
        let alumno = {};
        alumno["id"] = $(fila).attr("id");
        alumno["nombre"] = fila.children[1].innerHTML;
        let tdCheck = fila.children[2];
        if((tdCheck.children[0].checked)){
            alumno["asistencia"] = "Presente";
        }else{
            alumno["asistencia"] = "Ausente";
        }
        alumno["curso"] = $('#cursos').val();
        alumno["asignatura"] = $('#asignaturas').val();
        alumno["fecha"] = $('#fecha').val();
        lista.push(alumno);
      
    })
}

/*Se crea un array que actua como lista, y en esta lista se van guardando los resultados
que trae la funcion recorrerTabla, que por cada iteracion agrega un alumno*/
$('#btnGuardarAsistencia').click(function(){
    let valorCurso = $("#cursos option:selected").val();
    let valorAsignatura = $("#asignaturas option:selected").val();
    let valorFecha = $('#fecha').val();
    let mensaje = "";
    $('#mensajeRespuesta').remove();
    if((valorCurso!=0)&&(valorAsignatura!=0)&&(valorFecha!="")){
        $("#btnGuardarAsistencia").attr("disabled", true);
        let listaDeAsistencia = [];
        recorrerTabla(listaDeAsistencia);
        $.ajax({
            url: "Ajax/asistenciaA.php",
            type: "POST",
            data: {accion: "guardarAsistencia", lista: JSON.stringify(listaDeAsistencia)},
            success: function(respuesta){
                
            toastr.success("Guardada con éxito", "Asistencia", {
                closeButton: true,
                progressBar: true,
                showDuration: "800",
                hideDuration: "1000",
            });


                document.getElementById("cursos").options.item(0).selected = 'selected';
                document.getElementById("asignaturas").options.item(0).selected = 'selected';
                $("#btnGuardarAsistencia").attr("disabled", false);
            }
        })
    }else{
      
        toastr.error("Error", "Todos los campos son Obligatorios", {
            closeButton: true,
            progressBar: true,
            showDuration: "800",
            hideDuration: "1000",
        });



    }
})

function cargarAsignaturas(){
    let idCurso = $("#cursos option:selected").val();
    $.ajax({
        url: "Ajax/asistenciaA.php",
        type: "POST",
        data: {accion: "cargarAsignaturas",curso: idCurso},
        dataType: "json",
        success: function(respuesta){
            respuesta.forEach((asignatura) =>{
                let asignaturas = document.getElementById("asignaturas");
                let opcion = document.createElement("option");
                opcion.text = asignatura.NOMBRE_ASIGNATURA;
                opcion.value = asignatura.ID_ASIGNATURA_FK;
                asignaturas.appendChild(opcion);
            })
        }
    })
}
