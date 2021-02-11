//----------------------------------------------
//----------------------------------------------
//--------Cargar cursos dependiendo del año-----
//----------------------------------------------
//----------------------------------------------

$(document).ready(function () {
  console.log(typeof moment().format("YYYY"));
  let ano = moment().format("YYYY");

  $.ajax({
    url: "Ajax/mantenedorAlumnosA.php",
    type: "POST",
    data: { accion: "cargarCursos", ano: ano },
    dataType: "json",
    success: function (respuesta) {
      respuesta.forEach((curso) => {
        let cursos = document.getElementById("cursoAno");
        let opcion = document.createElement("option");
        opcion.text = curso.NOMBRE_CURSO;
        opcion.value = curso.ID_CURSO;
        cursos.appendChild(opcion);
      });
    },
  });
});

//----------------------------------------------
//----------------------------------------------
//---------------VALIDAR RUT--------------------
//----------------------------------------------
//----------------------------------------------

const rutNuevo = document.getElementById("rutAlumnoN");
rutNuevo.addEventListener("blur", (e) => {
  let rutNuevo = document.getElementById("rutAlumnoN").value;
  let cambio = rutNuevo.split("-");
  console.log(cambio);

  if (cambio.length == 1) {
    e.target.style.borderColor = "red";
  } else {
    e.target.style.borderColor = "green";
  }

  let rut = cambio[0];
  let dv = cambio[1];

  console.log(rut + "y " + dv);
});

//----------------------------------------------
//----------------------------------------------
//---------------FUNCION GUARDAR----------------
//----------------------------------------------
//----------------------------------------------

const formularioCrear = document.getElementById("CrearAlumno");

formularioCrear.addEventListener("submit", (e) => {
  e.preventDefault();

  const formularioGuardar = document.forms["CrearAlumno"];
  let primerNombre = formularioGuardar["nom1"].value;
  let segundoNombre = formularioGuardar["nom2"].value;
  let primerApellido = formularioGuardar["ape1"].value;
  let segundoApellido = formularioGuardar["ape2"].value;
  let idCurso = formularioGuardar["cursoAno"].value;
  let rutNuevo = document.getElementById("rutAlumnoN").value;
  let cambio = rutNuevo.split("-");
  console.log(cambio);
  let rut = cambio[0];
  let dv = cambio[1];

  let lista = [
    rut,
    dv,
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    idCurso,
  ];

    console.log(lista);
});
