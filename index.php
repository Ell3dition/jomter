<?php

//CONTROLADORES
require_once "Controlador/principalC.php";




//MODELOS
if(isset($_GET["url"])){

if($_GET["url"]== "belleza"){

    $plantilla = new PrincipalC();
    $plantilla -> LlamarBellezaC();


}else if ($_GET["url"] == "inicio"){

    $plantilla = new PrincipalC();
    $plantilla -> LlamarPrincipalC();

}else{

 

}

}else{

    $plantilla = new PrincipalC();
    $plantilla -> LlamarPrincipalC();


}

