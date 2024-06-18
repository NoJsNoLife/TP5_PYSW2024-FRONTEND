import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { TransaccionService } from '../../services/transaccion.service';
import { Transaccion } from '../../models/transaccion';

@Component({
  selector: 'app-punto2',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './punto2.component.html',
  styleUrl: './punto2.component.css'
})
export class Punto2Component implements OnInit, OnDestroy{

  private transaccionService = inject(TransaccionService)
  private transaccion!: Transaccion
  private transaccionSubscription!: Subscription
  private transacciones$!: Observable<Transaccion[]>
  transacciones! : Transaccion[]
  private monto$!: Observable<any>
  private monto!: any

  constructor(){}
  ngOnInit(): void {
    this.transacciones$ = this.transaccionService.getTransacciones()
    this.getTransacciones()
  }
  ngOnDestroy(): void {
    this.transaccionSubscription.unsubscribe()
  }

  newTransaccionForm = new FormGroup({
    tipoOrigen: new FormControl('', Validators.required),
    montoOrigen: new FormControl('', Validators.required),
    tipoDestino: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  })

  get tipoOrigen() { return this.newTransaccionForm.get('tipoOrigen'); }
  get montoOrigen() { return this.newTransaccionForm.get('montoOrigen'); }
  get tipoDestino() { return this.newTransaccionForm.get('tipoDestino'); }
  get email() { return this.newTransaccionForm.get('email'); }

  convertir(){
    if(this.tipoOrigen?.value && this.montoOrigen?.value && this.tipoDestino?.value && this.email?.value){
      this.monto$ = this.transaccionService.convertirMonto(this.tipoOrigen?.value, this.tipoDestino?.value, Number(this.montoOrigen?.value))
      this.monto$.subscribe({
        next: (res) => {
          this.monto = res.result.convertedAmount
          this.transaccionService.postTransaccion(String(this.tipoOrigen?.value), Number(this.montoOrigen?.value),
          String(this.tipoDestino?.value), this.monto, String(this.email?.value)).subscribe({
            next: (res) => {
              console.log(res)
              this.getTransacciones()
            },
            error: (err) => console.error(err)
            })
        },
        error: (err) => console.error(err)
      })
    }
  }

  getTransacciones(){
    this.transaccionSubscription = this.transacciones$.subscribe({
      next: (resultados) => {
        this.transacciones = new Array<Transaccion>()
        resultados.forEach(el => {
          this.transaccion = new Transaccion()
          Object.assign(this.transaccion, el)
          this.transacciones.push(this.transaccion)
        })
      },
      error: (err) => console.error(err)
    })
  }
}
