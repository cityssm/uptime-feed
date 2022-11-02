import { Router } from "express";
import { Feed } from "feed";
import * as configFunctions from "../helpers/functions.config.js";
import { startupMillis } from "../helpers/functions.uptime.js";
export const router = Router();
router.all("/", (_request, response) => {
    const feed = new Feed({
        title: configFunctions.getProperty("applicationName"),
        id: "",
        copyright: ""
    });
    feed.addItem({
        title: "Startup Time = " + startupMillis,
        date: new Date(startupMillis),
        link: ""
    });
    response.contentType("application/rss+xml");
    return response.send(feed.rss2());
});
export default router;
