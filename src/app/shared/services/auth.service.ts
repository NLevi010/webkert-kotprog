import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: firebase.default.User | null = null;

  constructor(private auth: AngularFireAuth) {
    this.auth.user.subscribe({
      next: (value) => {
        this.user = value;
      }
    });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  loggedInUser() {
    return this.auth.user;
  }

  isLoggedIn() {
    return this.user !== null;
  }

  loggedInId() {
    return this.user?.uid;
  }
}
