import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspectadorService {

  private _http = inject(HttpClient)
  constructor() { }

  getEspectadorByDni(dni: string): Observable<any>{
    return this._http.get("http://localhost:3000/api/espectador/" + dni)
  }

  getEspectadorById(id: string): Observable<any>{
    return this._http.get("http://localhost:3000/api/espectador/id/" + id)
  }
}
