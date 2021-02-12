const tablaRegistros = document.querySelector("#tablaRegistros");


tablaRegistros.addEventListener("click", cargarImagenes);

function cargarImagenes(e) {

    if (e.target.classList.contains('imagenUno')) {

        console.log("CLIC EN MAGEN");

        $("#imagenUno").modal("show");
    }

    if (e.target.classList.contains('imagenDos')) {

        console.log("CLIC EN MAGEN");

        $("#imagen").modal("show");
    }


}