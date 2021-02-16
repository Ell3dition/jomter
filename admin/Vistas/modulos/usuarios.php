<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            MANTENEDOR USUARIOS
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
                        <div class="col-md-2">
                            <div class="input-group">
                                <button id="CrearProducto" class="btn btn-outline-success" data-toggle="modal" data-target="#crearProducto">Crear Usuario <i class="fas fa-user"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="box-body">

                <!--EL CUERPO DEL PROYECTO TABLAS Y COSAS RARAS--->

                <table class="table table-bordered table-hover" id="tablaRegistros">


                    <thead class="thead-dark">

                        <tr>
                            <th>N°</th>
                            <th>Foto</th>
                            <th>Nombre</th>
                            <th>Contraseña</th>
                            <th>Editar / Eliminar</th>
                        </tr>

                    </thead>

                    <tbody>

                        <?php

                        $item = null;

                        $verP = ProductosC::VerProductosC($item);

                        $verP = ProductosC::VerProductosC($item);

                        foreach ($verP as $key => $value) {

                            echo '
    
    <tr>
    <td>' . ($key + 1) . '</td>
    <td> <img src="' . $value["IMG_CUATRO"] . '" class="img-fluid" alt="" width="50px"></td>
    <td>' . $value["PRECIO_PRO"] . '</td>
    <td>' . $value["STOCK_PRO"] . '</td>
    <td>
       <div class="btn-group">
            <button class="btn btn-success EditarProducto" pId= "' . $value["id"] . '"  data-toggle="modal" data-target="#editarProducto"><i class="fa fa-pencil-alt"></i></button>
            <button class="btn btn-danger BorrarProducto" imgUno = "' . $value["IMG_UNO"] . '" 
            imgDos = "' . $value["IMG_DOS"] . '" imgTres = "' . $value["IMG_TRES"] . '" imgCuatro = "' . $value["IMG_CUATRO"] . '" pId= "' . $value["id"] . '"><i class="fa fa-times"></i></button>
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


<?php

$borrar = new ProductosC();
$borrar->BorrarProductosC();

?>


<!--MODAL CREAR -->
<div class="modal fade" role="dialog" id="crearProducto">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form form method="post" role="form" enctype="multipart/form-data">

                <div class="modal-body">
                    <div class="container mt-5">

                        <div class="row justify-content-center">

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="nombreProductoN">Nombre </label>
                                    <input type="text" class="form-control input-lg" name="nombreProductoN" id="nombreProductoN">
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="precioProductoN">Contraseña </label>
                                    <input type="text" class="form-control input-lg" name="precioProductoN" id="precioProductoN">
                                </div>
                            </div>


                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="img1N">Foto </label>
                                    <input type="file" class="form-control input-lg" name="img1N" id="img1N">
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-success">Guardar</button>

                </div>

                <?php

                $crearProducto = new ProductosC();
                $crearProducto->CrearProductoC();

                ?>

            </form>
        </div>
    </div>
</div>


<!-- modal editar  -->
<div class="modal fade" role="dialog" id="editarProducto">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form form method="post" role="form" enctype="multipart/form-data">

                <div class="modal-body">
                    <div class="container mt-5">

                        <div class="row justify-content-center">

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="nombreProductoEd">Nombre </label>
                                    <input type="text" class="form-control input-lg" name="nombreProductoEd" id="nombreProductoEd">
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="precioProductoEd">Precio </label>
                                    <input type="text" class="form-control input-lg" name="precioProductoEd" id="precioProductoEd">
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="stockProductoEd">Stock </label>
                                    <input type="number" class="form-control input-lg" name="stockProductoEd" id="stockProductoEd">
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">

                                    <label for="categoriaProductoEd">Categoría </label>
                                    <select class="custom-select" name="categoriaProductoEd" id="categoriaProductoEd">
                                        <option value="0">Seleccione Categoría</option>
                                        <option value="Belleza">Belleza</option>
                                        <option value="Vestuario">Vestuario y Hogar</option>
                                        <option value="Tecnología">Tecnología</option>
                                        <option value="Jugueteria">Jugueteria</option>
                                        <option value="Iluminación">Iluminación</option>
                                    </select>

                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="tallaProductoEd">Talla </label>
                                    <input type="text" class="form-control input-lg" name="tallaProductoEd" id="tallaProductoEd">
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="img1Ed">Imagen Uno </label>
                                    <input type="file" class="form-control input-lg" name="img1Ed" id="img1Ed">
                                    <img src="" class="img-fluid UnoEd" alt="" width="100px">
                                    <input type="hidden" class="form-control input-lg" name="imagenUnoActual" id="imagenUnoActual">
                                    <input type="hidden" class="form-control input-lg" name="idProductoEd" id="idProductoEd">
                                </div>

                                <div class="form-group">
                                    <label for="img2Ed">Imagen Dos </label>
                                    <input type="file" class="form-control input-lg" name="img2Ed" id="img2Ed">
                                    <img src="" class="img-fluid DosEd" alt="" width="100px">
                                    <input type="hidden" class="form-control input-lg" name="imagenDosActual" id="imagenDosActual">
                                </div>

                                <div class="form-group">
                                    <label for="img3Ed">Imagen Tres </label>
                                    <input type="file" class="form-control input-lg" name="img3Ed" id="img3Ed">
                                    <img src="" class="img-fluid TresEd" alt="" width="100px">
                                    <input type="hidden" class="form-control input-lg" name="imagenTresActual" id="imagenTresActual">
                                </div>

                                <div class="form-group">
                                    <label for="img4Ed">Imagen Cuatro </label>
                                    <input type="file" class="form-control input-lg" name="img4Ed" id="img4Ed">
                                    <img src="" class="img-fluid CuatroEd" alt="" width="100px">
                                    <input type="hidden" class="form-control input-lg" name="imagenCuatroActual" id="imagenCuatroActual">
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-success">Guardar</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>


                </div>

                <?php

                $actualizarProducto = new ProductosC();
                $actualizarProducto->ActualizarProductoC();

                ?>

            </form>
        </div>
    </div>
</div>