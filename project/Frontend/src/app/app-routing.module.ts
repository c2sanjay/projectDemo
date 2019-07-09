import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {canActivateAuthGuard} from './guards/auth.guards';
import { CountryComponent } from './country/country.component';

const routes: Routes = [
  {path:'country', component:CountryComponent, canActivate:[canActivateAuthGuard]},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'product', component:ProductComponent, canActivate:[canActivateAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
