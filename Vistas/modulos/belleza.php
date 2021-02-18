<?php
include "cabeceras.php";
?>


<div class="container">

    <div class="row justify-content-center cuerpo">





    </div>
    <!--ROW-->




</div>


<script src="admin/Vistas/plugins/jquery/jquery.min.js"></script>

<script src="admin/Vistas/plugins/jqvmap/jquery.vmap.min.js"></script>
<script src="admin/Vistas/plugins/jqvmap/maps/jquery.vmap.usa.js"></script>



<script src="https://kit.fontawesome.com/f6488b3598.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
</body>

<script src="Vistas/js/cargarProductosBelleza.js"></script>


</html>



<!--MODAL DESCRIPCION-->

<div class="modal fade" id="descripcionProducto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">

            <div class="modal-header">
                <h4><strong>Descripción</strong></h4>
            </div>

            <div class="modal-body">

                <p>Con el foco solar de 20 Led con sensor de movimiento puede añadir un toque de seguridad a su hogar.
                    Es perfecto para puertas de garaje escaleras patios y caminos. Características: Carga: luz solar.
                    Resistente al agua: IP65. Tamaño: 9.5 x 12.4 cm. Peso: 147g por unidad. Led: 20. Vatios: 65W.
                    Distancia de sensor: 3 metros. Ángulo de sensor: sector 120 . Material: plástico ABS +
                    policarbonato. Tiempo de carga: aproximadamente 8 horas.</p>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>


            </div>


            </form>
        </div>
    </div>
</div>


<!--MODAL AGREGAR-->

<div class="modal fade" id="agregarProducto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">

            <div class="modal-header">
                <h4><strong>Confirme cantidad</strong></h4>
            </div>

            <div class="modal-body">

                <div class="container">

                    <div class="row justify-content-center CuerpoModal">

                    </div>
                </div>
                <!--Container-->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success agregar">Agregar</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>



<!--MODAL CARRITO-->

<div class="modal fade" id="carritoCompras" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">

            <div class="modal-header">
                <h4><strong>Carrito</strong></h4>
            </div>

            <div class="modal-body">

                <div class="container">

                    <div class="table-responsive-sm">
                        <table class="table table-bordered table-hover table-sm" id="tablaCarrito">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Nombre</th>
                                    <th>Can.</th>
                                    <th>Talla</th>
                                    <th>Sub-Total</th>
                                    <th></th>
                               </tr>
                            </thead>
                            <tbody class="contenedor">
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            <div class="modal-footer">

                <div class="container">

                    <div class="row">
                        <div class="col-md-4 col-8 totalaPagar">
                            <h4>TOTAL: $ <strong>60000</strong> </h4>
                        </div>
                        <div class="col-md-3 mr-4 col-8"><button type="button" class="btn btn-success" data-dismiss="modal">Contactar con vendedor</button></div>
                        <div class="col-md-3 ml-4 col-8"><button type="button" class="btn btn-primary" data-dismiss="modal">Seguir Comprando</button></div>
                    </div>

                </div>
            </div>


            </form>
        </div>
    </div>
</div>