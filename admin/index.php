<?php

//CONTROLADORES
require_once "Controladores/plantillaC.php";

require_once "Controladores/usuariosC.php";
require_once "Controladores/productosC.php";


//MODELOS

require_once "Modelos/usuariosM.php";
require_once "Modelos/productosM.php";




$plantilla = new PlantillaC();
$plantilla -> LlamarPlantilla();

