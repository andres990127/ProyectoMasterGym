import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'; /* importado manualmente */

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  clientes: any[] = new Array<any>(); /* Creo una variable clientes que contendrá los clientes de mi base de datos */
  constructor(private db: AngularFirestore ) { } /* Inyecto los servicios de AngularFirestore */

  ngOnInit() {
    this.db.collection('clientes').valueChanges().subscribe((resultado)=>{ /* Leo de mi base de datos los clientes y los asigno a mi variable "clientes" */
      this.clientes = resultado;
    })
  }

}
