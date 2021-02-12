<?php

class NoticiasC{


    public function CrearNoticiaC(){


   if (isset($_POST["tituloN"])){

            $rutaImg = "";

            if(isset($_FILES["imgN"]["tmp_name"])&& !empty (($_FILES["imgN"]["tmp_name"]))){


                if(($_FILES["imgN"]["type"] == "image/jpeg")){

                    $nombre = mt_rand(10,999);

                    $rutaImg = "Vistas/img/noticias/N".$nombre.".jpg";

                    $imagen = imagecreatefromjpeg($_FILES["imgN"]["tmp_name"]);

                    imagejpeg($imagen, $rutaImg);

                }


                if(($_FILES["imgN"]["type"] == "image/png")){

                    $nombre = mt_rand(10,999);

                    $rutaImg = "Vistas/img/noticias/N".$nombre.".png";

                    $imagen = imagecreatefrompng($_FILES["imgN"]["tmp_name"]);

                    imagepng($imagen, $rutaImg);

                }


            }


      

            $tablaBD = "noticias";

            $datosC = array("titulo"=>$_POST["tituloN"], "descripcion"=>$_POST["desN"],"orden"=>$_POST["ordN"], "imagen"=>$rutaImg);

            $respuesta = NoticiasM::CrearNoticiaM($tablaBD,$datosC);

            if($respuesta == true){


                echo '<script>
                
                    window.location = "noticias";
                
                </script>';


            }else{


                echo '<script>
                    
                window.alert("ERROR AL CREAR USUARIO VUELVA A INTENTAR PORfAVOR");
                    

            </script>';

            }



        }





    }



    // VER NOTICIAS


    static public function VerNoticiasC($item,$valor){



        $tablaBD = "noticias";

        $respuesta = NoticiasM::VerNoticiasM($tablaBD,$item,$valor);

        return $respuesta;

    



    }




    //Actualizar Noticia

    public function ActualizarNoticiaC(){

        if(isset($_POST["Nid"])){

            $rutaImg= $_POST["imagenActual"];
            
            if(isset($_FILES["imagenE"]["tmp_name"]) && !empty ($_FILES["imagenE"]["tmp_name"])){


                if(!empty($_POST["imagenActual"])){

                    unlink($_POST["imagenActual"]);

                }
                
                if(($_FILES["imagenE"]["type"] == "image/jpeg")){

                    $nombre = mt_rand(10,999);

                    $rutaImg = "Vistas/img/noticias/N".$nombre.".jpg";

                    $imagen = imagecreatefromjpeg($_FILES["imagenE"]["tmp_name"]);

                    imagejpeg($imagen, $rutaImg);

                }

                if(($_FILES["imagenE"]["type"] == "image/png")){

                    $nombre = mt_rand(10,999);

                    $rutaImg = "Vistas/img/noticias/N".$nombre.".png";

                    $imagen = imagecreatefrompng($_FILES["imagenE"]["tmp_name"]);

                    imagepng($imagen, $rutaImg);

                }



            }





            $tablaBD ="noticias";

            $datosC = array("id"=>$_POST["Nid"], "titulo" =>$_POST["tituloEd"], "descripcion"=> $_POST["desEd"], "orden"=>$_POST["ordenEd"], "imagen"=>$rutaImg);


            $respuesta = NoticiasM::ActualizarNoticiaM($tablaBD, $datosC);

            if($respuesta == true){


                echo '<script>
                
                    window.location = "noticias";
       
                    
                
                </script>';


            }else{


                echo '<script>
                    
                window.alert("ERROR AL ACTUALIZAR");
                    

            </script>';

            }

        }




    }



    //Borrar Noticia

        
    public function BorrarNoticiaC(){

        if(isset($_GET["Nid"])){

            $tablaBD = "noticias";
            $id = $_GET["Nid"];


            if($_GET["imgNoticia"] != ""){


                unlink($_GET["imgNoticia"]);

            }


            $respuesta = NoticiasM::BorrarNoticiaM($tablaBD, $id);



            if($respuesta == true){


                echo '<script>
                
                    window.location = "noticias";
                
                </script>';


            }else{


                echo '<script>
                    
                window.alert("ERROR AL ELIMINAR");
                    

            </script>';

            }

        }



    }



}