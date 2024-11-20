import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  login: boolean;
  nombreUsuario: any;


  constructor(private authService: AuthService) {
    this.login = this.authService.isLoggedIn;
    this.nombreUsuario = this.authService.nombreUser;
  }

  CerrarSesion() {
    this.authService.logoutUser()
    window.location.href = '/'
  }

}
