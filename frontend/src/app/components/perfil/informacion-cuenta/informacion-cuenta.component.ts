import { Component } from '@angular/core';
import {MiPerfilComponent} from '../mi-perfil/mi-perfil.component';

@Component({
  selector: 'app-informacion-cuenta',
  standalone: true,
  imports: [MiPerfilComponent],
  templateUrl: './informacion-cuenta.component.html',
  styleUrl: './informacion-cuenta.component.css'
})
export class InformacionCuentaComponent {

}
