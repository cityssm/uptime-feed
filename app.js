import createError from "http-errors";
import express from "express";
import path from "path";
import ntfyPublish from "@cityssm/ntfy-publish";
import routerRSS from "./routes/rss.js";
import routerJSON from "./routes/json.js";
import * as configFunctions from "./helpers/functions.config.js";
import { ipAddress, startupMillis } from "./helpers/functions.uptime.js";
import Debug from "debug";
const debug = Debug("uptime-feed:app");
debug("startupMillis = " + startupMillis);
if (configFunctions.getProperty("ntfy.topic")) {
    await ntfyPublish({
        server: configFunctions.getProperty("ntfy.server"),
        topic: configFunctions.getProperty("ntfy.topic"),
        title: configFunctions.getProperty("applicationName") + ": " + ipAddress,
        message: new Date(startupMillis).toLocaleDateString() + " " + new Date(startupMillis).toLocaleTimeString(),
        tags: ["computer"],
        priority: "high"
    });
}
export const app = express();
app.use((request, _response, next) => {
    debug(`${request.method} ${request.url}`);
    next();
});
const urlPrefix = configFunctions.getProperty("urlPrefix");
if (urlPrefix !== "") {
    debug("urlPrefix = " + urlPrefix);
}
app.use(urlPrefix, express.static(path.join("public")));
app.get(urlPrefix + "/", (_request, response) => {
    response.redirect(urlPrefix + "/json");
});
app.use(urlPrefix + "/json", routerJSON);
app.use(urlPrefix + "/rss", routerRSS);
app.use((_request, _response, next) => {
    next(createError(404));
});
app.use((error, request, response) => {
    response.locals.message = error.message;
    response.locals.error = request.app.get("env") === "development" ? error : {};
    response.status(error.status || 500);
    response.render("error");
});
export default app;
