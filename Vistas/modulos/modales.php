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

<div class="modal fade" id="carritoCompras" tabindex="-1" role="dialog" aria-hidden="true">
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
                            <h4>TOTAL: $ <strong>0</strong> </h4>
                        </div>
                        <div class="col-md-3 mr-4 col-8"><button type="button" class="btn btn-success" id="send">Contactar con vendedor</button></div>
                        <div class="col-md-3 ml-4 col-8"><button type="button" class="btn btn-primary" data-dismiss="modal">Seguir Comprando</button></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>





<!--MODAL AGREDECIMIENTO-->

<div class="modal fade" id="modalGracias" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">

            <div class="modal-header">
                <h4><strong>Gracias por su compra</strong></h4>
            </div>

            <div class="modal-body">

                <div class="container">

                    <div class="row justify-content-between">


                        <div class="col-md-5"><img class="img-fluid" src="Vistas/mg/tick.gif" alt=""></div>
                        <div class="col-md-5 text-center mt-5">
                            <h3>Gracias por su compra</h3>
                            <p>Un vendedor se pondra en contacto para coordinar la entrega</p>
                            <p><strong>NOTA:</strong> No olvide que debe enviar el mensaje desde el dispositivo</p>
                        </div>



                    </div>
                </div>
                <!--Container-->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>



<!--MODAL CARRITO VACIO-->

<div class="modal fade" id="modalErrorCarritoVacio" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4><strong>Error</strong></h4>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row justify-content-between">
                        <div class="col-md-5"><img class="img-fluid" src="Vistas/mg/error_carrito.gif" alt=""></div>
                        <div class="col-md-5 text-center mt-5">
                            <h3>Debe seleccionar al menos un producto</h3>
                        </div>
                    </div>
                </div>
                <!--Container-->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>



<!--MODAL SIN PRODUCTOS-->

<div class="modal fade" id="modalSinProductos" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4><strong>Ups!</strong></h4>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row justify-content-center">
                            <div class="col-md-10 text-center">
                            <h4>Disculpe las molestias alctualmente no contamos con productos en esta categoría</h4>
                        </div>
                    </div>
                </div>
                <!--Container-->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>



