import { Component, OnDestroy, OnInit } from '@angular/core';
import myAppConfig from 'src/app/My-config/my-app-config'
import * as OktaSignIn from '@okta/okta-signin-widget'
import { OktaAuthService } from '@okta/okta-angular';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MapviewComponent } from '../mapview/mapview.component';


@Component({
  selector: 'app-okta',
  templateUrl: './okta.component.html',
  styleUrls: ['./okta.component.scss']
})
export class OktaComponent implements OnInit{

  oktaSignin: any;

  constructor(private oktaAuthService: OktaAuthService, private router: Router) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/marker-icon.png',
      features: {
        registration: true,
      },
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authparams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scope: myAppConfig.oidc.scopes
      }
    });
  }
  ngOnInit(): void {
    this.Oktauser();
  }
  Oktauser(): void {
    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget'
    },
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuthService.signInWithRedirect();
        }
      }, (error: any) => {
        throw error;
      });
  }
  

 
}
