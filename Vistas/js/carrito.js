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

if (pagina[1] == "belleza") {
  valoraBuscar = "Belleza";
} else if (pagina[1] == "iluminacion") {
  valoraBuscar = "Iluminacion";
} else if (pagina[1] == "juguetes") {
  valoraBuscar = "Jugueteria";
} else if (pagina[1] == "tecnologia") {
  valoraBuscar = "Tecnologia";
} else if (pagina[1] == "VestuarioHogar") {
  valoraBuscar = "Vestuario";
} else if (pagina[1] == "nosotros") {
  cargarNosotros();
}
