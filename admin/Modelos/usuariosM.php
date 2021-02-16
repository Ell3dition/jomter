<?php

    require_once "conexionBD.php";

    // INGRESAR AL GESTOR

    class UsuariosM extends conexionBD{

        static public function IngresoUsuariosM($datosC, $tablaBD){

            $pdo = conexionBD::cBD()->prepare("SELECT * FROM $tablaBD WHERE nombre_usuario = :usuario");

            $pdo -> bindParam(":usuario", $datosC["usuario"], PDO::PARAM_STR);
            $pdo -> execute();
            return $pdo -> fetch();
            $pdo = null;
        }



        // VER USUARIO

        static public function VerUsuarioM($tablaBD){   

            $pdo = conexionBD::cBD()->prepare("SELECT * FROM $tablaBD ");

            $pdo -> execute();
            return $pdo -> fetchAll();
            $pdo = null;
    
        }



        //CREAR USUARIOS

        static public function CrearUsuariosM($tablaBD, $datosC){

            $pdo = conexionBD::cBD()->prepare("INSERT INTO $tablaBD (nombre_usuario,pass,foto,rol) VALUES (:usuario, :pass, :foto, :rol)");

            $pdo -> bindParam(":usuario", $datosC["usuario"], PDO::PARAM_STR);
            $pdo -> bindParam(":pass", $datosC["pass"], PDO::PARAM_STR);
            $pdo -> bindParam(":rol", $datosC["rol"], PDO::PARAM_STR);
            $pdo -> bindParam(":foto", $datosC["foto"], PDO::PARAM_STR);

            if($pdo->execute()){
                
                return true;

            }else{

                return false;

            }

            $pdo = null;
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

            $pdo = null;

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

        $pdo = null;



    }
    
    
//ver perfil del usuario


static public function VerPerfilM($tablaBD,$id){


    
    $pdo = conexionBD::cBD()->prepare("SELECT id, usuario, pass, foto FROM $tablaBD WHERE id =:id");

    $pdo -> bindParam(":id", $id, PDO::PARAM_INT);

    $pdo -> execute();
    
    return $pdo -> fetch();
    
    $pdo = null;



}


//actualizar


static public function ActualizarUsuariosM($tablaBD, $datosC){

    $pdo = conexionBD::cBD()->prepare("UPDATE $tablaBD SET nombre_usuario = :usuario, pass = :pass, foto = :foto, rol = :rol WHERE id = :id");

    $pdo -> bindParam(":id", $datosC["id"], PDO::PARAM_STR);
    $pdo -> bindParam(":usuario", $datosC["usuario"], PDO::PARAM_STR);
    $pdo -> bindParam(":pass", $datosC["pass"], PDO::PARAM_STR);
    $pdo -> bindParam(":rol", $datosC["rol"], PDO::PARAM_STR);
    $pdo -> bindParam(":foto", $datosC["foto"], PDO::PARAM_STR);

    if($pdo->execute()){
        
        return true;

    }else{

        return false;

    }

    $pdo = null;
}


}

