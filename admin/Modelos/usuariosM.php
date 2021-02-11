<?php

    require_once "conexionBD.php";

    // INGRESAR AL GESTOR

    class UsuariosM extends conexionBD{

        static public function IngresoUsuariosM($datosC, $tablaBD){

            $pdo = conexionBD::cBD()->prepare("SELECT * FROM $tablaBD WHERE usuario = :usuario");

            $pdo -> bindParam(":usuario", $datosC["usuario"], PDO::PARAM_STR);
            $pdo -> execute();
            return $pdo -> fetch();
            $pdo -> close();
        }



        // VER USUARIO

        static public function VerUsuarioM($tablaBD){   

            $pdo = conexionBD::cBD()->prepare("SELECT * FROM $tablaBD ");

            $pdo -> execute();
            return $pdo -> fetchAll();
            $pdo -> close();
    
        }



        //CREAR USUARIOS

        static public function CrearUsuariosM($tablaBD, $datosC){

            $pdo = conexionBD::cBD()->prepare("INSERT INTO $tablaBD (usuario,pass,rol,foto) VALUES (:usuario, :pass, :rol, :foto)");

            $pdo -> bindParam(":usuario", $datosC["usuario"], PDO::PARAM_STR);
            $pdo -> bindParam(":pass", $datosC["pass"], PDO::PARAM_STR);
            $pdo -> bindParam(":rol", $datosC["rol"], PDO::PARAM_STR);
            $pdo -> bindParam(":foto", $datosC["foto"], PDO::PARAM_STR);

            if($pdo->execute()){
                
                return true;

            }else{

                return false;

            }

            $pdo -> close();
        }


                //BORRAR USUARIOS

        static public function BorrarUsuariosM($tablaBD, $datosC){

            $pdo = conexionBD::cBD()->prepare("DELETE From $tablaBD WHERE id = :id");
            $pdo -> bindParam(":id", $datosC, PDO::PARAM_INT);

            if($pdo->execute()){
                
                return true;

            }else{

                return false;

            }

            $pdo -> close();

        }


    

                     //LAMAR DATOS PARA EDITAR

    static public function EUsuariosM($tablaBD,$item,$valor){

        if ($item != null ){

            $pdo = conexionBD::cBD()->prepare("SELECT * FROM $tablaBD WHERE $item = :$item");
            $pdo -> bindParam(":".$item,$valor, PDO::PARAM_STR);
            $pdo -> execute();
            return $pdo -> fetch();

        }else{

            $pdo = conexionBD::cBD()->prepare("SELECT * From $tablaBD");
            
            $pdo->execute();
            return $pdo -> fetchAll();

        }

        $pdo -> close();



    }
    
    
//ver perfil del usuario


static public function VerPerfilM($tablaBD,$id){


    
    $pdo = conexionBD::cBD()->prepare("SELECT id, usuario, pass, foto FROM $tablaBD WHERE id =:id");

    $pdo -> bindParam(":id", $id, PDO::PARAM_INT);

    $pdo -> execute();
    
    return $pdo -> fetch();
    
    $pdo -> close();



}



}

