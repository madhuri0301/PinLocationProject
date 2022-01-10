import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './Components/registration/registration.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './Components/dashboard/dashboard.component'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import { MapComponent } from './Components/map/map.component';
import {MatMenuModule} from '@angular/material/menu';
import { MarkerService } from './Services/marker.service';
import { TableComponent } from './Components/table/table.component';
import { MapviewComponent } from './Components/mapview/mapview.component';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';


import myAppConfig from './My-config/my-app-config';
import { Router } from '@angular/router';
import { OktaComponent } from './Components/okta/okta.component';
import { OpenDialogComponent } from './Components/open-dialog/open-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';


const oktaConfig = Object.assign({
onAuthRequired: (oktaAuth:any, injector: Injector) =>{
  const router = injector.get(Router);
  router.navigate(['/okta']);
}
},myAppConfig.oidc)

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    MapComponent,
    TableComponent,
    MapviewComponent,
    OktaComponent,
    OpenDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatListModule,
    MatMenuModule,
    OktaAuthModule,
    MatDialogModule


  ],
  providers: [
    {
      provide: OKTA_CONFIG, useValue: oktaConfig
    },
    MarkerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
