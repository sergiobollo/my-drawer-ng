import { Component, OnInit } from "@angular/core";
import { compose } from "nativescript-email";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { GestureEventData, GridLayout } from "tns-core-modules";
import { device, screen } from "tns-core-modules/platform";
import { connectionType, getConnectionType, startMonitoring, stopMonitoring } from "tns-core-modules/connectivity";


@Component({
    selector: "Featured",
    templateUrl: "./featured.component.html"
})
export class FeaturedComponent implements OnInit {

    monitoreando: boolean = false; // una variable para saber si estamos monitoreando o no

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    onLongPress(args: GestureEventData) {
        console.log("Object that triggered the event: " + args.object);
        console.log("View that triggered the event: " + args.view);
        console.log("Event name: " + args.eventName);

        const grid = <GridLayout>args.object;
        grid.rotate = 0;
        grid.animate({
            rotate: 360,
            duration: 2000
        });

        const fs = require("file-system");
        const appFolder = fs.knownFolders.currentApp();
        const appPath = appFolder.path;
        const logoPath = appPath + "/app/res/icon.png";

        compose({
            subject: "Mail de Prueba",
            body: "Hola <strong>mundo!</strong> :)",
            to: ["mail@mail.com"],
            cc: [],
            bcc: [],
            attachments: [
              {
                  fileName: "arrow1.png",
                  path: "base64://iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAHGlET1QAAAACAAAAAAAAABQAAAAoAAAAFAAAABQAAAB5EsHiAAAAAEVJREFUSA1iYKAimDhxYjwIU9FIBgaQgZMmTfoPwlOmTJGniuHIhlLNxaOGwiNqNEypkwlGk9RokoIUfaM5ijo5Clh9AAAAAP//ksWFvgAAAEFJREFUY5g4cWL8pEmT/oMwiM1ATTBqONbQHA2W0WDBGgJYBUdTy2iwYA0BrILDI7VMmTJFHqv3yBUEBQsIg/QDAJNpcv6v+k1ZAAAAAElFTkSuQmCC",
                  mimeType: "image/png"
              },
              {
                  fileName: "icon.png",
                  path: logoPath,
                  mimeType: "image/png"
            }]
        }).then(() => console.log("Enviador de mail cerrado"), (err) => console.log("Error: " + err));
    }

    onDatosPlataforma(): void {
        console.log("modelo", device.model);
        console.log("tipo dispositivo", device.deviceType);
        console.log("Sistema operativo", device.os);
        console.log("version sist operativo", device.osVersion);
        console.log("Version sdk", device.sdkVersion);
        console.log("lenguaje", device.language);
        console.log("fabricante", device.manufacturer);
        console.log("codigo único de dispositivo", device.uuid);

        console.log("altura en pixels normalizados", screen.mainScreen.heightDIPs); // DIP (Device Independent Pixel) también conocido como densidad de píxeles independientes. Un píxel virtual que aparece aproximadamente del mismo tamaño en una variedad de densidades de pantalla.
        console.log("altura pixels", screen.mainScreen.heightPixels);
        console.log("escala pantalla", screen.mainScreen.scale);
        console.log("ancho pixels normalizados", screen.mainScreen.widthDIPs);
        console.log("ancho pixels", screen.mainScreen.widthPixels);
    }

    
    onMonitoreoDatos(): void {
        const myConnectionType = getConnectionType();

        switch (myConnectionType) {
            case connectionType.none:
                console.log("Sin Conexion");
                break;
            case connectionType.wifi:
                console.log("WiFi");
                break;
            case connectionType.mobile:
                console.log("Mobile");
                break;
            case connectionType.ethernet:
                console.log("Ethernet"); // es decir cableada
                break;
            case connectionType.bluetooth:
                 console.log("Bluetooth");
                 break;
            default:
                break;
        }

        this.monitoreando = !this.monitoreando;

        if (this.monitoreando) {
            startMonitoring((newConnectionType) => {
                switch (newConnectionType) {
                    case connectionType.none:
                        console.log("Cambió a sin conexión.");
                        break;
                    case connectionType.wifi:
                        console.log("Cambió a  WiFi.");
                        break;
                    case connectionType.mobile:
                        console.log("Cambió a  mobile.");
                        break;
                    case connectionType.ethernet:
                        console.log("Cambió a  ethernet.");
                        break;
                    case connectionType.bluetooth:
                        console.log("Cambió a bluetooth.");
                        break;
                    default:
                        break;
                }
            });
        } else {
            stopMonitoring();
        }
    }

}
