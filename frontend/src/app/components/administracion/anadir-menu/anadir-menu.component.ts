import { Component } from '@angular/core';
import {InicioComponent} from '../inicio/inicio.component';

@Component({
  selector: 'app-anadir-menu',
  standalone: true,
  imports: [
    InicioComponent
  ],
  templateUrl: './anadir-menu.component.html',
  styleUrl: './anadir-menu.component.css'
})
export class AnadirMenuComponent {

}
