import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private collectionName = 'Users';

  constructor(private afs: AngularFirestore) { }

  create(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  get(uid: string) {
    return this.afs.collection<User>(this.collectionName, ref => ref.where('id', '==', uid)).valueChanges();
  }

  edit(editedUser: User) {
    return this.afs.collection<User>(this.collectionName).doc(editedUser.id).set(editedUser);
  }
}