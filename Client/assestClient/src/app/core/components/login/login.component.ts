import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  getCode: any;
  returnedUrl: any;

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path == 'response') {
      if (this.route.snapshot.queryParams['code']) {
        this.getCode = this.route.snapshot.queryParams['code'];
        this.submitCode();
      }
    }
  }

  redirectToServer() {
    let url =
      this.route.snapshot.queryParams['returnUrl'] != undefined
        ? this.route.snapshot.queryParams['returnUrl']
        : '';
    console.log(url);

    window.location.href =
      'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid profile email&access_type=offline&client_id=846450728737-qha7aq2eecmv465j49os7vogb42kfisb.apps.googleusercontent.com&redirect_uri=http://localhost:4200/response&prompt=consent&state=' +
      url;
    event?.preventDefault();
  }

  submitCode() {
    let param = {
      code: this.getCode,
    };
    console.log(param);

    this.authService.login(param).subscribe({
      next: (data) => {
        this.returnedUrl =
        this.route.snapshot.queryParams['state'] || '/dashboard';
        this.authService.raiseDataEmitterEvent(true);
      this.router.navigateByUrl(this.returnedUrl);
      },
      error: (err) => console.log(err)
    })


  }
}
