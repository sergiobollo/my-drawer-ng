import { NgModule } from '@angular/core';
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from '@nativescript/angular';
import { Componente1Component } from './componente1/componente1.component';
import { Componente2Component } from './componente2/componente2.component';

const routes: Routes = [
  { path: "", component: Componente1Component },
  { path: "componente2", component: Componente2Component }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class Modulo1RoutingModule { }
 