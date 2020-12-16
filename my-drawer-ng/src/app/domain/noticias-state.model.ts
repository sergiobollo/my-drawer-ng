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
    listadoLeerAhora: Array<string>;
}

export function intializeNoticiasState() {
  return {
    items: [],
    sugerida: null,
    leerAhora: null,
    listadoLeerAhora: [],
  };
}

// ACCIONES
export enum NoticiasActionTypes {
  INIT_MY_DATA = "[Noticias] Init My Data",
  NUEVA_NOTICIA = "[Noticias] Nueva",
  SUGERIR_NOTICIA = "[Noticias] Sugerir",
  LEER_AHORA =  "[Noticias] Leer",
  LISTADO_LEER = "[Noticias] Listado",
  AGREGAR_LECTURA = "[Noticias] Agregar",
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

export class ListadoLeerAction implements Action {
  type = NoticiasActionTypes.LISTADO_LEER;
  constructor(public listado: Array<string>) {}
}

export class AgregarLecturaAction implements Action {
  type = NoticiasActionTypes.AGREGAR_LECTURA;
  constructor(public noticia: string) {}
}

export type NoticiasViajesActions = NuevaNoticiaAction | InitMyDataAction | LeerAction | ListadoLeerAction | AgregarLecturaAction;

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

    case NoticiasActionTypes.LISTADO_LEER: {
      const listado: Array<string> = (action as ListadoLeerAction).listado;

      return {
          ...state,
          listadoLeerAhora: listado.map((t) => t)
        };
    }

    case NoticiasActionTypes.AGREGAR_LECTURA: {
      return {
          ...state,
          listadoLeerAhora: [...state.listadoLeerAhora, (action as AgregarLecturaAction).noticia ]
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
