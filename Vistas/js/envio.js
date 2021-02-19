const urlDesktop = "https://web.whatsapp.com/";
const urlMobile = "whatsapp://";
const phone = "56981538796";

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
  enviodewhat();
  ventaPendiente();
});

function enviodewhat() {
  let produc = "";
  let total = 0;


    console.log(carritoCompras.length);

    if(carritoCompras.length === 0){

        $("#modalErrorCarritoVacio").modal("show");
        return;
    }

    carritoCompras.forEach((pro) => {

    let produ = `%0A%0A*Producto*%20%20${pro.nombre}%20%20*Cantidad*%20%20${pro.cantidad}%20%20*SubTotal*%20%20${pro.subTotal}`;


    total = total + Number.parseInt(pro.subTotal);


    produc = produc.concat(produ.trim());
  });


  setTimeout(() => {
    let message = "send?phone=" + phone + "&text=*CARRITO WEB*" + produc + "%0A%0A*Total a Pagar*%20%20 = *$"+total+"*" ;

    
    $("#modalGracias").modal("show");
    $("#carritoCompras").modal("hide");
    if (isMobile()) {
      window.open(urlMobile + message, "_blank");
    } else {
      window.open(urlDesktop + message, "_blank");
    }
  }, 5);
}


function ventaPendiente(){};
