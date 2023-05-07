import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from '../models/Subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private collectionname = 'Subscriptions';
  constructor(private afs: AngularFirestore) { }

  create(sub: Subscription) {
    sub.id = this.afs.createId();
    return this.afs.collection<Subscription>(this.collectionname).doc(sub.id).set(sub);
  }

  delete(id: string) {
    return this.afs.collection<Subscription>(this.collectionname).doc(id).delete();
  }

  getAll(uid: string) {
    return this.afs.collection<Subscription>(this.collectionname, ref => ref.where('uid', '==', uid).orderBy('subscribedAt', 'desc')).valueChanges();
  }
}
