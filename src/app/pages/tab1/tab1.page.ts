import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { IListaFilmes } from 'src/app/models/IFilmeAPI.model';
import { DadosService } from 'src/app/services/dados.service';
import { FilmeService } from 'src/app/services/filme.service';
import { IFilme } from '../../models/IFilme.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  titulo = 'videos app';

  listaVideos: IFilme[] = [
    {
      nome: 'MORTAL KOMBAT',
      lancamento: '2021',
      duracao: '12H',
      classificacao: 98,
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hgQDWqPegnDSFg7XlKMTxZ7VIX0.jpg',
      generos: ['Action', 'Adventure', 'Mistério', 'Drama'],
      pagina: '/mortal',
    },
  ];

  listaFilmes: IListaFilmes;

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public dadosService: DadosService,
    public route: Router,
    public filmeService: FilmeService,
  ) {}

    buscarFilmes(evento: any) {
      console.log(evento.target.value);
      const busca = evento.target.value;
      // se a busca não estiver vazia
      if (busca && busca.trim() !== '') {
        this.filmeService.buscarFilmes(busca).subscribe(dados => {
          console.log(dados);
          this.listaFilmes = dados
        })
      }
    }

  exibirFilme(filme: IFilme) {
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
}
