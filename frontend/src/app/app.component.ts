import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  login: boolean;
  nombreUsuario: any;
  isDropdownOpen: boolean = false;
  es_staff: boolean=false;


  constructor(private authService: AuthService, private router: Router) {
    this.login = this.authService.isLoggedIn;
    this.nombreUsuario = this.authService.nombreUser;
    this.es_staff = this.authService.es_staff;
  }

  // Toggle the dropdown menu
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // controlamos el cierre de secion
  CerrarSesion() {
    this.authService.logoutUser();
    window.location.href="/";
  }

  // Navegamos a el perfil
  goToProfile() {
    if (this.es_staff===true){
      window.location.href = '/administrador/inicio';
    }else{
      window.location.href="/mi_perfil";
    }

  }
}
