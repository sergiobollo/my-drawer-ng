import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, isAndroid, isIOS } from "@nativescript/core";
import { NoticiasService } from "../domain/noticias.service";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { Color, View } from "tns-core-modules/ui/core/view";
import { Button, GestureEventData } from "tns-core-modules";
import * as Toast from "nativescript-toasts";

@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html"/*,
    providers: [NoticiasService]*/
})
export class SearchComponent implements OnInit {
    resultados: Array<string> = [];
    @ViewChild("layout", {static: false}) layout: ElementRef;

    constructor(public noticias: NoticiasService, private routerExtensions: RouterExtensions, private activeRoute: ActivatedRoute) {
        // Use the component constructor to inject providers.
    }

    doLater(fn) { setTimeout(fn, 1000); }

    ngOnInit(): void {
        const toastOptions: Toast.ToastOptions = {text: "Realiza una busqueda para ver el listado", duration: Toast.DURATION.SHORT};
        this.doLater(() => Toast.show(toastOptions));
        this.noticias.agregar("hola!");
        this.noticias.agregar("hola2!");
        this.noticias.agregar("hola3!");
        if (isAndroid) {
            this.noticias.agregar("Estas navegando en Android");
        }
        else if (isIOS) {
            this.noticias.agregar("Estas navegando en IOS");
        }
        else {
            this.noticias.agregar("Estas navegando en WindowsPhone");
        }
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    onItemTap(x: any): void {
        console.dir(x);
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
            this.resultados = this.noticias.buscar().filter((x) => x.indexOf(s) >= 0);

            const layout = <View>this.layout.nativeElement;
            layout.animate({
                backgroundColor: new Color("blue"),
                duration: 300,
                delay: 150,
            }).then(() => layout.animate({
                backgroundColor: new Color("white"),
                duration: 300,
                delay: 150,
            }));
    }

    onLongPress(args: GestureEventData) {
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

}
