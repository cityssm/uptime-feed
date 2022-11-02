import path from "path";
import type { ServiceConfig } from "node-windows";

const __dirname = ".";

export const serviceConfig: ServiceConfig = {
    name: "Uptime Feed",
    description: "RSS and JSON application startup notifications",
    script: path.join(__dirname, "bin", "www.js")
};
