<?php

require_once "../Modelos/nosotrosM.php";

class NosotrosA
{
    public function GuardarNosotrosA()
    {
        $contenido = $_POST["contenido"];
        $respuesta = NosotrosM::GuardarNosotrosM($contenido);
        echo json_encode($respuesta);
    }

    
    public function MostrarNosotrosA()
    {
        $respuesta = NosotrosM::MostrarNosotrosM();
        echo json_encode($respuesta);
    }
}


if ($_POST["accion"] == "GuardarNosotros") {
    $editarU = new NosotrosA();
    $editarU->GuardarNosotrosA();
} else if ($_POST["accion"] == "MostrarNosotros") {
    $editarU = new NosotrosA();
    $editarU->MostrarNosotrosA();
}


