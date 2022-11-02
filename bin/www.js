import { app } from "../app.js";
import http from "http";
import * as configFunctions from "../helpers/functions.config.js";
import exitHook from "exit-hook";
import Debug from "debug";
const debug = Debug("uptime-feed:www");
let httpServer;
const onError = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    switch (error.code) {
        case "EACCES":
            debug("Requires elevated privileges");
            process.exit(1);
        case "EADDRINUSE":
            debug("Port is already in use.");
            process.exit(1);
        default:
            throw error;
    }
};
const onListening = (server) => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port.toString();
    debug("Listening on " + bind);
};
const httpPort = configFunctions.getProperty("httpPort");
if (httpPort) {
    httpServer = http.createServer(app);
    httpServer.listen(httpPort);
    httpServer.on("error", onError);
    httpServer.on("listening", () => {
        onListening(httpServer);
    });
    debug("HTTP listening on " + httpPort.toString());
}
exitHook(() => {
    if (httpServer) {
        debug("Closing HTTP");
        httpServer.close();
        httpServer = undefined;
    }
});
