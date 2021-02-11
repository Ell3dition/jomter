<div class="container-fluid">
    <div class="row no-gutter">
        <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div class="col-md-8 col-lg-6">
            <div class="login d-flex align-items-center py-5">
                <div class="container">
                    <div class="row">
                        <div class="col-md-9 col-lg-8 mx-auto">
                            <h3 class="login-heading mb-4">Bienvenido</h3>
                            <form method="POST">
                                <div class="form-label-group">
                                    <input type="text" id="inputEmail" class="form-control" placeholder="Email address" name="usuario-Ing"  required autofocus>
                                    <label for="inputEmail">Usuario</label>
                                </div>

                                <div class="form-label-group">
                                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" name="clave-Ing" required>
                                    <label for="inputPassword">Contraseña</label>
                                </div>

                                <button class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Ingresar</button>
                                <div class="text-center">
                                    <a class="small" href="#">Forgot password?</a></div>

                                <?php

                                $ingreso = new UsuariosC();
                                $ingreso->IngresoUsuariosC();


                                ?>








                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>