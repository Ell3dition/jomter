
cargarProductos();

function cargarProductos() {
  $.ajax({
    url: "Admin/Ajax/productosA.php",
    type: "POST",
    data: { accion: "cargar", valor: valoraBuscar },
    dataType: "json",
    success: function (respuesta) {
     
      if(respuesta.length == 0){

        $('#modalSinProductos').modal('show');

        
        return;
      }

      cargarVistaPreviadelCarrito(respuesta);
      respuesta.forEach((registro) => {
        let cuerpo = `<div class="col-md-3 col-9 mt-5">
          <div class="card card-blog">
              <div class="card-image"  data-toggle="modal" data-target="#descripcionProducto">
                <img  src="admin/${registro.IMG_UNO}" class="img imagen-tarjeta" >
                      <!--   <div class="card-caption"> Quisque a bibendum magna </div> -->
                  
              </div>
              <div class="table">
                  <h6 class="text-info">${registro.NOMBRE_PRO}</h6>
                  <p><strong>Stock</strong> ${registro.STOCK_PRO}</p>
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
    },
  });
}

//BORRAR DEL PRODUCTO DEL CARRITO

function cargarVistaPreviadelCarrito(respuesta) {
  $(".cuerpo").on("click", ".verDetalle", function () {
    Pid = $(this).attr("idPro");
    console.log(Pid);
    $(".CuerpoModal").empty();
    respuesta.forEach((productos) => {
      if (productos.id == Pid) {
        let cuerpoModalAgregar = ` <div class="col-md-5">
        <img class="img img-fluid" style="height: 18rem;" src="admin/${productos.IMG_UNO}">
    </div>

    <div class="col-md-6">
        <h5 class="text-info" idProducto="${productos.id}">${productos.NOMBRE_PRO}</h5>
        <p>Stock <strong> ${productos.STOCK_PRO} </strong></p>

        <h6>$ <span> ${productos.PRECIO_PRO} </span>c/u</h6>
        <div class="form-group">
            <label for="precioProductoN"><strong>Cantidad</strong> </label>
            <input type="number" class="form-control input-lg cantidad" id="precioProductoN" value="1"
                style="width: 90px;">
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

function agregaralCarro(e) {
  $("#agregarProducto").modal("hide");
  const productoSeleccionado = e.target.parentElement.parentElement;

  let cantidaStock = productoSeleccionado.querySelector("p strong").textContent;
  let cantidadAgregando = productoSeleccionado.querySelector(".cantidad").value;

  console.log(cantidaStock);
  console.log(cantidadAgregando);

  if (Number.parseInt(cantidaStock) < Number.parseInt(cantidadAgregando)) {
    alert("Stock insuficiente");
    return;
  }

  let Productos = {
    imagen: productoSeleccionado.querySelector("img").src,
    nombre: productoSeleccionado.querySelector("h5").textContent,
    cantidad: productoSeleccionado.querySelector(".cantidad").value,
    subTotal: productoSeleccionado.querySelector(".totalProducto span")
      .textContent,
    precioU: productoSeleccionado.querySelector("h6 span").textContent,
    id: productoSeleccionado.querySelector("h5").getAttribute("idProducto"),
  };

  console.log(Productos.precioU);
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
    <td></td>
    <td>${producto.subTotal}</td>
    <td>
        <div class="btn-group">
            <button class="btn btn-danger BorrarProductoCarrito" idP="${producto.id}"><i class="fa fa-times"></i></button>
        </div>
    </td>
`;

    contenedorTbody.appendChild(row);
  });

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
  const btnBorrar = document.querySelector(".BorrarProductoCarrito");

  btnBorrar.addEventListener("click", (e) => {
    const productoId = e.target.getAttribute("idP");

    carritoCompras = carritoCompras.filter(
      (producto) => producto.id !== productoId
    );

    agregaralcarrito();

    console.log(productoId);
  });
}
