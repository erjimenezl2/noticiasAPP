import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../Interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DatalocalService } from 'src/app/services/datalocal.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser,
    public actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DatalocalService) { }

  ngOnInit() { }

  abrirNoticia() {
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {
    let guardarBorrar;

    if (this.enFavoritos) {
      guardarBorrar = {
        text: 'Borrar',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar clicked');
          this.dataLocalService.BorrarNoticia(this.noticia)
        }
      }

    }
    else {
      guardarBorrar = {
        text: 'Favorito',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.dataLocalService.guardarNoticias(this.noticia)
        }
      }
    }



    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },guardarBorrar,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
