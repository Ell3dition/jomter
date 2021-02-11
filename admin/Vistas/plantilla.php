<?php

session_start();

?>

<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>SISTEMA HC</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">

  <!-- Font Awesome -->
  <link rel="stylesheet" href="Vistas/plugins/fontawesome-free/css/all.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Tempusdominus Bbootstrap 4 -->
  <link rel="stylesheet" href="Vistas/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="Vistas/plugins/icheck-bootstrap/icheck-bootstrap.min.css">
  <!-- JQVMap -->
  <link rel="stylesheet" href="Vistas/plugins/jqvmap/jqvmap.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="Vistas/dist/css/adminlte.min.css">
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href="Vistas/plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="Vistas/plugins/daterangepicker/daterangepicker.css">
  <!-- summernote -->
  <link rel="stylesheet" href="Vistas/plugins/summernote/summernote-bs4.css">
  <!-- Google Font: Source Sans Pro -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">

  <link href="Vistas/css/estilosLogin.css" rel="stylesheet">
  <link href="Vistas/css/spinner.css" rel="stylesheet">


  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">

</head>

<body id="cuerpoPagina" class="hold-transition sidebar-mini layout-fixed">





  <?php

  if (isset($_SESSION["Ingreso"]) && $_SESSION["Ingreso"]  == TRUE) {




    echo '<div class="wrapper">';

    include "modulos/cabeceras.php";

    include "modulos/menu.php";

    if (isset($_GET["url"])) {

      if (
        $_GET["url"] == "inicio" || $_GET["url"] == "salir" || $_GET["url"] == "asistencia"
        || $_GET["url"] == "beneficios"  || $_GET["url"] == "profesoresAsignaturas"   || $_GET["url"] == "profesoresJefes"
        || $_GET["url"] == "verAsistencia" || $_GET["url"] == "RegistroProfesorJefe" || $_GET["url"] == "recursos"
        || $_GET["url"] == "seguimiento" || $_GET["url"] == "mantenedorAlumnos"  || $_GET["url"] == "mantenedorAsignaturas"
        || $_GET["url"] == "mantenedorCursos" || $_GET["url"] == "mantenedorProfesores"
        || $_GET["url"] == "seguimiento" ||  $_GET["url"] == "yoPuedo" ||  $_GET["url"] == "reunionApoderados" ||  $_GET["url"] == "familiaEscuela" 
        ||  $_GET["url"] == "recursosPedagogicos"  ||  $_GET["url"] == "webclass" ||  $_GET["url"] == "clase" || $_GET["url"] == "reemplazos" 
        || $_GET["url"] == "observaciones"  || $_GET["url"] == "entrevistas" ) {

        

        include "modulos/" . $_GET["url"] . ".php";
      }
    } else {

      include "modulos/inicio.php";
    }

    echo '</div>';
  } else {

    include "modulos/ingreso.php";
  }



  ?>





  <!-- jQuery -->
  <script src="Vistas/plugins/jquery/jquery.min.js"></script>
  <!-- jQuery UI 1.11.4 -->
  <script src="Vistas/plugins/jquery-ui/jquery-ui.min.js"></script>
  <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
  <script>
    $.widget.bridge('uibutton', $.ui.button)
  </script>
  <!-- Bootstrap 4 -->
  <script src="Vistas/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
  <!-- ChartJS -->
  <script src="Vistas/plugins/chart.js/Chart.min.js"></script>
  <!-- Sparkline -->
  <script src="Vistas/plugins/sparklines/sparkline.js"></script>
  <!-- JQVMap -->
  <script src="Vistas/plugins/jqvmap/jquery.vmap.min.js"></script>
  <script src="Vistas/plugins/jqvmap/maps/jquery.vmap.usa.js"></script>
  <!-- jQuery Knob Chart -->
  <script src="Vistas/plugins/jquery-knob/jquery.knob.min.js"></script>
  <!-- daterangepicker -->
  <script src="Vistas/plugins/moment/moment.min.js"></script>

  <script src="Vistas/plugins/daterangepicker/daterangepicker.js"></script>
  <!-- Tempusdominus Bootstrap 4 -->
  <script src="Vistas/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>
  <!-- Summernote -->
  <script src="Vistas/plugins/summernote/summernote-bs4.min.js"></script>
  <!-- overlayScrollbars -->
  <script src="Vistas/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
  <!-- AdminLTE App -->
  <script src="Vistas/dist/js/adminlte.js"></script>
  <!-- AdminLTE dashboard demo (This is only for demo purposes) -->

  <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>

  <?php

  if ($_GET["url"] == "asistencia") {

    echo '<script src="Vistas/js/asistencia.js"></script>';
  } else if ($_GET["url"] == "verAsistencia") {

    echo '<script src="Vistas/js/verAsistencia.js"></script>';
  } else if ($_GET["url"] == "beneficios") {

    echo '<script src="Vistas/js/beneficios.js"></script> ';
  } else if ($_GET["url"] == "profesoresJefes") {

    echo '<script src= "Vistas/js/profesores.js"></script>';
  } else if ($_GET["url"] == "RegistroProfesorJefe") {

    echo '<script src="Vistas/js/verRegistroProfesor.js"></script>';
  } else if ($_GET["url"] == "recursos") {

    echo '<script src="Vistas/js/recursos.js"></script>';
  } else if ($_GET["url"] == "seguimiento") {

    echo '<script src="Vistas/js/seguimiento.js"></script>';
  } else if ($_GET["url"] == "mantenedorAlumnos") {

    echo '<script src="Vistas/js/mantenedorAlumnos.js"></script>';
  } else if ($_GET["url"] == "mantenedorAsignaturas") {

    echo '<script src="Vistas/js/mantenedorAsignaturas.js"></script>';
  } else if ($_GET["url"] == "mantenedorCursos") {

    echo '<script src="Vistas/js/mantenedorCursos.js"></script>';
  } else if ($_GET["url"] == "mantenedorProfesores") {

    echo '<script src="Vistas/js/mantenedorProfesores.js"></script>';
  }else if ($_GET["url"]== "yoPuedo"){

    echo '<script src="Vistas/js/yoPuedo.js"></script>';
  }else if ($_GET["url"]== "reunionApoderados"){

    echo '<script src="Vistas/js/reunionApoderados.js"></script>';
  }else if ($_GET["url"]== "familiaEscuela"){

    echo '<script src="Vistas/js/familiaEscuela.js"></script>';
  }else if ($_GET["url"]== "recursosPedagogicos"){

    echo '<script src="Vistas/js/recursosPedagogicos.js"></script>';
  }else if ($_GET["url"]== "webclass"){

    echo '<script src="Vistas/js/webclass.js"></script>';
  }else if ($_GET["url"]== "clase"){

    echo '<script src="Vistas/js/clase.js"></script>';
  }else if ($_GET["url"]== "reemplazos"){

    echo '<script src="Vistas/js/reemplazos.js"></script>';
  }else if ($_GET["url"]== "observaciones"){

    echo '<script src="Vistas/js/observaciones.js"></script>';
  }else if ($_GET["url"]== "entrevistas"){

    echo '<script src="Vistas/js/entrevistas.js"></script>';
  }




  ?>



</body>

</html>