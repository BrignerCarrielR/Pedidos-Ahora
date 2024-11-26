import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../../auth.service';
import {ApiService} from '../../../api.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-lista-menu',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [ApiService], // Proveedor ApiService
  templateUrl: './lista-menu.component.html',
  styleUrls: ['./lista-menu.component.css']
})
export class ListaMenuComponent implements OnInit {
  menuItems: any[] = [];
  MenuItemsFiltrado: any[] = [];
  login: boolean = false;
  buscarComida: string = '';
  categories: string[] = [
    'Todas',
    'Comidas tipicas del País',
    'Comidas Internacionales',
    'Comidas Vegetarianas y Veganas',
    'Comidas de Desayuno',
    'Comidas Dulces',
    'Comidas Saludabless',
  ];

  constructor(private authService: AuthService, private apiService: ApiService) {
    console.log('Es staff?: ',authService.es_staff);
  }

  ngOnInit(): void {
    console.log('Id obtenido desde el servicio:', this.authService.id);
    console.log('Estado del logueo:', this.authService.isLoggedIn);
    this.login = this.authService.isLoggedIn;
    console.log(this.menuItems)
    this.getMenuItems();
  }

  // evento pra filtrar los elmentos segun lo ingreado
  onInputChange() {
    this.MenuItemsFiltrado = this.menuItems.filter(menu =>
      menu.nombre_plato.toLowerCase().includes(this.buscarComida.toLowerCase())
    );
    console.log('Menú filtrado:', this.MenuItemsFiltrado);
  }
  // funcion para truncar la descripcion para que se muestre un maximo de 4 palabras
  truncateDescription(descripcion: string, limitePalabras: number = 4): string {
    const palabras = descripcion.split(' ');
    if (palabras.length > limitePalabras) {
      return palabras.slice(0, limitePalabras).join(' ') + '...';
    }
    return descripcion;
  }

  selectedCategory: string = this.categories[0];
  selectedOrder: string = 'A-Z';

  // obtenemos los elementos del menú de la API
  getMenuItems() {
    this.apiService.get<any[]>('menu_comida')
      .subscribe(
        data => {
          this.menuItems = data;
          this.MenuItemsFiltrado = data; // definimos la lista filtrada al iniciar con todos los elementos
        },
        error => {
          console.error(error);
        }
      );
  }

  agregarAlCarrito(menu: any) {
    if (!menu.cantidad || menu.cantidad <= 0) {
      alert('Por favor, ingresa una cantidad válida.');
      return;
    }

    const pedido = {
      id_usuario: this.authService.id,
      id_comida: menu.id,
      cantidad: menu.cantidad
    };

    this.apiService.post('agregar_pedido_carrito', pedido).subscribe(
      data => {
        console.log('Pedido agregado al carrito:', data);
        alert('Pedido agregado al carrito');
      }, error => {
        console.error('Error al agregar al carrito:', error);
      }
    );
  }
}
