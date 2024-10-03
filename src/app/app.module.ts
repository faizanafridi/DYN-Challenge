import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Your routing module
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from './app.component'; // Import the standalone AppComponent

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent, // Import AppComponent here
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  bootstrap: [AppComponent] // Bootstrap the AppComponent
})
export class AppModule { }
