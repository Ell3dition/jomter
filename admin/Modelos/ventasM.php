<?php

require_once "conexionBD.php";

class VentasM extends conexionBD
{

    static public function confirmarVentas($lista, $detalleVenta)
    {

        $estado = "PENDIENTE";


        $pdo = conexionBD::cBD()->prepare("INSERT INTO CONFIRMACION_VENTA (TOTAL_VENTA, NOMBRE_CLIENTE, TELEFONO_CLIENTE, ESTADO) VALUES (:totalVenta, :nombreCliente, :telefonoCliente, :estado)");

        $pdo->bindParam(":totalVenta", $lista[0], PDO::PARAM_STR);
        $pdo->bindParam(":nombreCliente", $lista[1], PDO::PARAM_STR);
        $pdo->bindParam(":telefonoCliente", $lista[2], PDO::PARAM_STR);
        $pdo->bindParam(":estado", $estado, PDO::PARAM_STR);

        if ($pdo->execute()) {

            $respuesta = VentasM::ConsultarIDVenta($detalleVenta);
            return $respuesta;
        } else {

            return false;
        }

        $pdo = null;
    }

    static function ConsultarIDVenta($detalleVenta)
    {
        $pdo = conexionBD::cBD()->prepare("SELECT MAX(ID_CONFIRMACION) AS id FROM confirmacion_venta");
        $pdo->execute();
        $idNum = $pdo->fetch();
        $pdo = null;
       
        $respuesta = VentasM::GuardarDetalleVenta($detalleVenta, $idNum);
        return $respuesta;

    }


    static function GuardarDetalleVenta($detalleVenta, $idNum){
        $exitosos = 0;
        foreach ($detalleVenta as $productos) {
            $pdo = conexionBD::cBD()->prepare("INSERT INTO detalle_ventas (CANTIDAD_VENDIDA, SUB_TOTAL_VENTA, ID_PRODUCTO_FK, ID_NUM_VENTA) 
        VALUES (:cantidad, :subTotal, :idProducto, :idNumVenta)");

            $pdo->bindParam(":cantidad", $productos["cantidad"], PDO::PARAM_INT);
            $pdo->bindParam(":subTotal", $productos["subTotal"], PDO::PARAM_STR);
            $pdo->bindParam(":idProducto", $productos["id"], PDO::PARAM_INT);
            $pdo->bindParam(":idNumVenta",  $idNum[0], PDO::PARAM_INT);
            $pdo->execute();
            if (($pdo->rowCount()) > 0) {
                $exitosos++;
            }
        }
        if ($exitosos > 0) {
            return $idNum;
        } else {
            return false;
        }
        $pdo = null;
    }


    static function CargarVentasM()
    {


        $pdo = conexionBD::cBD()->prepare("SELECT * FROM confirmacion_venta");
        $pdo->execute();
        return $pdo->fetchAll();
        $pdo = null;
    }


    static public function ActualizarVentaM($estado, $id)
    {


        $pdo = conexionBD::cBD()->prepare("UPDATE confirmacion_venta SET ESTADO = :estado WHERE ID_CONFIRMACION = :id");

        $pdo->bindParam(":estado", $estado, PDO::PARAM_STR);
        $pdo->bindParam(":id", $id, PDO::PARAM_STR);


        if ($pdo->execute()) {

            return true;
        } else {

            return false;
        }

        $pdo = null;
    }




    static function BuscarVentaM($parametro)
    {


        $pdo = conexionBD::cBD()->prepare("SELECT * FROM confirmacion_venta WHERE ESTADO = :parametro");

        $pdo->bindParam(":parametro", $parametro, PDO::PARAM_STR);
        $pdo->execute();
        return $pdo->fetchAll();
        $pdo = null;
    }
}
