import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService} from '../../../api.service';
import {AuthService} from '../../../auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './lista-pedidos.component.html',
  styleUrl: './lista-pedidos.component.css'
})
export class ListaPedidosComponent implements OnInit {
  listaPedidos: any[] = []

  constructor(private authService: AuthService, private apiService: ApiService) {
  }

  ngOnInit() {
    console.log('Se cargó de manera correcta')
    this.getListaPedidos()
  }

  getListaPedidos() {
    this.apiService.get<any[]>(`pedidos/${this.authService.id}`).subscribe(
      data => {
        this.listaPedidos = data;
        console.log(this.listaPedidos)
      }, error => {
        console.error(error);
      }
    )
  }
  getCancelarPedido(id: number){
    this.apiService.get<{ message: string }>(`cancelar_pedido/${id}`).subscribe(
      data => {
        console.log(data.message)
        alert(data.message)
        window.location.href = '/pedidos'
      }, error => {
        console.error(error);
      }
    )
  }
}
