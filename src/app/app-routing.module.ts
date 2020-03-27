import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { PreciosComponent } from './precios/precios.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';


const routes: Routes = [
  {
    path:'', redirectTo: 'inscripcion', pathMatch: 'full' /* El path vacio significa que es la primera en mostrarse, el redirectTo significa que si esta vacio lo redirecciona a ese componente */
  },
  {
    path:'inscripcion', component: InscripcionComponent  
  },
  {
    path: 'listado-clientes', component: ListadoClientesComponent
  },
  {
    path: 'agregar-cliente', component: AgregarClienteComponent
  },
  {
    path: 'agregar-cliente/:clienteID', component: AgregarClienteComponent /* Se duplica para expresar que la ruta puede recibir, o no, un parametro */
  }, /* Significa que recibe algo ↑↑↑ */
  {
    path: 'precios', component: PreciosComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
