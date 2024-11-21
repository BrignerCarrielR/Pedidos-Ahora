import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import {ApiService} from '../../../api.service';
import {AuthService} from '../../../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent} from '../inicio/inicio.component';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, InicioComponent],
  providers: [ApiService],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
  titulo: string = 'Gestionar pedidos';
  subtitulo: string = 'Visualiza los pedidos resalizados - Envía o Cancela'
  listaPedidos: any[] = [];

  constructor(private authService: AuthService, private apiService: ApiService) {
  }


  ngOnInit() {
    console.log('Se cargó de manera correcta')
    this.getListaPedidos()
    if (this.authService.nombreUser != 'bcarrielr'){
      window.location.href= '/';
    }
  }

  getListaPedidos() {
    this.apiService.get<any[]>(`pedidos`).subscribe(
      data => {
        this.listaPedidos = data;
        console.log(this.listaPedidos)
      }, error => {
        console.error(error);
      }
    )
  }

  getConfirmarPedido(id: number){
    this.apiService.get<{ message: string }>(`confirmar_pedidos/${id}`).subscribe(
      data => {
        console.log(data.message)
        alert(data.message)
        window.location.href = '/administrador/pedidos'
      }, error => {
        console.error(error);
      }
    )
  }
}
