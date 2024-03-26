import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, finalize, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // if refresh token called or not
  isRefreshing : boolean = false;
  private refreshTokenSubject : BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService : AuthService, private router : Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //check for accessToken and append to api request
    if(this.authService.getAccessToken())
    request = this.addToken(request,this.authService.getAccessToken())
    return next.handle(request).pipe(
      catchError((objError : any) => {
        //handle error response
        if(objError instanceof HttpErrorResponse && (objError.status === 401)){
          return this.handle401Error(request,next);
        }
        else{
          return throwError(() => objError);
        }
      })
    );
  }


  /**
   * Add access token to api request
   * @param objRequest http request
   * @param access_token access token
   * @return headers
   */
  private addToken(objRequest : HttpRequest<any>,access_token : string | null) : HttpRequest<any>{
    //append content-type for login api request
    if(objRequest.url.includes('/login')){
      return objRequest.clone({
        setHeaders: {
          'Content-Type' : `application/json; charset=utf-8`
        }
      })
    }
    //append content-type and access token for all api request
    else{
      return objRequest.clone({
       setHeaders : {
         'Content-Type' : `application/json; charset=utf-8`,
         'Authorization' : `${access_token}`
       }
     })
    }
  }

  /** Handle 401 Error response */
  private handle401Error(objRequest : HttpRequest<any>,objNext : HttpHandler) : Observable<HttpEvent<any>>{
    if(!this.isRefreshing){
      this.isRefreshing = true;
      //clear refresh token subject
      this.refreshTokenSubject.next(null);

      //generate new access token with refresh token
      return this.authService.refreshToken().pipe(
        switchMap( (objToken : any) => {
          this.isRefreshing = false;
          this.authService.saveNewToken(objToken.accessToken,objToken.refreshToken);
          this.refreshTokenSubject.next(objToken.accessToken);
          return objNext.handle(this.addToken(objRequest, objToken.accessToken));
        }),
        catchError((objError : any) => {
          this.isRefreshing = false;
          this.authService.removeLocalStorage();
          return throwError(() => new Error(objError))
        })
      )
    }

    else{
      return this.refreshTokenSubject.pipe(
        filter((strToken) => strToken != null),
        take(1),
        switchMap((jwt) =>
          objNext.handle(this.addToken(objRequest,jwt))),
        finalize(() => {
          //finished refresh token
        })
      )
    }
  }
}
