/* eslint-disable no-process-exit, unicorn/no-process-exit */

import { app } from "../app.js";

import http from "http";

import * as configFunctions from "../helpers/functions.config.js";

import exitHook from "exit-hook";

import Debug from "debug";
const debug = Debug("uptime-feed:www");

let httpServer: http.Server;

interface ServerError extends Error {
    syscall: string;
    code: string;
}

const onError = (error: ServerError) => {
    if (error.syscall !== "listen") {
        throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        // eslint-disable-next-line no-fallthrough
        case "EACCES":
            debug("Requires elevated privileges");
            process.exit(1);
        // break;

        // eslint-disable-next-line no-fallthrough
        case "EADDRINUSE":
            debug("Port is already in use.");
            process.exit(1);
        // break;

        // eslint-disable-next-line no-fallthrough
        default:
            throw error;
    }
};

const onListening = (server: http.Server) => {
    const addr = server.address();

    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port.toString();

    debug("Listening on " + bind);
};

/**
 * Initialize HTTP
 */

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
