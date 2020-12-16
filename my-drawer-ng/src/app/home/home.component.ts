import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { isAndroid, isIOS } from "tns-core-modules";
import { Store } from "@ngrx/store";
import { AppState } from "../app.module";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    listadoLeerAhora: Array<string> = [];

    constructor(private store: Store<AppState>) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        if (isAndroid) {
            console.log("Estas navegando en Android");
        }
        else if (isIOS) {
            console.log("Estas navegando en IOS");
        }
        else {
            console.log("Estas navegando en WindowsPhone");
        }

        this.store.select((state) => state.noticias.listadoLeerAhora)
        .subscribe((data) => {
            const f = data;
            if (f != null) {
                this.listadoLeerAhora = f;
            }
        });

    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
