document.addEventListener("DOMContentLoaded", cargarVentas);

function cargarVentas() {
  $.ajax({
    url: "Ajax/confirmarVentasA.php",
    type: "POST",
    data: { accion: "Cargar" },
    dataType: "json",
    success: function (respuesta) {
      cargarTabla(respuesta);
    },
  });
}

function cargarTabla(ventas) {
  $("#tablaVentas").empty();

  const contenedorTbody = document.querySelector("#tablaVentas");
  ventas.forEach((element) => {
    const row = document.createElement("tr");

    if (element.ESTADO == "PENDIENTE") {
      row.classList.add("table-danger");
      row.innerHTML = `
        <td>${element.ID_CONFIRMACION}</td>
        <td>${element.TOTAL_VENTA}</td>
        <td>${element.NOMBRE_CLIENTE}</td>
        <td>${element.TELEFONO_CLIENTE}</td>
        <td>${element.ESTADO}</td>
        <td>
        <div class="btn-group">
        <button class="btn btn-success VentaExitosa" idc="${element.ID_CONFIRMACION}"><i class="fa fa-check"></i> Realizada</button>
        <button class="btn btn-danger BorrarVenta" idc="${element.ID_CONFIRMACION}"><i class="fa fa-times"></i> Rechazada</button>
        </div>
        
        </td>
        `;
    } else {
      row.innerHTML = `
        <td>${element.ID_CONFIRMACION}</td>
        <td>${element.TOTAL_VENTA}</td>
        <td>${element.NOMBRE_CLIENTE}</td>
        <td>${element.TELEFONO_CLIENTE}</td>
        <td>${element.ESTADO}</td>
        <td>
        </td>
        `;
    }

    contenedorTbody.appendChild(row);
  });
}

//ventaREalizada
$("#registros").on("click", ".VentaExitosa", function () {
  idC = $(this).attr("idc");

  $.ajax({
    url: "Ajax/confirmarVentasA.php",
    type: "POST",
    data: { accion: "Exito", id: idC },
    dataType: "json",
    success: function (respuesta) {
      cargarVentas();
    },
  });
});

//ventaRECHAZADA
$("#registros").on("click", ".BorrarVenta", function () {
  idC = $(this).attr("idc");

  $.ajax({
    url: "Ajax/confirmarVentasA.php",
    type: "POST",
    data: { accion: "Rechazo", id: idC },
    dataType: "json",
    success: function (respuesta) {
      cargarVentas();
    },
  });
});

//buscar ventas

const btnMostrarTodo = document.querySelector("#btnTodo");

btnMostrarTodo.addEventListener("click", () => {
  cargarVentas();
});

const btnBuscar = document.querySelector("#btnBuscar");
btnBuscar.addEventListener("click", busqueda);

function busqueda() {
  let busqueda = document.querySelector("#selectBuscarVenta").value;

  if (busqueda == 0) {
    toastr.error("Error", "Todos los campos son Obligatorios", {
        closeButton: true,
        progressBar: true,
        showDuration: "800",
        hideDuration: "1000",
    });
    return;
  }

  $.ajax({

    url:"Ajax/confirmarVentasA.php",
    type:"POST",
    data:{accion: "Buscar" , parametro: busqueda },
    dataType: "json",
    success: function(respuesta){

        cargarTabla(respuesta);


    }
  });

}
