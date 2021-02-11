<?php

class conexionBD {


   static public function cBD(){


        try{
     $bd = new PDO("mysql:host=190.107.177.243:3306;dbname=cca65106_sistemahc","cca65106_prueba","ASDqwe123GHJtyu567");
        $bd -> exec("set names utf8");
        return $bd;

    }catch(PDOException $e){

            echo 'Fallo la coneccion ' . $e->getMessage();


    }



    }


}