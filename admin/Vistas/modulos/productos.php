<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            MANTENEDOR PRODUCTOS
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
                                <button id="CrearProducto" class="btn btn-outline-success" data-toggle="modal" data-target="#crearProducto">Crear Productos</button>
                            </div>
                        </div>

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

                        $verP = ProductosC::VerProductosC($item);

                        ?>


                        </form>
                    </div>
                </div>



            </div>


            <div class="box-body">

                <!--EL CUERPO DEL PROYECTO TABLAS Y COSAS RARAS--->

                <table class="table table-bordered table-hover" id="tablaRegistros">


                    <thead class="thead-dark">

                        <tr>
                            <th>N°</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Imágenes</th>
                            <th>Categoria</th>
                            <th>Talla</th>
                            <th>Editar / Eliminar</th>


                        </tr>

                    </thead>

                    <tbody>

                        <?php



                        $verP = ProductosC::VerProductosC($item);

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
                                    <label for="precioProductoN">Precio </label>
                                    <input type="text" class="form-control input-lg" name="precioProductoN" id="precioProductoN">
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="stockProductoN">Stock </label>
                                    <input type="number" class="form-control input-lg" name="stockProductoN" id="stockProductoN">
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">

                                    <label for="categoriaProductoN">Categoría </label>
                                    <select class="custom-select" name="categoriaProductoN" id="categoriaProductoN">
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
                                    <label for="tallaProductoN">Talla </label>
                                    <input type="text" class="form-control input-lg" name="tallaProductoN" id="tallaProductoN">
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="img1N">Imagen Uno </label>
                                    <input type="file" class="form-control input-lg" name="img1N" id="img1N">
                                </div>

                                <div class="form-group">
                                    <label for="img2N">Imagen Dos </label>
                                    <input type="file" class="form-control input-lg" name="img2N" id="img2N">
                                </div>

                                <div class="form-group">
                                    <label for="img3N">Imagen Tres </label>
                                    <input type="file" class="form-control input-lg" name="img3N" id="img3N">
                                </div>

                                <div class="form-group">
                                    <label for="img4N">Imagen Cuatro </label>
                                    <input type="file" class="form-control input-lg" name="img4N" id="img4N">
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