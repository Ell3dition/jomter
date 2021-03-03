<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            PRODUCTOS DESACTIVADOS
        </h1>

    </section>

    <!-- Main content -->
    <section class="content">

        <!-- Default box -->
        <div class="box">
            <div class="box-header with-border">

                <!---aqui Van los select por si aplicas filtro para la busqueda-->

                <div class="container">
                    <div class="row my-3 justify-content-center">



                        <div class="col-md-4">
                            <form form method="post" role="form" enctype="multipart/form-data">
                                <div class="form-group">
                                    <div class="input-group">
                                        <select class="custom-select" name="selectCategproaBUscar" id="selectCategproaBUscar">
                                            <option value="0">Seleccione Categoría</option>
                                            <option value="Belleza">Belleza</option>
                                            <option value="Vestuario">Vestuario y Hogar</option>
                                            <option value="Tecnología">Tecnología</option>
                                            <option value="Jugueteria">Jugueteria</option>
                                            <option value="Iluminación">Iluminación</option>
                                        </select>
                                    </div>
                                </div>
                        </div>


                        <div class="col-md-4">
                            <div class="input-group mb-3">

                                <button class="btn btn-outline-primary" type="submit" id="buscarPro">Buscar</button>
                                <button class="btn btn-outline-warning mx-2" type="submit" id="buscarPro">Mostrar Todo</button>
                            </div>
                        </div>

                        <?php
                        $item = null;

                        $verP = ProductosC::VerProductosDESC($item);

                        ?>


                        </form>
                    </div>
                </div>



            </div>


            <div class="box-body table-responsive">

                <!--EL CUERPO DEL PROYECTO TABLAS Y COSAS RARAS--->

                <table class="table table-bordered table-hover" id="tablaRegistros">


                    <thead class="thead-dark">

                        <tr>
                            <th>N°</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Imágenes</th>
                            <th>Categoría</th>
                            <th>Talla</th>
                            <th>Descripción</th>
                            <th>Activar</th>


                        </tr>

                    </thead>

                    <tbody>
                        <?php
                        $verP = ProductosC::VerProductosDESC($item);
                        foreach ($verP as $key => $value) {

                            echo '
    
    <tr>

    <td>' . ($key + 1) . '</td>

    <td>' . $value["NOMBRE_PRO"] . '</td>


    <td>' . $value["PRECIO_PRO"] . '</td>

    <td>' . $value["STOCK_PRO"] . '</td>

    <td>
        <img src="' . $value["IMG_UNO"] . '"  imgUno = "' . $value["IMG_UNO"] . '" 
        imgDos = "' . $value["IMG_DOS"] . '" imgTres = "' . $value["IMG_TRES"] . '" imgCuatro = "' . $value["IMG_CUATRO"] . '" class="img-fluid imagenUno" alt="" width="50px">
        <img src="' . $value["IMG_DOS"] . '" class="img-fluid" alt="" width="50px">
        <img src="' . $value["IMG_TRES"] . '" class="img-fluid" alt="" width="50px">
        <img src="' . $value["IMG_CUATRO"] . '" class="img-fluid" alt="" width="50px">

    </td>

    <td>' . $value["CATEGORIA_PRO"] . '</td>
    <td>' . $value["TALLA"] . '</td>
    <td>' . $value["DESCRIPCION"] . '</td>
    <td>

        <div class="btn-group">

           
            <button class="btn btn-success ActivarProducto" pId= "' . $value["id"] . '"><i class="fas fa-check"></i></button>

        </div>
    </td>
</tr>

    ';
                        }
                        ?>

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


<div class="modal fade" id="imagenUno" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Imagenes</h5>
            </div>
            <div class="modal-body">

                <div class="container">

                    <div class="row justify-content-center">

                        <div class="col-md-5"><img src="Vistas/img/foco.jpg" class="img-fluid Uno" alt="" width="300px"></div>
                        <div class="col-md-5"><img src="Vistas/img/defecto.png" class="img-fluid Dos" alt="" width="300px"></div>
                        <div class="col-md-5"><img src="Vistas/img/defecto.png" class="img-fluid Tres" alt="" width="300px"></div>
                        <div class="col-md-5"><img src="Vistas/img/defecto.png" class="img-fluid Cuatro" alt="" width="300px"></div>
                    </div>

                </div>

            </div>
            <div class="modal-footer">

            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="modalActivarpro" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content confirmacion">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Confirmación</h5>
            </div>
            <div class="modal-body">

                <div class="container">

                    <div class="row justify-content-center">

                        <p><strong>¿Desea Activar el producto?</strong> </p>

                    </div>

                </div>

            </div>
            <div class="modal-footer">

                <button class="btn btn-success btnActivar">Activar</button>
                <button class="btn btn-danger" data-dismiss="modal"> Cancelar</button>

            </div>
        </div>
    </div>
</div>