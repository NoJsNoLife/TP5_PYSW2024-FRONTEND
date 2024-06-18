import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private _http = inject(HttpClient);

  constructor() { }

  getProductos(): Observable<any>{
    return this._http.get("http://localhost:3000/api/producto")
  }

  getProductosDestacados(): Observable<any>{
    return this._http.get("http://localhost:3000/api/producto/destacados")
  }

  postProducto(nombre: String, descripcion: String, imagen: String,
     precio: Number, stock: Number, destacado: Boolean): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    } 
      let producto = new Producto()
      producto.nombre = nombre
      producto.descripcion = descripcion
      producto.imagen = imagen
      producto.precio = precio
      producto.stock = stock
      producto.destacado = destacado
      return this._http.post("http://localhost:3000/api/producto", JSON.stringify(producto), httpOptions)
  }


}
