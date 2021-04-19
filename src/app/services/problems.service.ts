import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProblemsService {

  problemListRef!: AngularFireList<any>;
  problemRef!: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  getProblemList() {
    this.problemListRef = this.db.list('/problems');
    return this.problemListRef;
  }

}
