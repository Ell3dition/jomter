function cargarProductos() {

if(valoraBuscar == ""){

  return;
}

  $.ajax({
    url: "Admin/Ajax/productosA.php",
    type: "POST",
    data: { accion: "cargar", valor: valoraBuscar },
    dataType: "json",
    success: function (respuesta) {
      if (respuesta.length == 0) {
        swal(
          "Lo sentimos",
          "Actualmente no contamos con productos en esta categoría le invitamos a que pueda navegar por las otras catgorías",
          "error"
        );

        return;
      }
      cargarDescripcionProducto(respuesta);
      cargarVistaPreviadelCarrito(respuesta);
      crearTarjetasProductos(respuesta);
    },
  });
}

function cargarDescripcionProducto(descripcion) {
  $(".cuerpo").on("click", ".card-image", function () {
    Pid = $(this).attr("idPro");
    $(".contenedorDescripcion").empty();

    descripcion.forEach((pro) => {
      if (pro.id == Pid) {
        let cuerpoModalDescripcion = `   <div class="col-md-6">
        <div id="imagenesProductos" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#imagenesProductos" data-slide-to="0" class="active"></li>
                <li data-target="#imagenesProductos" data-slide-to="1"></li>
                <li data-target="#imagenesProductos" data-slide-to="2"></li>
                <li data-target="#imagenesProductos" data-slide-to="3"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="admin/${pro.IMG_UNO}" class="d-block w-100" style="width: 100%; height: 20rem;" >
                </div>
                <div class="carousel-item">
                    <img src="admin/${pro.IMG_DOS}" class="d-block w-100" >
                </div>
                <div class="carousel-item">
                    <img src="admin/${pro.IMG_TRES}" class="d-block w-100" >
                </div>
                <div class="carousel-item">
                    <img src="admin/${pro.IMG_CUATRO}" class="d-block w-100" >
                </div>
            </div>
            <a class="carousel-control-prev" href="#imagenesProductos" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"style="background-color: black;"></span>
                <span class="sr-only"></span>
            </a>
            <a class="carousel-control-next" href="#imagenesProductos" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true" style="background-color: black;"></span>
                <span class="sr-only"></span>
            </a>
        </div>
    </div>
    <div class="col-md-6 mt-3 mt-md-0">
    <p> ${pro.DESCRIPCION} </p>

    </div>`;

        $(".contenedorDescripcion").append(cuerpoModalDescripcion);
      }
    });
  });
}

function cargarVistaPreviadelCarrito(respuesta) {
  $(".cuerpo").on("click", ".verDetalle", function () {
    Pid = $(this).attr("idPro");

    $(".CuerpoModal").empty();
    respuesta.forEach((productos) => {
      if (productos.id == Pid) {
        let cuerpoModalAgregar = ` <div class="col-md-5">
        <img class="img img-fluid" style="height: 18rem;" src="admin/${productos.IMG_UNO}">
    </div>

    <div class="col-md-6">
        <h5 class="text-info" idProducto="${productos.id}">${productos.NOMBRE_PRO}</h5>
        <p class="my-0">Stock <strong class="stock"> ${productos.STOCK_PRO} </strong></p>
        <p class="mb-3 talla">Talla <strong> ${productos.TALLA} </strong></p>
        <h6>$ <span> ${productos.PRECIO_PRO} </span>c/u</h6>
       <!-- <h6>$ <span> 1000 por mayor 6 </span>c/u</h6> -->
        <div class="input-group mb-3">

</div>
<label for="precioProductoN"><strong>Cantidad</strong> </label>
        <div class="form-group input-group-prepend">
                  <button class="btn btn-outline-danger btnMenos">-</button>
            <input type="number" disabled class="form-control cantidad" id="precioProductoN" value="1" style="width: 90px;">
                <button class="btn btn-outline-success btnMas" style="heigth: 50rem;">+</button>
        </div>
        
        <h3 class="ml-5 totalProducto">10900</h3>
    </div>`;

        $(".CuerpoModal").append(cuerpoModalAgregar);

        let cantidad = $(".cantidad").val();
        let total = cantidad * productos.PRECIO_PRO;
        const totalEtiqueta = document.querySelector(".totalProducto");
        totalEtiqueta.innerHTML = "Total $ <span>" + total + "</span>";
        const SelectCantidad = document.querySelector(".cantidad");

        SelectCantidad.addEventListener("change", () => {
          cantidad = $(".cantidad").val();
          total = cantidad * productos.PRECIO_PRO;
          totalEtiqueta.innerHTML = "Total $ <span>" + total + "</span>";
        });
      }
    });
  });



  const btnAgregarCarro = document.querySelector(".agregar");
  btnAgregarCarro.addEventListener("click", agregaralCarro);
}

function crearTarjetasProductos(respuesta) {
  respuesta.forEach((registro) => {
    //TARJETAS DE PRODUCTOS
    let cuerpo = `<div class="col-md-3 col-9 mt-5">
      <div class="card card-blog">
          <div class="card-image"  data-toggle="modal" data-target="#descripcionProducto" idPro = "${registro.id}">
            <img  src="admin/${registro.IMG_UNO}"  class="img imagen-tarjeta" >
                 
              
          </div>
          <div class="table">
              <h6 class="text-info">${registro.NOMBRE_PRO}</h6>
              <p class="my-0"><strong>Stock</strong> ${registro.STOCK_PRO}</p>
              <p class="my-0"><strong>Talla</strong> ${registro.TALLA}</p>
              <h4>$ ${registro.PRECIO_PRO}</h4>
              <div class="d-grid gap-2 d-md-block">
                  <button class="btn btn-success verDetalle" data-toggle="modal" idPro = "${registro.id}" data-target="#agregarProducto"> <i
                          class="fa fa-shopping-cart" aria-hidden="true"></i>
                      Agregar</button>
                
              </div>
          </div>
      </div>
  </div>`;
    $(".cuerpo").append(cuerpo);
  });
}


//VARIABLES GLOBALES PARA PODER VERIFICAR STOCK EN LINEA 376
let idProductoSeleccionado="";
let cantidaStock = "";
let cantidadAgregando = "";

function agregaralCarro(e) {

 

  $("#agregarProducto").modal("hide");
  const productoSeleccionado = e.target.parentElement.parentElement;

  cantidaStock = productoSeleccionado.querySelector("p strong").textContent;
  cantidadAgregando = productoSeleccionado.querySelector(".cantidad").value;

  if (Number.parseInt(cantidaStock) < Number.parseInt(cantidadAgregando)) {
    swal("Lo sentimos", "Stock Insuficiente", "error");
    return;
  }

  let Productos = {
    imagen: productoSeleccionado.querySelector("img").src,
    nombre: productoSeleccionado.querySelector("h5").textContent,
    cantidad: productoSeleccionado.querySelector(".cantidad").value,
    subTotal: productoSeleccionado.querySelector(".totalProducto span")
      .textContent,
    talla: productoSeleccionado.querySelector(".talla strong").textContent,
    precioU: productoSeleccionado.querySelector("h6 span").textContent,
    id: productoSeleccionado.querySelector("h5").getAttribute("idProducto"),
  };

  idProductoSeleccionado = productoSeleccionado.querySelector("h5").getAttribute("idProducto");



  let resultado = validarStockalAgregar();

  if(resultado == false){

    
    swal(
      "Error",
      "La cantidad que intenta agregar supera el limite de stock del producto, revise su carrito para verificar la cantidad de los productos",
      "error"
    );


    return;
  }

  const existentes = carritoCompras.some(
    (producto) => producto.id === Productos.id
  );

  if (existentes) {
    const pro = carritoCompras.map((producto) => {
      if (producto.id === Productos.id) {
        producto.cantidad =
          Number.parseInt(producto.cantidad) +
          Number.parseInt(
            productoSeleccionado.querySelector(".cantidad").value
          );
        producto.subTotal =
          Number.parseInt(producto.cantidad) *
          Number.parseInt(
            productoSeleccionado.querySelector("h6 span").textContent
          );
        return producto;
      } else {
        return producto;
      }
    });
  } else {
    carritoCompras = [...carritoCompras, Productos];
  }


 

   agregaralcarrito();
   toastr.success("Aregado con éxito", "Producto", {
    closeButton: true,
    progressBar: true,
    showDuration: "800",
    hideDuration: "1000",
  });
 
}

function agregaralcarrito() {
  $("#tablaCarrito tbody").empty();
  const contenedorTbody = document.querySelector(".contenedor");

  carritoCompras.forEach((producto) => {
    const row = document.createElement("tr");

    row.innerHTML = `  
    <td>
        <img src="${producto.imagen}" class="img-fluid imagenUno" alt="" width="50px">
    </td>
    <td>${producto.nombre}</td>
    <td>${producto.cantidad}</td>
    <td>${producto.talla}</td>
    <td>${producto.subTotal}</td>
    <td>
        <div class="btn-group">
            <button class="btn btn-danger BorrarProductoCarrito" idP="${producto.id}"><i class="fa fa-times"></i></button>
        </div>
    </td>
`;

    contenedorTbody.appendChild(row);
  });

  sincronizarconStorage();
  calcularTotal();
  BorrarDelCarrito();
}

function calcularTotal() {
  const etiquetaTotal = document.querySelector(".totalaPagar h4 strong");

  var totalPagar = 0;

  $("#tablaCarrito tbody")
    .find("tr")
    .each(function (i, el) {
      totalPagar += parseFloat($(this).find("td").eq(4).text());
    });

  etiquetaTotal.innerHTML = totalPagar;
}

function BorrarDelCarrito() {
  $(".contenedor").on("click", ".BorrarProductoCarrito", function (e) {
    const productoId = e.target.getAttribute("idP");

    carritoCompras = carritoCompras.filter(
      (producto) => producto.id !== productoId
    );
    agregaralcarrito();
  });
}

function sincronizarconStorage() {
  localStorage.setItem("carrito", JSON.stringify(carritoCompras));
}

function sumarRestarbtn() {
  $(".CuerpoModal").on("click", ".btnMenos", function () {
    let valor = document.querySelector(".cantidad").value;
    let can = Number.parseInt(valor) - 1;
    if (can < 0) {
      return;
    }
    document.querySelector(".cantidad").value = can;
    const precioUni = document.querySelector("h6 span").textContent;
    let total = can * precioUni;
    const totalEtiqueta = document.querySelector(".totalProducto");
    totalEtiqueta.innerHTML = "Total $ <span>" + total + "</span>";
  });

  $(".CuerpoModal").on("click", ".btnMas", function () {
    let valor = document.querySelector(".cantidad").value;
    let can = Number.parseInt(valor) + 1;
    const stock = document.querySelector(".stock").textContent;
    if (Number.parseInt(stock) < can) {
      return;
    }
    document.querySelector(".cantidad").value = can;
    const precioUni = document.querySelector("h6 span").textContent;
    let total = can * precioUni;
    const totalEtiqueta = document.querySelector(".totalProducto");
    totalEtiqueta.innerHTML = "Total $ <span>" + total + "</span>";
  });
}

function BusquedaProductos() {
  $.ajax({
    url: "Admin/Ajax/productosA.php",
    type: "POST",
    data: { accion: "BusquedaFrontEnd" },
    dataType: "json",
    success: function (respuesta) {
      cargarBusqueda(respuesta);
    },
  });
}

function cargarBusqueda(respuesta) {
  const btnBuscar = document.querySelector("#btnBuscar");
  btnBuscar.addEventListener("click", () => {
    let inputBusqueda = document.querySelector("#inputBusqueda").value;
    let resltadoBusqueda = [];
    respuesta.forEach((element) => {
      if (element.NOMBRE_PRO.match(inputBusqueda)) {
        const pro = {
          NOMBRE_PRO: element.NOMBRE_PRO,
          PRECIO_PRO: element.PRECIO_PRO,
          STOCK_PRO: element.STOCK_PRO,
          TALLA: element.TALLA,
          id: element.id,
          CATEGORIA_PRO: element.CATEGORIA_PRO,
          DESCRIPCION: element.DESCRIPCION,
          IMG_CUATRO: element.IMG_CUATRO,
          IMG_TRES: element.IMG_TRES,
          IMG_DOS: element.IMG_DOS,
          IMG_UNO: element.IMG_UNO,
        };
        resltadoBusqueda.push(pro);
      }
    });
    $(".cuerpo").empty();
    cargarDescripcionProducto(resltadoBusqueda);
    cargarVistaPreviadelCarrito(resltadoBusqueda);
    crearTarjetasProductos(resltadoBusqueda);
  });
}


function validarStockalAgregar(){
  if(carritoCompras.length == 0){

    return true
  }

 let encontrados = 0;
  
  for (let i = 0; i < carritoCompras.length; i++) {

    if(carritoCompras[i].id == idProductoSeleccionado ){
      
      let total = Number.parseInt(cantidadAgregando)+ Number.parseInt(carritoCompras[i].cantidad);

      encontrados++;
      
      if(Number.parseInt(cantidaStock) <  total ){

      
      return false;
       

      }else{

        return true;
      }


    }
    
  }

  if(encontrados == 0){

    return true
  }
  
 
 
}



  
