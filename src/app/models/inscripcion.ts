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
        
    }
}