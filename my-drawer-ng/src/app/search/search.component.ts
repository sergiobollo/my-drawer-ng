import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { NoticiasService } from "../domain/noticias.service";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { Color } from "tns-core-modules/ui/core/view";
import { Button, GestureEventData } from "tns-core-modules";
import * as Toast from "nativescript-toasts";
import { Store } from "@ngrx/store";
import { AppState } from "../app.module";
import { NuevaNoticiaAction, Noticia } from "../domain/noticias-state.model";
import * as SocialShare from "@nativescript/social-share";


@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html"/*,
    providers: [NoticiasService]*/
})
export class SearchComponent implements OnInit {
    resultados: Array<string> = [];
    favoritos: Array<string> = [];
    favoritosDb: Array<string> = [];
    @ViewChild("layout", {static: false}) layout: ElementRef;

    constructor(public noticias: NoticiasService, private routerExtensions: RouterExtensions,
        private activeRoute: ActivatedRoute, private store: Store<AppState>) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.store.select((state) => state.noticias.sugerida)
            .subscribe((data) => {
                const f = data;
                if (f != null) {
                    Toast.show({text: "Sugerimos leer: " + f.titulo, duration: Toast.DURATION.SHORT});
                }
            });

    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    onItemTap(x: any): void {
        console.dir(x);
    }

    onTextTap(args: { view: { bindingContext: string; }; }): void {
        this.store.dispatch(new NuevaNoticiaAction(new Noticia(args.view.bindingContext)));
    }

    onTap(nsRouterLink: string): void {
        this.routerExtensions.navigate([nsRouterLink], { relativeTo: this.activeRoute,
            transition: {
                name: "fade"
            }
        });
    }
 
    onPull(e: { object: any; }) {
        console.log(e);
        const pullRefresh = e.object;
        setTimeout(() => {
            this.resultados.push("xxxxxxx");
            pullRefresh.refreshing = false;
        }, 2000);
    }

    buscarAhora(s: string) {
        console.dir("buscarAhora" + s);
        this.noticias.buscar(s).then((r: any) => {
            console.log("resultados buscarAhora: " + JSON.stringify(r));
            this.resultados = r;
        }, (e) => {
            console.log("error buscarAhora " + e);
            Toast.show({text: "Error en la búsqueda", duration: Toast.DURATION.SHORT});
        });
    } 
    onLongPress(s): void {
        console.log(s);
        SocialShare.shareText(s, "Asunto: compartido desde el curso!");
    }
    onLongButtonPress(args: GestureEventData) {
        const grid = <Button>args.object;
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

    onStarTap(x: string) {
        console.log("Tap");
        console.log(x);
        this.noticias.favs().then((r:any) => {
            console.log(r);
            this.favoritos = r;
        });
        this.noticias.ObtenerFavoritosDb().then((r:any) => {
        this.favoritosDb = r ;
        });
        if (this.favoritos.indexOf(x) > -1) {
            this.noticias.deleteFavorita(x);
            this.noticias.EliminarFavoritosDb(x);
            
            Toast.show({text: "Se quitó de favoritos " + x, duration: Toast.DURATION.SHORT});
        } else {
            this.noticias.agregar(x);
            this.noticias.AgregarFavoritosDb(x);
            Toast.show({text: "Se agregó a favoritos " + x, duration: Toast.DURATION.SHORT});
        }
        }

}


