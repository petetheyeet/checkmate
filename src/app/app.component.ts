import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Output, Pipe, ViewChild } from '@angular/core';
import { NgxChessBoardService, PieceIconInput, NgxChessBoardComponent } from 'ngx-chess-board';
import { Router } from '@angular/router';

import { uuid as v4 } from 'uuidv4';

import { Problem } from './problem';
import { ProblemsService } from './services/problems.service';
import { ScoresService } from './services/scores.service';
import { Score } from './score';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Move } from './move';



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

  myCanvas = document.getElementsByClassName("succModal");

  isChallengeOngoing = false;

  currentScore = 0;

  completedProblems = Array();

  challengeMoveSequence = Array();

  moveNumber = 0;

  randomProblem: Problem;

  isComputerTurn = false;

  currentSolution = Array();

  //settings

  solutionsVisibility = false;
  cheaterMode = false;
  soundAudible = true;

  cheaterModeEnabledForGame = false;
  
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

  openSettingsModal() {
    let modal = document.getElementById("mySettingsModal");
    if(modal != null) {
      modal.style.display = "block";
    }
  }

  closeSettingsModal() {
    let modal = document.getElementById("mySettingsModal");
    if(modal != null) {
      modal.style.display = "none";
    }
  }

  triggerSuccModal() {
    this.playSound(3);
    let modal = document.getElementById("mySuccModal");
    if(modal != null) {
      modal.style.display = "block";
      setTimeout(() => { 
        if(modal != null) {
          modal.style.display = "none"; 
        }
        
      }, 3000);
      //this.sleep(4000);
      
    }
  }

  openScoreModal() {
    let modal = document.getElementById("myScoreModal");
    if(modal != null) {
      modal.style.display = "block";
      let solutionsModal = document.getElementById("myScoreSolution");
      console.log(this.solutionsVisibility);
      if(this.solutionsVisibility && solutionsModal != null) {
        console.log("SHould be visible");
        solutionsModal.style.display = "block"
      }
      //setTimeout(() => { }, 2000);
      //modal.style.display = "none";
    }
  }

  toggleSolutionsVis() {
    this.solutionsVisibility = !this.solutionsVisibility;
    console.log("Solution Visibility: " + this.solutionsVisibility);
  }

  toggleSounds() {
    this.soundAudible = !this.soundAudible;
    console.log("Sounds: " + this.soundAudible);
  }

  toggleCheaterMode() {
    this.cheaterMode = !this.cheaterMode;
    console.log("Cheater Mode: " + this.cheaterMode);

    if(this.isChallengeOngoing && this.cheaterMode) {
      this.cheaterModeEnabledForGame = true; 
    }

    if(this.cheaterMode) {
      let modal = document.getElementById("answers");
      if(modal != null) {
        modal.style.display = "block";
      }
    }
    else {
      let modal = document.getElementById("answers");
      if(modal != null) {
        modal.style.display = "none";
      }
    }
  }

  playSound(choice: number) {

    if(this.soundAudible) {
      let audio = new Audio();
      audio.volume = 0.2;
      switch(choice) {
        case 1: {
          audio.src = "/assets/sounds/moveMadeDefault.wav";
          break;
        }
        case 2: {
          //audio.src = "/assets/sounds/failDefault.wav";
          //break;

          var r = Math.floor(Math.random() * 100) + 1;
          if(r < 5) {
            audio.src = "/assets/sounds/failAltMungusMeeting.mp3";
          } else if(r < 50) {
            audio.src = "/assets/sounds/failAltRecord.mp3";
          } else if(r < 90) {
            audio.src = "/assets/sounds/failAltLeagueWarn.mp3";
          } else if(r < 100) {
            audio.src = "/assets/sounds/failAltMungusMeeting.mp3";
          }
          else {
            audio.src = "/assets/sounds/failDefault.mp3";
          }
          break;

        }
        case 3: {
          var r = Math.floor(Math.random() * 100) + 1;
          if(r < 33) {
            audio.src = "/assets/sounds/victoryMainRoblox.mp3";
          } else if(r < 66) {
            audio.src = "/assets/sounds/victoryAltValorantAce.mp3";
          }
          else {
            audio.src = "/assets/sounds/victoryAltParty.mp3";
          }
          break;
        }
        default: {
          audio.src = "/assets/sounds/moveMadeDefault.wav";
          break;
        }
      }

      audio.load();
      audio.play();
    }

  }

  submitScore() {

    try {
      
      if(!this.cheaterModeEnabledForGame) {
        let userName = (<HTMLInputElement>document.getElementById('usernameInput')).value; 

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
      else {
        this.currentScore = 0;
        this.isChallengeOngoing = false;
        let modal = document.getElementById("myScoreModal");
        if(modal != null) {
           modal.style.display = "none";
           this.boardManager?.reset();
          //setTimeout(() => { }, 2000);
          //modal.style.display = "none";
          let solutionText = document.getElementById("scoreSolutionText");
          if(solutionText != null) {
            solutionText.innerHTML = "";
          }
        }
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
    this.playSound(1);
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
            this.boardManager?.reset();
            this.nextProblem();
          }
          else {
            if(this.randomProblem.moveOrder[1 + this.moveNumber].combined != null) {
              this.isComputerTurn = true;
              this.boardManager?.move(this.randomProblem.moveOrder[1 + this.moveNumber].combined);
              this.isComputerTurn = false;
              this.moveNumber = this.moveNumber + 2;
              this.playSound(1);
            }
          }         


        }
        else {
          this.currentSolution = this.randomProblem.moveOrder;
          this.playSound(2);
          console.log(this.currentSolution);
          this.failChallenge();
        }
      }
    }

  }

  displayCurrentSolution() {
    var retSolution = "";
    if(this.randomProblem.moveOrder != null) {
      //console.log(this.randomProblem.moveOrder.length);
      for(var i = 0; i < this.randomProblem.moveOrderLength; i++) {
        console.log(this.randomProblem.moveOrder[i]);
        retSolution = retSolution + (i + 1) + ". " + 
        this.randomProblem.moveOrder[i].combined + "    ";
      }
      console.log(retSolution);
    }
    
    return retSolution;
  }

  startChallenge() {
    this.cheaterModeEnabledForGame = this.cheaterMode;
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
    console.log(this.currentSolution);
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



