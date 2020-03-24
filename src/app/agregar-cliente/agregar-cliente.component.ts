import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {

  formularioCliente: FormGroup; /* Creamos el nuevo formulario para ingresar al cliente */
  porcentajeSubida: number = 0; /* Variable que guardara el porcentaje de subida de la imagen */
  constructor(private fb: FormBuilder, private storage: AngularFireStorage) { } /* Inyectamos el servicio de formularios y el servicio de guardado de la BD AngularFire */

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

  }

  agregar() /* Metodo para agregar y subir los clientes a la BD */
  {
    console.log(this.formularioCliente.value)
  }

  subirImagen(evento) /* Metodo para subir la imagen a la BD */
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
        console.log(url) /* Mostramos el Url de la imagen en la BD */
      })
    })
    tarea.percentageChanges().subscribe((porcentaje)=>{ /* Leemos el porcentaje que tiene la imagen que esta subiendo */
      this.porcentajeSubida = parseInt(porcentaje.toString()) /* Guardamos el porcentaje que tiene la imagen que esta subiendo en una variable local */
    })
  }

}
