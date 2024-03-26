import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService : AuthService) { }

  isLogin : boolean = false;
  public isCollapsed = true;

  ngOnInit(): void {
    console.log(this.authService.getItem("userId"));
    this.authService.isLoginSubject.subscribe((value)=>{
      console.log(value);
      this.isLogin = value;
    })
    // if(localStorage.getItem("JWT_TOKEN")){
    //   this.isLogin = true
    // }
  }

  toggleSideNav(){
    console.log("clicked");

    var elem = document.getElementsByTagName("body");
    var elemClass = elem[0].className;

    elemClass == "" ? elem[0].setAttribute("class","sidebar-icon-only") : elem[0].removeAttribute("class");
  }

}
