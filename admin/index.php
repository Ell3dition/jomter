<?php

//CONTROLADORES
require_once "Controladores/plantillaC.php";

require_once "Controladores/usuariosC.php";


//MODELOS

require_once "Modelos/usuariosM.php";




$plantilla = new PlantillaC();
$plantilla -> LlamarPlantilla();

