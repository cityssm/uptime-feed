import { Router } from "express";
import { Feed } from "feed";
import * as configFunctions from "../helpers/functions.config.js";
import { startupMillis, ipAddress } from "../helpers/functions.uptime.js";
export const router = Router();
const baseUrl = "http://" +
    ipAddress +
    ":" +
    configFunctions.getProperty("httpPort") +
    configFunctions.getProperty("urlPrefix");
const feedUrl = baseUrl + "/rss";
const jsonUrl = baseUrl + "/json";
router.all("/", (_request, response) => {
    const feed = new Feed({
        title: configFunctions.getProperty("applicationName") + ": " + ipAddress,
        description: "RSS and JSON application startup notifications",
        id: feedUrl,
        link: feedUrl,
        ttl: 2,
        generator: "https://www.github.com/cityssm/uptime-feed",
        copyright: ""
    });
    feed.addItem({
        title: "Startup Time = " + startupMillis,
        date: new Date(startupMillis),
        link: jsonUrl + "?t=" + startupMillis
    });
    response.contentType("application/rss+xml");
    return response.send(feed.rss2());
});
export default router;
