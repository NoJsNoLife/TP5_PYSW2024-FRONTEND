import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';
import { Ticket } from '../../models/ticket';
import { Observable, Subscription } from 'rxjs';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-punto3',
  standalone: true,
  imports: [ DatePipe, CurrencyPipe ],
  templateUrl: './punto3.component.html',
  styleUrl: './punto3.component.css'
})
export class Punto3Component implements OnInit, OnDestroy{
  
  private ticketService = inject(TicketService)
  private router: Router = inject(Router)
  private tickets$!: Observable<Ticket[]>
  private ticketsSubscription!: Subscription
  private ticket!: Ticket
  tickets!: Ticket[]

  ngOnInit(): void {
    this.cargarTickets()
  }
  ngOnDestroy(): void {
    this.ticketsSubscription.unsubscribe()
  }

  cargarTickets(): void {
    this.tickets$ = this.ticketService.getTickets()
    this.ticketsSubscription = this.tickets$.subscribe({
      next: (resultados) => {
        
        this.tickets = new Array<Ticket>()
        resultados.forEach(el => {
          this.ticket = new Ticket()
          Object.assign(this.ticket, el)
          this.tickets.push(this.ticket)
        })
        console.log(this.tickets)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  deleteTicket(id: string): void{
    this.ticketService.deleteTicket(id).subscribe({
      next: (res) => {
        console.log(res)
        this.cargarTickets()
      }
    })
    alert('Ticket Eliminado')
  }

  modificar(id: string): void{
    this.router.navigate(['ticket', id])
  }
  createTicket(): void{
    this.router.navigate(['ticket/new'])
  }

  filtrar(categoria: string){
    this.tickets$ = this.ticketService.getTicketsByCategoria(categoria)
    this.ticketsSubscription = this.tickets$.subscribe({
      next: (resultados) => {
        this.tickets = new Array<Ticket>()
        resultados.forEach(el => {
          this.ticket = new Ticket()
          Object.assign(this.ticket, el)
          this.tickets.push(this.ticket)
        })
        console.log(this.tickets)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
