<?php

class conexionBD {


   static public function cBD(){


        try{
     $bd = new PDO("mysql:host=190.107.177.242:3306;dbname=cjo69756_jomter","cjo69756_serviciosjomter","=;3qiB}8EJM&");
        $bd -> exec("set names utf8");
        return $bd;

    }catch(PDOException $e){

            echo 'Fallo la coneccion ' . $e->getMessage();


    }



    }


}