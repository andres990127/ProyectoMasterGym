import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../models/inscripcion';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion = new Inscripcion(); /* Creo una nueva inscripcion que guardara la informacion de inscripcion */
  clienteSeleccionado: Cliente = new Cliente(); /* Creo una variable que contendrá al usuario seleccionado para la inscripcion */
  constructor() { }

  ngOnInit() {
  }

  asignarCliente(cliente: Cliente) /* Funcion para asignar el cliente y la inscripcion */
  {
    this.inscripcion.cliente = cliente.ref /* Asigno a la variable 'cliente' de inscripcion la informacion recuperada */
    this.clienteSeleccionado = cliente; /* Asigno a la variable local clienteSeleccionado la informacion del cliente recuperada */
  }

  eliminarCliente() /* Funcion para eliminar el cliente y la inscripcion actual */
  {
    this.clienteSeleccionado = new Cliente();
    this.inscripcion.cliente = undefined;
  }

  guardar(){ /* Funcion para subir a la BD la inscripcion y el cliente de este */
    console.log(this.inscripcion);
  }
}
