import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { IFilmeApi, IListaFilmes } from 'src/app/models/IFilmeAPI.model';
import { IGenero } from 'src/app/models/IGenero.model';
import { DadosService } from 'src/app/services/dados.service';
import { FilmeService } from 'src/app/services/filme.service';
import { GeneroService } from 'src/app/services/genero.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit{
  titulo = 'videos app';

  listaFilmes: IListaFilmes;

  generos: string[] = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public dadosService: DadosService,
    public route: Router,
    public filmeService: FilmeService,
    public generoService: GeneroService
  ) {}

    buscarFilmes(evento: any) {
      const busca = evento.target.value;
      // se a busca não estiver vazia
      if (busca && busca.trim() !== '') {
        this.filmeService.buscarFilmes(busca).subscribe(dados => {
          this.listaFilmes = dados
        })
      }
    }

  exibirFilme(filme: IFilmeApi) {
    this.dadosService.guardarDados('filme', filme);
    this.route.navigateByUrl('/dados-filme');
  }

  async exibirAlertaFavorito() {
    const alert = await this.alertController.create({
      header: 'ALERTA!',
      message: '<strong>deseja realemente favoritar o filme ?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Okay, favoritar',
          handler: () => {
            this.presentToast();
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Filme adicionados ao favoritos.',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    toast.present();
  }

  ngOnInit() {
    this.generoService.buscarGeneros().subscribe(dados => {
      dados.genres.forEach(genero => {
        this.generos[genero.id] = genero.name;
      });

      this.dadosService.guardarDados('generos', this.generos);
    });
  }
}
