import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';


@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {
  clientes: Cliente[] = new Array<Cliente>(); /* Creo un array vacio de clientes para almacenar la informacion que leeré de la BD */
  @Input('nombre') nombre : string; /* Variable para guardar el nombre del cliente seleccionado --- @Input sirve para comunicarse entre componentes, algo asi como una VARIABLE GLOBAL -- Ej: <app-seleccionar-cliente nombre="juanita"></app-seleccionar-cliente>*/
  @Output('SeleccionoCliente') SeleccionoCliente = new EventEmitter(); /* OJO, SELECCIONAR AL IMPORTAR 'ANGULAR CORE' -- Variable para almacenar la referencia del cliente seleccionado hacia otros componentes */
  @Output('canceloCliente') canceloCliente = new EventEmitter(); /* OJO, SELECCIONAR AL IMPORTAR 'ANGULAR CORE' -- Variable para almacenar la informacion cuando se cancele la inscripcion de un cliente */
  constructor(private db: AngularFirestore) { } /* Importo el servicio de consulta de la BD */

  ngOnInit() {
    this.db.collection<any>('clientes').get().subscribe((resultados)=>{ /* Consulto la coleccion 'clientes' de la BD */
      this.clientes.length = 0; /* Borro todo lo anteriormente leido para no sobreescribir */
      resultados.docs.forEach((item)=>{ 
        let cliente: any = item.data(); /* Asigno informacion leida a la variable cliente */
        cliente.id = item.id; /* Almaceno el id que le ha asignado la base de datos */
        cliente.ref = item.ref; /* Almaceno el ref que le ha asignado la base de datos */
        cliente.visible = false ; /* Por default tendrá el valor de false para no va a ser visible, LO DEJO EN FALSE PORQUE QUIERO VER LA LISTA DESDE EL PRINCIPIO */
        this.clientes.push(cliente); /* Guardo todos los valores anteriores en un array anteriormente creado de el modelo "Clientes" */
      })
      console.log(this.clientes) /* Reporte */
    })
  }

  buscarClientes(nombre:string) /* Funcion que recibe la informacion en tiempo real de lo que se escribe en el input */
  {
    this.clientes.forEach((cliente)=>{
      if(cliente.nombre.toLowerCase().includes(nombre.toLowerCase())){ /* Si el nombre del cliente incluye el nombre del input obtenido por el parametro se vuelve visible */
        cliente.visible = true;
      }
      else{
        cliente.visible = false; /* Los nombres que no cumplan con esta condicion son ocultados */
      }
    })
  }

  seleccionarClientes(cliente:Cliente) /* Funcion que se ejecuta al darle click a un cliente */
  {
    this.nombre = cliente.nombre + ' ' + cliente.apellido /* Carga la variable global con el nombre y apellido del cliente */
    this.clientes.forEach((cliente)=>{ //Codigo para borrar los clientes de la lista una vez se ha escogido uno
      cliente.visible = false;
    })

    this.SeleccionoCliente.emit(cliente) /* Variable creada para que otro componente se suscriba */
  }

  cancelarClientes(){ /* Funcion que ejecuta el boton CANCELAR */
    this.nombre = undefined; /* Borro el contenido del input */
    this.canceloCliente.emit();
  }

}
