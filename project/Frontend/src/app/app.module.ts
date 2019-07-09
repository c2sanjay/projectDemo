import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import {ProductService} from './services/product.service';
import {RegisterService} from './services/register.service'
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GuardsComponent } from './guards/guards.component';
import {canActivateAuthGuard} from './guards/auth.guards';
import {TokenInterceptorService} from './services/token-interceptor.service';
import { CountryComponent } from './country/country.component';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    RegisterComponent,
    LoginComponent,
    GuardsComponent,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule, Ng2SearchPipeModule
  ],
  providers: [ProductService, RegisterService,canActivateAuthGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
