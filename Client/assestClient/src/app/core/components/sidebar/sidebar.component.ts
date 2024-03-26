import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService : AuthService) { }

  isLogin : boolean = false;
  userRole : any;

  ngOnInit(): void {
    console.log("sidebar");

    this.authService.isLoginSubject.subscribe((value)=>{
      console.log(value);
      this.isLogin = value;
      this.userRole = this.authService.getUserRole();
    })
console.log(this.isLogin);

if(localStorage.getItem("JWT_TOKEN")){
      console.log("role",this.authService.getUserRole());
      this.userRole = this.authService.getUserRole();
      
    }


    // if(this.authService.isLoggedIn()){
    //   this.authService.isLoginSubject.subscribe((value)=>{
    //     console.log(value);
    //     this.isLogin = value;
    //   })
    // }
  }

}
