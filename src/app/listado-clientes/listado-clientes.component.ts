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

    //this.db.collection('clientes').valueChanges().subscribe((resultado)=>{ /* Leo de mi base de datos los clientes y los asigno a mi variable "clientes" */
    //  this.clientes = resultado;
    //})

    this.clientes.length = 0; /* Nos aseguramos de que el array clientes este vacio */
    this.db.collection('clientes').get().subscribe((resultado) => {
      console.log(resultado.docs) /* TEST */

      resultado.docs.forEach((item) => {
        let cliente = item.data(); /* Le asignamos a la variable cliente la informacion del cliente que esta contenida en la base de datos */
        cliente.id = item.id; /* Asignamos un id del cliente que esta en la base de datos */
        cliente.ref = item.ref; /* Asignamos un valor "ref" para uso de más adelante */
        this.clientes.push(cliente); /* agregamos el cliente a el array ya creado de clientes */
      })

    })

  }

}
