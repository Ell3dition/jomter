let stockActual = [];
let stockaActualizar = [];

document.addEventListener("DOMContentLoaded", () => {
  cargarVentas();
});

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

async function cargarVentasPendientes(idVenta) {
  let resultado = await $.ajax({
    url: "Ajax/confirmarVentasA.php",
    type: "POST",
    data: { accion: "detalleVentas", idVentas: idVenta },
    dataType: "json",
  });
  return resultado;
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
        <button class="btn btn-primary VerDetalle" idc="${element.ID_CONFIRMACION}"><i class="fas fa-eye"></i> Detalle</button>
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
        <button class="btn btn-primary VerDetalle" idc="${element.ID_CONFIRMACION}"><i class="fas fa-eye"></i> Detalle</button>
        </td>
        `;
    }

    contenedorTbody.appendChild(row);
  });
}

let idVenta = "";
//ventaREalizada
$("#registros").on("click", ".VentaExitosa", function () {
  idVenta = $(this).attr("idc");
  let respuesta = cargarVentasPendientes(idVenta);
  respuesta
    .then((r) => {
      let lista = [];
      let total = 0;
      r.forEach((pro) => {
        total =
          Number.parseInt(pro.STOCK_PRO) -
          Number.parseInt(pro.CANTIDAD_VENDIDA);

        lista.push({
          total: total,
          id: pro.id,
        });
      });

      actualizarStock(lista);
    })
    .catch(() => {
      console.log("Algo salió mal");
    });

  $.ajax({
    url: "Ajax/confirmarVentasA.php",
    type: "POST",
    data: { accion: "Exito", id: idVenta },
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

//VER DETALLE
$("#registros").on("click", ".VerDetalle", function () {
  idC = $(this).attr("idc");

  $.ajax({
    url: "Ajax/confirmarVentasA.php",
    type: "POST",
    data: { accion: "detalleVentas", idVentas: idC },
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      $("#detalleVentas").modal("show");
      $(".contenedorDetalle").empty();

      const TbodyDetalle = document.querySelector(".contenedorDetalle");
      respuesta.forEach((pro) => {
        const row = document.createElement("tr");
        row.innerHTML = `
     <td><img src="${pro.IMG_UNO}" class="img-fluid imagenUno" alt="" width="50px"></td>
     <td>${pro.NOMBRE_PRO}</td>
     <td>${pro.CANTIDAD_VENDIDA}</td>
     <td>${pro.TALLA}</td>
     <td>${pro.SUB_TOTAL_VENTA}</td>`;

        TbodyDetalle.appendChild(row);
      });
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
    url: "Ajax/confirmarVentasA.php",
    type: "POST",
    data: { accion: "Buscar", parametro: busqueda },
    dataType: "json",
    success: function (respuesta) {
      cargarTabla(respuesta);
    },
  });
}

//ACTUALIZAR STOCK

function actualizarStock(lista) {
  $.ajax({
    url: "Ajax/confirmarVentasA.php",
    type: "POST",
    data: { accion: "ActualizarStock", lista: JSON.stringify(lista) },
    dataType: "json",
    success: function (res) {
      console.log(res);
    },
  });
}
