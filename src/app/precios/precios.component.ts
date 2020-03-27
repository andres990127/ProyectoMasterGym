import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajesService } from '../services/mensajes.service';
import { Precio } from '../models/precio';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {

  formularioPrecio: FormGroup; /* Creo un nuevo formulario de tipo FormGroup */
  precios: Precio [] = new Array<Precio>(); /* Array que contendrá los Precios leidos de la BD */
  esEditar: boolean = false; /* Variable que me simboliza que boton debe estar activo, "agregar" o "editar" */
  id: string; /* Variable para guardar el id del precio a editar */

  constructor(
    private fb: FormBuilder,  /* Inyecto el servicio de FormBuilder para validaciones */
    private db: AngularFirestore, /* Inyecto el servicio de guardado en la BD */
    private msj: MensajesService /* Inyecto mi servicio de mensajes de alterta */ 
    ) { }  

  ngOnInit() { /* codigo que se ejecuta apenas inicie la apliacacion */
          /* Codigo validaciones del formulario */
    this.formularioPrecio = this.fb.group({ 
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required]
    }) /* Fin Codigo validaciones del formulario */
    this.mostrarPrecios(); /* Leo la base de datos apenas inicie la aplicacion */
  }

  mostrarPrecios(){ /* Metodo que lee la base de datos */
         /* Codigo lectura de Base de Datos */
         this.db.collection('precios').get().subscribe((resultado)=>{
           this.precios.length = 0;
          resultado.docs.forEach((dato)=>{
            let precio = dato.data() as Precio; /* Asigno el array de datos del la base de datos a la variable precio (convierto el dato.data() a clase Precio ya creada.)*/
            precio.id = dato.id; /* Le agrego otro dato que es la id que le da la base de datos */
            precio.ref = dato.ref; /* Le agrego otro dato que es la referencia que le da la BD */
            this.precios.push(precio); /* Subo toda esta informacion a el array local */
          })
        }) /* Fin codigo de lectura de bases de datos */
  }

  agregar(){ /* Funcion para agregar precios, la ejecuta el boton "agregar" */
    this.db.collection<Precio>('precios').add(this.formularioPrecio.value).then(()=>{ /* Agrego a la BD la informacion del formulario */
      this.msj.mensajeCorrecto('Agregado','Se agregó correctamente') /* Muestro un mensaje de agregado correctamente */
      this.formularioPrecio.reset() /* Dejo el formulario en blanco (los inputs sin llenar)*/
      this.mostrarPrecios(); /* Al agregar, vuelo a leer la base de datos para refrescar la interface */
    }).catch(()=>{
      this.msj.mensajeError('Error','Ocurrió un error') /* En caso de error muestro un mensaje */
    })
    console.log(this.formularioPrecio.value) /* Verifico en consola que estoy enviando a la BD */
  }

  editarPrecio(precio: Precio) /* Funcion para escribir los datos del precio en el formulario, se ejecuta al dar click en el precio respectivo */
  { 
    this.esEditar = true; /* Coloco la variable esEditar en true, entonces se activa el boton "editar" y se desactiva "agregar" */
    /* Asigno lo leido en la base de datos al formulario */
    this.formularioPrecio.setValue({ 
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion
    })
    this.id = precio.id /* Guardo en la variable local el id del precio seleccionado */
  }

  editar(){ /* Metodo para hacer un update a la base de datos, se ejecuta con el boton "editar" */
    this.db.doc('precios/' + this.id).update(this.formularioPrecio.value).then(()=>{ /* Selecciono la coleccion de mi BD llamada "precios" y le concateno el id del registro a editar */
      this.msj.mensajeCorrecto('Editado','Se edito correctamente') /* Muestro el mensaje de editado correctamente */
      this.formularioPrecio.reset(); /* Dejo el formulario limpio */
      this.esEditar = false; /* Desactivo el boton "editar" y activo el de "agregar" */
      this.mostrarPrecios(); /* Al editar, vuelo a leer la base de datos para refrescar la interface */
    }).catch(()=>{
      this.msj.mensajeError('Error','Ocurrió un error') /* En caso de error, muestro un mensaje */
    })
  }
}
