<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">

    <div class="container">

      <div class="row justify-content-center">

        <div class="col-md-5 text-center">

          <h4>VENTAS</h4>

        </div>

      </div>

    </div>

  </section>

  <!-- Main content -->
  <section class="content">

    <!-- Default box -->
    <div class="box">
      <div class="box-header with-border">

        <!---aqui Van los select por si aplicas filtro para la busqueda-->

        <div class="container">
                    <div class="row mt-2">

                        <div class="col-md-4">
                            <div class="form-group ">                          
                                <select class="custom-select"  id="selectBuscarVenta">
                                    <option value="0">Seleccione Una opción</option>
                                    <option value="PENDIENTE">Ventas Pendientes</option>
                                    <option value="REALIZADA">Ventas Realizadas</option>
                                    <option value="ANULADA">Ventas Anuladas</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-1 ">
                            <div class="form-group">
                                <button id="btnBuscar" class="btn btn-outline-primary">Buscar</button>
                            </div>
                        </div>
                        <div class="col-md-3 mx-3">
                            <div class="form-group ">
                                <button  id="btnTodo" class="btn btn-outline-warning">Mostrar Todo</button>
                            </div>
                        </div>

                    </div>
                </div>





      </div>


      <div class="box-body table-responsive">

        <!--EL CUERPO DEL PROYECTO TABLAS Y COSAS RARAS--->

        <table class="table table-bordered table-hover" id="registros" >
          <thead class="thead-dark">
            <th>N° Venta</th>
            <th>Total Venta</th>
            <th>Nombre Cliente</th>
            <th>Contácto</th>
            <th>Estado</th>
            <th>Actualizar Venta</th>
          </thead>
          <tbody id="tablaVentas">
          </tbody>
        </table>





      </div>
      <!-- /.box-body -->


    </div>
    <!-- /.box -->

  </section>
  <!-- /.content -->
</div>


<!--por si haces MODAL AQUI PARA ABAJO--->