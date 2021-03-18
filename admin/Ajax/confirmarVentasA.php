<?php

require_once "../Modelos/ventasM.php";
//require_once "../Modelos/validarProductosM.php";

class VentasA
{

    public function ConfirmarVentaA()
    {
        $lista = json_decode($_POST["listado"], true);
        $detalleVenta = json_decode($_POST["detalleProductos"], true);

        $respuesta = VentasM::confirmarVentas($lista, $detalleVenta);

        echo json_encode($respuesta);
    }


    public function  CargarVentasA()
    {

        $respuesta = VentasM::CargarVentasM();
        echo json_encode($respuesta);
    }

    public function VentaExitoA($estado)
    {

        $id = $_POST["id"];

        $respuesta = VentasM::ActualizarVentaM($estado, $id);
        echo json_encode($respuesta);
    }

    public function BuscarVentasA()
    {

        $parametro = $_POST["parametro"];

        $respuesta = VentasM::BuscarVentaM($parametro);
        echo json_encode($respuesta);
    }

    public function VerDetalleVentasA()
    {

        $id = $_POST["idVentas"];

        $respuesta = VentasM::VerDetalleVentasM($id);
        echo json_encode($respuesta);
    }

    public function actualizarStock()
    {

        $lista = json_decode($_POST["lista"], true);

        $respuesta = VentasM::actualizarStockM($lista);
        echo json_encode($respuesta);
    }

 
}


if ($_POST["accion"] == "Confirmar") {
    $editarU = new VentasA();
    $editarU->ConfirmarVentaA();
} else if ($_POST["accion"] == "Cargar") {
    $cargar = new VentasA();
    $cargar->CargarVentasA();
} else if ($_POST["accion"] == "Exito") {

    $estado = "REALIZADA";
    $cargar = new VentasA();
    $cargar->VentaExitoA($estado);
} else if ($_POST["accion"] == "Rechazo") {

    $estado = "ANULADA";
    $cargar = new VentasA();
    $cargar->VentaExitoA($estado);
} else if ($_POST["accion"] == "Buscar") {


    $cargar = new VentasA();
    $cargar->BuscarVentasA();
} else if ($_POST["accion"] == "detalleVentas") {

    $cargar = new VentasA();
    $cargar->VerDetalleVentasA();
} else if ($_POST["accion"] == "ActualizarStock") {

    $cargar = new VentasA();
    $cargar->actualizarStock();
}
