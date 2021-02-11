//cargarProfesores en select

var URLactual = window.location.href;

console.log(URLactual);
console.log(URLactual.split("/"));
let ArrayURL = URLactual.split("/");
ArrayURL.forEach((element) => {
  console.log(element);
  if (element == "recursos") {
    cargarSelectProfesor();
  }
});

function cargarSelectProfesor() {
  $.ajax({
    url: "Ajax/recursosA.php",
    type: "POST",
    data: { accion: "CargarProfes" },
    dataType: "json",
    success: function (respuesta) {
      respuesta.forEach((profes) => {
        let SelectProfe = document.getElementById("selectProfesorRecurso");
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
        SelectProfe.appendChild(opcion);
      });
    },
  });
}


//--------------------------------------------------------------------------------------------------
//------------------------------SETEAR SELECT EN EL MENU CREAR--------------------------------------
//--------------------------------------------------------------------------------------------------
//select Profesor
const btn_crearRecurso = document.getElementById("btnCrearRecurso");
btn_crearRecurso.addEventListener("click", cargarCrear);

function cargarCrear(){

  limpiarSelectProfesorCrear();
  limpiarSelectAsignaturasProfesorCrear();
  limpiarSelectCursoProfesorCrear();
  cargarTipoRecurso();
  cargarMedioRecurso();

  $.ajax({
    url: "Ajax/recursosA.php",
    type: "POST",
    data: { accion: "CargarProfes" },
    dataType: "json",
    success: function (respuesta) {
      respuesta.forEach((profes) => {
        let SelectProfe = document.getElementById("selectProfesorRecursosN");
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
        SelectProfe.appendChild(opcion);
      });
    },
  });



}


function limpiarSelectProfesorCrear() {
  $("#selectProfesorRecursosN").empty();
  let asignaturas = document.getElementById("selectProfesorRecursosN");
  let opcion = document.createElement("option");
  opcion.text = "Seleccione un Profesor";
  opcion.value = "";
  asignaturas.appendChild(opcion);
}

//select asignatura

const selectProfesorCrear = document.getElementById("selectProfesorRecursosN");

selectProfesorCrear.addEventListener("change", () => {
  let rutProfesor = document.getElementById("selectProfesorRecursosN").value;

  console.log(rutProfesor);

  $.ajax({
    url: "Ajax/recursosA.php",
    type: "POST",
    data: { accion: "cargarAsignatura", rutProfesor: rutProfesor },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      limpiarSelectAsignaturasProfesorCrear();
      respuesta.forEach((asignaturas) => {
        let SelectAsignaura = document.getElementById(
          "selectAsignaturaRecursosN"
        );
        let opcion = document.createElement("option");
        opcion.text = asignaturas.NOMBRE_ASIGNATURA;
        opcion.value = asignaturas.ID_ASIGNATURA;
        SelectAsignaura.appendChild(opcion);
      });
    },
  });
});

function limpiarSelectAsignaturasProfesorCrear() {
  $("#selectAsignaturaRecursosN").empty();
  let asignaturas = document.getElementById("selectAsignaturaRecursosN");
  let opcion = document.createElement("option");
  opcion.text = "Seleccione una Asignatura";
  opcion.value = "0";
  asignaturas.appendChild(opcion);
}

//select curso

selectProfesorCrear.addEventListener("change", () => {
  let rutProfesor = document.getElementById("selectProfesorRecursosN").value;

  console.log(rutProfesor);

  $.ajax({
    url: "Ajax/recursosA.php",
    type: "POST",
    data: { accion: "cargarCurso", rutProfesor: rutProfesor },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      limpiarSelectCursoProfesorCrear();
      respuesta.forEach((asignaturas) => {
        let SelectAsignaura = document.getElementById("selectCursoRecursoN");
        let opcion = document.createElement("option");
        opcion.text = asignaturas.NOMBRE_CURSO;
        opcion.value = asignaturas.ID_CURSO;
        SelectAsignaura.appendChild(opcion);
      });
    },
  });
});

function limpiarSelectCursoProfesorCrear() {
  $("#selectCursoRecursoN").empty();
  let asignaturas = document.getElementById("selectCursoRecursoN");
  let opcion = document.createElement("option");
  opcion.text = "Seleccione un Curso";
  opcion.value = "0";
  asignaturas.appendChild(opcion);
}

//CARGAR TIPO DE RECURSO

function cargarTipoRecurso() {
  $.ajax({
    url: "Ajax/recursosA.php",
    type: "POST",
    data: { accion: "cargarTipo" },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      limpiarTipo();
      respuesta.forEach((asignaturas) => {
        let SelectAsignaura = document.getElementById("selectTipoRecursosN");
        let opcion = document.createElement("option");
        opcion.text = asignaturas.NOMBRE_TIPO;
        opcion.value = asignaturas.ID_TIPO_RECURSO;
        SelectAsignaura.appendChild(opcion);
      });
    },
  });
}

function limpiarTipo() {
  $("#selectTipoRecursosN").empty();
  let asignaturas = document.getElementById("selectTipoRecursosN");
  let opcion = document.createElement("option");
  opcion.text = "Seleccione un Tipo de recurso";
  opcion.value = "0";
  asignaturas.appendChild(opcion);
}

//cargar medio recurso
function cargarMedioRecurso() {
  $.ajax({
    url: "Ajax/recursosA.php",
    type: "POST",
    data: { accion: "cargarMedio" },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      limpiarMedio();
      respuesta.forEach((medios) => {
        let SelectMedios = document.getElementById(
          "selectMedioEntregaRecursosN"
        );
        let opcion = document.createElement("option");
        opcion.text = medios.NOMBRE_MEDIO;
        opcion.value = medios.ID_MEDIO_ENTREGA_RECURSO;
        SelectMedios.appendChild(opcion);
      });
    },
  });
}

function limpiarMedio() {
  $("#selectMedioEntregaRecursosN").empty();
  let medios = document.getElementById("selectMedioEntregaRecursosN");
  let opcion = document.createElement("option");
  opcion.text = "Seleccione Medio de entrega";
  opcion.value = "0";
  medios.appendChild(opcion);
}



//--------------------------------------------------------------------------------------------------
//------------------------------GUARDAR INFORMACION EN BASE DE DATOS--------------------------------
//--------------------------------------------------------------------------------------------------

FormularioGuardarRecurso;

const formulario = document.getElementById("FormularioGuardarRecurso");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const formularioGuardar = document.forms["FormularioGuardarRecurso"];
  let realizado = formularioGuardar["recursos"].value;
  let rutProfe = formularioGuardar["selectProfesorRecursosN"].value;
  let idAsignatura = formularioGuardar["selectAsignaturaRecursosN"].value;
  let idCurso = formularioGuardar["selectCursoRecursoN"].value;
  let fecha = formularioGuardar["fechaRecursoN"].value;
  let idTipo = formularioGuardar["selectTipoRecursosN"].value;
  let idMedio = formularioGuardar["selectMedioEntregaRecursosN"].value;
  let comentario = formularioGuardar["comentariosrecursosN"].value;

  console.log(fecha);
  console.log(typeof(fecha));

  if(rutProfe==0 || idAsignatura==0 || idCurso == 0 || fecha == "" || idTipo== 0 || idMedio==0){

    toastr.error("Error", "Todos los campos son Obligatorios", {
      closeButton: true,
      progressBar: true,
      showDuration: "800",
      hideDuration: "1000",
      positionClass: "toast-top-full-width",
    });


  }else{



  let lista = [
    realizado,
    rutProfe,
    idAsignatura,
    idCurso,
    fecha,
    idTipo,
    idMedio,
    comentario,
  ];

  console.log(lista);

  $.ajax({
    url: "Ajax/recursosA.php",
    type: "POST",
    data: { accion: "GuardarDatos", lista: JSON.stringify(lista) },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);

      $('#crearRecurso').modal('hide');
      const formulario = document.getElementById('FormularioGuardarRecurso');
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


//--------------------------------------------------------------------------------------------------
//------------------------------BUSCAR REGISTROS Y CREAR TABLA--------------------------------------
//--------------------------------------------------------------------------------------------------

const btnBuscarRecuso = document.getElementById('btnBuscarRecuso');
btnBuscarRecuso.addEventListener('click', ()=>{

   let rutProfe = document.getElementById('selectProfesorRecurso').value;
   let desde = document.getElementById('fechaRecursoDesde').value;
   let hasta = document.getElementById('fechaRecursoHasta').value;

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
   let OBJvariables ={
    rutProfe : rutProfe,
    desde : desde,
    hasta : hasta
   }

  variables.push(OBJvariables);


   console.log(variables);


 $.ajax({
    url: "Ajax/recursosA.php",
    type: "POST",
    data: { accion: "BuscarDatos", lista: JSON.stringify(variables)},
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);

      if (respuesta.length == 0) {
        toastr.info("No hay registros en ese rango de fechas", "", {
          closeButton: true,
          progressBar: true,
          showDuration: "800",
          hideDuration: "1000",
         });
      }


      $("#tablaRecursosProfesor tbody tr").empty();
      respuesta.forEach((registro, i) => {

        
        let tabla = `<tr>
            <td>${i + 1}</td>
            <td>${registro.REALIZADO}</td>
            <td>${registro.PRIMER_NOMBRE+" "+registro.SEGUNDO_NOMBRE+" "+registro.APELLIDO_PATERNO+" "+registro.APELLIDO_MATERNO}</td>
            <td>${registro.NOMBRE_ASIGNATURA}</td>
            <td>${registro.NOMBRE_CURSO}</td>
            <td>${registro.FECHA}</td>
            <td>${registro.NOMBRE_TIPO}</td>
            <td>${registro.NOMBRE_MEDIO}</td>
            <td>${registro.COMENTARIOS}</td>
           
            </tr>
          `;
        $("#tablaRecursosProfesor").append(tabla);

      });

    },
  });

  }

});