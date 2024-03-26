import { EventEmitter, Injectable } from '@angular/core';
import { Constants } from "../constants/constants";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_ENDPOINT = Constants.API_ENDPOINT;

  //dataEmitter = new EventEmitter<any>();
  isLoginSubject = new BehaviorSubject<any>(false);

  constructor(private http : HttpClient, private router : Router) { }

  public getItem(key: string){
    return localStorage.getItem(key)
  }

  public setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  // check if logged in
  public isLoggedIn(){
    if(localStorage.getItem("JWT_TOKEN") != null){
      return true;
    }
    else{
      return false;
    }
  }

  //login
  public login(param : any) : Observable<any>{
    return this.http.post(this.API_ENDPOINT+'google/oauth2/tokens',param).pipe(
      map(user => {
        let data: any = user;
        if(data && data.token["access_token"] && data.token["refresh_token"]){
          this.setItem("JWT_TOKEN",btoa(data.token["access_token"]));
          this.setItem("REFRESH_TOKEN",btoa(data.token["refresh_token"]));

          let encodedUserId = btoa(data.user["user_id"]);
          let encodedUserRole = btoa(data.user["role"]);

          this.setItem("userId",encodedUserId);
          this.setItem("userRole",encodedUserRole);
        }
      })
    )
  }

  //get decrepted userEmail
  public getUserId(){
    let getId :any = this.getItem("userId");
    return atob(getId);
  }

  //get decrepted userRole
  public getUserRole(){
    let getRole :any = this.getItem("userRole");
    console.log(getRole);

    return atob(getRole);
  }

  //get decrepted accessToken
  public getAccessToken(){
    let getAccessToken : any = this.getItem("JWT_TOKEN");
    return atob(getAccessToken);
  }

  //get decrepted refreshToken
  public getRefreshToken(){
    let getRefreshToken : any = this.getItem("REFRESH_TOKEN");
    return atob(getRefreshToken);
  }

  //remove from localStorage
  public removeLocalStorage(){
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    this.router.navigate(['']);
  }

  public logout(){
    this.removeLocalStorage();
  }

  //Auth interceptor

  //1.call refresh token
  public refreshToken(){
    const tokenData = {
      "refresh_token" : this.getRefreshToken()
    }

    return this.http.put(this.API_ENDPOINT+'google/oauth2/refresh',tokenData)
  }

  //2.save new tokens
  public saveNewToken(access_token : string, refresh_token : string){
    this.setItem("JWT_TOKEN",access_token);
    this.setItem("REFRESH_TOKEN",refresh_token);
  }

  raiseDataEmitterEvent(blnValue: boolean){
    console.log(this.isLoggedIn());
    //this.dataEmitter.emit(this.isLoggedIn());
    // this.isLoginSubject.next(this.isLoggedIn());
    this.isLoginSubject.next(blnValue);
  }
}
