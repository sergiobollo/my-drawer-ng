import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { EffectsModule } from "@ngrx/effects";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { SettingBusyComponent } from "./animations/setting-busy.component";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { intializeNoticiasState, NoticiasEffects, NoticiasState, reducersNoticias } from "./domain/noticias-state.model";
import { NoticiasService } from "./domain/noticias.service";
import { ActionReducerMap, StoreModule as NgRxStoreModule } from "@ngrx/store";

// redux init
// tslint:disable-next-line:interface-name
export interface AppState {
    noticias: NoticiasState;
}

const reducers: ActionReducerMap<AppState> = {
    noticias: reducersNoticias
};

const reducersInitialState = {
    noticias: intializeNoticiasState()
};
// fin redux init 

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState }),
        EffectsModule.forRoot([NoticiasEffects])
    ],
    declarations: [
        AppComponent,
        SettingBusyComponent
    ],
    providers: [NoticiasService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
