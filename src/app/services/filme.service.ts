import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IListaFilmes } from '../models/IFilmeAPI.model';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  lingua = 'pt-BR';
  regiao = 'BR';
  year;

  private key = '?api_key=8f0f197ea97090c590790ef14c292815';

  constructor(private http: HttpClient,
              public toastController: ToastController
              ) { }

  buscarFilmes(busca: string):Observable<IListaFilmes> {
    const url = `${apiURL}search/movie${this.key}&language=${this.lingua}&
    region=${this.regiao}&year=${this.year}&query=${busca}`;

    return this.http.get<IListaFilmes>(url).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirErro(erro))
    );
  }

  async exibirErro(erro) {
    const toast = await this.toastController.create({
      message: 'Erro ao consultar',
      duration: 2000,
      color: 'danger',
      position: 'middle'
    });
    toast.present();
    return null;
  }
}

