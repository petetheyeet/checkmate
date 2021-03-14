import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Output, ViewChild } from '@angular/core';
import { NgxChessBoardService, PieceIconInput, NgxChessBoardComponent } from 'ngx-chess-board';



import { Score, SCORES } from '../score';
import { Problem } from './problem';
import { ProblemsService } from './services/problems.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  

  Problems = Array();
  title = 'checkmate';
  situation: any;
  sitrep: string;
  scores = SCORES;
  selectedScore?: Score;
  counter = 0;
  public fen ="";
  public darkTileColorGray = "rgb(53, 53, 53)";
  public lightTileColorGray = "darkgray";

  @ViewChild('board', {static: false}) boardManager: NgxChessBoardComponent | undefined;

  icons: PieceIconInput = {
    blackBishopUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
    blackKingUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
    blackKnightUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
    blackPawnUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',
    blackQueenUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
    blackRookUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
    whiteBishopUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
    whiteKingUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
    whiteKnightUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
    whitePawnUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg',
    whiteQueenUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
    whiteRookUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg'
};

  

  constructor(private ngxChessBoardService: NgxChessBoardService,
    private problemService: ProblemsService) {
    
    this.boardManager;
    this.sitrep = "";
    this.scores.sort((a,b) => b.score - a.score);
  }

  ngOnInit() {
    this.populateProblems();
  }

  populateProblems() {
    this.problemService.getProblemList().valueChanges().subscribe(res => {
      console.log(res);
    });
    let problemRes = this.problemService.getProblemList();
    problemRes.snapshotChanges().subscribe(res => {
      this.Problems = Array();
      res.forEach(item => {
        let p = item.payload.toJSON();
        
        this.Problems.push(p as Problem);
      })
    })
    console.log(this.Problems);
  }

  

  

  resetBoard() {
    this.boardManager?.reset();
  }

  flipBoard() {
    this.boardManager?.reverse();
  }

  loadCustom(event: any) {
    console.log("loadCustom trigger");
    try {
      console.log(this.situation);
      this.sitrep = this.situation;
      this.boardManager?.setFEN(this.sitrep);
    }
    catch(e) {
      console.log("error " + e);
    }
  }

  setCustomer() {
    console.log("loadCustom trigger");
    try {
      console.log(this.situation);
      this.sitrep = this.situation;
      this.boardManager?.setFEN(this.sitrep);
    }
    catch(e) {
      console.log("error " + e);
    }
  }

  changeReg() {
    console.log(this.boardManager?.getFEN()); 
  }

}


