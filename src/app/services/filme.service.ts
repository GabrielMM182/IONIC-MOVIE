import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IListaFilmes } from '../models/IFilmeAPI.model';

const apiURL = environment.apiURL;
const key = environment.key;

@Injectable({
  providedIn: 'root',
})
export class FilmeService {
  lingua = 'pt-BR';
  regiao = 'BR';
  year;

  constructor(
    private http: HttpClient,
    public toastController: ToastController
  ) {}

  buscarFilmes(busca: string): Observable<IListaFilmes> {
    const url = `${apiURL}search/movie${key}&language=${this.lingua}&
    region=${this.regiao}&year=${this.year}&query=${busca}`;

    return this.http.get<IListaFilmes>(url).pipe(
      map((retorno) => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  async exibirErro(erro) {
    const toast = await this.toastController.create({
      message: 'Erro ao consultar',
      duration: 2000,
      color: 'danger',
      position: 'middle',
    });
    toast.present();
    return null;
  }
}
