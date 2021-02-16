<?php

require_once "../Controladores/productosC.php";

require_once "../Modelos/productosM.php";

class ProductosA
{

    public function BuscarProductosA()
    {
        $item = $_POST["idProducto"];

        $respuesta = ProductosC::VerProductosC($item);

        echo json_encode($respuesta);
    }

}


if ($_POST["accion"] == "productos") {
    $editarU = new ProductosA();
    $editarU->BuscarProductosA();
}
