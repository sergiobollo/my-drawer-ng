import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, isAndroid, isIOS } from "@nativescript/core";
import { NoticiasService } from "../domain/noticias.service";


@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html"/*,
    providers: [NoticiasService]*/
})
export class SearchComponent implements OnInit {

    constructor(public noticias: NoticiasService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
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
}
