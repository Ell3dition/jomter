<?php


require_once "conexionBD.php";

class ProductosM extends conexionBD
{


    // crear PROPIEDAD
    static public function CrearProductoM($tablaBD, $datosC)
    {



        $pdo = conexionBD::cBD()->prepare("INSERT INTO $tablaBD (IMG_UNO, IMG_DOS, IMG_TRES, IMG_CUATRO, NOMBRE_PRO, PRECIO_PRO, STOCK_PRO, CATEGORIA_PRO, TALLA, DESCRIPCION, ESTADO, CANTIDAD_POR_MAYOR, PRECIO_POR_MAYOR) values 
        (:imgUno, :imgDos, :imgTres, :imgCuatro, :nombre, :precio, :stock, :categoria, :talla, :des, 'ACTIVADO', :cantidadXmayor, :precioXmayor )");

        $pdo->bindParam(":imgUno", $datosC["imgUno"], PDO::PARAM_STR);
        $pdo->bindParam(":imgDos", $datosC["imgDos"], PDO::PARAM_STR);
        $pdo->bindParam(":imgTres", $datosC["imgTres"], PDO::PARAM_STR);
        $pdo->bindParam(":imgCuatro", $datosC["imgCuatro"], PDO::PARAM_STR);
        $pdo->bindParam(":nombre", $datosC["nombre"], PDO::PARAM_STR);
        $pdo->bindParam(":precio", $datosC["precio"], PDO::PARAM_STR);
        $pdo->bindParam(":stock", $datosC["stock"], PDO::PARAM_STR);
        $pdo->bindParam(":categoria", $datosC["categoria"], PDO::PARAM_STR);
        $pdo->bindParam(":talla", $datosC["talla"], PDO::PARAM_STR);
        $pdo->bindParam(":des", $datosC["des"], PDO::PARAM_STR);
        $pdo->bindParam(":cantidadXmayor", $datosC["cantidadXmayor"], PDO::PARAM_STR);
        $pdo->bindParam(":precioXmayor", $datosC["precioXmayor"], PDO::PARAM_STR);

        if ($pdo->execute()) {


            return true;
        } else {


            return false;
        }

        $pdo = null;
    } // FIN PROPIEDAD


    //VER PROPIEDAD
    static public function VerProductoM($tipo, $item, $valor)
    {

        if ($item != null && $valor == null) {
            $pdo = conexionBD::cBD()->prepare("SELECT * FROM productos WHERE id = $item");
            $pdo->execute();
            return $pdo->fetch();
        } else if ($item != null && $tipo == "Busqueda") {
            $pdo = conexionBD::cBD()->prepare("SELECT * FROM productos WHERE CATEGORIA_PRO = '$item' AND ESTADO = '$valor'");
            $pdo->execute();
            return $pdo->fetchAll();
        } else {
            $pdo = conexionBD::cBD()->prepare("SELECT * FROM productos WHERE ESTADO = '$valor'");
            $pdo->execute();
            return $pdo->fetchAll();
        }


        $pdo = null;
    } //FIN VER



    //BORRAR PROPIEDAD
    static public function BorrarProductosM($tablaBD, $idPro)
    {


        $pdo = conexionBD::cBD()->prepare("DELETE FROM $tablaBD WHERE id = :id");

        $pdo->bindParam(":id", $idPro, PDO::PARAM_INT);


        if ($pdo->execute()) {
            return true;
        } else {
            return false;
        }


        $pdo = null;
    } //FIN BORRAR PROPIEDAD



    // crear PROPIEDAD
    static public function ActualizarProductoM($tablaBD, $datosC)
    {



        $pdo = conexionBD::cBD()->prepare("UPDATE $tablaBD SET NOMBRE_PRO = :nombre, PRECIO_PRO = :precio, STOCK_PRO = :stock, CATEGORIA_PRO = :categoria, TALLA = :talla,
        IMG_UNO = :imgUno, IMG_DOS = :imgDos, IMG_TRES = :imgTres, IMG_CUATRO = :imgCuatro, DESCRIPCION = :des, CANTIDAD_POR_MAYOR = :cantidadXmayor, PRECIO_POR_MAYOR = :precioXmayor WHERE id = :idPro");

        $pdo->bindParam(":idPro", $datosC["idPro"], PDO::PARAM_STR);
        $pdo->bindParam(":imgUno", $datosC["imgUno"], PDO::PARAM_STR);
        $pdo->bindParam(":imgDos", $datosC["imgDos"], PDO::PARAM_STR);
        $pdo->bindParam(":imgTres", $datosC["imgTres"], PDO::PARAM_STR);
        $pdo->bindParam(":imgCuatro", $datosC["imgCuatro"], PDO::PARAM_STR);
        $pdo->bindParam(":nombre", $datosC["nombre"], PDO::PARAM_STR);
        $pdo->bindParam(":precio", $datosC["precio"], PDO::PARAM_STR);
        $pdo->bindParam(":stock", $datosC["stock"], PDO::PARAM_STR);
        $pdo->bindParam(":categoria", $datosC["categoria"], PDO::PARAM_STR);
        $pdo->bindParam(":talla", $datosC["talla"], PDO::PARAM_STR);
        $pdo->bindParam(":des", $datosC["des"], PDO::PARAM_STR);
        $pdo->bindParam(":cantidadXmayor", $datosC["cantidadXmayor"], PDO::PARAM_STR);
        $pdo->bindParam(":precioXmayor", $datosC["precioXmayor"], PDO::PARAM_STR);

        if ($pdo->execute()) {


            return true;
        } else {


            return false;
        }

        $pdo = null;
    } // FIN PROPIEDAD




    static public function VerProductosFrontEndM($items)
    {
        $pdo = conexionBD::cBD()->prepare("SELECT * FROM productos WHERE CATEGORIA_PRO = '$items' AND ESTADO = 'ACTIVADO'");
        $pdo->execute();
        return $pdo->fetchAll();
        $pdo = null;
    }



    static public function DesactivarM($id)
    {
        $pdo = conexionBD::cBD()->prepare("UPDATE productos SET ESTADO = 'DESACTIVADO' WHERE id = :idPro");
        $pdo->bindParam(":idPro", $id, PDO::PARAM_STR);


        if ($pdo->execute()) {


            return true;
        } else {


            return false;
        }

        $pdo = null;
    }


    static public function activarM($id)
    {

        $pdo = conexionBD::cBD()->prepare("UPDATE productos SET ESTADO = 'ACTIVADO' WHERE id = :idPro");

        $pdo->bindParam(":idPro", $id, PDO::PARAM_STR);
       

        if ($pdo->execute()) {


            return true;
        } else {


            return false;
        }

        $pdo = null;
    }
}//FIN CLASE