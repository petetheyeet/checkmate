import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Output, ViewChild } from '@angular/core';
import { NgxChessBoardService, NgxChessBoardView } from 'ngx-chess-board';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'checkmate';

  situation: any;

  //board: NgxChessBoardView;

  constructor(private ngxChessBoardService: NgxChessBoardService) {
    this.board;
  }

  

  @ViewChild('board', {static: false}) board: NgxChessBoardView | undefined;

  resetBoard() {
    this.board?.reset();
  }

  loadSituation(event: any) {
    
  }

}


