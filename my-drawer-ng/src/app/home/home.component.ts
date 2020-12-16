import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { isAndroid, isIOS } from "tns-core-modules";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor() {
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
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
