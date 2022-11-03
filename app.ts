import createError from "http-errors";
import express from "express";

import path from "path";

import routerRSS from "./routes/rss.js";
import routerJSON from "./routes/json.js";

import * as configFunctions from "./helpers/functions.config.js";
import { startupMillis } from "./helpers/functions.uptime.js";

import Debug from "debug";
const debug = Debug("uptime-feed:app");

debug("startupMillis = " + startupMillis);

/*
 * INITIALIZE APP
 */

export const app = express();

app.use((request, _response, next) => {
    debug(`${request.method} ${request.url}`);
    next();
});

/*
 * STATIC ROUTES
 */

const urlPrefix = configFunctions.getProperty("urlPrefix");

if (urlPrefix !== "") {
    debug("urlPrefix = " + urlPrefix);
}

app.use(urlPrefix, express.static(path.join("public")));

/*
 * ROUTES
 */

app.get(urlPrefix + "/", (_request, response) => {
    response.redirect(urlPrefix + "/json");
});

app.use(urlPrefix + "/json", routerJSON);
app.use(urlPrefix + "/rss", routerRSS);

// Catch 404 and forward to error handler
app.use((_request, _response, next) => {
    next(createError(404));
});

// Error handler
app.use(
    (
        error: { status: number; message: string },
        request: express.Request,
        response: express.Response
    ) => {
        // Set locals, only providing error in development
        response.locals.message = error.message;
        response.locals.error = request.app.get("env") === "development" ? error : {};

        // Render the error page
        response.status(error.status || 500);
        response.render("error");
    }
);

export default app;
