import { Injectable } from '@angular/core';
import { Article } from '../Interfaces/interfaces';
import { Storage } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root'
})
export class DatalocalService {
  private _storage: Storage | null = null;

  noticias: Article[] = []
  constructor(private storage: Storage) {
    this.init();
    this.cargarFavoritos();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    await this.storage.defineDriver(CordovaSQLiteDriver);
    const storage = await this.storage.create();
    this.storage = storage;
  }

  guardarNoticias(noticia: Article) {
    const existe = this.noticias.find(noti => noti.title === noticia.title);
    if (!existe) {
      console.log('entro');
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');
    if (favoritos) {
      this.noticias = favoritos;
    }
  }

  BorrarNoticia(noticia:Article)
  {
    this.noticias= this.noticias.filter(noti=> noti.title!== noticia.title);
    this.storage.set('favoritos', this.noticias);

  }

}
