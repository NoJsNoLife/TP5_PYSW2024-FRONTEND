import { Routes } from '@angular/router';
import { Punto1ListaComponent } from './components/punto1-lista/punto1-lista.component';
import { Punto1FormComponent } from './components/punto1-form/punto1-form.component';
import { IndexComponent } from './components/index/index.component';
import { Punto2Component } from './components/punto2/punto2.component';

export const routes: Routes = [
    {path: "", component: IndexComponent},
    {path: "productos", component: Punto1ListaComponent},
    {path: "registrar", component: Punto1FormComponent},
    {path: "transaccion", component: Punto2Component}
    //{path: "**", redirectTo: "/", pathMatch: "full"}
];
