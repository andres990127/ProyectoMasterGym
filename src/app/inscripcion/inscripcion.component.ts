import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../models/inscripcion';
import { Cliente } from '../models/cliente';
import { AngularFirestore } from '@angular/fire/firestore';
import { Precio } from '../models/precio';
import { MensajesService } from '../services/mensajes.service';


@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion = new Inscripcion(); /* Variable que guardara los datos de la inscripcion */
  clienteSeleccionado: Cliente = new Cliente(); /* Variable que guardara el cliente relacionado a la inscripcion */
  precioSeleccionado: Precio = new Precio(); /* Variable que contendra el precio de la el tipo de mensualidad seleccionada */
  idPrecio: string = 'null'; /* Variable creada para limiar la lista */
  precios: Precio[] = new Array<Precio>(); /* Array que almacenará todos los precios disponibles en la BD */

  constructor(private db: AngularFirestore, private msj: MensajesService) { } /* Inyecto servicio de lectura de datos de la base de datos y el servicio de alertas creado */

  ngOnInit() {
    this.db.collection('precios').get().subscribe((resultados)=>{ /* Consultamos en la coleccion precios de la DB */
      resultados.docs.forEach((item)=>{
        let precio = item.data() as Precio; /* A la variable local precio le coloco toda la informacion que tengo en la BD sobre los precios */
        precio.id = item.id; /* Añado a la variable local precio el id que le ha dado la BD */
        precio.ref = item.ref; /* Añado a la variable local precio la ref que le ha dado la BD */
        this.precios.push(precio); /* Almaceno la variable local al array ya creado */
      })
    })
  }

  asignarCliente(cliente: Cliente) /* Funcion que asigna el cliente seleccionado a la inscripcion */
  {
    this.inscripcion.cliente = cliente.ref  /* Guarda la informacion del cliente en la variable cliente de inscripcion */
    this.clienteSeleccionado = cliente;  /* Guarda el cliente seleccionado */
  } 

  eliminarCliente() /* Funcion que elimina al cliente al momento de cancelar el proceso */
  {
    /* Limpiamos variables  */
    this.clienteSeleccionado = new Cliente(); 
    this.inscripcion.cliente = undefined;
  }

  guardar(){ /* Funcion que sube la informacion a la BD */
    if(this.inscripcion.validar().esValido)
    {
      let inscripcionAgregar = {
        fecha: this.inscripcion.fecha,
        fechaFinal: this.inscripcion.fechaFinal,
        cliente: this.inscripcion.cliente, 
        precios: this.inscripcion.precios, 
        subTotal: this.inscripcion.subTotal,
        iva: this.inscripcion.iva,
        total: this.inscripcion.total
      }
      this.db.collection('inscripciones').add(inscripcionAgregar).then((resultado)=>{
        this.inscripcion = new Inscripcion(); /* Limpio el formulario */
        this.clienteSeleccionado = new Cliente(); /* Limpio el formulario */
        this.precioSeleccionado = new Precio(); /* Limpio el formulario */
        this.idPrecio = 'null';
        this.msj.mensajeCorrecto('Guardado', 'Se ha guardado correctamente')
      })
    }else{
      this.msj.mensajeAdvertencia('Advertencia',this.inscripcion.validar().mensaje)
    }
  }

  seleccionarPrecio(id: string) /* Funcion que permite cargar el precio a la inscripcion */
  {
    if(id!="null")
    {

    this.precioSeleccionado = this.precios.find(x => x.id == id)
    this.inscripcion.precios = this.precioSeleccionado.ref

    this.inscripcion.subTotal = this.precioSeleccionado.costo;
    this.inscripcion.iva = this.inscripcion.subTotal * 0.16;
    this.inscripcion.total = this.inscripcion.subTotal + this.inscripcion.iva;

    this.inscripcion.fecha = new Date();
  

    if(this.precioSeleccionado.tipoDuracion == 1){
      let dias: number = this.precioSeleccionado.duracion;
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(),this.inscripcion.fecha.getDate() + dias)
      this.inscripcion.fechaFinal = fechaFinal;
    }

    if(this.precioSeleccionado.tipoDuracion == 2){
      let dias: number = this.precioSeleccionado.duracion * 7;
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(),this.inscripcion.fecha.getDate() + dias)
      this.inscripcion.fechaFinal = fechaFinal;
    }

    if(this.precioSeleccionado.tipoDuracion == 3){
      let dias: number = this.precioSeleccionado.duracion * 15;
      let fechaFinal = new Date(this.inscripcion.fecha.getFullYear(),this.inscripcion.fecha.getMonth(),this.inscripcion.fecha.getDate() + dias)
      this.inscripcion.fechaFinal = fechaFinal;
    }

    if(this.precioSeleccionado.tipoDuracion == 4){
      let año: number = this.inscripcion.fecha.getFullYear();
      let meses = this.precioSeleccionado.duracion + this.inscripcion.fecha.getMonth();
      let dia: number = this.inscripcion.fecha.getDate();
      let fechaFinal = new Date(año,meses,dia)
      this.inscripcion.fechaFinal = fechaFinal;
    }

    if(this.precioSeleccionado.tipoDuracion == 5){
      let año: number = this.inscripcion.fecha.getFullYear() + this.precioSeleccionado.duracion;
      let meses = this.inscripcion.fecha.getMonth();
      let dia: number = this.inscripcion.fecha.getDate();
      let fechaFinal = new Date(año,meses,dia)
      this.inscripcion.fechaFinal = fechaFinal;
    }

    } else {
      this.precioSeleccionado = new Precio();
      this.inscripcion.fecha = null;
      this.inscripcion.fechaFinal = null;
      this.inscripcion.precios = null;
      this.inscripcion.subTotal = 0;
      this.inscripcion.iva = 0;
      this.inscripcion.total = 0;

    }
    
  }
}
