let carritoCompras = [];

document.addEventListener("DOMContentLoaded", () => {
  carritoCompras = JSON.parse(localStorage.getItem("carrito")) || [];
  agregaralcarrito();

  cargarProductos();
  sumarRestarbtn();
  BusquedaProductos();
});

var pathname = window.location.pathname;

const pagina = pathname.split("/");

let valoraBuscar = "";

if (pagina[2] == "belleza") {
  valoraBuscar = "Belleza";
} else if (pagina[2] == "iluminacion") {
  valoraBuscar = "Iluminacion";
} else if (pagina[2] == "juguetes") {
  valoraBuscar = "Juguetes";
} else if (pagina[2] == "tecnologia") {
  valoraBuscar = "Tecnologia";
} else if (pagina[2] == "VestuarioHogar") {
  valoraBuscar = "Vestuario";
}
