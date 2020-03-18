import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mastergym';

  constructor(private afAuth: AngularFireAuth) /* Creado manualmente */
  {

  }

  login() { /* Metodo login */
    this.afAuth.auth.signInWithEmailAndPassword('tomasgaray07@gmail.com', '123456789')
  }
  logout() { /* Metodo cerrar sesion */
    this.afAuth.auth.signOut();
  }
}
