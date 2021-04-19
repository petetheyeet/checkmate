import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Score } from '../score';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  scoreListRef!: AngularFireList<any>;
  scoreRef!: AngularFireObject<any>;

  constructor(
    private db: AngularFireDatabase
  ) { }

  //GET ALL SCORES

  getScoresList() {
    this.scoreListRef = this.db.list('/scores');
    return this.scoreListRef;
  }

  //CREATE SCORE

  createScore(sc: Score) {
    this.scoreListRef = this.db.list('/scores');
    if(sc) {
      return this.scoreListRef.push({
        uuid: sc.uuid,
        username: sc.username,
        scoreValue: sc.scoreValue,
        dateTime: sc.dateTime
      });
    }
    else {
      throw Error("Create Score Failed");
    }
  }



}
