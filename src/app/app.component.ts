import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth, User } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mastergym';
  usuario: User; /* Creado manualmente */
  cargando: boolean = true; /* Creado manualmente, variable para saber cuando la pagina está cargando*/

  constructor(private afAuth: AngularFireAuth) /* Creado manualmente */
  {
    this.afAuth.user.subscribe((usuario)=>{ 
      setTimeout(() => { /* Hago una demora de 1s para mostrar pantalla de carga */
        this.cargando = false; /* Terminó de cargar */
        this.usuario = usuario;
      }, 1000);
    })
  }

  login() { /* Metodo login */
    this.afAuth.auth.signInWithEmailAndPassword('tomasgaray07@gmail.com', '123456789')
  }
  logout() { /* Metodo cerrar sesion */
    this.afAuth.auth.signOut();
  }
}
