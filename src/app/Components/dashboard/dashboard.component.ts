import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { OktaAuthService } from '@okta/okta-angular';


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

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private oktaAuthService: OktaAuthService) {
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
        this.name = (await claims).name || "" , 
        this.email = (await claims).email || ""
      }
      let req={
        name: this.name,
        email:this.email
      }
      console.log(req)
  }
  logout() {
    this.oktaAuthService.signOut();
  }
}
