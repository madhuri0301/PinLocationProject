import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';
import * as _ from 'underscore';

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
  users: any;
  userId: any;
  index:any;

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

  ngOnInit() {
    this.getusers();
    this.logindetails();
  }
  getusers() {
    this.http.get<any>("http://localhost:8000/getusers").subscribe(
      (req: any) => {
        console.log(req);
        this.users = req
      })
    err => {
      console.log("something went wrong", err)
    }
  }
    async logindetails(){
    this.isAuthenticated = await this.oktaAuthService.isAuthenticated();

    if (this.isAuthenticated) {

      const claims = this.oktaAuthService.getUser();
      this.firstname = (await claims).given_name
      this.lastname = (await claims).family_name
      this.email = (await claims).email
      console.log(this.firstname, this.lastname, this.email)
    }
    let data = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      registrationType: 'okta'
    }
    console.log(data)
    console.log(this.users);
    for (let i = 0; i <= this.users.length; i++) {
     
      let empIdNameObject= _.pick(this.users[i], "firstname","lastname","email", "registrationType");
     console.log("empIdNameObject", empIdNameObject);
     
      
      if (JSON.stringify(empIdNameObject) === JSON.stringify(data)) {
       console.log("already registered", this.users[i],data,i);
       this.index=i
      
         this.userId= this.users[this.index].id;
        console.log("userId",this.userId);
      }else{
        
        
      }
    }
  }
 
    logout() {
      this.oktaAuthService.signOut();
    }
    Logout() {
      localStorage.removeItem("token");
    }
  }
