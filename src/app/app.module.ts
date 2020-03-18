import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion'; /* Importado manualmente */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; /* Importado manualmente */
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire'; /* Importado manualmente */

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(), /* Importado manualmente */
    BrowserAnimationsModule, /* Importado manualmente */
    AngularFireModule.initializeApp(environment.firebase) /* Importado manualmente */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
