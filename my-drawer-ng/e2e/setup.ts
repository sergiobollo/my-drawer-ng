import { createDriver, nsCapabilities, startServer, stopServer } from "nativescript-dev-appium";

const SpecReporter = require("jasmine-spec-reporter").SpecReporter;

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter({
  spec: {
    displayPending: true
  }
}));

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200000;
nsCapabilities.runType = "android28";

beforeAll(async () => {
    startServer(exports.nsCapabilities.port).then((s) => {
      createDriver().then((d) => {
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Session has started successfully!");
        d.sessionId().then((session) => {
            console.log(`XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Session id: ${session}`);
            console.log(`XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Appium server port: ${nsCapabilities.port}`);
          }).catch((error) => {
            console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Something went wrong! Appium driver failed to start. Check appium config file.");
            console.log(error);
          });
      }).catch((error) => {
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Something went wrong! Appium driver failed to start. Check appium config file.");
        console.log(error);
      });
    }).catch((error) => {
      console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Something went wrong! Appium server failed to start. Check appium config file!");
      console.log(error);
    });
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX init server! - emulator runType: " + nsCapabilities.runType);
});

afterAll(async () => {
  await stopServer();
});
