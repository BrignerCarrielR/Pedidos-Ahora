import { Component } from '@angular/core';
import {InicioComponent} from '../inicio/inicio.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-lista-menus',
  standalone: true,
  imports: [
    InicioComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './lista-menus.component.html',
  styleUrl: './lista-menus.component.css'
})
export class ListaMenusComponent {

}
