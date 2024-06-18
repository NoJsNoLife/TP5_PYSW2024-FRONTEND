import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-punto1-form',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './punto1-form.component.html',
  styleUrl: './punto1-form.component.css'
})
export class Punto1FormComponent{

  private router = inject(Router);
  private productoService = inject(ProductoService)

  constructor() { }

  newProductoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    destacado: new FormControl('', Validators.required)
  })

  get nombre() { return this.newProductoForm.get('nombre'); }
  get descripcion() { return this.newProductoForm.get('descripcion'); }
  get imagen() { return this.newProductoForm.get('imagen'); }
  get precio() { return this.newProductoForm.get('precio'); }
  get stock() { return this.newProductoForm.get('stock'); }
  get destacado() { return this.newProductoForm.get('destacado'); }

  volver(): void {
    this.router.navigate(['/productos'])
  }

  saveProducto(): void{
    let destacar: Boolean
    if(this.destacado?.value == "true"){
      destacar = true
    } else {
      destacar = false
    }
    if(this.nombre?.value && this.descripcion?.value && this.imagen?.value &&
       this.precio?.value && this.stock?.value){
        this.productoService.postProducto(this.nombre?.value, this.descripcion?.value, this.imagen?.value,
          Number(this.precio?.value), Number(this.stock?.value), destacar).subscribe({
            next: (res) => {
              console.log(res.status)
              if(res.status == 1){
                this.volver()
              } else {
                console.error(res)
              }
            }
          })
    }
  }

}
