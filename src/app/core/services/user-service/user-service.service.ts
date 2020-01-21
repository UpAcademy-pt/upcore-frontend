import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { ReplaySubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private url = 'http://localhost:8080/coreFinalProject/users/';
 
  private currentUser: User = new User();
  public currentUser$: ReplaySubject<User> = new ReplaySubject(1);

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.currentUser$.next(new User());
  }

  public isAuthenticated(): boolean {
    if (this.currentUser && this.currentUser.id) {
      return true;
    } else {
      return false;
    }
  }

  public isAdmin(){
    if (this.currentUser && this.currentUser.role == "ADMIN") {
      return true;
    }
    return false;
  }
  
  public isSuperUser(){
    if (this.currentUser && this.currentUser.role == "SUPERUSER") {
      return true;
    }
    return false;
  }

  public authenticateUser(user: User) {
    return this.http.post(this.url + "login", user);
  }

  public getCurrentName():string {
    return this.currentUser.name;
  }

  public getCurrentUser() {
    return this.currentUser;
  }

  public setCurrentUser(user: User) {
   this.currentUser = user;
   this.currentUser$.next(this.currentUser);
  }

  public logout() {
    this.currentUser = null;
    this.currentUser$.next(this.currentUser);
  }

  public getUsers(nameField: string, emailField: string, roleField: string) {
    const params = new HttpParams();
    params.set("name", nameField);
    params.set("email", emailField);
    params.set("role", roleField);
    return this.http.get(this.url, {params});
  }

  public createUser(user: User) {
    return this.http.post(this.url, user, {responseType: 'text'});
  }

  public updateUser(user: User) {
    return this.http.put(this.url + "edit", user, {responseType: 'text'});
  }

  public deleteUser(id: number) {
    return this.http.delete(this.url + id, {responseType: 'text'});
  }
<<<<<<< HEAD

  public validatePassword(id: number, email: string, oldPassword: number,newPassword: number){
    const params = new HttpParams();
    params.set("id", ""+id);
    params.set("email", email);
    params.set("oldPassword", ""+oldPassword);
    params.set("newPassword", ""+newPassword);
    return this.http.put(this.url,{params})
=======
  public validatePassword(user: User ,newPassword: string){
    const params = new HttpParams();
   // params.set("id", ""+id);
    //params.set("email", email);
    //params.set("oldPassword", ""+oldPassword);
    params.set("newPassword",newPassword);
    return this.http.put(this.url +user,{params})

>>>>>>> ba062bebcf82073274ccfcf9a9e96855c0cea04f
  }

  public resetPassword(id: number) {
    return this.http.put(this.url + "resetpassword/" + id, {responseType: 'text'});
  }

  user: User
  public updatePassword(currentPassword: string, newPassword: string) {
    this.user = this.getCurrentUser();
    this.user.password = currentPassword;
    
    return this.http.put(this.url + "validate?newPass=" + newPassword, this.user, {responseType: 'text'});
  }

  public getUserById(id: number){
    return this.http.get(this.url + id)
  }

}
