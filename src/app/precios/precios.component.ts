import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {

  formularioPrecio: FormGroup; /* Creo un nuevo formulario de tipo FormGroup */
  precios: any[] = new Array<any>(); /* Array que contendrá los Precios leidos de la BD */

  constructor(
    private fb: FormBuilder,  /* Inyecto el servicio de FormBuilder para validaciones */
    private db: AngularFirestore, /* Inyecto el servicio de guardado en la BD */
    private msj: MensajesService /* Inyecto mi servicio de mensajes de alterta */ 
    ) { }  

  ngOnInit() {
    this.formularioPrecio = this.fb.group({ /* Creo las validaciones del formulario */
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required]
    })

    this.db.collection('precios').get().subscribe((resultado)=>{
      resultado.docs.forEach((dato)=>{
        let precio = dato.data(); /* Asigno el array de datos del la base de datos a la variable precio */
        precio.id = dato.id; /* Le agrego otro dato que es la id que le da la base de datos */
        precio.ref = dato.ref; /* Le agrego otro dato que es la referencia que le da la BD */
        this.precios.push(precio); /* Subo toda esta informacion a el array local */
      })
    })
  }

  agregar(){
    this.db.collection('precios').add(this.formularioPrecio.value).then(()=>{ /* Agrego a la BD la informacion del formulario */
      this.msj.mensajeCorrecto('Agregado','Se agregó correctamente') /* Muestro un mensaje de agregado correctamente */
      this.formularioPrecio.reset() /* Dejo el formulario en blanco (los inputs sin llenar)*/
    }).catch(()=>{
      this.msj.mensajeError('Error','Ocurrió un error') /* En caso de error muestro un mensaje */
    })
    console.log(this.formularioPrecio.value) /* Verifico en consola que estoy enviando a la BD */
  }
}
