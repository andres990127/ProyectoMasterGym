import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion'; /* Importado manualmente */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; /* Importado manualmente */

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(), /* Importado manualmente */
    BrowserAnimationsModule /* Importado manualmente */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
