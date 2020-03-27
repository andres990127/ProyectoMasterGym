import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {
  clientes: Cliente[] = new Array<Cliente>(); /* Creo un array vacio de clientes para almacenar la informacion que leeré de la BD */
  constructor(private db: AngularFirestore) { } /* Importo el servicio de consulta de la BD */

  ngOnInit() {
    this.db.collection<any>('clientes').get().subscribe((resultados)=>{ /* Consulto la coleccion 'clientes' de la BD */
      this.clientes.length = 0; /* Borro todo lo anteriormente leido para no sobreescribir */
      resultados.docs.forEach((item)=>{ /* Asigno informacion leida a la variable clientes */
        let cliente: any = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        this.clientes.push(cliente);
      })
      console.log(this.clientes) /* Reporte */
    })
  }

}
