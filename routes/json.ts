import { Router } from "express";

import { startupMillis } from "../helpers/functions.uptime.js";

export const router = Router();

router.all("/", (_request, response) => {

    const uptimeMillis = Date.now() - startupMillis;

    response.json({
        startupMillis,
        uptimeMillis
    });
});

export default router;
