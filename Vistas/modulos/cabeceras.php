<!DOCTYPE html>
<html lang="es">

<head>
    <title></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="Vistas/css/productos.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
        integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
       

</head>

<body>

    <header>

        <div class="container-fluid" style="background-color: black;">

            <div class="row">
                <div class="col-md-2 my-3" >
                    
                    <img src="Vistas/mg/logo.png" class="img-fluid" alt="">
                
                </div>

                <div class="col-md-7 my-3 justify-content-center" >
                    <form class="form-inline my-2 my-lg-0 p-2">
                        <input class="form-control" id="inputBusqueda" style="width: 85%;" type="search" placeholder="Buscar"
                            aria-label="Search">
                        <button class="btn btn-outline-secundary my-2 my-sm-0" id="btnBuscar" type="button">Buscar</button>
                    </form>
                </div>

                <div class="col-md-1 text-center mt-3">

                    <img src="Vistas/mg/carrito.png" data-toggle="modal" data-target="#carritoCompras" class="img-fluid" alt="">
                  

                </div>



                <div class="col-md-2 justify-content-center my-3">
                    <nav class="sociales text-center">
                        <ul>
                            <li><a href="http://www.facebook.com" target="_blank"> <span class="sr-only"> </span></a></li>
                            <li><a href="http://www.instagram.com" target="_blank"> <span class="sr-only"> </span></a></li>
                            <li><a href="http://www.whatsapp.com" target="_blank"> <span class="sr-only"> </span></a></li>
                        </ul>
                    </nav>




                </div>
            </div>


        </div>


        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: rgba(0, 0, 0, 0.575); " >

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto" style="background-color: rgba(39, 111, 124, 0.575); ">
                     <li class="nav-item">
                        <a class="nav-link" href="inicio"> <strong class="color">Inicio</strong> </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><strong class="color">Nosotros</strong> </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><strong class="color">Contácto</strong></a>
                    </li>

                </ul>

                <ul class="navbar-nav mr-auto" style="background-color: rgb(65, 42, 165);">
                    <li class="nav-item">
                        <a class="nav-link" href="belleza"><strong class="color">Belleza</strong></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="VestuarioHogar"><strong class="color">Vestuario y Hogar</strong></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="tecnologia"><strong class="color">Tecnología</strong></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="juguetes"><strong class="color">Juguetes</strong></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="iluminacion"><strong class="color">Iluminación</strong></a>
                    </li>

                </ul>

            </div>
        </nav>





    </header>
