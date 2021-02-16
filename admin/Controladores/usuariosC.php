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
                       
                        window.alert("Estoy aqui pero sin session ' . $nombre . ' id es :' . $id . '");

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

    static public function VerUsuarioC()
    {

        $tablaBD = "usuarios";

        $respuesta = UsuariosM::VerUsuarioM($tablaBD);

        return $respuesta;
    }


    //crear usuarios

    public function  CrearUsuariosC()
    {


        if (isset($_POST["nombreUsuarioN"])) {

            $rutaImg = "";

            if (isset($_FILES["imgUsuarioN"]["tmp_name"]) && !empty($_FILES["imgUsuarioN"]["tmp_name"])) {

                if ($_FILES["imgUsuarioN"]["type"] == "image/jpeg") {

                    $nombre = mt_rand(10, 999);
                    $rutaImg = "Vistas/img/usuarios/U" . $nombre . ".jpg";
                    $foto = imagecreatefromjpeg($_FILES["imgUsuarioN"]["tmp_name"]);
                    imagejpeg($foto, $rutaImg);
                } else if ($_FILES["imgUsuarioN"]["type"] == "image/png") {

                    $nombre = mt_rand(10, 999);
                    $rutaImg = "Vistas/img/usuarios/U" . $nombre . ".png";
                    $foto = imagecreatefrompng($_FILES["imgUsuarioN"]["tmp_name"]);
                    imagepng($foto, $rutaImg);
                }
            }


            $tablaBD = "usuarios";

            $datosC = array("usuario" => $_POST["nombreUsuarioN"], "pass" => $_POST["passUsuarioN"], "rol" => $_POST["rolUsuarioN"], "foto" => $rutaImg);


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






    public function ActualizarUsuariosC()
    {



        if (isset($_POST["idUsuarioEd"])) {

            $rutaImg = $_POST["imgActualEd"];


            if (isset($_FILES["imgUsuarioEd"]["tmp_name"]) && !empty(($_FILES["imgUsuarioEd"]["tmp_name"]))) {


                if (!empty($_POST["imgActualEd"])) {

                    unlink($_POST["imgActualEd"]);
                }

                if (($_FILES["imgUsuarioEd"]["type"] == "image/jpeg")) {

                    $nombre = mt_rand(10, 999);

                    $rutaImg = "Vistas/img/productos/P" . $nombre . ".jpg";

                    $imagen = imagecreatefromjpeg($_FILES["imgUsuarioEd"]["tmp_name"]);

                    imagejpeg($imagen, $rutaImg);
                }


                if (($_FILES["imgUsuarioEd"]["type"] == "image/png")) {

                    $nombre = mt_rand(10, 999);

                    $rutaImg = "Vistas/img/productos/P" . $nombre . ".png";

                    $imagen = imagecreatefrompng($_FILES["imgUsuarioEd"]["tmp_name"]);

                    imagepng($imagen, $rutaImg);
                }
            }



            $tablaBD = "usuarios";
            $datosC = array("id" => $_POST["idUsuarioEd"], "usuario" => $_POST["nombreUsuarioEd"], "pass" => $_POST["passUsuarioEd"], "rol" => $_POST["rolUsuarioEd"], "foto" => $rutaImg);
            $respuesta = UsuariosM::ActualizarUsuariosM($tablaBD, $datosC);
            if ($respuesta == true) {
                echo '<script>
               window.location = "usuarios";
           </script>';
            } else {


                echo '<script>
                
            window.alert("ERROR AL ACTUALIZAR");
                

        </script>';
            }
        }
    }
}
