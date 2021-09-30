import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  senha: string;

  constructor(
    public toastController: ToastController,
    private route: Router
  ) { }

  ngOnInit() {
  }

  login() {
    if (this.email === 'morancoqui@gmail.com' && this.senha === 'cascao') {
      this.route.navigateByUrl('/tabs/tab1');
      this.presentToast('Seja bem vindo moranguitooooooo!', 'success');
    } else {
      this.presentToast('tente de novo cascudaaaa pense na dica 🤔🙃', 'danger');
    }
  }

  async presentToast(text:string, cor: string) {
    const toast = await this.toastController.create({
      message: text,
      color: cor,
      duration: 3000
    });
    toast.present();
  }
}
