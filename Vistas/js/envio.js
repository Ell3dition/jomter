const urlDesktop = "https://web.whatsapp.com/";
const urlMobile = "whatsapp://";
const phone = "56981538796";
let total = 0;

function isMobile() {
  if (sessionStorage.desktop) return false;
  else if (localStorage.mobile) return true;

  var mobile = [
    "iphone",
    "ipad",
    "android",
    "blackberry",
    "nokia",
    "opera mini",
    "windows mobile",
    "windows phone",
    "iemobile",
  ];
  for (var i in mobile)
    if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0)
      return true;

  return false;
}

$("#carritoCompras").on("click", "#send", function () {
  ventaPendiente();
});

function enviodewhat() {
  let produc = "";
  total = 0;

 
  if (carritoCompras.length === 0) {
    $("#modalErrorCarritoVacio").modal("show");
    return;
  }

  carritoCompras.forEach((pro) => {
    let produ = `%0A%0A*Producto*%20%20${pro.nombre}%20%20*Cantidad*%20%20${pro.cantidad}%20%20*Talla*%20%20${pro.talla}%20%20*SubTotal*%20%20${pro.subTotal}`;

    total = total + Number.parseInt(pro.subTotal);

    produc = produc.concat(produ.trim());
  });

  setTimeout(() => {
    let message =
      "send?phone=" +
      phone +
      "&text=*CARRITO WEB*" +
      produc +
      "%0A%0A*Total a Pagar*%20%20 = *$" +
      total +
      "*";

    $("#modalGracias").modal("show");
    if (isMobile()) {
      window.open(urlMobile + message, "_blank");
    } else {
      window.open(urlDesktop + message, "_blank");
    }
  }, 5);
}

function ventaPendiente() {
  $("#modalConfirmarDatos").modal("show");
  $("#carritoCompras").modal("hide");

  const btnContactar = document.querySelector("#confirmar");
  btnContactar.addEventListener("click", () => {
    const nombreCliente = document.querySelector("#nombreCliente").value;
    const numCliente = document.querySelector("#telefonoCliente").value;
   
    let mensajeError = "";

    if (nombreCliente.length == 0) {
      mensajeError = `<div class="alert alert-danger" id="error" role="alert">
    El nombre es un dato obligatorio
  </div>`;
      $(".mensaje").append(mensajeError);
      setTimeout(() => {
        $(".mensaje").empty();
      }, 3000);
      return;
    } else if (numCliente.length == 0) {
      mensajeError = `<div class="alert alert-danger" role="alert">
    El Número de teléfono es un dato obligatorio
  </div>`;
      $(".mensaje").append(mensajeError);
      setTimeout(() => {
        $(".mensaje").empty();
      }, 3000);
      return;
    }

    let totalCompra = 0;
    carritoCompras.forEach((pro) => {
  
      totalCompra = totalCompra + Number.parseInt(pro.subTotal);
 
    });

    let listado = [totalCompra, nombreCliente, numCliente];
    $.ajax({
      url: "Admin/Ajax/confirmarVentasA.php",
      type: "POST",
      data: { accion: "Confirmar", listado: JSON.stringify(listado) , detalleProductos: JSON.stringify(carritoCompras)},
      dataType: "json",
      success: function (respuesta) {
        enviodewhat();
        localStorage.removeItem("carrito");
        carritoCompras = [];
        agregaralcarrito();
        $("#modalConfirmarDatos").modal("hide");
      },
    });
  });
}
