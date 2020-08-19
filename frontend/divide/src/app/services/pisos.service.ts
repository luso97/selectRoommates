import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PisosService {
  
    
  constructor(private http: HttpClient) { }

  getOne( idName:string){
    var piso = this.http.get(this.baseUrl+"pisos?name="+idName);
    return piso;
  }

  getById(id:string){
    return this.http.get(this.baseUrl+"pisos/"+id);
  }

  create(data) {
    return this.http.post(this.baseUrl+"pisos", data);
  }

  getPuntuaciones(id: string) {
    return this.http.get(this.baseUrl+"punts?piso="+id);
  }

  createPuntuaciones(data){
    return this.http.post(this.baseUrl+"punts",data);
  }
}
