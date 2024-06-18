import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-punto1-lista',
  standalone: true,
  imports: [],
  templateUrl: './punto1-lista.component.html',
  styleUrl: './punto1-lista.component.css'
})
export class Punto1ListaComponent implements OnInit, OnDestroy {

  private productosService = inject(ProductoService)
  private router = inject(Router)

  producto!: Producto
  productos!: Producto[]
  productos$!: Observable<Producto[]>
  productosSubscription!: Subscription

  constructor() {
  }

  ngOnInit(): void {
    this.productos$ = this.productosService.getProductosDestacados()
    this.cargarProductos()
  }
  ngOnDestroy(): void {
    this.productosSubscription.unsubscribe()
  }

  registrar(){
    this.router.navigate(['registrar'])
  }

  cargarProductos(): void {
    this.productosSubscription = this.productos$.subscribe(
      {
        next: (resultados) => {
          this.productos = new Array<Producto>()
          resultados.forEach(el => {
          this.producto = new Producto()
          Object.assign(this.producto, el)
          this.productos.push(this.producto)
          })
        },
        error: (err) => console.error(err)
    })
  }
}
