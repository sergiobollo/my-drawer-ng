import { Component, ElementRef, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, isAndroid, isIOS } from "@nativescript/core";
import { NoticiasService } from "../../domain/noticias.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Color, FlexboxLayout, GestureEventData, GridLayout } from "tns-core-modules";

@Component({
  selector: 'ns-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  resultados: Array<string> = ["Detalle1", "Detalle2", "Detalle3",];

  constructor(public noticias: NoticiasService, private routerExtensions: RouterExtensions, private activeRoute: ActivatedRoute) {
      // Use the component constructor to inject providers.
  }

  doLater(fn: Function) { setTimeout(fn, 1000); }

  ngOnInit(): void {
 
        
  }

  onDrawerButtonTap(): void {
      const sideDrawer = <RadSideDrawer>Application.getRootView();
      sideDrawer.showDrawer();
  }

  onItemTap(x: any): void {
      console.dir(x);
  }

  onPull(e: { object: any; }) {
      console.log(e);
      const pullRefresh = e.object;
      setTimeout(() => {
          this.resultados.push("DetalleX");
          pullRefresh.refreshing = false;
      }, 2000);
  }

  onLongPress(args: GestureEventData) {
    const grid = <FlexboxLayout>args.object;
    grid.animate({
        backgroundColor: new Color("blue"),
        duration: 300,
        delay: 150,
    }).then(() => grid.animate({
        backgroundColor: new Color("white"),
        duration: 300,
        delay: 150,
    }));
}

onTap(e: any) {
    console.dir(e);
    this.doLater(() =>
    dialogs.action("Seleccione un categoría", "Cancelar!", ["Categoría1", "Categoría2"])
            .then((result) => {
                                console.log("resultado: " + result);
                                if (result === "Categoría1") {
                                    this.doLater(() =>
                                        dialogs.alert({
                                            title: "Has elegido",
                                            message: "categoría 1",
                                            okButtonText: "OK"
                                        }).then(()  => console.log("Cerrado 1!")));
                                } else if (result === "Categoría2") {
                                    this.doLater(() =>
                                        dialogs.alert({
                                            title: "Has elegido",
                                            message: "categoría 2",
                                            okButtonText: "OK"
                                        }).then(() => console.log("Cerrado 2!")));
                                }
}));
}

}
