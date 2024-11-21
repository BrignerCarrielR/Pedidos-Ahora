import { Component } from '@angular/core';
import {MiPerfilComponent} from '../mi-perfil/mi-perfil.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [
    MiPerfilComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {

}
