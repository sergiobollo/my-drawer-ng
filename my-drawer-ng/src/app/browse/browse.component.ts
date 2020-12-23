import { Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
var mapsModule = require("nativescript-google-maps-sdk");

registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {
    @ViewChild("MapView", {static: false}) mapView: ElementRef;

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    // Map events
    onMapReady(args) {
        var mapView = args.object;
        
        console.log("Setting a marker...");
        var marker = new mapsModule.Marker();
        marker.position = mapsModule.Position.positionFromLatLng(-34.6037, -58.3817);
        marker.title = "Buenos Aires";
        marker.snippet = "Argentina";
        marker.userData = { index : 1};
        mapView.addMarker(marker);
    }
}
