import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxChessBoardModule, NgxChessBoardComponent } from "ngx-chess-board";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChessBoardModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    
    MatListModule,
 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  


}




