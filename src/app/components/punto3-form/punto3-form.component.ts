import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../../models/ticket';
import { Observable } from 'rxjs';
import { EspectadorService } from '../../services/espectador.service';
import { Espectador } from '../../models/espectador';

@Component({
  selector: 'app-punto3-form',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './punto3-form.component.html',
  styleUrl: './punto3-form.component.css'
})
export class Punto3FormComponent implements OnInit{
  private espectadorService = inject(EspectadorService)
  private ticketService = inject(TicketService)
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  modificar!: Boolean
  ticket!: any
  espectador!: Espectador[]
  ticket$!: Observable<Ticket>
  espectador$!: Observable<Espectador[]>

  mostrarLabel: boolean = false
  mostrarSmall: boolean = true

  precioCobrado: number = 0

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('id') != null){
      this.modificar = true
      this.getTicket(this.activatedRoute.snapshot.paramMap.get('id')!)
    }
  }

  newTicketForm = new FormGroup({
    dni: new FormControl('',Validators.required),
    categoria: new FormControl('',Validators.required),
    fecha: new FormControl('',Validators.required),
    precio: new FormControl('',Validators.required)
  })

  get dni() { return this.newTicketForm.get('dni'); }
  get categoria() { return this.newTicketForm.get('categoria'); }
  get fecha() { return this.newTicketForm.get('fecha'); }
  get precio() { return this.newTicketForm.get('precio'); }
  

  volver(): void{
    this.router.navigate(['/ticket'])
  }

  createTicket(): void{
    if(this.dni?.value && this.fecha?.value && this.precio?.value && this.categoria?.value){
      if(this.modificar){
        this.ticketService.putTicket(this.activatedRoute.snapshot.paramMap.get('id')!,
          this.dni?.value, this.precioCobrado, this.categoria?.value,
            new Date(this.fecha?.value)).subscribe({
            next: (res) => {
              console.log(res)
              this.volver()
            },
            error: (err) => console.error(err)
          })
      } else {
        this.ticketService.postTicket(this.dni?.value,
          this.precioCobrado, this.categoria?.value,
          new Date(this.fecha?.value)).subscribe({
            next: (res) => {
              console.log(res)
              this.volver()
            },
            error: (err) => console.error(err)
          })
      }
      
    }
  }


  calcularDescuento(): void {
    const select = (document.getElementById('categoria') as HTMLInputElement)?.value;
    const precio = (document.getElementById('precio') as HTMLInputElement)?.value;
    if(select == ''){
      this.mostrarSmall = true
    } else {
      this.mostrarSmall = false
    }
    if(precio == ''){
      this.precioCobrado = 0
    }
    if(select == 'l' && parseInt(precio) > 0){
      this.mostrarLabel = true
      this.precioCobrado = parseInt(precio) - parseInt(precio) * 0.2
    } else {
      if(select == 'e' && parseInt(precio) > 0){
        this.mostrarLabel = true
        this.precioCobrado = parseInt(precio)
      }
    }
  }

  getTicket(id: string){
    this.ticket$ = this.ticketService.getTicket(id)
    this.ticket$.subscribe({
      next: (res) => {
        this.ticket = new Ticket
        Object.assign(this.ticket, res)
        console.log(this.ticket)
        this.espectador$ = this.espectadorService.getEspectadorById(this.ticket.espectador)
        this.espectador$.subscribe({
          next: (res) => {
            this.espectador = new Array<Espectador>()
            Object.assign(this.espectador, res)
            this.dni?.setValue(String(this.espectador[0].dni))
          }
        })
        this.fecha?.setValue(new Date(this.ticket.fechaCompra).toISOString().split('T')[0])
        this.categoria?.setValue(String(this.ticket.categoriaEspectador))
        this.precio?.setValue(String(this.ticket.precioTicket))
      }
    })
  }

}
