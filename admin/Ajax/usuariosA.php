<?php

require_once "../Controladores/usuariosC.php";

require_once "../Modelos/usuariosM.php";

class UsuariosA{

    public $Uid;

    public function EUsuariosA(){

        $item = "id";
        $valor = $this->Uid;

        $respuesta = UsuariosC::EUsuariosC($item,$valor);

        echo json_encode($respuesta);
    }

 
}


if(isset($_POST["Uid"])){


    $editarU = new UsuariosA();

    $editarU -> Uid = $_POST["Uid"];

    $editarU -> EUsuariosA();



}


