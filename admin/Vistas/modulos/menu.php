  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->

    <!-- Sidebar user panel (optional) -->
    <div class=" mt-3 pb-3 mb-3 d-flex">

      <a href="#" class="brand-link">

        <?php

        if ($_SESSION["foto"] == "") {


          echo '<img src="Vistas/img/defecto.png"  class="brand-image img-circle elevation-3"
          style="opacity: .8">';
        } else {

          echo '<img src="' . $_SESSION["foto"] . '"   class="brand-image img-circle elevation-3"
          style="opacity: .8">';
        }



        ?>

        <span class="brand-text font-weight-light">Bienvenido <strong><?php echo  $_SESSION["usuario"] ?> </strong></span>
   
      </a>


    </div>



    <!-- Sidebar -->
    <div class="sidebar">

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

          <li class="nav-item">
            <a href="inicio" class="nav-link">
              <i class="fa fa-home nav-icon"></i>
              <p>Inicio</p>
            </a>
          </li>


          <li class="nav-item">
            <a href="productos" class="nav-link">
              <i class="nav-icon fas fa-shopping-bag"></i>
              <p>Productos</p>
            </a>
          </li>

          <li class="nav-item">
            <a href="nosotros" class="nav-link">
              <i class="nav-icon fa fa-university"></i>
              <p>Nosotros</p>
            </a>
          </li>

          <li class="nav-item">
            <a href="usuarios" class="nav-link">
              <i class="nav-icon fas fa-user"></i>
              <p>Usuarios</p>
            </a>
          </li>

        </ul>

      </nav>


    </div>






  </aside>