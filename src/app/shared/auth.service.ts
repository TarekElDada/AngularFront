import { Injectable } from '@angular/core';
import { User } from '../login/user.model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean = false;
  currentUser: User | null = null;
  users: User[] = [
    { login: 'admin', password: 'admin', role: 'admin' },
    { login: 'user', password: 'user', role: 'user' },
    { login: 'user2', password: 'user2', role: 'user' }
  ];

  constructor(private router: Router) { }

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }

  isLogged(): boolean {
    return this.loggedIn;
  }

  isLoggedPromise(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(this.loggedIn);
    });
  }

  authentificate(user: User): boolean {
    const foundUser = this.users.find(u => u.login === user.login && u.password === user.password);
    if (foundUser) {
      console.log('User ' + user.login + ' is authenticated');
      this.currentUser = foundUser;
      this.logIn();
      return true;
    } else {
      console.log('User ' + user.login + ' is not authenticated');
      this.currentUser = null;
      this.logOut();
      return false;
    }
  }

  isAdmin() {
    const isUserAdmin = new Promise(
      (resolve, reject) => {
        if (this.loggedIn && this.currentUser) {
          resolve(this.currentUser.role === 'admin');
        } else {
          resolve(false);
        }
      }
    );

    return isUserAdmin;
  }
}
