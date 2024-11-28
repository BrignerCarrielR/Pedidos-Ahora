import {Component} from '@angular/core';
import {InicioComponent} from "../inicio/inicio.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../../../auth.service';
import {ApiService} from '../../../api.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-temporadas',
  standalone: true,
  imports: [InicioComponent, HttpClientModule, CommonModule, FormsModule],
  providers: [ApiService],
  templateUrl: './temporadas.component.html',
  styleUrl: './temporadas.component.css'
})
export class TemporadasComponent {
  listaTemporadas: any[] = []
  temporada = {
    id:0,
    nombre: '',
    tarifa: 0,
    estado: false
  }
  constructor(private authService: AuthService, private apiService: ApiService) {
    this.getTemporadas()
  }
  getTemporadas(){
    this.apiService.get<any[]>(`temporadas`).subscribe(
      data => {
        this.listaTemporadas = data;
        console.log(this.listaTemporadas)
      }, error => {
        console.error(error);
      }
    )
  }
  GuardarTemporada(){
    console.log(this.temporada)
    this.apiService.post<{message: string}>('temporadas', this.temporada)
      .subscribe(
        data => {
          console.log(data.message);
          alert(data.message)
          window.location.reload();
        },
        error => {
          console.log(error);
          alert(error);
        }
      );
  }

  putTemporadas(id:number){
    this.apiService.put<{message: string}>(`temporadas/${id}`, this.temporada)
      .subscribe(
        data => {
          console.log(data.message);
          alert(data.message)
          window.location.reload();
        },
        error => {
          console.log(error);
          alert(error);
        }
      );
  }

  EditarTemporadas(id:number){
    this.apiService.get<any[]>(`temporadas/${id}`).subscribe(
      data => {
        const temporada = data[0]; // Accedes al primer objeto del array
        this.temporada.id = temporada.id;
        this.temporada.nombre = temporada.nombre;
        this.temporada.tarifa = parseFloat(temporada.tarifa);
        this.temporada.estado = temporada.estado;

        console.log(temporada)
      }, error => {
        console.error(error);
      }
    )
  }

}
