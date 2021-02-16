<?php

class UsuariosC
{

    //INGRESAR USUARIOS
    public function IngresoUsuariosC()
    {



        if (isset($_POST["usuario-Ing"])) {


            if (preg_match('/^[a-zA-Z0-9]+$/', $_POST["usuario-Ing"]) && (preg_match('/^[a-zA-Z0-9]+$/', $_POST["clave-Ing"]))) {


                $datosC = array("usuario" => $_POST["usuario-Ing"], "pass" => $_POST["clave-Ing"]);

                $tablaBD = "usuarios";


                $respuesta = UsuariosM::IngresoUsuariosM($datosC, $tablaBD);



                if ($respuesta["nombre_usuario"] == $_POST["usuario-Ing"] && $respuesta["pass"] == $_POST["clave-Ing"]) {

                        $_SESSION["Ingreso"] = true;
                        $_SESSION["id"] = $respuesta["id"];
                        $_SESSION["usuario"] = $respuesta["nombre_usuario"];
                        $_SESSION["pass"] = $respuesta["pass"];
                        $_SESSION["foto"] = $respuesta["foto"];
                        $_SESSION["rol"] = $respuesta["rol"];

                        $nombre = $_SESSION["usuario"];
                        $id = $respuesta["id"];

                    echo '<script>
                                

                        window.location = "inicio";
                       
                        window.alert("Estoy aqui pero sin session '.$nombre.' id es :'.$id.'");

                        </script>';
                } else {


                    echo '<script>
                                
                            window.alert("USUARIO O CONTRASEÑA INCORRECTA");
                                

                        </script>';
                }
            }
        }
    }



    //VER USUARIO

    public function VerUsuarioC()
    {

        $tablaBD = "usuarios";

        $respuesta = UsuariosM::VerUsuarioM($tablaBD);

        foreach ($respuesta as $key => $value) {

            echo '<tr>

                <td>' . ($key + 1) . '</td>
                <td>' . $value["usuario"] . '</td>
                <td>' . $value["pass"] . '</td>';

            if ($value["foto"] != "") {

                echo '<td>
                
                    <img src="' . $value["foto"] . '" class="user-image" alt="User Image" width="40px;">
                    
                    
                    </td>';
            } else {

                echo '<td>
                    
                    <img src="Vistas/img/usuarios/defecto.png" class="user-image" alt="User Image" width="40px";>
                    
                    </td>';
            }



            echo '<td>' . $value["rol"] . '</td>

                <td>
                
                <div class="btn-group">
                
                <button class="btn btn-success EditarU" Uid="' . $value["id"] . '">
                <i class="fa fa-pencil" data-toggle="modal" data-target="#EditarU"></i></button>

                <button class="btn btn-danger BorrarU" Uid="' . $value["id"] . '"  Ufoto="' . $value["foto"] . '">
                <i class="fa fa-times"></i></button>
                
                </div>
                
                
                </td>
                
                </tr>';
        }
    }


    //crear usuarios

    public function  CrearUsuariosC()
    {


        if (isset($_POST["usuarioN"])) {

            $rutaImg = "";

            if (isset($_FILES["fotoN"]["tmp_name"]) && !empty($_FILES["fotoN"]["tmp_name"])) {

                if ($_FILES["fotoN"]["type"] == "image/jpeg") {

                    $nombre = mt_rand(10, 999);
                    $rutaImg = "Vistas/img/usuarios/U" . $nombre . ".jpg";
                    $foto = imagecreatefromjpeg($_FILES["fotoN"]["tmp_name"]);
                    imagejpeg($foto, $rutaImg);
                } else if ($_FILES["fotoN"]["type"] == "image/png") {

                    $nombre = mt_rand(10, 999);
                    $rutaImg = "Vistas/img/usuarios/U" . $nombre . ".png";
                    $foto = imagecreatefrompng($_FILES["fotoN"]["tmp_name"]);
                    imagepng($foto, $rutaImg);
                }
            }


            $tablaBD = "usuarios";

            $datosC = array("usuario" => $_POST["usuarioN"], "pass" => $_POST["claveN"], "rol" => $_POST["rolN"], "foto" => $rutaImg);


            $respuesta = UsuariosM::CrearUsuariosM($tablaBD, $datosC);


            if ($respuesta == true) {



                echo '<script>
            
            window.location = "usuarios";
                    

            </script>';
            } else {


                echo '<script>
                    
                window.alert("ERROR AL CREAR USUARIO VUELVA A INTENTAR PORfAVOR");
                    

            </script>';
            }
        }
    }




    public function BorrarUsuariosC()
    {


        if (isset($_GET["Uid"])) {

            $tablaBD = "usuarios";
            $datosC = $_GET["Uid"];

            if ($_GET["Ufoto"] != "") {

                unlink($_GET["Ufoto"]);
            }

            $respuesta = UsuariosM::BorrarUsuariosM($tablaBD, $datosC);

            if ($respuesta == true) {



                echo '<script>
            
            window.location = "usuarios";
                    

            </script>';
            } else {


                echo '<script>
                    
                window.alert("ERROR AL ELIMINAR USUARIO VUELVA A INTENTAR PORfAVOR");
                    

            </script>';
            }
        }
    }



    // LAMAR DATOS PARA EDITAR

    static public function EUsuariosC($item, $valor)
    {


        $tablaBD = "usuarios";

        $respuesta = UsuariosM::EUsuariosM($tablaBD, $item, $valor);

        return $respuesta;
    }




    //ver perfil del usuario

    public function VerPerfilC()
    {


        $tablaBD = "usuarios";

        $id = $_SESSION["id"];

        $respuesta = UsuariosM::VerPerfilM($tablaBD, $id);


        echo '<tr>

        <td>' . $respuesta["usuario"] . '</td>
        <td>' . $respuesta["pass"] . '</td>';

        if ($respuesta["foto"] != "") {

            echo '<td>
        
            <img src="' . $respuesta["foto"] . '" class="user-image" alt="User Image" width="40px;">
            
            
            </td>';
        } else {

            echo '<td>
            
            <img src="Vistas/img/usuarios/defecto.png" class="user-image" alt="User Image" width="40px";>
            
            </td>';
        }



        echo '

        <td>
        
        <div class="btn-group">
        
        <button class="btn btn-success EditarU" Uid="' . $respuesta["id"] . '">
        <i class="fa fa-pencil" data-toggle="modal" data-target="#EditarU"></i></button>

        
        </div>
        
        
        </td>
        
        </tr>';
    }
}
