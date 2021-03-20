import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxChessBoardModule, NgxChessBoardComponent } from "ngx-chess-board";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from 'src/environments/environment.prod';
import { SicilianComponent } from './openings/sicilian/sicilian.component';
import { BongcloudComponent } from './openings/bongcloud/bongcloud.component';
import { KingsComponent } from './openings/kings/kings.component';
import { QueensComponent } from './openings/queens/queens.component';
import { ChessboardComponent } from './pages/chessboard/chessboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SicilianComponent,
    BongcloudComponent,
    KingsComponent,
    QueensComponent,
    ChessboardComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChessBoardModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,

    MatListModule,
 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  

}




