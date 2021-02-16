<?php

class conexionBD {


   static public function cBD(){


        try{
     $bd = new PDO("mysql:host=localhost:3306;dbname=jomter","root","");
        $bd -> exec("set names utf8");
        return $bd;

    }catch(PDOException $e){

            echo 'Fallo la coneccion ' . $e->getMessage();


    }



    }


}