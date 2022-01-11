import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  isAuthenticated: boolean = false;
  name: string = "";
  email: any;
  firstname: any;
  lastname: any;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private oktaAuthService: OktaAuthService, private http: HttpClient) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.oktaAuthService.$authenticationState.subscribe(
      isAuth => this.isAuthenticated = isAuth
    );
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);

  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuthService.isAuthenticated();

    if (this.isAuthenticated) {

      const claims = this.oktaAuthService.getUser();
      this.firstname = (await claims).given_name
      this.lastname = (await claims).family_name
      this.email = (await claims).email
      console.log(this.firstname, this.lastname, this.email)
    }
    let req = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      registrationType: 'okta'
    }
    console.log(req)
    // this.http.post<any>("http://localhost:8000/auth/register", req)
    //   .subscribe(res => {
    //     console.log(res);
    //   })
  }
  logout() {
    this.oktaAuthService.signOut();
  }
}
