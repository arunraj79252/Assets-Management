import {  Component, OnInit } from '@angular/core';
import { AuthService } from "./core/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent  implements OnInit{

  
  title = 'Assest Management';
  isLogin : any = false;

  constructor(private authService : AuthService){}

  ngOnInit(): void {
    if(localStorage.getItem("JWT_TOKEN")){
      // this.isLogin = true
      this.authService.raiseDataEmitterEvent(true)

    }
  }
}
