import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { Componente1Component } from './componente1/componente1.component';
import { Componente2Component } from './componente2/componente2.component';
import { Modulo1RoutingModule } from './modulo1-routing.module';

@NgModule({
  declarations: [
    Componente1Component,
    Componente2Component
  ],
  imports: [
    NativeScriptCommonModule,
    Modulo1RoutingModule
  ],
  schemas: [
      NO_ERRORS_SCHEMA
  ]
})
export class Modulo1Module { }
