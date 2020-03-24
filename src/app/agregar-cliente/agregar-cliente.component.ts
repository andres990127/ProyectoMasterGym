import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {

  formularioCliente: FormGroup; /* Creamos el nuevo formulario para ingresar al cliente */
  porcentajeSubida: number = 0; /* Variable que guardara el porcentaje de subida de la imagen */
  urlImagen: string = '' /* Variable que guardara la url de la imagen en la BD */
  esEditable: boolean = false; /* Variable para mostrar si el boton es "agregar" como falso o "editar" como true */
  id: string; /* Variable que guardará el id enviado via URL */

  constructor(
    private fb: FormBuilder,  /* Inyectamos el servicio de formularios */
    private storage: AngularFireStorage, /* Inyectamos el servicio de guardado de la BD AngularFire */
    private db: AngularFirestore, /* Inyectamos el servicio de colecciones */
    private activeRoute: ActivatedRoute
    ) { } 

  ngOnInit() {
    /*         Codigo para validar formulario */
    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],   /* Validators.required significa que el campo es requerido */
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([    /* Validators.compose significa que el campo tiene varios requerimientos, dentro se colocan todos los requerimientos necesarios */
        Validators.required, Validators.email
      ])],
      cedula: [''],
      fechaNacimiento: ['', Validators.required],
      telefono: [''],
      imgUrl: ['', Validators.required]
    })
    /*         Fin codigo para validar formulario */

    /*         Codigo para leer parametro por URL */
    this.id = this.activeRoute.snapshot.params.clienteID;/*  Asigno a la variable 'id' el parametro id del cliente mandado por URL */

    if (this.id != undefined) /* Si se recibe un parametro por el URL entonces... */
    {
      this.esEditable = true; /* La variable esEditable cambia debido a que entramos por el link editar */
      this.db.doc<any>('clientes'+ '/' + this.id).valueChanges().subscribe((cliente)=> /* Leo en la base de datos el cliente con la id dada */
    {
      console.log(cliente) /* Muestro la informacion de ese cliente por consola */
      this.formularioCliente.setValue({ /* Asigno al formulario toda la informacion de la base de datos del cliente */
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        correo: cliente.correo,
        fechaNacimiento: new Date (cliente.fechaNacimiento.seconds * 1000).toISOString().substr(0,10), /* Ajusto el formato fecha */
        telefono: cliente.telefono,
        cedula: cliente.cedula,
        imgUrl: '' /* Relleno para evitar error */
        
      })

      this.urlImagen = cliente.imgUrl; /* El formato imagen se debe definir así */

    });
    } /*          Fin de codigo para leer parametro por URL */
    

  }

  agregar() /* Metodo para agregar y subir los clientes a la BD */
  {
    this.formularioCliente.value.imgUrl = this.urlImagen /* Asginamos a la variable del formulario la URL de la imagen de la BD */
    this.formularioCliente.value.fechaNacimiento = new Date (this.formularioCliente.value.fechaNacimiento) /* Damos el formato a la fecha de string a date */
    console.log(this.formularioCliente.value)
    this.db.collection('clientes').add(this.formularioCliente.value).then((termino)=>{
      console.log('Registro Creado')
    })
  }

  editar()
  {
    this.formularioCliente.value.imgUrl = this.urlImagen /* Asginamos a la variable del formulario la URL de la imagen de la BD */
    this.formularioCliente.value.fechaNacimiento = new Date (this.formularioCliente.value.fechaNacimiento) /* Damos el formato a la fecha de string a date */
    this.db.doc('clientes/' + this.id).update(this.formularioCliente.value).then((resultado)=>{
      console.log('Se edito correctamente')
    }).catch(()=>{
      console.log('Error')
    })
  }

  subirImagen(evento) /* Metodo para subir la imagen a la BD */
  {
    if(evento.target.files.length > 0)
    {
      let nombre = new Date().getTime().toString() /* Creamos una variable nombre y le asignamos un valor unico que es la hora en milisegundos */
      let archivo = evento.target.files[0] /* Algoritmo default */
  
      let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.')) /* Extraemos el formato de la imagen quitando todo lo que tenga el nombre de la imagen del punto hacia la izquierda */
  
      let ruta = 'clientes/' + nombre + extension /* Ruta donde se guradara la imagen en la BD, se recomienda crear una carpeta, se le concatena el nombre unico y la extencion de la imagen */
      const referencia = this.storage.ref(ruta) /* Algoritmo default */
      const tarea = referencia.put(archivo) /* Algoritmo default */
      tarea.then((objeto)=>{ /* Inmediatamente despues de que la imagen este subida, se ejecuta... */
        console.log("imagen subida") /* Se informa que la imagen ha sido subida */
        referencia.getDownloadURL().subscribe((url)=>{  /* Leemos el Url de la imagen en la BD */
          this.urlImagen = url; /* Guardamos en la variable local la url de la imagen que esta en la BD */
        })
      })
      tarea.percentageChanges().subscribe((porcentaje)=>{ /* Leemos el porcentaje que tiene la imagen que esta subiendo */
        this.porcentajeSubida = parseInt(porcentaje.toString()) /* Guardamos el porcentaje que tiene la imagen que esta subiendo en una variable local */
      })
    }
  }

}
