import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  usuario: User

  constructor(private afAuth: AngularFireAuth) { } /* Importamos el AngularFireAuth */

  ngOnInit() {
  }

  logout() { /* Metodo cerrar sesion */
    this.afAuth.auth.signOut();
  }

}
