import { Component } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent {
  nombreUsuario: any;
  urlactual: string;

  constructor(private authService: AuthService, private router: Router) {
    this.nombreUsuario = this.authService.nombreUser;
    this.urlactual = this.router.url;
  }

  // Función para determinar si la URL actual corresponde con el enlace
  isActive(url: string): boolean {
    return this.urlactual === url;
  }
}

