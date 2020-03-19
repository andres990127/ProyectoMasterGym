import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup /* Importamos "Form Group" para hacer validaciones en el formulario */

  constructor(private creadorFormulario: FormBuilder, private afAuth: AngularFireAuth) /* Se inyecta el servicio y el AngularFireAuth */ 
  {

  }

  ngOnInit() {                                         /*  Inicio validadores */

    this.formularioLogin = this.creadorFormulario.group({ /* Igualamos el formulario creado con el servicio inyectado, los nombres a continuacion son los "FromControlName" */
      email: ['', Validators.compose([ /* Se llama a un "Validators.compose" cuando la variable requiere mas de un validador */
        Validators.required, Validators.email /* Se inserta validador de requerido y de correo para el email */
      ])],
      password: ['', Validators.required] /* Se inserta el validador de requerido para contraseña */

    })                                                 /* Fin validadores */
  }

  ingresar() /* Funcion que llama el boton de inicio de sesion */
  {
    /* Se ingresa usuario y contraseña del formulario creado por medio de la funcion FireBase y se retorna por consola el usuario */
    this.afAuth.auth.signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.password).then((usuario)=>{
      console.log(usuario)
    })
  }

}
