import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { fromEventPattern } from 'rxjs';
import { BongcloudComponent } from './openings/bongcloud/bongcloud.component';
import { ChessboardComponent } from './pages/chessboard/chessboard.component';


const routes: Routes = [
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
