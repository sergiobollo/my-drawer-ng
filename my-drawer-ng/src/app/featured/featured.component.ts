import { Component, OnInit } from "@angular/core";
import { compose } from "nativescript-email";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { GestureEventData, GridLayout } from "tns-core-modules";

@Component({
    selector: "Featured",
    templateUrl: "./featured.component.html"
})
export class FeaturedComponent implements OnInit {

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

}
