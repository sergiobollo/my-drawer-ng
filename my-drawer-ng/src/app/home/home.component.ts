import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { isAndroid, isIOS } from "tns-core-modules";
import { Store } from "@ngrx/store";
import { AppState } from "../app.module";
import * as SocialShare from "nativescript-social-share";
import {ImageSource} from "tns-core-modules/image-source";
import { Image } from "tns-core-modules/ui/image";
import * as camera from "nativescript-camera";

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

    onButtonTap(): void {
        var isAvailable = camera.isAvailable();
        console.log(isAvailable);
        camera.requestPermissions().then(
            function success() {
                console.log("Permiso de camara aceptado por el usuario");
                const options = { width: 300, height: 300, keepAspectRatio: false, saveToGallery: true };
                camera.takePicture(options).
                    then((imageAsset) => {
                        console.log("Tamaño: " + imageAsset.options.width + "x" + imageAsset.options.height);
                        console.log("keepAspectRatio: " + imageAsset.options.keepAspectRatio);
                        var image = new Image();
                        image.src = imageAsset;
                        console.log("Foto guardada!");
                        ImageSource.fromAsset(imageAsset)
                            .then((imageSource) => {
                                SocialShare.shareImage(imageSource, "Asunto: compartido desde el curso!");
                            }).catch((err) => {
                                console.log("Error -> " + err.message);
                            });
                    }).catch((err) => {
                        console.log("Error -> " + err.message);
                    });
            },
            function failure() {
                console.log("Permiso de camara no aceptado por el usuario");
            }
        );
    }
}
 