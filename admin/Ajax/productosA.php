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


    public function CargarDesdeFrontEnd()
    {

        $valor = $_POST["valor"];

        $respuesta = ProductosC::VerProductosFrontEndC($valor);
        echo json_encode($respuesta);
    }

    public function BusquedaDesdeFrontEnd(){

        $item = null;
        $respuesta = ProductosC::VerProductosC($item);
        echo json_encode($respuesta);
    }
}


if ($_POST["accion"] == "productos") {
    $editarU = new ProductosA();
    $editarU->BuscarProductosA();
} else if ($_POST["accion"] == "cargar") {

    $cargar = new ProductosA();
    $cargar->CargarDesdeFrontEnd();
} else if ($_POST["accion"] == "BusquedaFrontEnd") {

    $cargar = new ProductosA();
    $cargar->BusquedaDesdeFrontEnd();
}
