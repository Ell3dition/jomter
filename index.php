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

}else if ($_GET["url"] == "tecnologia"){

    $plantilla = new PrincipalC();
    $plantilla -> LlamarTecnologia();

}else if ($_GET["url"] == "juguetes"){

    $plantilla = new PrincipalC();
    $plantilla -> LlamarJuguetes();

}else if ($_GET["url"] == "iluminacion"){

    $plantilla = new PrincipalC();
    $plantilla -> LlamarIluminacion();

}else if ($_GET["url"] == "VestuarioHogar"){

    $plantilla = new PrincipalC();
    $plantilla -> LlamarVestuarioHogar();

}else{
    $plantilla = new PrincipalC();
    $plantilla -> LlamarPrincipalC();

}

}else{

    $plantilla = new PrincipalC();
    $plantilla -> LlamarPrincipalC();


}

