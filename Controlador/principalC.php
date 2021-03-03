<?php

class PrincipalC
{

    public function LLamarPrincipalC()
    {
        include "Vistas/principal.php";
    }

    public function LlamarBellezaC()
    {

        include "Vistas/modulos/belleza.php";
    }

    public function LlamarTecnologia(){

        include "Vistas/modulos/tecnologia.php";

    }

    public function LlamarJuguetes(){

        include "Vistas/modulos/juguetes.php";

    }

    public function LlamarIluminacion(){

        include "Vistas/modulos/iluminacion.php";

    }
    public function LlamarVestuarioHogar(){

        include "Vistas/modulos/VestuarioHogar.php";

    }

    public function LlamarNosotros(){

        include "Vistas/modulos/nosotros.php";

    }

    public function LlamarContacto(){

        include "Vistas/modulos/contacto.php";

    }

}
