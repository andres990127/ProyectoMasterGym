import { DocumentReference } from '@angular/fire/firestore';

export class Inscripcion{
    fecha: Date;
    fechaFinal: Date;
    precios: DocumentReference; /* Se referencia la coleccion "precios" */
    cliente: DocumentReference; /* Se referencia la coleccion "clientes" */
    subTotal: number;
    iva: number;
    total: number;

    constructor(){
        this.fecha = this.fecha
        this.fechaFinal = this.fechaFinal
        this.precios = this.precios
        this.cliente = this.cliente
        this.subTotal = this.subTotal
        this.iva = this.iva
        this.total = this.total
    }
}