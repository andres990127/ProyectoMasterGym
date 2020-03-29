import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inscripcion } from '../models/inscripcion';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss']
})
export class ListadoInscripcionesComponent implements OnInit {
  inscripciones: any[] = [];
  constructor(private db: AngularFirestore) { } /* Inyecto servicio de consulta de BD */

  ngOnInit() {
    this.db.collection('inscripciones').get().subscribe((resultado)=>{
      resultado.forEach((inscripcion)=>{

        let inscripcionObtenida = inscripcion.data();
        inscripcionObtenida.id = inscripcion.id;
        //console.log(inscripcionObtenida)

        this.db.doc(inscripcion.data().cliente.path).get().subscribe((cliente)=>{
          console.log(cliente.data())
        })
      })
    })
  }

}
