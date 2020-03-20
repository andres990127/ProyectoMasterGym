import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion'; /* Importado manualmente */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; /* Importado manualmente */
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire'; /* Importado manualmente */
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms'; /* Importado manualmente */
import { NgxSpinnerModule } from "ngx-spinner"; /* Importado manualmente */
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(), /* Importado manualmente */
    BrowserAnimationsModule, /* Importado manualmente */
    AngularFireModule.initializeApp(environment.firebase), /* Importado manualmente */
    ReactiveFormsModule, /* Importado manualmente */
    NgxSpinnerModule /* Importado manualmente -- PRIMERO SE EJECUTA EN LA TERMINAL EL COD: npm install ngx-spinner --save */
  ],
  providers: [
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
