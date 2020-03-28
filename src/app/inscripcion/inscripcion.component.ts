import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../models/inscripcion';
import { Cliente } from '../models/cliente';
import { AngularFirestore } from '@angular/fire/firestore';
import { Precio } from '../models/precio';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion = new Inscripcion(); /* Variable que guardara los datos de la inscripcion */
  clienteSeleccionado: Cliente = new Cliente(); /* Variable que guardara el cliente relacionado a la inscripcion */
  precios: Precio[] = new Array<Precio>(); /* Array que almacenará todos los precios disponibles en la BD */
  precioSeleccionado: Precio = new Precio(); /* Variable que contendra el precio de la el tipo de mensualidad seleccionada */
  constructor(private db: AngularFirestore) { } /* Inyecto servicio de lectura de datos de la base de datos */

  ngOnInit() {
    this.db.collection('precios').get().subscribe((resultados)=>{ /* Consultamos en la coleccion precios de la DB */
      resultados.docs.forEach((item)=>{
        let precio = item.data() as Precio; /* A la variable local precio le coloco toda la informacion que tengo en la BD sobre los precios */
        precio.id = item.id; /* Añado a la variable local precio el id que le ha dado la BD */
        precio.ref = item.ref; /* Añado a la variable local precio la ref que le ha dado la BD */
        this.precios.push(precio); /* Almaceno la variable local al array ya creado */
      })
    })
  }

  asignarCliente(cliente: Cliente) /* Funcion que asigna el cliente seleccionado a la inscripcion */
  {
    this.inscripcion.cliente = cliente.ref  /* Guarda la informacion del cliente en la variable cliente de inscripcion */
    this.clienteSeleccionado = cliente;  /* Guarda el cliente seleccionado */
  } 

  eliminarCliente() /* Funcion que elimina al cliente al momento de cancelar el proceso */
  {
    /* Limpiamos variables  */
    this.clienteSeleccionado = new Cliente(); 
    this.inscripcion.cliente = undefined;
  }

  guardar(){ /* Funcion que sube la informacion a la BD */
    console.log(this.inscripcion);
  }

  seleccionarPrecio(id: string) /* Funcion que permite cargar el precio a la inscripcion */
  {
    this.precioSeleccionado = this.precios.find(x => x.id == id)
    this.inscripcion.precios = this.precioSeleccionado.ref
    console.log(this.precioSeleccionado)
  }
}
