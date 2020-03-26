import { Injectable } from '@angular/core';
import Swal from 'sweetalert2' /* Importando manualmente */

@Injectable({
  providedIn: 'root'
})
export class MensajesService { /* SERVICIO CREADO PARA ADMINISTRAR LOS MENSAJES DE SWEETALERT */
                /* Al crear un servicio se debe de importar en el app.module.ts, en la parte de providers */
                 /* Para usar un servicio en un componente typescript se debe inyectar en el constructor */

  constructor() { }

  mensajeError(titulo: string, mensaje:string) /* Funcion para llamar mensaje de Error, recibe el titulo del mensaje y el contenido del mensaje */
  {
    Swal.fire({ /* Se invoca SweetAlert  para mostrar alerta de "Agregado exitosamente" */
        title: titulo,
        text: mensaje,
        icon: 'error'
      })
  }

  mensajeCorrecto(titulo: string, mensaje:string)/* Funcion para llamar mensaje de Correcto, recibe el titulo del mensaje y el contenido del mensaje */
  {
    Swal.fire({ /* Se invoca SweetAlert  para mostrar alerta de "Agregado exitosamente" */
        title: titulo,
        text: mensaje,
        icon: 'success'
      })
  }

  mensajeAdvertencia(titulo: string, mensaje:string) /* Funcion para llamar mensaje de Advertencia, recibe el titulo del mensaje y el contenido del mensaje */
  {
    Swal.fire({ /* Se invoca SweetAlert  para mostrar alerta de "Agregado exitosamente" */
        title: titulo,
        text: mensaje,
        icon: 'warning'
      })
  }
}
