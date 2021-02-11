$(document).ready(function(){
    let selectBuscarProfesores = "selectProfesorRecurso";
    cargarProfesores(selectBuscarProfesores);
    let profesoresCrearYoPuedo = "yoPuedoProfesores";
    cargarProfesores(profesoresCrearYoPuedo);
});

$('#yoPuedoProfesores').change(function(){
    let rutProfesor = $("#yoPuedoProfesores option:selected").val();
    $('#yoPuedoAsignaturas').html("");
    agregarPrimeraOpcion("yoPuedoAsignaturas","Seleccione Asignatura");
    $.ajax({
        url: "Ajax/yoPuedoA.php",
        type: "POST",
        data: {accion:"cargarAsignaturasDelProfesor",profesor:rutProfesor},
        dataType: "json",
        success: function(respuesta){
            respuesta.forEach((asignatura) =>{
                let selectAsignaturas = document.getElementById("yoPuedoAsignaturas");
                let opcion = document.createElement("option");
                opcion.text = asignatura.NOMBRE_ASIGNATURA;
                opcion.value = asignatura.ID_ASIGNATURA;
                selectAsignaturas.appendChild(opcion);
            })
        }
    })
});

$('#yoPuedoAsignaturas').change(function(){
    let idAsignatura = $("#yoPuedoAsignaturas option:selected").val();
    $('#yoPuedoCursos').html("");
    agregarPrimeraOpcion("yoPuedoCursos","Seleccione Curso");
    $.ajax({
        url: "Ajax/yoPuedoA.php",
        type: "POST",
        data: {accion:"cargarCursosAsignatura",asignatura:idAsignatura},
        dataType: "json",
        success: function(respuesta){
            respuesta.forEach((curso) =>{
                let selectCursos = document.getElementById("yoPuedoCursos");
                let opcion = document.createElement("option");
                opcion.text = curso.NOMBRE_CURSO;
                opcion.value = curso.ID_CURSO;
                selectCursos.appendChild(opcion);
            })
        }
    })
});

$('#btnGuardarYoPuedo').click(function(){
    let valor = $('#yoPuedoOcultoValor').val();
    let idYoPuedo = $('#yoPuedoOculto').val();
    if(valor=="Editar"){
        let realizacion = verificarRadio();
        let profesor = $('#yoPuedoProfesores').val();
        let asignatura = $('#yoPuedoAsignaturas').val();
        let curso = $('#yoPuedoCursos').val();
        let fecha = $('#fechaRecursoN').val();
        let yoPuedo = $('#textoYoPuedo').val();
        let actividad = $('#textoActividad').val();
        $.ajax({
            url: "Ajax/yoPuedoA.php",
            type: "POST",
            data: {accion:"actualizarYoPuedo",idyopuedo:idYoPuedo,realizacion:realizacion,profesor:profesor,asignatura:asignatura,curso:curso,fecha:fecha,yoPuedo:yoPuedo,actividad:actividad},
            dataType: "json",
            success: function(respuesta){
                $('#crearRecurso').modal('hide');
                reestablecerModalCrear();
                $('#cuerpoTablaYoPuedo').html("");
    let desde = $('#fechaYoPuedoDesde').val();
    let hasta = $('#fechaYoPuedoHasta').val();
    let fila = "";
    $.ajax({
        url: "Ajax/yoPuedoA.php",
        type: "POST",
        data: {accion:"cargarYoPuedo",desde:desde,hasta:hasta},
        dataType: "json",
        success: function(respuesta){
            respuesta.forEach((yoPuedo) =>{
                if(yoPuedo.REALIZACION=="No"){
                    fila =`<tr class="alert alert-danger">
                    <td>${yoPuedo.PRIMER_NOMBRE} ${yoPuedo.SEGUNDO_NOMBRE} ${yoPuedo.APELLIDO_PATERNO}</td>
                    <td>${yoPuedo.NOMBRE_CURSO}</td>
                    <td>${yoPuedo.NOMBRE_ASIGNATURA}</td>
                    <td>${yoPuedo.FECHA}</td>
                    <td>${yoPuedo.YO_PUEDO}</td>
                    <td>${yoPuedo.ACTIVIDAD}</td>
                    <td>${yoPuedo.REALIZACION}</td>
                    <td><button class="btn btn-success EditarSeguimiento" data-toggle="modal" data-target="#crearRecurso" yoPuedo="${yoPuedo.ID_YOPUEDO}">Editar</button></td>
                    <td><button class="btn btn-danger" data-toggle="modal" data-target="#modalEliminar">Eliminar</button></td>
                   </tr>`
                }else if(yoPuedo.REALIZACION=="Si"){
                    fila =`<tr>
                    <td>${yoPuedo.PRIMER_NOMBRE} ${yoPuedo.SEGUNDO_NOMBRE} ${yoPuedo.APELLIDO_PATERNO}</td>
                    <td>${yoPuedo.NOMBRE_CURSO}</td>
                    <td>${yoPuedo.NOMBRE_ASIGNATURA}</td>
                    <td>${yoPuedo.FECHA}</td>
                    <td>${yoPuedo.YO_PUEDO}</td>
                    <td>${yoPuedo.ACTIVIDAD}</td>
                    <td>${yoPuedo.REALIZACION}</td>
                    <td><button class="btn btn-success EditarSeguimiento" data-toggle="modal" data-target="#crearRecurso" yoPuedo="${yoPuedo.ID_YOPUEDO}">Editar</button></td>
                    <td><button class="btn btn-danger" data-toggle="modal" data-target="#modalEliminar">Eliminar</button></td>
                   </tr>`
                }
                $('#tablaYoPuedo').append(fila);
            })
        }
    }) 
            },
            error: function(){
                alert("cago");
            }
        })
    }else if(valor=="Crear"){
        let realizacion = verificarRadio();
        let profesor = $('#yoPuedoProfesores').val();
        let asignatura = $('#yoPuedoAsignaturas').val();
        let curso = $('#yoPuedoCursos').val();
        let fecha = $('#fechaRecursoN').val();
        let yoPuedo = $('#textoYoPuedo').val();
        let actividad = $('#textoActividad').val();
        $.ajax({
            url: "Ajax/yoPuedoA.php",
            type: "POST",
            data: {accion:"guardarYoPuedo",realizacion:realizacion,profesor:profesor,asignatura:asignatura,curso:curso,fecha:fecha,yoPuedo:yoPuedo,actividad:actividad},
            dataType: "json",
            success: function(respuesta){
                $('#crearRecurso').modal('hide');
                reestablecerModalCrear();
                $('#cuerpoTablaYoPuedo').html("");
                let desde = $('#fechaYoPuedoDesde').val();
                let hasta = $('#fechaYoPuedoHasta').val();
                let fila = "";
    $           .ajax({
                    url: "Ajax/yoPuedoA.php",
                    type: "POST",
                    data: {accion:"cargarYoPuedo",desde:desde,hasta:hasta},
                    dataType: "json",
                    success: function(respuesta){
                        respuesta.forEach((yoPuedo) =>{
                            if(yoPuedo.REALIZACION=="No"){
                                fila =`<tr class="alert alert-danger">
                                     <td>${yoPuedo.PRIMER_NOMBRE} ${yoPuedo.SEGUNDO_NOMBRE} ${yoPuedo.APELLIDO_PATERNO}</td>
                                     <td>${yoPuedo.NOMBRE_CURSO}</td>
                                     <td>${yoPuedo.NOMBRE_ASIGNATURA}</td>
                                     <td>${yoPuedo.FECHA}</td>
                                     <td>${yoPuedo.YO_PUEDO}</td>
                                     <td>${yoPuedo.ACTIVIDAD}</td>
                                     <td>${yoPuedo.REALIZACION}</td>
                                     <td><button class="btn btn-success EditarSeguimiento" data-toggle="modal" data-target="#crearRecurso" yoPuedo="${yoPuedo.ID_YOPUEDO}">Editar</button></td>
                                     <td><button class="btn btn-danger" data-toggle="modal" data-target="#modalEliminar">Eliminar</button></td>
                                    </tr>`
                }else if(yoPuedo.REALIZACION=="Si"){
                    fila =`<tr>
                    <td>${yoPuedo.PRIMER_NOMBRE} ${yoPuedo.SEGUNDO_NOMBRE} ${yoPuedo.APELLIDO_PATERNO}</td>
                    <td>${yoPuedo.NOMBRE_CURSO}</td>
                    <td>${yoPuedo.NOMBRE_ASIGNATURA}</td>
                    <td>${yoPuedo.FECHA}</td>
                    <td>${yoPuedo.YO_PUEDO}</td>
                    <td>${yoPuedo.ACTIVIDAD}</td>
                    <td>${yoPuedo.REALIZACION}</td>
                    <td><button class="btn btn-success EditarSeguimiento" data-toggle="modal" data-target="#crearRecurso" yoPuedo="${yoPuedo.ID_YOPUEDO}">Editar</button></td>
                    <td><button class="btn btn-danger" data-toggle="modal" data-target="#modalEliminar">Eliminar</button></td>
                   </tr>`
                }
                $('#tablaYoPuedo').append(fila);
            })
        }
    })
            }
        })
    }
});

$('#btnBuscarYoPuedo').click(function(){
    $('#cuerpoTablaYoPuedo').html("");
    let desde = $('#fechaYoPuedoDesde').val();
    let hasta = $('#fechaYoPuedoHasta').val();
    let fila = "";
    $.ajax({
        url: "Ajax/yoPuedoA.php",
        type: "POST",
        data: {accion:"cargarYoPuedo",desde:desde,hasta:hasta},
        dataType: "json",
        success: function(respuesta){
            respuesta.forEach((yoPuedo) =>{
                if(yoPuedo.REALIZACION=="No"){
                    fila =`<tr class="alert alert-danger">
                    <td>${yoPuedo.PRIMER_NOMBRE} ${yoPuedo.SEGUNDO_NOMBRE} ${yoPuedo.APELLIDO_PATERNO}</td>
                    <td>${yoPuedo.NOMBRE_CURSO}</td>
                    <td>${yoPuedo.NOMBRE_ASIGNATURA}</td>
                    <td>${yoPuedo.FECHA}</td>
                    <td>${yoPuedo.YO_PUEDO}</td>
                    <td>${yoPuedo.ACTIVIDAD}</td>
                    <td>${yoPuedo.REALIZACION}</td>
                    <td><button class="btn btn-success EditarSeguimiento" data-toggle="modal" data-target="#crearRecurso" yoPuedo="${yoPuedo.ID_YOPUEDO}">Editar</button></td>
                    <td><button class="btn btn-danger EliminarYoPuedo" data-toggle="modal" data-target="#modalEliminar" yoPuedo="${yoPuedo.ID_YOPUEDO}">Eliminar</button></td>
                   </tr>`
                }else if(yoPuedo.REALIZACION=="Si"){
                    fila =`<tr>
                    <td>${yoPuedo.PRIMER_NOMBRE} ${yoPuedo.SEGUNDO_NOMBRE} ${yoPuedo.APELLIDO_PATERNO}</td>
                    <td>${yoPuedo.NOMBRE_CURSO}</td>
                    <td>${yoPuedo.NOMBRE_ASIGNATURA}</td>
                    <td>${yoPuedo.FECHA}</td>
                    <td>${yoPuedo.YO_PUEDO}</td>
                    <td>${yoPuedo.ACTIVIDAD}</td>
                    <td>${yoPuedo.REALIZACION}</td>
                    <td><button class="btn btn-success EditarSeguimiento" data-toggle="modal" data-target="#crearRecurso" yoPuedo="${yoPuedo.ID_YOPUEDO}">Editar</button></td>
                    <td><button class="btn btn-danger EliminarYoPuedo" data-toggle="modal" data-target="#modalEliminar" yoPuedo="${yoPuedo.ID_YOPUEDO}">Eliminar</button></td>
                   </tr>`
                }
                $('#tablaYoPuedo').append(fila);
            })
        }
    })
});

$('#btnCrearRecurso').click(function(){
    reestablecerModalCrear();
    $('#yoPuedoOcultoValor').val("Crear");
});

function cargarProfesores(nombreSelect){
    $('#yoPuedoProfesores').html("");
    agregarPrimeraOpcion("yoPuedoProfesores","Seleccione Profesor");
    $.ajax({
        url: "Ajax/yoPuedoA.php",
        type: "POST",
        data: {accion:"cargarProfesores"},
        dataType: "json",
        success: function(respuesta){
            respuesta.forEach((profesor) =>{
                let selectProfesores = document.getElementById(nombreSelect);
                let opcion = document.createElement("option");
                opcion.text = profesor.PRIMER_NOMBRE+" "+profesor.SEGUNDO_NOMBRE+" "+profesor.APELLIDO_PATERNO;
                opcion.value = profesor.RUT;
                selectProfesores.appendChild(opcion);
            })
        }
    })
}

function agregarPrimeraOpcion(nombreSelect,textoSelect){
    let select = document.getElementById(nombreSelect);
    let opcion = document.createElement("option");
    opcion.text = textoSelect;
    opcion.value = "0";
    select.appendChild(opcion);
}

function verificarRadio(){
    let radioSi = document.getElementById("RBRecursosSI");
    let radioNo = document.getElementById("RBRecursosNO");
    let respuesta = "";
    if(radioSi.checked == true){
        respuesta = "Si";
    }else if(radioNo.checked == true){
        respuesta = "No";
    }
    return respuesta;
}

function reestablecerModalCrear(){
    document.getElementById("yoPuedoProfesores").options.item(0).selected = true;
    document.getElementById("yoPuedoAsignaturas").options.item(0).selected = true;
    document.getElementById("yoPuedoCursos").options.item(0).selected = true;
    $('#fechaRecursoN').val("");
    $('#textoYoPuedo').val("");
    $('#textoActividad').val("");
}

function llenarAlEditar(select,valor){
    document.getElementById(select).value = valor;
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    document.getElementById(select).dispatchEvent(evt);;
}

$(".TB").on("click", ".EditarSeguimiento", function () {
    let Sid = $(this).attr("yoPuedo");
    $('#yoPuedoOculto').val(Sid);
    $('#yoPuedoOcultoValor').val("Editar");
    $.ajax({
        url: "Ajax/yoPuedoA.php",
        type: "POST",
        data: {accion:"cargarUnYoPuedo",yopuedo:Sid},
        dataType: "json",
        success: function(respuesta){
            if(respuesta.REALIZACION=="Si"){
                document.getElementById("RBRecursosSI").checked = true;
            }else if(respuesta.REALIZACION=="No"){
                document.getElementById("RBRecursosNO").checked = true;
            }
            llenarAlEditar("yoPuedoProfesores",respuesta.RUT_PROFESOR_FK);
            setTimeout(()=>{
                llenarAlEditar("yoPuedoAsignaturas",respuesta.ID_ASIGNATURA_FK);
            },500)
            setTimeout(()=>{
                llenarAlEditar("yoPuedoCursos",respuesta.ID_CURSO_FK);
            },700)
            $('#fechaRecursoN').val(respuesta.FECHA);
            $('#textoYoPuedo').val(respuesta.YO_PUEDO);
            $('#textoActividad').val(respuesta.ACTIVIDAD);
        }   
    });
});


$(".TB").on("click", ".EliminarYoPuedo", function () {
    let Sid = $(this).attr("yoPuedo");
    $('#yoPuedoOculto').val(Sid);
});

$('#borrarYoPuedo').click(function(){
    let id= $('#yoPuedoOculto').val();
    $.ajax({    
        url: "Ajax/yoPuedoA.php",
        type: "POST",
        data: {accion:"eliminarYoPuedo",yopuedo:id},
        dataType: "json",
        success: function(respuesta){
    $('#modalEliminar').modal('hide');
    $('#cuerpoTablaYoPuedo').html("");
    let desde = $('#fechaYoPuedoDesde').val();
    let hasta = $('#fechaYoPuedoHasta').val();
    let fila = "";
    $.ajax({
        url: "Ajax/yoPuedoA.php",
        type: "POST",
        data: {accion:"cargarYoPuedo",desde:desde,hasta:hasta},
        dataType: "json",
        success: function(respuesta){
            respuesta.forEach((yoPuedo) =>{
                if(yoPuedo.REALIZACION=="No"){
                    fila =`<tr class="alert alert-danger">
                    <td>${yoPuedo.PRIMER_NOMBRE} ${yoPuedo.SEGUNDO_NOMBRE} ${yoPuedo.APELLIDO_PATERNO}</td>
                    <td>${yoPuedo.NOMBRE_CURSO}</td>
                    <td>${yoPuedo.NOMBRE_ASIGNATURA}</td>
                    <td>${yoPuedo.FECHA}</td>
                    <td>${yoPuedo.YO_PUEDO}</td>
                    <td>${yoPuedo.ACTIVIDAD}</td>
                    <td>${yoPuedo.REALIZACION}</td>
                    <td><button class="btn btn-success EditarSeguimiento" data-toggle="modal" data-target="#crearRecurso" yoPuedo="${yoPuedo.ID_YOPUEDO}">Editar</button></td>
                    <td><button class="btn btn-danger EliminarYoPuedo" data-toggle="modal" data-target="#modalEliminar" yoPuedo="${yoPuedo.ID_YOPUEDO}">Eliminar</button></td>
                   </tr>`
                }else if(yoPuedo.REALIZACION=="Si"){
                    fila =`<tr>
                    <td>${yoPuedo.PRIMER_NOMBRE} ${yoPuedo.SEGUNDO_NOMBRE} ${yoPuedo.APELLIDO_PATERNO}</td>
                    <td>${yoPuedo.NOMBRE_CURSO}</td>
                    <td>${yoPuedo.NOMBRE_ASIGNATURA}</td>
                    <td>${yoPuedo.FECHA}</td>
                    <td>${yoPuedo.YO_PUEDO}</td>
                    <td>${yoPuedo.ACTIVIDAD}</td>
                    <td>${yoPuedo.REALIZACION}</td>
                    <td><button class="btn btn-success EditarSeguimiento" data-toggle="modal" data-target="#crearRecurso" yoPuedo="${yoPuedo.ID_YOPUEDO}">Editar</button></td>
                    <td><button class="btn btn-danger EliminarYoPuedo" data-toggle="modal" data-target="#modalEliminar" yoPuedo="${yoPuedo.ID_YOPUEDO}">Eliminar</button></td>
                   </tr>`
                }
                $('#tablaYoPuedo').append(fila);
            })
        }
    })
        }   
    });
});
