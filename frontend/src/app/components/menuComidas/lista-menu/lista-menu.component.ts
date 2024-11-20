import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth.service';
import { ApiService } from '../../../api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


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
  login: boolean = false;

  constructor(private authService: AuthService, private apiService: ApiService) {}

  ngOnInit(): void {
    console.log('Id obtenido desde el servicio:', this.authService.id);
    console.log('Estado del logueo:', this.authService.isLoggedIn);
    this.login = this.authService.isLoggedIn;

    this.getMenuItems();
  }

  getMenuItems() {
    this.apiService.get<any[]>('menu_comida')
      .subscribe(
        data => {
          this.menuItems = data;
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
      id_comida: menu.id,  // ID del menú actual
      cantidad: menu.cantidad
    };

    this.apiService.post('agregar_pedido_carrito', pedido).subscribe(
      data => {
        console.log('Pedido agregado al carrito:', data);
        alert('Pedido agregado al carrito')
      }, error => {
        console.error('Error al agregar al carrito:', error);
      }
    );
  }
}
