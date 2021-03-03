<?php


require_once "conexionBD.php";

class NosotrosM extends conexionBD
{

    static public function GuardarNosotrosM($contenido)
    {

        $pdo = conexionBD::cBD()->prepare("UPDATE nosotros SET CONTENIDO_NOSOTROS = :contenido");
        $pdo->bindParam(":contenido", $contenido, PDO::PARAM_STR);
        if ($pdo->execute()) {
            return true;
        } else {
            return false;
        }
        $pdo = null;
    } 

    static public function MostrarNosotrosM()
    {

        $tablaBD= "nosotros";
        $pdo = conexionBD::cBD()->prepare("SELECT * From $tablaBD");
        $pdo->execute();
        return $pdo -> fetch();
        $pdo = null;
    } 



    

}