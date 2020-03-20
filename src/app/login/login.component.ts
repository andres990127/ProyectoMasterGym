import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup /* Importamos "Form Group" para hacer validaciones en el formulario */
  datosCorrectos: boolean = true /* Creamos variable para saber si los datos ingresados son correctos con valor true para que no se muestre desde el principio */
  textoError: string = '' /* Esta variable contendra el mensaje de error */

  constructor(private creadorFormulario: FormBuilder, private afAuth: AngularFireAuth, private spinner: NgxSpinnerService) /* Se inyecta el servicio formulario, el AngularFireAuth y el loading */ 
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

  ingresar() /* Funcion que llama el boton de inicio de sesion */ {
    if (this.formularioLogin.valid) { /* Evaluamos si los datos ingresados son correctos */
      this.datosCorrectos = true; /* Asignamos la variable datosCorrectos como verdadera */
      this.spinner.show(); /* Mostramos la pantalla de carga spinner */
      /* Se ingresa usuario y contraseña del formulario creado por medio de la funcion FireBase y se retorna por consola el usuario */
      this.afAuth.auth.signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.password).then((usuario) => {
        console.log(usuario)
        this.spinner.hide(); /* Ocultamos la pantalla de carga spinner -- CASO 1*/ 
      }).catch((error)=>{ /* Atrapamos cualquier error en el intento de inicio de sesion */
        this.datosCorrectos = false; /* Al encontrar un error colocamos la variable datosCorrectos como falsa */
        this.textoError = error.message /* Mostramos al usuario el error encontrado en el catch */
        this.spinner.hide(); /* Ocultamos la pantalla de carga spinner -- CASO 2 */ 
      })
    }
    else {
      this.datosCorrectos = false; /* Al no entrar al if asignamos la variable datosCorrectos como falsa */
      this.textoError = '¡Revisa que los datos esten correctos!' /* Llenamos la variable de reporte de errores */
    }
  }

}
