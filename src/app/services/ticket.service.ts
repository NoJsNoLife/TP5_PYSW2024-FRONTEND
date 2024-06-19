import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor() { }

  postTicket(dni: string, precio: number, categoria: string, fecha: Date): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    } 
    let ticket = new Ticket()
    ticket.categoriaEspectador = categoria
    ticket.fechaCompra = fecha
    ticket.precioTicket = precio
    ticket.dni = dni
    return this._http.post("http://localhost:3000/api/ticket", JSON.stringify(ticket), httpOptions)
  }

  private _http = inject(HttpClient)

  getTickets(): Observable<any> {
    return this._http.get("http://localhost:3000/api/ticket")
  }

  getTicket(id: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this._http.get("http://localhost:3000/api/ticket/id/" + id, httpOptions)
  }

  getTicketsByCategoria(categoria: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams().set('categoria', categoria)
    }
    return this._http.get("http://localhost:3000/api/ticket/filter/categoria", httpOptions)

  }

  deleteTicket(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this._http.delete("http://localhost:3000/api/ticket/" + id, httpOptions)
  }

  putTicket(id: string, dni: string, precio: number, categoria: string, fecha: Date): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    } 
    let ticket = new Ticket()
    ticket.categoriaEspectador = categoria
    ticket.fechaCompra = fecha
    ticket.precioTicket = precio
    ticket.dni = dni
    return this._http.put("http://localhost:3000/api/ticket/" + id, JSON.stringify(ticket), httpOptions)
  }

  
}
