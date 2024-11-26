import {Component} from '@angular/core';
import {InicioComponent} from '../inicio/inicio.component';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../../auth.service';
import {ApiService} from '../../../api.service';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-lista-menus',
  standalone: true,
  imports: [CommonModule, HttpClientModule, InicioComponent],
  providers: [ApiService],
  templateUrl: './lista-menus.component.html',
  styleUrl: './lista-menus.component.css'
})
export class ListaMenusComponent {
  listamenus: any[] = []

  constructor(private authService: AuthService, private apiService: ApiService) {
    console.log('Es staff?: ', authService.es_staff);
    this.getMenuItems();
  }

  // funcion para truncar la descripcion para que se muestre un maximo de 4 palabras
  truncateDescription(descripcion: string, limitePalabras: number = 3): string {
    const palabras = descripcion.split(' ');
    if (palabras.length > limitePalabras) {
      return palabras.slice(0, limitePalabras).join(' ') + '...';
    }
    return descripcion;
  }

  getMenuItems() {
    this.apiService.get<any[]>('menu_comida')
      .subscribe(
        data => {
          this.listamenus = data;
          console.log(this.listamenus)
        },
        error => {
          console.error(error);
        }
      );
  }
}
