import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '~/app/domain/noticias.service';
import * as Toast from "nativescript-toasts";
import { Store } from '@ngrx/store';
import { AppState } from '~/app/app.module';
import { AgregarLecturaAction, LeerAction } from '~/app/domain/noticias-state.model';

@Component({
  selector: 'ns-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  favoritosDb: Array<string> = [];
  leerAhora: string = ""

  doLater(fn) { setTimeout(fn, 1000); }

  constructor(public noticias: NoticiasService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.noticias.ObtenerFavoritosDb().then((r:any) => {
      this.favoritosDb = r ;
  });
  const toastOptions: Toast.ToastOptions = {text: "Para ver el listado de Favoritos debes agregar una noticia haciendo clic en la estrella desde el listado de búsquedas", duration: Toast.DURATION.SHORT};
  this.doLater(() => Toast.show(toastOptions));

  this.store.select((state) => state.noticias.leerAhora)
  .subscribe((data) => {
      const f = data;
      if (f != null) {
          this.leerAhora = f;
      }
  });
  }

  onItemTap(args: { view: { bindingContext: string; }; }): void {
    this.store.dispatch(new LeerAction(args.view.bindingContext));
    this.store.dispatch(new AgregarLecturaAction(args.view.bindingContext));
}

}