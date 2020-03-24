import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {

  formularioCliente: FormGroup; /* Creamos el nuevo formulario para ingresar al cliente */
  constructor(private fb: FormBuilder) { } /* Inyectamos el servicio de formularios */

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

  agregar()
  {
    console.log(this.formularioCliente.value)
  }

}
