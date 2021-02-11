<?php
require_once "../Modelos/webclassM.php";
header("Content-type: application/vnd.ms-excel");
header("Content-Disposition: attachment;filename=Reporte_usuarios.xls");


?>
<!DOCTYPE html>
<html>

<head>
<meta charset="utf-8">
<!-- Compiled and minified CSS -->
<link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>
    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body>
    <div class="container">
        <h3 class='center'>REPORTE WEBCLASS</h3>
            
        <table border="1">
            <thead>
                <tr>
                    <th>N°</th>
                    <th>Profesor</th>
                    <th>Fecha</th>
                    <th>Curso</th>
                    <th>Asignatura</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                <?php


                $tabla = "REGISTRO_WEBCLASS";
                $rutProfe = $_POST["selectProfesorBuscar"];
                $desde =  $_POST["fechaDesde"];
                $hasta =  $_POST["fechaHasta"];


                $respuesta = WebclasM::BuscarM($tabla, $rutProfe, $desde, $hasta);

                foreach ($respuesta as $key => $value) {
                    echo '<tr>
							<td>' . ($key + 1) . '</td>
						  	<td>'.$value["PRIMER_NOMBRE"]." ".$value["SEGUNDO_NOMBRE"]." ".$value["APELLIDO_PATERNO"]." ".$value["APELLIDO_MATERNO"].'</td>
						  	<td>'.$value["FECHA"].'</td>
						  	<td>'.$value["NOMBRE_CURSO"].'</td>
                              <td>'.$value["NOMBRE_ASIGNATURA"].'</td>
                              <td>'.$value["ESTADO"].'</td>
						  </tr>';
                }

                
                echo '<script>
                
                    window.location = "webclass";
                
                </script>';
         
                ?>
            </tbody>
        </table>
    </div>
</body>

</html>


