function cargarProductos() {
  if (valoraBuscar == "") {
    return;
  }

  $.ajax({
    url: "admin/Ajax/productosA.php",
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

    validarDescripcion(descripcion, Pid);
    
   
  });
}

function cargarVistaPreviadelCarrito(respuesta) {
  $(".cuerpo").on("click", ".verDetalle", function () {
    Pid = $(this).attr("idPro");

    $(".CuerpoModal").empty();
    respuesta.forEach((productos) => {
      if (productos.id == Pid) {
        
        let cuerpoModalAgregar = "";
        let imgPrincipal = "";

        if(productos.IMG_UNO == ""){
          imgPrincipal = "Vistas/mg/default.png";
        }else{

          imgPrincipal = "admin/"+productos.IMG_UNO;
        }

        if(productos.PRECIO_POR_MAYOR == null || productos.PRECIO_POR_MAYOR == ""){
          cuerpoModalAgregar = `<div class="col-md-5">
          <img class="img img-fluid" style="height: 18rem;" src="${imgPrincipal}">
      </div>
  
      <div class="col-md-6">
          <h5 class="text-info" idProducto="${productos.id}">${productos.NOMBRE_PRO}</h5>
          <p class="my-0">Stock <strong class="stock"> ${productos.STOCK_PRO} </strong></p>
          <p class="mb-3 talla">Talla <strong> ${productos.TALLA} </strong></p>
          <h6>$ <span>${productos.PRECIO_PRO}</span>c/u</h6>
          <h6> <span class="precioXmayor"></span><span class="xmayor"></span></h6> 
          <div class="input-group mb-3">
  
  </div>
  <label for="precioProductoN"><strong>Cantidad</strong> </label>
          <div class="form-group input-group-prepend">
                    <button class="btn btn-outline-danger btnMenos">-</button>
              <input type="number" disabled class="form-control cantidad" id="precioProductoN" value="1" style="width: 90px;">
                  <button class="btn btn-outline-success btnMas" style="heigth: 50rem;">+</button>
          </div>
  
          <div class="alert-precio"></div>
          
          <h3 class="ml-5 totalProducto">Total $ <span> </span></h3>
      </div>`;

        }else{

          cuerpoModalAgregar = ` <div class="col-md-5">
          <img class="img img-fluid" style="height: 18rem;" src="${imgPrincipal}">
      </div>
  
      <div class="col-md-6">
          <h5 class="text-info" idProducto="${productos.id}">${productos.NOMBRE_PRO}</h5>
          <p class="my-0">Stock <strong class="stock"> ${productos.STOCK_PRO} </strong></p>
          <p class="mb-3 talla">Talla <strong> ${productos.TALLA} </strong></p>
          <h6>$ <span>${productos.PRECIO_PRO}</span>c/u</h6>
          <h6>$ <span class="precioXmayor">${productos.PRECIO_POR_MAYOR}</span> Precio por mayor desde <span class="xmayor">${productos.CANTIDAD_POR_MAYOR}</span> Un.</h6> 
          <div class="input-group mb-3">
  
  </div>
  <label for="precioProductoN"><strong>Cantidad</strong> </label>
          <div class="form-group input-group-prepend">
                    <button class="btn btn-outline-danger btnMenos">-</button>
              <input type="number" disabled class="form-control cantidad" id="precioProductoN" value="1" style="width: 90px;">
                  <button class="btn btn-outline-success btnMas" style="heigth: 50rem;">+</button>
          </div>
  
          <div class="alert-precio"></div>
          
          <h3 class="ml-5 totalProducto">Total $ <span> </span></h3>
      </div>`;


        }



        $(".CuerpoModal").append(cuerpoModalAgregar);

        let cantidad = $(".cantidad").val();
        let total = numeral(cantidad * productos.PRECIO_PRO).format("0.000");
        const totalEtiqueta = document.querySelector(".totalProducto span");
        totalEtiqueta.textContent = `${total}`;
      }
    });
  });

  const btnAgregarCarro = document.querySelector(".agregar");
  btnAgregarCarro.addEventListener("click", function () {
    agregaralCarro(respuesta);
  });
}

function crearTarjetasProductos(respuesta) {
  respuesta.forEach((registro) => {
    //TARJETAS DE PRODUCTOS
    let cuerpo = '';
      if(registro.IMG_UNO == ""){

        cuerpo = `<div class="col-md-3 col-9 mt-5">
      <div class="card card-blog">
          <div class="card-image"  data-toggle="modal" data-target="#descripcionProducto" idPro = "${registro.id}">
            <img  src="Vistas/mg/default.png"  class="img imagen-tarjeta" >
                 
              
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


      }else{
        cuerpo = `<div class="col-md-3 col-9 mt-5">
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


      }
    
    $(".cuerpo").append(cuerpo);
  });
}

let idProductoSeleccionado = "";
let cantidaStock = "";
let cantidadAgregando = "";

function agregaralCarro(e) {
  $("#agregarProducto").modal("hide");
  idProductoSeleccionado = document
    .querySelector("h5")
    .getAttribute("idProducto");
  const pro = e.filter((producto) => producto.id === idProductoSeleccionado);
  cantidadAgregando = document.querySelector(".cantidad").value;

  
  let lista = pro.map((res) => {
    if (Number.parseInt(res.STOCK_PRO) < Number.parseInt(cantidadAgregando)) {
      swal("Lo sentimos", "Stock Insuficiente", "error");
      return;
    }

    let subtotal = 0;

    if (
      Number.parseInt(cantidadAgregando) >
      Number.parseInt(res.CANTIDAD_POR_MAYOR)
    ) {
      subtotal = numeral(cantidadAgregando * res.PRECIO_POR_MAYOR).format(
        "0.000"
      );
    } else {
      subtotal = numeral(cantidadAgregando * res.PRECIO_PRO).format("0.000");
    }

    cantidaStock = res.STOCK_PRO;

    let listado = {
      imagen: res.IMG_UNO,
      nombre: res.NOMBRE_PRO,
      cantidad: cantidadAgregando,
      subTotal: subtotal,
      talla: res.TALLA,
      precioU: res.PRECIO_PRO,
      id: res.id,
      precioM: res.PRECIO_POR_MAYOR,
      cantidadM: res.CANTIDAD_POR_MAYOR,
    };
    return listado;
  });

  let resultado = validarStockalAgregar();

  if (resultado == false) {
    swal(
      "Error",
      "La cantidad que intenta agregar supera el limite de stock del producto, revise su carrito para verificar la cantidad de los productos",
      "error"
    );

    return;
  }


  const Productos = lista.find((pro) => pro.id == idProductoSeleccionado);

  const existentes = carritoCompras.some(
    (producto) => producto.id === Productos.id
  );

  if (existentes) {
    carritoCompras.map((producto) => {
      if (producto.id === Productos.id) {

        producto.cantidad = Number.parseInt(producto.cantidad) + Number.parseInt(document.querySelector(".cantidad").value);

        if(producto.cantidadM == "" || producto.cantidadM == null){

          producto.subTotal = numeral(producto.cantidad * producto.precioU).format("0.000");
          return;
        }

        if ( Number.parseInt(producto.cantidad)< Number.parseInt(producto.cantidadM) ) {
          producto.subTotal = numeral(producto.cantidad * producto.precioU).format("0.000");
          
        } else {
          producto.subTotal = numeral(producto.cantidad * producto.precioM).format("0.000");
    
        }
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
        <img src="admin/${producto.imagen}" class="img-fluid imagenUno" alt="" width="50px">
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
}

function calcularTotal() {
  const etiquetaTotal = document.querySelector(".totalaPagar h4 strong");

  var totalPagar = 0;

  $("#tablaCarrito tbody")
    .find("tr")
    .each(function (i, el) {
      totalPagar += parseFloat($(this).find("td").eq(4).text());
    });

  etiquetaTotal.textContent = numeral(totalPagar).format("0.000");
}

$(".contenedor").on("click", ".BorrarProductoCarrito", function (e) {
  const productoId = e.target.getAttribute("idP");

  carritoCompras = carritoCompras.filter(
    (producto) => producto.id !== productoId
  );
  agregaralcarrito();
});

function sincronizarconStorage() {
  localStorage.setItem("carrito", JSON.stringify(carritoCompras));
}

function sumarRestarbtn() {
  $(".CuerpoModal").on("click", ".btnMenos", function () {
    let valor = document.querySelector(".cantidad").value;
    let can = Number.parseInt(valor) - 1;
    if (can < 1) {return;}
    document.querySelector(".cantidad").value = can;

    let cantidadMayor = document.querySelector(".xmayor").textContent;
    if (Number.parseInt(can) < Number.parseInt(cantidadMayor)) {
      const divAlert = document.querySelector(".alert-precio");
      $(".alert-precio").empty();
      const divMessage = document.createElement("div");
      divMessage.classList.add("alert", "alert-primary");
      divMessage.textContent = `Precio normal seleccionado`;
      divAlert.append(divMessage);
      const precioUni = document.querySelector("h6 span").textContent;
     
      let total = numeral(can * precioUni).format("0.000");
      const totalEtiqueta = document.querySelector(".totalProducto span");
      totalEtiqueta.textContent = `${total}`;
    }else if (Number.parseInt(can) > Number.parseInt(cantidadMayor) || Number.parseInt(can) == Number.parseInt(cantidadMayor) ){

      const divAlert = document.querySelector(".alert-precio");
      $(".alert-precio").empty();
      const divMessage = document.createElement("div");
      divMessage.classList.add("alert", "alert-success");
      divMessage.textContent = `Precio por mayor seleccionado`;
      divAlert.append(divMessage);

      const precioXmayor = document.querySelector(".precioXmayor").textContent;
      let total = numeral(can * precioXmayor).format("0.000");
      const totalEtiqueta = document.querySelector(".totalProducto span");
      totalEtiqueta.textContent = `${total}`;

    }else{

      $(".alert-precio").empty();
      const precioUni = document.querySelector("h6 span").textContent;
      let total = numeral(can * precioUni).format("0.000");
      const totalEtiqueta = document.querySelector(".totalProducto span");
      totalEtiqueta.textContent = `${total}`;

    }
  });

  $(".CuerpoModal").on("click", ".btnMas", function () {
    let valor = document.querySelector(".cantidad").value;
    let can = Number.parseInt(valor) + 1;
    const stock = document.querySelector(".stock").textContent;
    if (Number.parseInt(stock) < can) { return; }
    document.querySelector(".cantidad").value = can;
    let cantidadMayor = document.querySelector(".xmayor").textContent;
  

    if (Number.parseInt(can) == Number.parseInt(cantidadMayor) || Number.parseInt(can) > Number.parseInt(cantidadMayor)) {
      const divAlert = document.querySelector(".alert-precio");
      $(".alert-precio").empty();
      const divMessage = document.createElement("div");
      divMessage.classList.add("alert", "alert-success");
      divMessage.textContent = `Precio por mayor seleccionado`;
      divAlert.append(divMessage);

      const precioXmayor = document.querySelector(".precioXmayor").textContent;
      let total = numeral(can * precioXmayor).format("0.000");
      const totalEtiqueta = document.querySelector(".totalProducto span");
      totalEtiqueta.textContent = `${total}`;
    } else {
      $(".alert-precio").empty();
      const precioUni = document.querySelector("h6 span").textContent;
      let total = numeral(can * precioUni).format("0.000");
      const totalEtiqueta = document.querySelector(".totalProducto span");
      totalEtiqueta.textContent = `${total}`;
    }
  });
}

function BusquedaProductos() {
  $.ajax({
    url: "admin/Ajax/productosA.php",
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

function validarStockalAgregar() {
  if (carritoCompras.length == 0) {
    return true;
  }

  let encontrados = 0;

  for (let i = 0; i < carritoCompras.length; i++) {
    if (carritoCompras[i].id == idProductoSeleccionado) {
      let total =
        Number.parseInt(cantidadAgregando) +
        Number.parseInt(carritoCompras[i].cantidad);

      encontrados++;
     
      if (Number.parseInt(cantidaStock) < total) {
        return false;
      } else {
        return true;
      }
    }
  }



  if (encontrados == 0) {
    return true;
  }
}
