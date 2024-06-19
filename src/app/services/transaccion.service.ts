import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaccion } from '../models/transaccion';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  private _http = inject(HttpClient)

  constructor() {}

  getTransacciones(): Observable<any> {
    return this._http.get("http://localhost:3000/api/transaccion")
  }

  getTransaccionesByCoin(monedaOrigen: string, monedaDestino: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      }),
      params: new HttpParams().set('from', monedaOrigen).set('to', monedaDestino)
    } 
    return this._http.get("http://localhost:3000/api/transaccion/filter/", httpOptions)
  }

  convertirMonto(origen: string, destino: string, monto: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'X-RapidAPI-Key': '3c930ab79amsh4b248d29dd932bep1c923fjsn86f2cfd6d3f1',
        'X-Rapidapi-Host': 'currency-converter18.p.rapidapi.com'
      }),
      params: new HttpParams().set('from', origen).set('to', destino).set('amount', monto)
    }
    return this._http.get("https://currency-converter18.p.rapidapi.com/api/v1/convert", httpOptions)
  }

  postTransaccion(tipoOrigen: string, montoOrigen: number, tipoDestino: string, montoDestino: number,
    email: string
  ): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    } 
    let transaccion = new Transaccion()
    transaccion.monedaOrigen = tipoOrigen
    transaccion.cantidadOrigen = montoOrigen
    transaccion.monedaDestino = tipoDestino
    transaccion.cantidadDestino = montoDestino
    transaccion.email = email
    console.log(transaccion)
    return this._http.post("http://localhost:3000/api/transaccion", JSON.stringify(transaccion), httpOptions)
  }

}
