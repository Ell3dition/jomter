<?php

class ProductosC
{

    //Crear Propiedad

    public function  CrearProductoC()
    {


        if (isset($_POST["nombreProductoN"])) {

            //IMAGEN ADICIONAL UNO
            $rutaImgUNO = "";

            if (isset($_FILES["img1N"]["tmp_name"]) && !empty(($_FILES["img1N"]["tmp_name"]))) {


                if (($_FILES["img1N"]["type"] == "image/jpeg")) {

                    $nombre = mt_rand(10, 999);

                    $rutaImgUNO = "Vistas/img/productos/P" . $nombre . ".jpg";

                    $imagen = imagecreatefromjpeg($_FILES["img1N"]["tmp_name"]);

                    imagejpeg($imagen, $rutaImgUNO);
                }


                if (($_FILES["img1N"]["type"] == "image/png")) {

                    $nombre = mt_rand(10, 999);

                    $rutaImgUNO = "Vistas/img/productos/P" . $nombre . ".png";

                    $imagen = imagecreatefrompng($_FILES["img1N"]["tmp_name"]);

                    imagepng($imagen, $rutaImgUNO);
                }
            }

            //IMAGEN ADICIONAL DOS
            $rutaImgDOS = "";

            if (isset($_FILES["img2N"]["tmp_name"]) && !empty(($_FILES["img2N"]["tmp_name"]))) {


                if (($_FILES["img2N"]["type"] == "image/jpeg")) {

                    $nombre = mt_rand(10, 999);

                    $rutaImgDOS = "Vistas/img/productos/P" . $nombre . ".jpg";

                    $imagen = imagecreatefromjpeg($_FILES["img2N"]["tmp_name"]);

                    imagejpeg($imagen, $rutaImgDOS);
                }


                if (($_FILES["img2N"]["type"] == "image/png")) {

                    $nombre = mt_rand(10, 999);

                    $rutaImgDOS = "Vistas/img/productos/P" . $nombre . ".png";

                    $imagen = imagecreatefrompng($_FILES["img2N"]["tmp_name"]);

                    imagepng($imagen, $rutaImgDOS);
                }
            }


            //IMAGEN ADICIONAL TRES
            $rutaImgTRES = "";

            if (isset($_FILES["img3N"]["tmp_name"]) && !empty(($_FILES["img3N"]["tmp_name"]))) {


                if (($_FILES["img3N"]["type"] == "image/jpeg")) {

                    $nombre = mt_rand(10, 999);

                    $rutaImgTRES = "Vistas/img/productos/P" . $nombre . ".jpg";

                    $imagen = imagecreatefromjpeg($_FILES["img3N"]["tmp_name"]);

                    imagejpeg($imagen, $rutaImgTRES);
                }


                if (($_FILES["img3N"]["type"] == "image/png")) {

                    $nombre = mt_rand(10, 999);

                    $rutaImgTRES = "Vistas/img/productos/P" . $nombre . ".png";

                    $imagen = imagecreatefrompng($_FILES["img3N"]["tmp_name"]);

                    imagepng($imagen, $rutaImgTRES);
                }
            }

            //IMAGEN ADICIONAL CUATRO
            $rutaImgCUATRO = "";

            if (isset($_FILES["img4N"]["tmp_name"]) && !empty(($_FILES["img4N"]["tmp_name"]))) {


                if (($_FILES["img4N"]["type"] == "image/jpeg")) {

                    $nombre = mt_rand(10, 999);

                    $rutaImgCUATRO = "Vistas/img/productos/P" . $nombre . ".jpg";

                    $imagen = imagecreatefromjpeg($_FILES["img4N"]["tmp_name"]);

                    imagejpeg($imagen, $rutaImgCUATRO);
                }


                if (($_FILES["img4N"]["type"] == "image/png")) {

                    $nombre = mt_rand(10, 999);

                    $rutaImgCUATRO = "Vistas/img/productos/P" . $nombre . ".png";

                    $imagen = imagecreatefrompng($_FILES["img4N"]["tmp_name"]);

                    imagepng($imagen, $rutaImgCUATRO);
                }
            }


            $tablaBD = "productos";

            $datosC = array("imgUno" => $rutaImgUNO, "imgDos" => $rutaImgDOS, "imgTres" => $rutaImgTRES, "imgCuatro" => $rutaImgCUATRO, "nombre" => $_POST["nombreProductoN"], "precio" => $_POST["precioProductoN"], "stock" => $_POST["stockProductoN"], "categoria" => $_POST["categoriaProductoN"], "talla" => $_POST["tallaProductoN"]);

            $respuesta = ProductosM::CrearProductoM($tablaBD, $datosC);

            if ($respuesta == true) {


                echo '<script>
            
                window.location = "productos";
            
            </script>';
            } else {


                echo '<script>
                
            window.alert("ERROR AL CREAR EL PRODUCTO VUELVA A INTENTAR PORfAVOR");
                
    
        </script>';
            }
        }
    } //FIN CREAR



    //VER PROPIEDAD
    static public function VerProductosC($item)
    {

        if (!empty($_POST["selectCategproaBUscar"])) {

            $item = $_POST["selectCategproaBUscar"];
            $tablaBD = "productos";
            $valor = "Busqueda";
            $respuesta = ProductosM::VerProductoM($tablaBD, $item, $valor);
        } elseif ($item != null) {

            $valor = null;
            $tablaBD = "productos";
            $respuesta = ProductosM::VerProductoM($tablaBD, $item, $valor);
        } else {

            $item = null;
            $valor = null;
            $tablaBD = "productos";
            $respuesta = ProductosM::VerProductoM($tablaBD, $item, $valor);
        }

        return $respuesta;
    } //FIN VER PROPIEDAD






    //BORRAR PROPIEDAD
    static public function BorrarProductosC($datos)
    {

        foreach ($datos as $valor) {

            $idPro = $valor["idProducto"];
            $imgUno = $valor["imgUno"];
            $imgDos = $valor["imgDos"];
            $imgTres = $valor["imgTres"];
            $imgCuatro = $valor["imgCuatro"];

           
        }

     
            unlink($imgUno);
            unlink($imgDos);
            unlink($imgTres);
            unlink($imgCuatro);
        

        $tablaBD = "productos";
        $respuesta = ProductosM::BorrarProductosM($tablaBD, $idPro);
        if ($respuesta == true) {


            echo '<script>
        
            window.location = "propiedades";
        
        </script>';
        } else {


            echo '<script>
            
        window.alert("ERROR AL ELIMINAR");
            

    </script>';
        }

        return true;

        //FIN BORRAR PROPIEDAD


    }


    //ACTUALIZAR PROPIEDAD
    public function ActualizarProductoC()
    {

        if (isset($_POST["idProductoEd"])) {

            $rutaImgUNO = $_POST["imagenUnoActual"];


            if (isset($_FILES["img1Ed"]["tmp_name"]) && !empty(($_FILES["img1Ed"]["tmp_name"]))) {


                if (!empty($_POST["imagenUnoActual"])) {

                    unlink($_POST["imagenUnoActual"]);
                }

                if (($_FILES["img1Ed"]["type"] == "image/jpeg")) {

                    $nombre = mt_rand(10, 999);

                    $rutaImgUNO = "Vistas/img/productos/P" . $nombre . ".jpg";

                    $imagen = imagecreatefromjpeg($_FILES["img1Ed"]["tmp_name"]);

                    imagejpeg($imagen, $rutaImgUNO);
                }


                if (($_FILES["img1Ed"]["type"] == "image/png")) {

                    $nombre = mt_rand(10, 999);

                    $rutaImgUNO = "Vistas/img/productos/P" . $nombre . ".png";

                    $imagen = imagecreatefrompng($_FILES["img1Ed"]["tmp_name"]);

                    imagepng($imagen, $rutaImgUNO);
                }
            }

            //IMAGEN ADICIONAL DOS
            $rutaImgDOS = $_POST["imagenDosActual"];

            if (isset($_FILES["img2Ed"]["tmp_name"]) && !empty(($_FILES["img2Ed"]["tmp_name"]))) {

                if (!empty($_POST["imagenDosActual"])) {

                    unlink($_POST["imagenDosActual"]);
                }
                if (($_FILES["img2Ed"]["type"] == "image/jpeg")) {

                    $nombre = mt_rand(10, 999);

                    $rutaImgDOS = "Vistas/img/productos/P" . $nombre . ".jpg";

                    $imagen = imagecreatefromjpeg($_FILES["img2Ed"]["tmp_name"]);

                    imagejpeg($imagen, $rutaImgDOS);
                }


                if (($_FILES["img2Ed"]["type"] == "image/png")) {

                    $nombre = mt_rand(10, 999);

                    $rutaImgDOS = "Vistas/img/productos/P" . $nombre . ".png";

                    $imagen = imagecreatefrompng($_FILES["img2Ed"]["tmp_name"]);

                    imagepng($imagen, $rutaImgDOS);
                }
            }


            //IMAGEN ADICIONAL TRES
            $rutaImgTRES = $_POST["imagenTresActual"];

            if (isset($_FILES["img3Ed"]["tmp_name"]) && !empty(($_FILES["img3Ed"]["tmp_name"]))) {

                if (!empty($_POST["imagenTresActual"])) {

                    unlink($_POST["imagenTresActual"]);
                }

                if (($_FILES["img3Ed"]["type"] == "image/jpeg")) {

                    $nombre = mt_rand(10, 999);

                    $rutaImgTRES = "Vistas/img/productos/P" . $nombre . ".jpg";

                    $imagen = imagecreatefromjpeg($_FILES["img3Ed"]["tmp_name"]);

                    imagejpeg($imagen, $rutaImgTRES);
                }


                if (($_FILES["img3Ed"]["type"] == "image/png")) {

                    $nombre = mt_rand(10, 999);

                    $rutaImgTRES = "Vistas/img/productos/P" . $nombre . ".png";

                    $imagen = imagecreatefrompng($_FILES["img3Ed"]["tmp_name"]);

                    imagepng($imagen, $rutaImgTRES);
                }
            }

            //IMAGEN ADICIONAL CUATRO
            $rutaImgCUATRO = $_POST["imagenCuatroActual"];

            if (isset($_FILES["img4Ed"]["tmp_name"]) && !empty(($_FILES["img4Ed"]["tmp_name"]))) {

                if (!empty($_POST["imagenTresActual"])) {

                    unlink($_POST["imagenTresActual"]);
                }

                if (($_FILES["img4Ed"]["type"] == "image/jpeg")) {

                    $nombre = mt_rand(10, 999);

                    $rutaImgCUATRO = "Vistas/img/productos/P" . $nombre . ".jpg";

                    $imagen = imagecreatefromjpeg($_FILES["img4Ed"]["tmp_name"]);

                    imagejpeg($imagen, $rutaImgCUATRO);
                }


                if (($_FILES["img4Ed"]["type"] == "image/png")) {

                    $nombre = mt_rand(10, 999);

                    $rutaImgCUATRO = "Vistas/img/productos/P" . $nombre . ".png";

                    $imagen = imagecreatefrompng($_FILES["img4Ed"]["tmp_name"]);

                    imagepng($imagen, $rutaImgCUATRO);
                }
            }


            $tablaBD = "productos";
            $datosC = array("idPro" => $_POST["idProductoEd"], "imgUno" => $rutaImgUNO, "imgDos" => $rutaImgDOS, "imgTres" => $rutaImgTRES, "imgCuatro" => $rutaImgCUATRO, "nombre" => $_POST["nombreProductoEd"], "precio" => $_POST["precioProductoEd"], "stock" => $_POST["stockProductoEd"], "categoria" => $_POST["categoriaProductoEd"], "talla" => $_POST["tallaProductoEd"]);
            $respuesta = ProductosM::ActualizarProductoM($tablaBD, $datosC);
            if ($respuesta == true) {
                echo '<script>
               window.location = "productos";
           </script>';
            } else {


                echo '<script>
                
            window.alert("ERROR AL ACTUALIZAR");
                

        </script>';
            }
        }
    }
}  //FIN CLASE
