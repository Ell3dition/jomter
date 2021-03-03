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
                                <button id="CrearProducto" class="btn btn-outline-success" data-toggle="modal" data-target="#CrearUsuario">Crear Usuario <i class="fas fa-user"></i></button>
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
                            <th>Rol</th>
                            <th>Editar / Eliminar</th>
                        </tr>

                    </thead>

                    <tbody>

                        <?php



                        $VerUsuario = UsuariosC::VerUsuarioC();

                        foreach ($VerUsuario as $key => $value) {

                            echo '<tr>

      <td>' . ($key + 1) . '</td>';

                            if ($value["foto"] != "") {

                                echo '<td>
          
              <img src="' . $value["foto"] . '" class="user-image" alt="User Image" width="100px;">
              
              
              </td>';
                            } else {

                                echo '<td>
              
              <img src="Vistas/img/defecto.png" class="user-image" alt="User Image" width="100px";>
              
              </td>';
                            }



                            echo '    <td>' . $value["nombre_usuario"] . '</td>
      <td>' . $value["pass"] . '</td>

      <td>' . $value["rol"] . '</td>

      <td>
      
      <div class="btn-group">
      
      <button class="btn btn-success EditarU" Uid="' . $value["id"] . '"  data-toggle="modal" data-target="#EditarUsuario">
      <i class="fa fa-pencil-alt"></i></button>

      <button class="btn btn-danger BorrarU" Uid="' . $value["id"] . '"  Ufoto="' . $value["foto"] . '">
      <i class="fa fa-times"></i></button>
      
      </div>
      
      
      </td>
      
      </tr>';
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

$borrar = new UsuariosC();
$borrar->BorrarUsuariosC();

?>


<!--MODAL CREAR -->
<div class="modal fade" role="dialog" id="CrearUsuario">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form form method="post" role="form" enctype="multipart/form-data">

                <div class="modal-body">
                    <div class="container mt-5">

                        <div class="row justify-content-center">

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="nombreUsuarioN">Nombre </label>
                                    <input type="text" class="form-control input-lg" name="nombreUsuarioN" id="nombreUsuarioN">
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="passUsuarioN">Contraseña </label>
                                    <input type="text" class="form-control input-lg" name="passUsuarioN" id="passUsuarioN">
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="rolUsuarioN">Rol </label>
                                    <select class="custom-select" name="rolUsuarioN" id="rolUsuarioN">
                                        <option value="0">Seleccione Rol</option>
                                        <option value="Administrador">Administrador</option>
                                        <option value="Vendedor">Vendedor</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="imgUsuarioN">Foto </label>
                                    <input type="file" class="form-control input-lg" name="imgUsuarioN" id="imgUsuarioN">
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

                $crearProducto = new UsuariosC();
                $crearProducto->CrearUsuariosC();

                ?>

            </form>
        </div>
    </div>
</div>


<!-- modal editar  -->
<div class="modal fade" role="dialog" id="EditarUsuario">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form form method="post" role="form" enctype="multipart/form-data">

                <div class="modal-body">
                    <div class="container mt-5">

                        <div class="row justify-content-center">

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="nombreUsuarioEd">Nombre </label>
                                    <input type="text" class="form-control input-lg" name="nombreUsuarioEd" id="nombreUsuarioEd">
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="passUsuarioEd">Contraseña </label>
                                    <input type="text" class="form-control input-lg" name="passUsuarioEd" id="passUsuarioEd">
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="rolUsuarioEd">Rol </label>
                                    <select class="custom-select" name="rolUsuarioEd" id="rolUsuarioEd">
                                        <option value="0">Seleccione Rol</option>
                                        <option value="Administrador">Administrador</option>
                                        <option value="Vendedor">Vendedor</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-10">
                                <div class="form-group">
                                    <label for="imgUsuarioEd">Foto </label>
                                    <input type="file" class="form-control input-lg" name="imgUsuarioEd" id="imgUsuarioEd">
                                    <img src="" class="img-fluid visor" alt="" width="150px">
                                    <input type="hidden" name="idUsuarioEd" id="idUsarioEd">
                                    <input type="hidden" name="imgActualEd" id="imgActualEd">
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

                $Actualizar = new UsuariosC();
                $Actualizar->ActualizarUsuariosC();

                ?>

            </form>
        </div>
    </div>
</div>