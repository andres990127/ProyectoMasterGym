import { DocumentReference } from '@angular/fire/firestore';

export class Cliente{
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    fechaNacimiento: Date;
    imgUrl: string;
    telefono: number;
    cedula: string;
    ref: DocumentReference;
    visible: boolean; /* Variable que decidira si el usuario es visible o no en la interface */

    constructor(){
        
    }
}