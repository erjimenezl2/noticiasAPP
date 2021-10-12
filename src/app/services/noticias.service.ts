import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../Interfaces/interfaces';
import { environment } from 'src/environments/environment';

const apikey = environment.apiKey;
const apiURL= environment.apiUrl;
const headers = new HttpHeaders({
  'x-Api-key': apikey,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinesPage=0
  categoriaActual:string=''
  categoriaPage=0

  constructor(private http:HttpClient) { }

  private ejecutarQuery<T>(query:string)
  {
    query= apiURL+query
    return this.http.get<T>(query, {headers})

  }

  getTopHeadLines(){   
    this.headLinesPage ++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headLinesPage}`)
       
  }

  getTopHeadLinesCategoria(categoria:string)
  {
    if(this.categoriaActual===categoria)
    {
      this.categoriaPage++;
    }
    else
    {
      this.categoriaPage=1;
      this.categoriaActual==categoria
    }
  
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`)    
  }
}
