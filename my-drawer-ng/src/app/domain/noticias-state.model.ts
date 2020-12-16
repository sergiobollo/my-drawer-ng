import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

// ESTADO
export class Noticia {
  constructor(public titulo: string) { }
}

// tslint:disable-next-line:interface-name
export interface NoticiasState {
    // tslint:disable-next-line:array-type
    items: Noticia[];
    sugerida: Noticia;
    leerAhora: string;
}

export function intializeNoticiasState() {
  return {
    items: [],
    sugerida: null,
    leerAhora: null,
  };
}

// ACCIONES
export enum NoticiasActionTypes {
  INIT_MY_DATA = "[Noticias] Init My Data",
  NUEVA_NOTICIA = "[Noticias] Nueva",
  SUGERIR_NOTICIA = "[Noticias] Sugerir",
  LEER_AHORA =  "[Noticias] Leer",
}

// tslint:disable-next-line:max-classes-per-file
export class InitMyDataAction implements Action {
  type = NoticiasActionTypes.INIT_MY_DATA;
  constructor(public titulares: Array<string>) {}
}

// tslint:disable-next-line:max-classes-per-file
export class NuevaNoticiaAction implements Action {
  type = NoticiasActionTypes.NUEVA_NOTICIA;
  constructor(public noticia: Noticia) {}
}

// tslint:disable-next-line:max-classes-per-file
export class SugerirAction implements Action {
  type = NoticiasActionTypes.SUGERIR_NOTICIA;
  constructor(public noticia: Noticia) {}
}

export class LeerAction implements Action {
  type = NoticiasActionTypes.LEER_AHORA;
  constructor(public noticia: string) {}
}

export type NoticiasViajesActions = NuevaNoticiaAction | InitMyDataAction | LeerAction;

// REDUCERS
export function reducersNoticias(
  state: NoticiasState,
  action: NoticiasViajesActions
): NoticiasState {
  switch (action.type) {
    case NoticiasActionTypes.INIT_MY_DATA: {
      const titulares: Array<string> = (action as InitMyDataAction).titulares;

      return {
          ...state,
          items: titulares.map((t) => new Noticia(t))
        };
    }
    case NoticiasActionTypes.NUEVA_NOTICIA: {
      return {
          ...state,
          items: [...state.items, (action as NuevaNoticiaAction).noticia ]
        };
    }
    case NoticiasActionTypes.SUGERIR_NOTICIA: {
      return {
          ...state,
          sugerida: (action as SugerirAction).noticia
        };
    }

    case NoticiasActionTypes.LEER_AHORA: {
      return {
          ...state,
          leerAhora: (action as LeerAction).noticia
        };
    }
  }

  return state;
}

// EFFECTS
// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class NoticiasEffects {
  @Effect()
  nuevoAgregado$: Observable<Action> = this.actions$.pipe(
    ofType(NoticiasActionTypes.NUEVA_NOTICIA),
    map((action: NuevaNoticiaAction) => new SugerirAction(action.noticia))
  );

  constructor(private actions$: Actions) {}
}
