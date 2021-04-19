import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Output, ViewChild } from '@angular/core';
import { NgxChessBoardService, PieceIconInput, NgxChessBoardComponent } from 'ngx-chess-board';
import { Router } from '@angular/router';

import { uuid as v4 } from 'uuidv4';

import { Problem } from './problem';
import { ProblemsService } from './services/problems.service';
import { ScoresService } from './services/scores.service';
import { Score } from './score';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  


  constructor(
    private ngxChessBoardService: NgxChessBoardService,
    private problemService: ProblemsService,
    private router: Router,
    private scoreService: ScoresService
   
    ) { 
      this.boardManager;
      this.sitrep = "";
      this.randomProblem = new Problem();
    
    }

  ngOnInit(): void {
    
    this.populateProblems();

    this.populateScores();
    
    

  }
  
  //MODAL STUFF 

  // Get the modal
  

  // Get the button that opens the modal
  btn = document.getElementById("myBtn");
  
  // Get the <span> element that closes the modal
  span = document.getElementsByClassName("close")[0];

  isChallengeOngoing = false;

  currentScore = 0;

  completedProblems = Array();

  challengeMoveSequence = Array();

  moveNumber = 0;

  randomProblem: Problem;

  isComputerTurn = false;

  Problems = Array();
  title = 'checkmate';
  situation: any;
  sitrep: string;
  Scores = Array(); //SCORES;
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

  

  
  populateScores() {
    
    this.scoreService.getScoresList().valueChanges().subscribe(res => {
      console.log(res);
    });
    let scoreRes = this.scoreService.getScoresList();
    scoreRes.snapshotChanges().subscribe(res => {
      this.Scores = Array();
      res.forEach(item => {
        let p = item.payload.toJSON();
        
        this.Scores.push(p as Score);
        this.Scores.sort((a,b) => b.scoreValue - a.scoreValue);
      })
    })
    
  }
  
  createScore() {

    try {
      
      let userName = "TEST"; //TODO GET USERNAME PROMPT

      if(userName != null) {
        let tempScore = new Score();
        tempScore.uuid = Math.floor(Math.random() * (99999999999 - 1 + 10000000000) + 10000000000).toString();
        tempScore.username = userName;
        tempScore.scoreValue = Number(Math.floor(Math.random() * (50 - 1 + 1) + 1));
        tempScore.dateTime = Math.round(+new Date()/1000);
        this.scoreService.createScore(tempScore).then(res => {
          //TODO CLEANUP
          //this.populateScores();
        })
      }
      
    }
    catch(e) {

      //TODO ERROR HANDLE

    }

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

  requestUserNameForScore() {
    
    //TODO

  }

  ngOnDestroy() {

  }

  routeOpenings() {
    
    let modal = document.getElementById("myModal");
    if(modal != null) {
      modal.style.display = "block";
    }

  }
  
  closeModal() {
    let modal = document.getElementById("myModal");
    if(modal != null) {
      modal.style.display = "none";
    }
  }

  triggerSuccModal() {
    let modal = document.getElementById("mySuccModal");
    if(modal != null) {
      modal.style.display = "block";
      setTimeout(() => { 
        if(modal != null) {
          modal.style.display = "none"; 
        }
        
      }, 4000);
      //this.sleep(4000);
      
    }
  }

  openScoreModal() {
    let modal = document.getElementById("myScoreModal");
    if(modal != null) {
      modal.style.display = "block";
      //setTimeout(() => { }, 2000);
      //modal.style.display = "none";
    }
  }

  submitScore() {

    try {
      
      let userName = (<HTMLInputElement>document.getElementById('usernameInput')).value; //TODO GET USERNAME PROMPT

      if(userName != null) {
        let tempScore = new Score();
        tempScore.uuid = v4.toString();
        tempScore.username = userName;
        tempScore.scoreValue = this.currentScore;
        tempScore.dateTime = Math.round(+new Date()/1000);
        this.scoreService.createScore(tempScore).then(res => {
          //TODO CLEANUP
          this.populateScores();
          this.currentScore = 0;
          this.isChallengeOngoing = false;
          let modal = document.getElementById("myScoreModal");
          if(modal != null) {
            modal.style.display = "none";
            this.boardManager?.reset();
            //setTimeout(() => { }, 2000);
            //modal.style.display = "none";
          }
        })
      }
      
    }
    catch(e) {

      //TODO ERROR HANDLE

    }

  }

  sleep(milliseconds: number) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
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

  loadFENToBoard(fen: string) {
    try {
      this.boardManager?.setFEN(fen);
    }
    catch(e) {

    }
  }

  changeReg() {
    console.log(this.boardManager?.getFEN());
    
    if(this.isChallengeOngoing && this.isComputerTurn == false) {

      let hist = this.boardManager?.getMoveHistory();
      console.log(hist);
      if(hist != null && this.randomProblem.moveOrder != null) {
        console.log("HIST: " + hist[hist.length - 1].move);
        console.log("MoveCompare: " + this.randomProblem.moveOrder[this.moveNumber].combined);

        if(hist[hist.length - 1].move == this.randomProblem.moveOrder[this.moveNumber].combined) {

          let moveOrderLen = this.randomProblem.moveOrderLength;
          console.log(moveOrderLen);
          
          console.log(this.moveNumber + 1);

          if(moveOrderLen == this.moveNumber + 1) {
            this.triggerSuccModal();

            this.nextProblem();
          }
          else {
            if(this.randomProblem.moveOrder[1 + this.moveNumber].combined != null) {
              this.isComputerTurn = true;
              this.boardManager?.move(this.randomProblem.moveOrder[1 + this.moveNumber].combined);
              this.isComputerTurn = false;
              this.moveNumber = this.moveNumber + 2;
            }
          }         


        }
        else {
          this.failChallenge();
        }
      }
    }

  }

  startChallenge() {
    this.randomProblem = this.Problems[Math.floor(Math.random() * this.Problems.length)];
    console.log(this.randomProblem);
    if(this.randomProblem.FEN != null) {
      this.loadFENToBoard(this.randomProblem.FEN);
    }
    
    this.moveNumber = 0;
    this.isChallengeOngoing = true;

  }

  failChallenge() {
    console.log("FAILURE");
    this.openScoreModal();

    this.boardManager?.reset();
  }
  
  nextProblem() {
    console.log("YOU DID IT!");
    this.currentScore = this.currentScore + 1;
    this.completedProblems.push(this.randomProblem.id);
    let isNotDoneYet = false;
    while(isNotDoneYet == false) {
      this.randomProblem = this.Problems[Math.floor(Math.random() * this.Problems.length)];
      console.log(this.randomProblem);
      if(this.randomProblem.FEN != null && !this.completedProblems.includes(this.randomProblem.id)) {
        this.loadFENToBoard(this.randomProblem.FEN);
        isNotDoneYet = true;
        this.moveNumber = 0;
      }
      
      
    }
  }

}


