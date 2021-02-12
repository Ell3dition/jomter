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
                                <button id="CrearProucto" class="btn btn-outline-success" data-toggle="modal" data-target="#crearProducto">Crear Productos</button>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <div class="input-group">
                                    <select class="custom-select" name="selectProfesorRecursosN" id="selectProfesorRecursosN">
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
                                <input type="text" class="form-control" placeholder="Ingrese parametro para búsqueda" aria-label="Ingrese parametro para búsqueda" aria-describedby="buscarPro">
                                <button class="btn btn-outline-primary" type="button" id="buscarPro">Buscar</button>
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

                        <tr>

                            <td>1</td>

                            <td>FOCO SOLAR CON CONTROL REMOTO 30 WATT</td>


                            <td>12000</td>

                            <td>4</td>

                            <td>
                                <img src="Vistas/img/foco.jpg" class="img-fluid imagenUno" alt="" width="50px">
                                <img src="Vistas/img/defecto.png" class="img-fluid" alt="" width="50px">
                                <img src="Vistas/img/defecto.png" class="img-fluid" alt="" width="50px">
                                <img src="Vistas/img/defecto.png" class="img-fluid" alt="" width="50px">

                            </td>


                            <td>Tecno</td>
                            <td></td>
                            <td>

                                <div class="btn-group">

                                    <button class="btn btn-success EditarSlide" data-toggle="modal" data-target="#editarProducto"><i class="fa fa-pencil-alt"></i></button>
                                    <button class="btn btn-danger BorrarSlide"><i class="fa fa-times"></i></button>

                                </div>

                            </td>
                        </tr>

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

                        <div class="col-md-5"><img src="Vistas/img/foco.jpg" class="img-fluid" alt="" width="300px"></div>
                        <div class="col-md-5"><img src="Vistas/img/defecto.png" class="img-fluid" alt="" width="300px"></div>
                        <div class="col-md-5"><img src="Vistas/img/defecto.png" class="img-fluid" alt="" width="300px"></div>
                        <div class="col-md-5"><img src="Vistas/img/defecto.png" class="img-fluid" alt="" width="300px"></div>
                    </div>

                </div>

            </div>
            <div class="modal-footer">

            </div>
        </div>
    </div>
</div>



<!--MODAL CREAR -->
<div class="modal fade" id="crearProducto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">

                <div class="container mt-5">
                    <form action="" id="FormularioGuardarRecurso" method="POST">
                        <div class="row justify-content-center">

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="nombreProductoN">Nombre </label>
                                    <input type="text" class="form-control input-lg" id="nombreProductoN">
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="precioProductoN">Precio </label>
                                    <input type="text" class="form-control input-lg" id="precioProductoN">
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="precioProductoN">Stock </label>
                                    <input type="number" class="form-control input-lg" id="precioProductoN">
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="precioProductoN">Imagen Uno </label>
                                    <input type="file" class="form-control input-lg" id="precioProductoN">
                                </div>

                                <div class="form-group">
                                    <label for="precioProductoN">Imagen Dos </label>
                                    <input type="file" class="form-control input-lg" id="precioProductoN">
                                </div>

                                <div class="form-group">
                                    <label for="precioProductoN">Imagen Tres </label>
                                    <input type="file" class="form-control input-lg" id="precioProductoN">
                                </div>

                                <div class="form-group">
                                    <label for="precioProductoN">Imagen Cuatro </label>
                                    <input type="file" class="form-control input-lg" id="precioProductoN">
                                </div>
                            </div>
                        </div>

                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                <button type="submit" class="btn btn-success">Guardar</button>

            </div>


            </form>
        </div>
    </div>
</div>



<!--MODAL EDITAR -->
<div class="modal fade" id="editarProducto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">


                <div class="container mt-5">
                    <form action="" id="FormularioGuardarRecurso" method="POST">
                        <div class="row justify-content-center">

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="nombreProductoN">Nombre </label>
                                    <input type="text" class="form-control input-lg" id="nombreProductoN">
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="precioProductoN">Precio </label>
                                    <input type="text" class="form-control input-lg" id="precioProductoN">
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="precioProductoN">Stock </label>
                                    <input type="number" class="form-control input-lg" id="precioProductoN">
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="precioProductoN">Imagen Uno </label>
                                    <input type="file" class="form-control input-lg" id="precioProductoN">

                                    <input type="text" id="idProducto">
                                    <input type="text" id="imagenUnoAntes">
                                    <input type="text" id="imagenDosAntes">
                                    <input type="text" id="imagenTresAntes">
                                    <input type="text" id="imagenCuatroAntes">
                                </div>

                                <div class="form-group">
                                    <label for="precioProductoN">Imagen Dos </label>
                                    <input type="file" class="form-control input-lg" id="precioProductoN">
                                </div>

                                <div class="form-group">
                                    <label for="precioProductoN">Imagen Tres </label>
                                    <input type="file" class="form-control input-lg" id="precioProductoN">
                                </div>

                                <div class="form-group">
                                    <label for="precioProductoN">Imagen Cuatro </label>
                                    <input type="file" class="form-control input-lg" id="precioProductoN">
                                </div>
                            </div>
                        </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                <button type="submit" class="btn btn-success">Guardar</button>

            </div>

            </form>
        </div>
    </div>
</div>