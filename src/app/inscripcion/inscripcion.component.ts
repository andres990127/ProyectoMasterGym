import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../models/inscripcion';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion = new Inscripcion();
  clienteSeleccionado: Cliente = new Cliente();
  constructor() { }

  ngOnInit() {
  }

  asignarCliente(cliente: Cliente)
  {
    this.inscripcion.cliente = cliente.ref
    this.clienteSeleccionado = cliente;
  }

  eliminarCliente()
  {
    this.clienteSeleccionado = new Cliente();
    this.inscripcion.cliente = undefined;
  }

  guardar(){
    console.log(this.inscripcion);
  }
}
