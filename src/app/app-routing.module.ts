import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';

import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { MapComponent } from './Components/map/map.component';
import { MapviewComponent } from './Components/mapview/mapview.component';
import { OktaComponent } from './Components/okta/okta.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { TableComponent } from './Components/table/table.component';

const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: '', redirectTo: "login", pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'okta/callback', component: OktaCallbackComponent },
  { path: 'okta', component: OktaComponent },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: '/dashboard/map', pathMatch: 'full' },
      { path: 'map', component: MapComponent, },
      { path: 'table', component: TableComponent },
    ]
  },
  { path: 'map-view', component: MapviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
