function validarDescripcion(descripcion, Pid) {
  descripcion.forEach((pro, i) => {
    let cuerpoModalDescripcion = "";
    if (pro.id == Pid) {
      if (pro.IMG_UNO == "") {
        cuerpoModalDescripcion = `<div class="col-md-6">
                <div id="imagenesProductos" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#imagenesProductos" data-slide-to="0" class="active"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="Vistas/mg/default.png" class="d-block w-100" style="width: 100%; height: 20rem;" >
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
      }  else if (
        pro.IMG_UNO != "" &&
        pro.IMG_DOS != "" &&
        pro.IMG_TRES != "" &&
        pro.IMG_CUATRO != ""
      ) {
        cuerpoModalDescripcion = `<div class="col-md-6">
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
      } else if (pro.IMG_UNO != "" && pro.IMG_DOS != "" && pro.IMG_TRES != "") {
        cuerpoModalDescripcion = `<div class="col-md-6">
                <div id="imagenesProductos" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#imagenesProductos" data-slide-to="0" class="active"></li>
                        <li data-target="#imagenesProductos" data-slide-to="1"></li>
                        <li data-target="#imagenesProductos" data-slide-to="2"></li>
                  
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
      } else if (pro.IMG_UNO != "" && pro.IMG_DOS != "") {
        cuerpoModalDescripcion = `<div class="col-md-6">
                <div id="imagenesProductos" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#imagenesProductos" data-slide-to="0" class="active"></li>
                        <li data-target="#imagenesProductos" data-slide-to="1"></li>
                       
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="admin/${pro.IMG_UNO}" class="d-block w-100" style="width: 100%; height: 20rem;" >
                        </div>
                        <div class="carousel-item">
                            <img src="admin/${pro.IMG_DOS}" class="d-block w-100" >
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
      }else if (pro.IMG_UNO != "") {
        cuerpoModalDescripcion = `<div class="col-md-6">
          <div id="imagenesProductos" class="carousel slide" data-ride="carousel">
              <ol class="carousel-indicators">
                  <li data-target="#imagenesProductos" data-slide-to="0" class="active"></li>
                  
              </ol>
              <div class="carousel-inner">
                  <div class="carousel-item active">
                      <img src="admin/${pro.IMG_UNO}" class="d-block w-100" style="width: 100%; height: 20rem;" >
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
      }
    
      $(".contenedorDescripcion").append(cuerpoModalDescripcion);
    }
  });
}















